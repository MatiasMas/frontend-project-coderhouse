import Axios from "axios";

export const getProductsFromLocal = () => {
    // let products = [];
    //
    // Axios({
    //     method: "POST",
    //     data: {
    //         username: "testmatias",
    //         password: "asdasd",
    //     },
    //     withCredentials: true,
    //     url: "http://localhost:8080/login",
    // }).then((res) => {
    //     console.log(res);

        return Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:8080/api/products",
        }).then(res => res.data.products).catch((err) => console.log(err));
    // }).catch((err) => {
    //     console.log(err);
    // });

    // return products;
};