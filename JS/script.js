/* OPDRACHT: TO-DO LIST */

const urlToDo = "http://localhost:3000/";
const search = document.querySelector('.search-input');
const taskList = document.querySelector('.todo-list');
const taskItem = document.querySelectorAll('.todo-item');
const addBtn = document.querySelector('.add-button');
const taskInput = document.querySelector('.add-input');
const form = document.querySelector('.add-task');
const removeBtn = document.querySelectorAll('.delete');
const editBtn = document.querySelectorAll('.edit')
const itemWrapper = document.querySelectorAll('.todo-wrapper');

/*
import { getData } from './api-client.js';
import { postData } from './api-client.js';
import { deleteData } from './api-client.js';
*/

/* REQUESTS */


// GET DATA
const getData = async () => {
    try {
        const response = await fetch(urlToDo, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        //console.log(data);
        return data;
    } catch(error) {
        console.log(error);
    };
};
getData();


// POST DATA
const postData = async (descriptionString) => {
    try {
        const response = await fetch(urlToDo, {
            method: 'POST',
            body: JSON.stringify({
                description: descriptionString, 
                done: false
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        //console.log(data);
        return data;
    } catch(error) {
        console.log(error);
    };
};


// DELETE DATA
const deleteData = async (urlId) => {
    try {
        //console.log(urlId);
        const response = await fetch(urlId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        await clearDom();
        await getTasks();
    } catch(error) {
        console.log(error);
    };
};
//deleteData();


// EDIT DATA
const putData = async (urlId, descriptionString) => {
    try {
        console.log(urlId);
        const response = await fetch(urlId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description: descriptionString, 
                done: false
            })
        });
        
        await clearDom();
        await getTasks();
    } catch(error) {
        console.log(error);
    };
}




/* ARRAYS */

// GET ARRAY WITH ID'S
const getIdArray = async () => {
    const data = await getData();
    const arrayList = await data.map((arrayItem) => {
        return arrayItem._id;
    });
    return arrayList;
};
getIdArray();

// GET ARRAY WITH URLS
const getUrlArray = async () => {
    const ids = await getIdArray();
    const urlArray = ids.map((singleUrl) => {
        return urlToDo + singleUrl;
    });
    return urlArray;
}
getUrlArray();

const arrayUrl = await getUrlArray();
//console.log(arrayUrl);
const arrayIds = await getIdArray();
//console.log(arrayIds);


//GET ARRAY & ADD TO DOM
const getTasks = async () => {
    const allTasks = await getData();    
    await clearDom();

    // ITERATE OVER ITEMS IN ARRAY
    allTasks.forEach(singleTask => {
        const taskDescription = singleTask.description;
        //console.log(taskDescription);
        
        //CREATING ELEMENTS
        const taskText = document.createElement('span');
        const liTask = document.createElement('li');
        const trashcan = document.createElement('i');        
        const checkbox = document.createElement('input');
        const wrapper = document.createElement('div');
        const edit = document.createElement('i');
        const editForm = document.createElement('form');
        const editLabel = document.createElement('label');
        const editText = document.createElement('input');
        const editSubmit = document.createElement('input');
        
        //ADDING CLASSES
        wrapper.className = "todo-wrapper";
        trashcan.className = 'far fa-trash-alt delete';
        edit.className = 'far fa-edit edit';
        liTask.className = "todo-item";
        taskText.className = "task-description";
        editForm.className = "edit-task";
        editLabel.className = "edit-label";
        editText.className = "edit-text";
        editSubmit.className = "edit-submit";

        //ADDING CONTENT
        checkbox.type = 'checkbox';       
        taskText.innerHTML = taskDescription;
        trashcan.dataset.idTask = singleTask._id;
        edit.dataset.idTask = singleTask._id;
        editText.type = 'text';
        editText.placeholder = "New description";
        editSubmit.type = 'submit';
        editSubmit.value = 'Edit task'
        
        //APPENDING ELEMENTS
        editForm.appendChild(editLabel);
        editForm.appendChild(editText);
        editForm.appendChild(editSubmit);
        liTask.appendChild(taskText);
        liTask.appendChild(editForm);        
        wrapper.appendChild(checkbox);
        wrapper.appendChild(liTask);        
        wrapper.appendChild(edit);
        wrapper.appendChild(trashcan);
        taskList.appendChild(wrapper);

        checkbox.value = `${checkbox.nextSibling.firstChild.innerText}`;
        checkbox.name = `task`;
        checkbox.className = 'checkbox';
        checkbox.checked = false;
        
    });
    //console.log(allTasks);
    return allTasks;
};
getTasks();

// CLEAR LIST IN DOM
const clearDom = async () => {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
}


/* EVENT LISTENERS */

//EVENTLISTENER CLICK DELETE ICON
taskList.addEventListener('click', e => {    
    if(e.target.classList.contains('delete')) {
        const id = e.target.dataset.idTask;
        const url = urlToDo + id;
        if(arrayIds.includes(id)) {
            console.log(`Removed: task ${e.target.previousSibling.innerText}`);
            deleteData(url);
            window.location.reload();
            //alert(`task ${e.target.previousSibling.innerText} has been removed`)
        } else {
            console.log(`Not removed: task ${e.target.previousSibling.innerText}`);
            //alert(`task ${e.target.previousSibling.innerText} could not be removed`)
        };
    };
});

//EVENTLISTENER CLICK EDIT ICON
taskList.addEventListener('click', e => {    
    if(e.target.classList.contains('edit')) {
        //const id = e.target.dataset.idTask;
        const liText = e.target.previousSibling.firstChild;
        const editForm = e.target.previousSibling.lastChild;
        console.log(`Edit task: ${liText.innerHTML}?`);
        liText.classList.toggle('invisible');
        editForm.classList.toggle('visible');
    };
});

// EVENTLISTENER SUBMIT EDIT
taskList.addEventListener('click', e => {    
    if(e.target.classList.contains('edit')) {
        const id = e.target.dataset.idTask;
        const url = urlToDo + id;
        const editDescription = form.elements[0].value;
        const editTask = editDescription.trim();
        //console.log(editDescription);
        //console.log(editTask);
        /*
        console.log(newTask.trim());
        form.reset();
        form.scrollIntoView({behavior: "smooth"});
        */

        if(arrayIds.includes(id)) {
            //putData(url, editTask);
        } else {
            console.log(`Failure attempting to edit task: ${e.target.previousSibling.innerText}`);
        };
    };
});

// EVENTLISTENER CHECKBOX
const checkboxEvent = async () => {  
    await getTasks(); 
    const checkboxes = document.querySelectorAll((`input[name="task"]`));

    checkboxes.forEach((checkbox) => {        
        checkbox.addEventListener('click', e => {
            console.log("Task: " + e.target.nextSibling.firstChild.innerText);
            
            e.target.nextSibling.firstChild.classList.toggle('task-done');
        });
    });
};
checkboxEvent();

// EVENTLISTENER CLICK ADD BUTTON
addBtn.addEventListener('click', e => {
    //e.preventDefault();
    const inputText = form.elements[0].value;
    const newTask = inputText;
    console.log(newTask.trim());
    postData(newTask.trim());
    form.reset();
    form.scrollIntoView({behavior: "smooth"});
    //window.location.reload();
});

// SEARCH BAR
const filterTasks = (term) => {
    Array.from(taskList.children)
        .filter((task) => {
            return !task.textContent.toLowerCase().includes(term);
        })
        .forEach((task) => {
            task.classList.add('filtered')
        })
    Array.from(taskList.children)
        .filter((task) => {
            return task.textContent.toLowerCase().includes(term);
        })
        .forEach((task) => {
            task.classList.remove('filtered')
        })
};

search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    filterTasks(term);
});
