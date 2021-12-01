/* OPDRACHT: TO-DO LIST */

const urlToDo = "http://localhost:3000/";
const search = document.querySelector('.search-input');
const taskList = document.querySelector('.todo-list');
const taskItem = document.querySelectorAll('.todo-item');
const addBtn = document.querySelector('.add-button');
const taskInput = document.querySelector('.add-input');
const form = document.querySelector('.add-task');
const removeBtn = document.querySelectorAll('.delete');
const itemWrapper = document.querySelectorAll('.todo-wrapper');



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
        console.log(data);
        return data;
    } catch(error) {
        console.log(error);
    };
};

// DELETE DATA
const deleteData = async (urlDelete) => {
    try {
        console.log(urlDelete);
        const response = await fetch(urlDelete, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        //const data = await response.json();
        //console.log(data);
        //return data;
        getTasks();
    } catch(error) {
        console.log(error);
    };
};
//deleteData();



/* ARRAYS */

// GET FULL ARRAY
const getArray = async () => {
    const data = await getData();
    const arrayList = data.map((arrayItem) => {
        return arrayItem;
    });
    return arrayList;
};
getArray();

// GET ARRAY WITH ID'S
const getIdArray = async () => {
    const data = await getData();
    const arrayList = data.map((arrayItem) => {
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

    // ITERATE OVER ITEMS IN ARRAY
    allTasks.forEach(singleTask => {
        const taskDescription = singleTask.description;
        console.log(taskDescription);
        
        //CREATING ELEMENTS
        const taskText = document.createElement('span');
        const liTask = document.createElement('li');
        const trashcan = document.createElement('i');        
        const checkbox = document.createElement('input');        
        const wrapper = document.createElement('div');
        
        //ADDING CLASSES
        wrapper.className = "todo-wrapper";
        trashcan.className = 'far fa-trash-alt delete';
        liTask.className = "todo-item";
        taskText.className = "task-description";

        //ADDING CONTENT
        checkbox.type = 'checkbox';
        taskText.innerHTML = taskDescription;
        trashcan.dataset.idTask = singleTask._id;
        //console.log(trashcan.dataset);
        
        //APPENDING ELEMENTS
        liTask.appendChild(taskText);
        wrapper.appendChild(checkbox);
        wrapper.appendChild(liTask);
        wrapper.appendChild(trashcan);
        taskList.appendChild(wrapper);
    });
    console.log(allTasks);
    return allTasks;
};
getTasks();



/* EVENT LISTENERS */

//EVENTLISTENER CLICK DELETE
taskList.addEventListener('click', e => {
    
    if(e.target.classList.contains('delete')) {
        const id = e.target.dataset.idTask;
        const url = urlToDo + id;
        //console.log(url);
        //console.log(id);
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
