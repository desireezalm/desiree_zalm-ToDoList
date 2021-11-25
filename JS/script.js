/* OPDRACHT: TO-DO LIST */

const urlToDo = "http://localhost:3000/";
const search = document.querySelector('.search-input');
const taskList = document.querySelector('.todo-list');
const taskItem = document.querySelectorAll('.todo-item');
const addBtn = document.querySelector('.add-button');
const taskInput = document.querySelector('.add-input');
const form = document.querySelector('.add-task');
const removeBtn = document.querySelectorAll('.delete');


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
        console.log(data);
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

//GET ID
const getID = async () => {
    const allTasks = await getData();
    allTasks.forEach(singleTask => {
        const taskId = singleTask._id;
        console.log(taskId);    
    });
}
getID();




// DELETE DATA
const deleteData = async () => {
    try {
        const urlDelete = urlToDo + getID();
        const response = await fetch(urlDelete, {
            method: 'DELETE',
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

//EVENTLISTENER CLICK DELETE
/*
list.addEventListener('click', e => {
    if(e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
    };
});
*/

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



// ADD TO DOM

//GET ARRAY
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
        trashcan.className = 'far fa-trash-alt delete';
        liTask.className = "todo-item";
        taskText.className = "task-description";

        //ADDING CONTENT
        checkbox.type = 'checkbox';
        taskText.innerHTML = taskDescription;
        
        //APPENDING ELEMENTS
        liTask.appendChild(taskText);
        wrapper.appendChild(checkbox);
        wrapper.appendChild(liTask);
        wrapper.appendChild(trashcan);
        taskList.appendChild(wrapper);

    });
    return allTasks;
};
getTasks();


