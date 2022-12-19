import './NavBar.css';
import CartWidget from "../CartWidget/CartWidget";
import {NavLink} from "react-router-dom";
import {FormControl} from "react-bootstrap";
import Axios from "axios";

const NavBar = () => {
    const handleLogout = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:8080/logout",
        }).then((res) => {
            console.log(res.data);
        });
    };

    return (
        <nav className={'navbar nav-anistore bg-light border-bottom'}>
            <NavLink to="/products"><span className={'navbar-brand anistore-brand-icon'}>AniStore</span></NavLink>
            <ul className={'navbar-options'}>
                <FormControl
                    className={'search-input'}
                    placeholder="Search a product..."
                    aria-label="SearchInput"
                    aria-describedby="product-search"
                />
                <box-icon type="regular" name="search"/>
                <NavLink to="category/games">Games</NavLink>
                <NavLink to="category/figures">Figures</NavLink>
                <NavLink to="category/mangas">Mangas</NavLink>
                <NavLink to="chat">Chat</NavLink>
                <NavLink className={'logout-button'} onClick={handleLogout} to="login">Logout</NavLink>
                <NavLink className={'add-product'} to="add-product">Add Product</NavLink>
                <CartWidget/>
            </ul>
        </nav>
    );
};

export default NavBar;