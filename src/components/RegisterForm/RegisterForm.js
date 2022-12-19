import "./RegisterForm.css";
import {Link, redirect, useNavigate} from "react-router-dom";
import {useState} from "react";
import RegisterFailed from "../RegisterFailed/RegisterFailed";
import Axios from "axios";

const RegisterForm = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLogged, setIsLogged] = useState(false);
    const [registerFailed, setRegisterFailed] = useState(false);

    const nav = useNavigate();

    const handleRegister = (event) => {
        event.preventDefault();

        Axios({
            method: "POST",
            data: {
                username: username,
                password: password,
            },
            withCredentials: true,
            url: "http://localhost:8080/register",
        }).then((res) => {
            console.log(res);

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
                console.log(err);
            });

        }).catch((err) => {
            if (err.response.status === 404) {
                setRegisterFailed(true);

                setTimeout(() => {
                    setRegisterFailed(false);
                }, 5000);
            }
        });
    };

    if (!isLogged) {
        return (
            <>
                <form id="register-form" onSubmit={handleRegister}>
                    <label htmlFor="username">Username: </label>
                    <input type="text" id="username" name="username" value={username}
                           onChange={event => setUsername(event.target.value)}/>
                    <label htmlFor="password">Password: </label>
                    <input type="text" id="password" name="password" value={password}
                           onChange={event => setPassword(event.target.value)}/>
                    <button type="submit">Register</button>
                    <Link to={"/login"} className={"login-button"}>Login</Link>
                </form>
                {registerFailed ?
                    <RegisterFailed/> :
                    ""
                }
            </>
        );
    } else {
        redirect("/products");
    }


};

export default RegisterForm;
