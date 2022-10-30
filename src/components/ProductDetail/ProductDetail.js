import './ProductDetail.css';
import {Col, Row} from "react-bootstrap";
import ProductCount from "../ProductCount/ProductCount";
import {useState} from "react";
import {Link} from "react-router-dom";

const ProductDetail = ({product}) => {

    const [hideCountComponent, setHideCountComponent] = useState(false);

    const onAdd = () => {
        setHideCountComponent(true);
    };

    return (
        <Row>
            <Col>
                <img className={'item-detail-img'} src={product.img} alt={product.name}/>
            </Col>
            <Col className={'item-detail-overview'}>
                <h1 className={'item-title'}>{product.name}</h1>
                <p className={'item-detail-description'}>{product.description}</p>
                <Row className={'rating-section'}>
                    <Col className={'stars-section'}>
                        <box-icon type="regular" name="star"/>
                        <box-icon type="regular" name="star"/>
                        <box-icon type="regular" name="star"/>
                        <box-icon type="regular" name="star"/>
                        <box-icon type="regular" name="star"/>
                    </Col>
                    <Col>
                        <span>{product.rating}</span>
                        <span>{` (${product.reviews} reviews)`}</span>
                    </Col>
                </Row>
                <Row className={'price-section'}>
                    <Col className={'price-info'}>
                        <p className={'item-price'}>{`$${product.price}`}</p>
                        <p className={'item-price-disclaimer'}>Shipping and taxes included.</p>
                    </Col>
                </Row>
                <Row className={'item-counter'}>
                    <Col>
                        {hideCountComponent ?
                            <Link to={'/cart'} hidden={!hideCountComponent} className={'btn btn-primary checkout-button'}>Checkout</Link> :
                            <ProductCount actualStock={product.stock} minimumStock={product.minimumStock} name={product.name} onAdd={onAdd} product={product}/>}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default ProductDetail;
