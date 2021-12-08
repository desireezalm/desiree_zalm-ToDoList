/* OPDRACHT: TO-DO LIST */

const urlToDo = "http://localhost:3000/";
const search = document.querySelector('.search-input');
const taskList = document.querySelector('.todo-list');
const taskItem = document.querySelectorAll('.todo-item');
const addBtn = document.querySelector('.add-button');
const taskInput = document.querySelector('.add-input');
const form = document.querySelector('.add-task');
const removeBtn = document.querySelectorAll('.delete');
const editBtn = document.querySelectorAll('.edit');
const itemWrapper = document.querySelectorAll('.todo-wrapper');

/* I have tried to use a different file for the requests, but I kept getting multiple error messages and my code refused
to load. I also tried using export and import keywords, but I also kept getting error messages. Therefore I put the requests
in this file, instead of the api-client.js file. */

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

const taskDone = async (urlId, descriptionString) => {
    try {
        const response = await fetch(urlId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                description: descriptionString, 
                done: true
            })
        });
    } catch(error) {
        console.log(error);
    };
}

const taskUndo = async (urlId, descriptionString) => {
    try {
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

const getStatus = async () => {
    const data = await getData();
    const statusList = await data.map((taskStatus) => {
        return taskStatus.done;
    });
    return statusList;
}
getStatus();

const arrayUrl = await getUrlArray();
const arrayIds = await getIdArray();
const arrayStatus = await getStatus();
console.log(arrayStatus);



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
        wrapper.classList.add("todo-wrapper");
        trashcan.className = "far fa-trash-alt delete";
        edit.className = "far fa-edit edit";
        liTask.classList.add("todo-item");
        taskText.classList.add("task-description");
        editForm.classList.add("edit-task");
        editLabel.classList.add("edit-labe");
        editText.classList.add("edit-text");
        editSubmit.classList.add("edit-submit");

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
        
        
    });

    // TASKS WHICH HAVE A PROPERTY OF DONE WILL BE SHOWN CROSSED OUT IN DOM AFTER RELOAD OF PAGE.
    // FAILED: EITHER ALL ITEMS CROSSED OUT, NO ITEMS CROSSED OUT OR ONLY FIRST ITEM CROSSED OUT.
    // I HAVE TRIED DIFFERENT VARIATIONS OF THIS CODE AT VARIOUS OTHER PLACES IN THIS FILE, WITHOUT CORRECT RESULTS.
    // I ASKED A QUESTION ABOUT THIS IN SLACK, AND WAS TOLD THIS WAS NOT REQUIRED, AND WAS TOLD THIS WOULD BE ADDRESSED AT
    // A LATER POINT. I WAS ALSO GIVEN VARIOUS TIPS, TO ACCOMPLISH THIS NOW, BUT I HAVEN'T GOTTEN IT TO WORK.
    /*
    arrayStatus.forEach((taskStatus) => {
        const taskText = document.querySelector(".task-description");
        if(taskStatus = false){            
            taskText.classList.remove("task-done");
        } else if(taskStatus = true){
            taskText.classList.add("task-done");
        };
    });
    */
};
getTasks();

// CLEAR LIST IN DOM
const clearDom = async () => {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
};

/* EVENT LISTENERS */

// EVENTLISTENER CLICK DELETE ICON
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

// EVENTLISTENER CLICK EDIT ICON
taskList.addEventListener('click', e => {    
    if(e.target.classList.contains('edit')) {
        const liText = e.target.previousSibling.firstChild;
        const editForm = e.target.previousSibling.lastChild;
        console.log(`Edit task: ${liText.innerHTML}?`);
        liText.classList.toggle('invisible');
        editForm.classList.toggle('visible');
    };
});

// EVENTLISTENER SUBMIT EDITED TASK
taskList.addEventListener('click', e => {    
    if(e.target.classList.contains('edit-submit')) {
        const editIcon = e.target.parentElement.parentElement.nextSibling;
        const id = editIcon.dataset.idTask;
        const url = urlToDo + id;
        const editForm = e.target.parentElement;
        const editDescription = editForm.elements[0].value;
        const editTask = editDescription.trim();
        putData(url, editTask);
        editForm.reset();
        taskList.scrollIntoView({behavior: "smooth"});
    };
});

// EVENTLISTENER CHECKBOX
const checkboxEvent = async () => {  
    await getTasks(); 
    const checkboxes = document.querySelectorAll((`input[name="task"]`));

    checkboxes.forEach((checkbox) => {        
        checkbox.addEventListener('click', e => {
            console.log("Task: " + e.target.nextSibling.firstChild.innerText);
            const targetSpan = e.target.nextSibling.firstChild;
            const taskId = e.target.parentElement.lastChild.dataset.idTask;
            const urlId = urlToDo + taskId;
            const description = targetSpan.innerText.trim();
            if(targetSpan.classList.contains('task-done')) {
                targetSpan.classList.remove('task-done');
                taskUndo(urlId, description);
            } else {
                targetSpan.classList.add('task-done');
                taskDone(urlId, description);
            };
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
