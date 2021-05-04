const URL = 'http://localhost:8080/api/product'

// Make GET request to a helper method in backend API, to reset DB state.
const resetDatabase = async () => {
    try {
        return await fetch(URL+'/reset', {method: "GET"});
    } catch (e){
        console.log(e);
    }
}

// SELECT all items in backend DB
const getItems = async () => {
    try {
        const response = await fetch(URL, {method: "GET"});
        return await response.json();
    } catch (e) {
        throw e
    }

}

// SELECT specific item by id
const getItemById = async (itemId) => {
    try {
        const response = await fetch(URL + `/${itemId}`, {method: "GET"});
        return await response.json();
    } catch (e) {
        throw e
    }
}

// DELETE specific item by id
const deleteItem = async (itemId) => {
    // return await fetch(
    //     URL + `/${itemId}`,
    //     {method: "DELETE"})
    //     .catch(err => console.log(err));
    try {
        const response = await fetch(URL + `/${itemId}`, {method: "DELETE"})
        return await response.json();
    } catch (e) {

    }
}

// CREATE new item entry in backend DB
const postNewItem = async (newItem) => {
    // 1. create item object in form
    // 2. use thunk to:
    // a. POST object to API through this method
    // b. call 'fetchAll', when API confirms the POST
    try {
        const response = await fetch(
            URL,
            {
                method: "POST",
                body: JSON.stringify(newItem)
            })
        return await response.json();
    } catch (err) {
    }
}


export {getItems, deleteItem, postNewItem, getItemById, resetDatabase}