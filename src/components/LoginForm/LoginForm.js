import {useState} from "react";
import "./LoginForm.css";

const LoginForm = ({logIn}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <form id="login-form" onSubmit={logIn}>
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" name="username" value={username}
                       onChange={event => setUsername(event.target.value)}/>
                <label htmlFor="password">Password: </label>
                <input type="text" id="password" name="password" value={password}
                       onChange={event => setPassword(event.target.value)}/>
                <button type="submit">Login</button>
            </form>
        </>
    );
};

export default LoginForm;
