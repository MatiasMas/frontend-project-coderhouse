import './ProductListContainer.css';
import ProductList from "../ProductList/ProductList";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Axios from "axios";

const ProductListContainer = (props) => {

    const [products, setProducts] = useState([]);
    let {category} = useParams();

    const nav = useNavigate();

    const getItemsByCategory = (category, items) => {
        if (category === undefined || category === null) {
            return items;
        }

        return items.filter(item => item.category === category);
    };

    useEffect(() => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:8080/api/products",
        }).then(res => {
            const myItems = getItemsByCategory(category, res.data.products);
            setProducts(myItems);
        }).catch((err) => {
            if (err.response.status === 401) {
                nav("/login");
            } else {
                console.log(err);
            }
        });

    }, [category]);

    if (products.length === 0) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    } else {
        return (
            <div className="">
                <ProductList products={products}/>
            </div>
        );
    }
};

export default ProductListContainer;