import {useEffect, useState} from "react";
import MessageList from "../MessageList/MessageList";
import "./MessageListContainer.css";
import {denormalize} from "normalizr";
import {chatSchema} from "../../normalizr.schemas/chat.schema";

const MessageListContainer = ({socket}) => {

    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [messageEmail, setMessageEmail] = useState("");
    const [authorFirstname, setAuthorFirstname] = useState("");
    const [authorLastname, setAuthorLastname] = useState("");
    const [authorAge, setAuthorAge] = useState(0);
    const [authorAlias, setAuthorAlias] = useState("");
    const [authorAvatar, setAuthorAvatar] = useState("");

    useEffect(() => {
        socket.emit("getMessages");
        socket.on("savedMessages", (data) => {
            const denormalizedData = denormalize(data.result, chatSchema, data.entities);

            setMessages(denormalizedData.messages);
        });

        return () => {
            socket.off("savedMessages");
        };

    }, []);

    const addMessage = (event) => {
        event.preventDefault();

        socket.emit("addMessage", {
            author: {
                email: messageEmail,
                firstname: authorFirstname,
                lastname: authorLastname,
                age: authorAge,
                alias: authorAlias,
                avatar: authorAvatar
            },
            message: messageText
        });

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

                    <label htmlFor="firstname">First Name: </label>
                    <input type="text" id="firstname" name="firstname" value={authorFirstname}
                           onChange={event => setAuthorFirstname(event.target.value)}/>

                    <label htmlFor="lastname">Last Name: </label>
                    <input type="text" id="lastname" name="lastname" value={authorLastname}
                           onChange={event => setAuthorLastname(event.target.value)}/>

                    <label htmlFor="age">Age: </label>
                    <input type="number" id="age" name="age" value={authorAge}
                           onChange={event => setAuthorAge(Number(event.target.value))}/>

                    <label htmlFor="alias">Alias: </label>
                    <input type="text" id="alias" name="alias" value={authorAlias}
                           onChange={event => setAuthorAlias(event.target.value)}/>

                    <label htmlFor="avatar">Avatar: </label>
                    <input type="text" id="avatar" name="avatar" value={authorAvatar}
                           onChange={event => setAuthorAvatar(event.target.value)}/>

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
