import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons';
import NavBar from "./components/NavBar/NavBar";
import ProductListContainer from "./components/ProductListContainer/ProductListContainer";
import ProductDetailContainer from "./components/ProductDetailContainer/ProductDetailContainer";
import Cart from "./components/Cart/Cart";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import CustomProvider from "./context/CartContext";
import io from "socket.io-client";
import MessageListContainer from "./components/MessageListContainer/MessageListContainer";
import AddProductForm from "./components/AddProductForm/AddProductForm";
import LoginForm from "./components/LoginForm/LoginForm";
import {useState} from "react";
import RegisterForm from "./components/RegisterForm/RegisterForm";

const socket = io(`http://${window.location.hostname}:8080`);

const App = () => {

    const [loggedIn, setLoggedIn] = useState(false);

    const logIn = async (event) => {
        event.preventDefault();

        const logged = await fetch(`http://localhost:8080/login?username=${event.target[0].value}`)
            .then((response) => response.json())
            .then((data) => data)
            .catch({error: "Something went wrong on the login, please check the credentials."});

        if (logged){
            setLoggedIn(true);
        }
    };

    if (!loggedIn) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginForm logIn={logIn}/>}/>
                    <Route path="/login" element={<LoginForm logIn={logIn}/>}/>
                    <Route path="/register" element={<RegisterForm/>}/>
                </Routes>
            </BrowserRouter>
        );
    } else {
        return (
            <BrowserRouter>
                <CustomProvider>
                    <NavBar/>
                    <Routes>
                        <Route path="/" element={<ProductListContainer
                            message={'Bienvenido a Ani-Store donde podras encontrar todo aquello que deseas!'}/>}/>
                        <Route path="/category/:category" element={<ProductListContainer
                            message={'Bienvenido a Ani-Store donde podras encontrar todo aquello que deseas!'}/>}/>
                        <Route path="/product/:id" element={<ProductDetailContainer/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="/chat" element={<MessageListContainer socket={socket}/>}/>
                        <Route path="/add-product" element={<AddProductForm socket={socket}/>}/>
                    </Routes>
                </CustomProvider>
            </BrowserRouter>
        );
    }
};

export default App;