import {SERVER, API, LOGIN, USER} from "../config";

const URL = SERVER + API;

const ITEMS = "/items"


const getHeaders = () => {


    return new Headers({
        'Content-Type': "application/hal+json",
        'Accept': "application/hal+json",
        'Authorization': localStorage.getItem("Token")
    })
};

const getNoAuthHeaders = () => {
    return new Headers({
        'Content-Type': "application/hal+json",
        'Accept': "application/hal+json",
    })
}


// Not exactly sure how useful this is...
// It was mostly just to compare the results in POSTMAN.
const fetchServerOptions = async () => {
    try {
    const options = await fetch(SERVER+"/", {
        method: "OPTIONS",
        headers: new Headers({
            'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Headers': 'Authorization',
            'Origin': 'localhost:3000'
        })
    });

} catch (e) {}

}


// POST login credentials to server.
const loginUser = async (user, pw) => {

    localStorage.setItem("Token", null);

    const credentials = {
        "username": user,
        "password": pw
    }

    try {
        const response = await fetch(SERVER + LOGIN, {
            method: "POST",
            headers: new Headers({
                'Content-Type': "application/json",
                'Accept': "*/*",
            }),
            body: JSON.stringify(credentials)
        })

        if (response.status === 200) {
            // const headers = await response.headers;
            try {
                localStorage.setItem("Token", await response.headers.get("Authorization"));
                await getCurrentUser();
            } catch (err) {
                console.log(err);
                throw err;
            }
        }
        return response.status;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

// Query server about which user the currently stored JWT authorizes to.
// Can be used to test a tokens validity, as the server returns 403
// on an invalid (or missing) token.
const getCurrentUser = async () => {
    try {
        const response = await fetch(SERVER+"/user",
            {
                headers: getHeaders()
            });

        const user = await response.json()
        console.log(user);
        return user;

    } catch (e) {
        console.log(e);
    }
}

// SELECT all items in backend DB
const getItems = async () => {
    try {
        const response = await fetch(URL + ITEMS, {
                method: "GET",
                headers: getNoAuthHeaders()
            }
        );
        if (response.ok) {
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
        const response = await fetch(URL + ITEMS + `/${itemId}`,
            {
                method: "GET",
                headers: getHeaders()
            });
        if (response.ok) {
            return await response.json();
        }
        return Promise.reject();
    } catch (err) {
        return err;
    }
}

// DELETE specific item by id
const deleteItem = async (item) => {
    try {
        const response = await fetch(
            item._links.self.href,
            {
                method: "DELETE",
                headers: getHeaders()
            })
        // const resp = await response;
        if (response.status === 204) {
            return Promise.resolve();
        }
        return Promise.reject();
    } catch (err) {
        return err;
    }
}

// CREATE new item entry in backend DB
const postNewItem = async (newItem) => {
    try {
        const response = await fetch(
            URL+ITEMS,
            {
                method: "POST",
                body: JSON.stringify(newItem),
                headers: getHeaders()
            })
        if (response.status === 201) {
            return await response.json();
        }
        return Promise.reject();
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
                headers: getHeaders()
            })
        if (response.ok) {
            return await response.json();
        }
        return Promise.reject();
    } catch (err) {
        return err;
    }
}


export {getItems, deleteItem, postNewItem, getItemById, updateItem, loginUser, getCurrentUser}