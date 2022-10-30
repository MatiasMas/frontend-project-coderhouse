import './CartWidget.css';
import {Link} from "react-router-dom";
import {useContext} from "react";
import {context} from "../../context/CartContext";

const CartWidget = (props) => {

    const contextValue = useContext(context);

    return (
        <div className={'cart-container'}>
            <Link className={'cart-link'} to={'/cart'}>
                <box-icon type="regular" name="cart-alt"/>
            </Link>
            <span className={'cartwidget-quantity'}>{contextValue.quantity}</span>
        </div>
    );
};

export default CartWidget;