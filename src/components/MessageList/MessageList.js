import Message from "../Message/Message";
import "./MessageList.css";

const MessageList = ({messages}) => {
    return (
        <ul className={"messages-list"}>
            {messages.map(message => <Message key={message.date} message={message}/>)}
        </ul>
    );
};

export default MessageList;
