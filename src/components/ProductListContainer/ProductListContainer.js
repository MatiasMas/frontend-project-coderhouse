import './ProductListContainer.css';
import ProductList from "../ProductList/ProductList";
import {useEffect, useState} from "react";
import {getProductsFromFirebase} from "../../database-conectors/firebase";
import {useParams} from "react-router-dom";
import {getProductsFromLocal} from "../../database-conectors/local";

const ProductListContainer = (props) => {

    const [products, setProducts] = useState([]);
    let {category} = useParams();

    const getItemsByCategory = (category, items) => {
        if (category === undefined) {
            return items;
        }

        return items.filter(item => item.category === category);
    };

    useEffect(() => {
        const promise = getProductsFromLocal();
        // const promise = getProductsFromFirebase();
        promise.then((result) => {
            const myItems = getItemsByCategory(category, result);

            setProducts(myItems);
        })
            .catch(() => {
                console.log("Request FAIL");
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