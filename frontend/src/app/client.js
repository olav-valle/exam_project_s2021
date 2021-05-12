const URL = '/api/items'
// const URL = 'http://localhost:8080/api/items'
const header = {
    'Content-Type': "application/hal+json",
    'Accept': "application/hal+json",
};

// SELECT all items in backend DB
const getItems = async () => {
    try {
        const response = await fetch(URL, {
                method: "GET",
                headers: header
            }
        );
        if(response.ok){
        const body = await response.json();
        return body._embedded.items;
            }
    } catch (err) {
        return err;
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
        if(response.ok){
            return await response.json();
        }
        return await Promise.reject();
    } catch (err) {
        return err;
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
        // const resp = await response;
        if(response.ok){
            return response;
        }
        return await Promise.reject();
    } catch (err) {
        return err;
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
        if (response.ok) {
            return await response.json();
        }
        return await Promise.reject();
    } catch (err) {
        return err;
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
                    price: existingItem.price,
                    image: existingItem.image
                }),
                headers: header
            })
        if (response.ok) {
            return await response.json();
        }
        return await Promise.reject();
    } catch (err) {
        return err;
    }
}


export {getItems, deleteItem, postNewItem, getItemById, updateItem}