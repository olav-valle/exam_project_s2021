const URL = 'http://localhost:8080/api/items'
const header = {
    'Content-Type': "application/hal+json",
    'Accept': "application/hal+json",
};

//todo: refactor item specific fetch()'s to use
// HAL _links from object instead of itemId

// Make GET request to a helper method in backend API,
// to reset DB state.
const resetDatabase = async () => {
    try {
        return await fetch(URL + '/reset', {method: "GET"});
    } catch (e) {
        console.log(e);
    }
}

// SELECT all items in backend DB
const getItems = async () => {
    try {
        const response = await fetch(URL, {
                method: "GET",
                headers: header
            }
        );
        const body = await response.json();
        return body._embedded.items;
    } catch (e) {
        throw e
    }

}

// SELECT specific item by id
const getItemById = async (itemId) => {
    try {
        const response = await fetch(URL + `/${itemId}`,
            {
                method: "GET",
                headers: header
            });
        return await response.json();
    } catch (e) {
        throw e
    }
}

// DELETE specific item by id
const deleteItem = async (itemId) => {
    try {
        const response = await fetch(URL + `/${itemId}`,
            {
                method: "DELETE",
                headers: header
            })
        return await response;
    } catch (e) {
        throw e
    }
}

// CREATE new item entry in backend DB
const postNewItem = async (newItem) => {
    try {
        const response = await fetch(
            URL,
            {
                method: "POST",
                body: JSON.stringify(newItem),
                headers: header
            })
        //todo: catch and handle server errors. Check status field in response body.
        return await response.json();
    } catch (err) {
    }
}

const updateItem = async (existingItem) => {
    try {
        const response = await fetch(
            existingItem._links.self.href,
            {
                method: "PATCH",
                body: JSON.stringify({
                    description: existingItem.description,
                    id: existingItem.id,
                    name: existingItem.name,
                    price: existingItem.price
                }),
                headers: header
            })
        return await response.json();
    } catch (err) {

    }
}


export {getItems, deleteItem, postNewItem, getItemById, resetDatabase, updateItem}