
const getProduct = async () => {
    return await fetch('http://localhost:8080/api/product', {method: "GET"})
        .then(response => response.json())
        .then(data => data)
        .catch(err => console.log(err));
}

export { getProduct }