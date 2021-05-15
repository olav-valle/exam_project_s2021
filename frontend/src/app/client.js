import {SERVER, API, LOGIN, USER} from "../config";

const URL = SERVER + API;

const ITEMS = "/items"

const header = new Headers( {
    'Content-Type': "application/hal+json",
    'Accept': "application/hal+json",
    'Authorization': localStorage.getItem("Token")
});

const loginUser = async (user, pw) => {

    const credentials = {
        "username": user,
        "password": pw
    }

    // try {
    //     const options = await fetch(SERVER+"/", {
    //         method: "OPTIONS",
    //         headers: new Headers({
    //             'Access-Control-Request-Method': 'POST',
    //             'Access-Control-Request-Headers': 'Authorization',
    //             'Origin': 'localhost:3000'
    //         })
    //     });
    //
    // } catch (e) {}

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
                const auth = await response.headers.get("Authorization");
                console.log(auth);
                const responseBody = await response.json();

                localStorage.setItem("Token", auth);
            } catch (err) {
                console.log(err);
                throw err;
            }
        }
        // return response.status;
    } catch (e) {
        throw e;
    }

    try {
        const user = await fetch(SERVER+"/user",
            {
                headers: {'Authorization': localStorage.getItem("Token")}
            });
        console.log(user);

    } catch (e) {
        console.log(e);
    }
}

// SELECT all items in backend DB
const getItems = async () => {
    try {
        const response = await fetch(URL + ITEMS, {
                method: "GET",
                headers: header
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
        const response = await fetch(URL + `/${itemId}`,
            {
                method: "GET",
                headers: header
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
const deleteItem = async (itemId) => {
    try {
        const response = await fetch(URL + `/${itemId}`,
            {
                method: "DELETE",
                headers: header
            })
        // const resp = await response;
        if (response.status === 201) {
            return response;
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
                headers: header
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
                headers: header
            })
        if (response.ok) {
            return await response.json();
        }
        return Promise.reject();
    } catch (err) {
        return err;
    }
}


export {getItems, deleteItem, postNewItem, getItemById, updateItem, loginUser}