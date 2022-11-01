import "./Message.css";

const Message = ({message}) => {
    return (
        <div>
            <p>{message.email}</p>
            <p>{message.date}</p>
            <p>{message.message}</p>
        </div>
    );
};

export default Message;
