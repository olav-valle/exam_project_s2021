
const getProduct = async () => {
    return await fetch('http://localhost:8080/api/product').then(response => response.json());
}

export { getProduct }