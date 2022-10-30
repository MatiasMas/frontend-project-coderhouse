import Message from "../Message/Message";

const MessageList = ({messages}) => {
    return (
        <ul>
            {messages.map(message => <Message key={message.date} message={message}/>)}
        </ul>
    );
};

export default MessageList;
