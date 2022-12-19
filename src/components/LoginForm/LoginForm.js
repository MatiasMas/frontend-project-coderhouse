import {useState} from "react";
import "./LoginForm.css";
import Axios from "axios";
import {Link, redirect, useNavigate} from "react-router-dom";
import LoginFailed from "../LoginFailed/LoginFailed";

const LoginForm = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLogged, setIsLogged] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);

    const nav = useNavigate();

    const handleLogIn = (event) => {
        event.preventDefault();

        Axios({
            method: "POST",
            data: {
                username: username,
                password: password,
            },
            withCredentials: true,
            url: "http://localhost:8080/login",
        }).then((res) => {
            console.log(res);
            setIsLogged(true);
            nav("/products");
        }).catch((err) => {
            if (err.response.status === 404){
                setLoginFailed(true);

                setTimeout(() => {
                    setLoginFailed(false);
                }, 5000);
            }
        });
    };

    if (!isLogged) {
        return (
            <>
                <form id="login-form" onSubmit={handleLogIn}>
                    <label htmlFor="username">Username: </label>
                    <input type="text" id="username" name="username" value={username}
                           onChange={event => setUsername(event.target.value)}/>
                    <label htmlFor="password">Password: </label>
                    <input type="text" id="password" name="password" value={password}
                           onChange={event => setPassword(event.target.value)}/>
                    <button type="submit">Login</button>
                    <Link to={"/register"} className={"register-button"}>Register</Link>
                </form>
                {loginFailed ?
                    <LoginFailed/> :
                    ""
                }
            </>
        );
    } else {
        redirect("/products");
    }
};

export default LoginForm;
