import {useEffect, useState} from "react";
import ProductDetail from "../ProductDetail/ProductDetail";
import './ProductDetailContainer.css';
import {useParams} from "react-router-dom";
import {getProductsFromFirebase} from "../../database-conectors/firebase";
import {getProductsFromLocal} from "../../database-conectors/local";

const ItemDetailContainer = () => {

    const [detailedProduct, setDetailedProduct] = useState({});
    let {id} = useParams();

    const getItem = (id, items) => {
        return items.filter(item => item.id - 1 === id - 1);
    };

    useEffect(() => {
        const promise = getProductsFromLocal();
        // const promise = getProductsFromFirebase();
        promise.then((result) => {
            const myItem = getItem(id, result);

            setDetailedProduct(myItem[0]);
        })
            .catch(() => {
                console.log("Request FAIL");
            });

    }, []);

    if (detailedProduct === undefined || Object.keys(detailedProduct).length === 0) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    } else {
        return (
            <div className={'container detail-container'}>
                <ProductDetail product={detailedProduct}/>
            </div>
        );
    }

};

export default ItemDetailContainer;
