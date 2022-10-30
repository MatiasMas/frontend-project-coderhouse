export const getProductsFromLocal = async () => {
    return await fetch("http://localhost:8080/api/products")
        .then((response) => response.json())
        .then((data) => data.products)
        .catch({error: "Something went wrong when retrieving products."});
};