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