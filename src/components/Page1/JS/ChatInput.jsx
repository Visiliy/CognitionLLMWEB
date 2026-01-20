import "../UX/ChatInput.css";

const ChatInput = ({ style }) => {
    return (
        <div className="chat-input-wrapper" style={style}>
            <button className="options-btn">+</button>
            <input 
                className="chat-input" 
                placeholder="Задай любой вопрос..."
            />
            <button className="send-btn">↑</button>
        </div>
    );
}

export default ChatInput;