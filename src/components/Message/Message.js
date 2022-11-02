import "./Message.css";

const Message = ({message}) => {
    return (
        <div className={"message"}>
            <p className={"message-email"}>{message.email}</p>
            <p className={"message-text"}>{message.message}</p>
            <p className={"message-date"}>{message.date}</p>
        </div>
    );
};

export default Message;
