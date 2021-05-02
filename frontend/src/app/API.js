
const URL = 'http://localhost:8080/api/product'


const getProducts = async () => {
    let response;
    try {
        response = await fetch(URL, {method: "GET"});
        // .then(response => response.json())
        // .then(data => data)
        // .catch(err => console.log(err));
    } catch (e) {

        return e
    }
    return response.json()

}

const deleteProduct = async (itemId) => {
    return await fetch(
        URL + `/${itemId}`,
        {method: "DELETE"} )
        .catch( err => console.log(err));
}

export { getProducts, deleteProduct }