import {useEffect, useState} from "react";
import MessageList from "../MessageList/MessageList";
import "./MessageListContainer.css";

const MessageListContainer = ({socket}) => {

    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [messageEmail, setMessageEmail] = useState("");

    useEffect(() => {
        socket.emit("getMessages");
        socket.on("savedMessages", (data) => {
            setMessages(data);
        });

        return () => {
            socket.off("savedMessages");
        };

    }, []);

    const addMessage = (event) => {
        event.preventDefault();

        socket.emit("addMessage", {email: messageEmail, message: messageText});
        setMessageText("");
    };

    if (messages === null) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    } else {
        return (
            <div className="chat">
                <MessageList messages={messages}/>
                <form className="chat-form" id="message-fields" onSubmit={addMessage}>
                    <label htmlFor="email">Email: </label>
                    <input type="text" id="email" name="email" value={messageEmail}
                           onChange={event => setMessageEmail(event.target.value)}/>
                    <label htmlFor="message">Message: </label>
                    <input type="text" id="message" name="message" value={messageText}
                           onChange={event => setMessageText(event.target.value)}/>
                    <button type="submit">Send Message</button>
                </form>
            </div>
        );
    }
};

export default MessageListContainer;
