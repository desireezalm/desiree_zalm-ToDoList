/* OPDRACHT: TO-DO LIST */

const urlToDo = "http://localhost:3000/";
const search = document.querySelector('.search-input');
const taskList = document.querySelector('.todo-list');
const taskItem = document.querySelectorAll('.todo-item');
const addBtn = document.querySelector('.add-button');
const taskInput = document.querySelector('.add-input');
const form = document.querySelector('.add-task');

// console.log(inputText);



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
        console.log(data);
        return data;
    } catch(error) {
        console.log(error);
    };
};
// postData("do homework");

//EVENTLISTENER CLICK DELETE

//EVENTLISTENER CLICK ADD BUTTON
addBtn.addEventListener('click', e => {
    e.preventDefault();
    const inputText = form.elements[0].value;
    const newTask = inputText;
    console.log(newTask.trim());
    //postData(newTask.trim());
    form.reset();
    getData();
});

// ADD TO DOM

