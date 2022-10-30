import {useEffect, useState} from "react";
import MessageList from "../MessageList/MessageList";

const MessageListContainer = ({socket}) => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.emit("getMessages");
        socket.on("savedMessages", (data) => {
            setMessages(data);
        });

        return () => {
            socket.off("savedMessages");
        };

    }, []);

    if (messages.length === 0) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    } else {
        return (
            <div>
                <MessageList messages={messages}/>
            </div>
        );
    }
};

export default MessageListContainer;
