import './Cart.css';
import {useContext} from "react";
import {context} from "../../context/CartContext";
import {Col, Row} from "react-bootstrap";

const Cart = () => {

    const contextValue = useContext(context);

    return (
        <>
            <h1 className={'title-cart'}>Cart Overview</h1>
            <Row className={'items-cart-container'}>
                {contextValue.cart.map(itemOrder =>
                    <Row key={itemOrder[0].id} className={'item-row-in-cart'}>
                        <Col xl={10} className={'item-details-cart'}>
                            <img className={'item-img-cart'} src={itemOrder[0].img} alt={itemOrder[0].name}/>
                            <span className={'item-name-cart'}>{itemOrder[0].name}</span>
                        </Col>
                        <Col xl={2} className={'item-quantity-cart'}>
                            {itemOrder[1] + ' un.'}
                        </Col>
                    </Row>
                )}
            </Row>
        </>
    );
};

export default Cart;