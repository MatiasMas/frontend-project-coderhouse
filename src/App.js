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
import RegisterForm from "./components/RegisterForm/RegisterForm";
import RegisterFailed from "./components/RegisterFailed/RegisterFailed";
import LoginFailed from "./components/LoginFailed/LoginFailed";

const socket = io(`http://${window.location.hostname}:8080`);

const App = () => {

    return (
        <BrowserRouter>
                <CustomProvider>
                    <NavBar/>
                    <Routes>
                        <Route path="/" element={<LoginForm/>}/>
                        <Route path="/products" element={<ProductListContainer message={'Bienvenido a Ani-Store donde podras encontrar todo aquello que deseas!'}/>}/>
                        <Route path="/category/:category" element={<ProductListContainer message={'Bienvenido a Ani-Store donde podras encontrar todo aquello que deseas!'}/>}/>
                        <Route path="/product/:id" element={<ProductDetailContainer/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="/chat" element={<MessageListContainer socket={socket}/>}/>
                        <Route path="/add-product" element={<AddProductForm socket={socket}/>}/>
                        <Route path="/login" element={<LoginForm/>}/>
                        <Route path="/register" element={<RegisterForm/>}/>
                        <Route path="/login-failed" element={<LoginFailed/>}/>
                        <Route path="/register-failed" element={<RegisterFailed/>}/>
                    </Routes>
                </CustomProvider>
        </BrowserRouter>
    );

};

export default App;