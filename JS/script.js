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
//getData();


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

// GET ARRAY WITH ID'S
const getIdArray = async () => {
    const data = await getData();
    const arrayList = data.map((arrayItem) => {
        //console.log(arrayItem._id);
        //const taskId = arrayItem._id;
        //const urlDelete = `${urlToDo}${taskId}`;
        //console.log(urlDelete);
        return arrayItem._id;
    });
    //console.log(arrayList);
    return arrayList;
};
getIdArray();

// GET ARRAY WITH URLS
const getUrlArray = async () => {
    const ids = await getIdArray();
    const urlArray = ids.map((singleUrl) => {
        return urlToDo + singleUrl;
    });
    console.log(urlArray);
    return urlArray;
}
getUrlArray();

// DELETE DATA
const deleteData = async () => {
    try {
        const allTasks = await getData();

        allTasks.forEach(singleTask => {
            
            const taskId = singleTask._id;
            //console.log(taskId);
            const urlDelete = `${urlToDo}${taskId}`;
            const urlObject = {urlDelete};
            //const urlDelete = `${urlToDo}f383f2b-a3e7-4d1f-8e63-510302f25163`;
            //console.log(urlDelete);
            //console.log(urlObject);
            //urlList.map(urlObject);
            return urlObject;
        });
        console.log(allTasks);
        
        /*const response = await fetch(urlDelete, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        return data;*/
    } catch(error) {
        console.log(error);
    };
};
deleteData();

//EVENTLISTENER CLICK DELETE
taskList.addEventListener('click', e => {
    //deleteData();
    if(e.target.classList.contains('delete')) {
        //e.target.parentNode.remove();
        //console.log(`task ${e.target.previousSibling.innerText}`);
        //alert(`task "${e.target.previousSibling.innerText}" has been removed`)
        //const targetID = deleteData();
        //console.log(targetID);
    };
    //const idTask = e._id;
    //console.log(idTask);
});


//EVENTLISTENER CLICK ADD BUTTON
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
        
        //APPENDING ELEMENTS
        liTask.appendChild(taskText);
        wrapper.appendChild(checkbox);
        wrapper.appendChild(liTask);
        wrapper.appendChild(trashcan);
        taskList.appendChild(wrapper);
        
        /*
        console.log(trashcan.dataset.idTask);
        const endpointUrl = urlToDo + trashcan.dataset.idTask;
        console.log(endpointUrl);
        return endpointUrl;*/
    });
    console.log(allTasks);
    return allTasks;
};
getTasks();

/*
const urlArray = async () => {
    const urlList = await getData.map((singleUrl) => {
        console.log(singleUrl._id);
        return singleUrl._id;
    })
    console.log(urlList);
}
urlArray();
*/