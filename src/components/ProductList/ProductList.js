import './ProductList.css';
import Product from "../Product/Product";

const ProductList = ({products}) => {

    return (
        <ul className="product-cards">
            {products.map(product => <Product key={product.id} id={product.id} product={product}/>)}
        </ul>
    );

};

export default ProductList;