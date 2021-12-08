/* Een van de API requirements is mij niet gelukt: het zetten van de requests in een api-client.js file. Ik heb de file 
wel bijgesloten, maar de link in mijn html file in comments gezet. Ik bleef foutmeldingen krijgen bij het aanroepen 
van de requests in de script.js file, waardoor mijn code niet laadde. Vandaar dat ik de requests uiteindelijk ook in 
mijn script.js file heb gezet. Ik hoor graag wat ik had kunnen doen om dit op te lossen. Ik heb zelf verschillende 
dingen geprobeerd, o.a. gebruik maken van de keywords import & export (zie onder en in script.js), maar ook 
daarbij bleef ik foutmeldingen krijgen. */


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