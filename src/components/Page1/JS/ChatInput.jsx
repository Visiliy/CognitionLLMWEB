import "../UX/ChatInput.css";
import { useRef, useState, useEffect } from 'react';

const ChatInput = ({ style, openOptions, isOptions }) => {
    const inputRef = useRef(null);
    const textareaRef = useRef(null);
    const [value, setValue] = useState('');
    const [isLongText, setIsLongText] = useState(false);

    useEffect(() => {
        if (isLongText) {
            const textarea = textareaRef.current;
            if (textarea) {
                textarea.focus();
                textarea.setSelectionRange(value.length, value.length);
            }
        } else {
            const input = inputRef.current;
            if (input) {
                input.focus();
                input.setSelectionRange(value.length, value.length);
            }
        }
    }, [isLongText, value]);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    useEffect(() => {
        if (!isLongText && inputRef.current) {
            if (inputRef.current.scrollWidth > inputRef.current.clientWidth) {
                setIsLongText(true);
            }
        } else if (isLongText && !value.includes('\n') && value.length < 50) {
            setIsLongText(false);
        }
    }, [value, isLongText]);

    useEffect(() => {
        if (isLongText && textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
        }
    }, [value, isLongText]);

    return (
        <div className="chat-input-wrapper" style={style}>
            {!isLongText ? (
                <>
                    <button className="options-btn" onClick={openOptions}>{isOptions ? "✕" :"+"}</button>
                    <input
                        ref={inputRef}
                        className="chat-input"
                        type="text"
                        placeholder="Задай любой вопрос..."
                        value={value}
                        onChange={handleChange}
                    />
                    <button className="send-btn">↑</button>
                </>
            ) : (
                <>
                    <textarea
                        ref={textareaRef}
                        className="chat-textarea"
                        placeholder="Задай любой вопрос..."
                        value={value}
                        onChange={handleChange}
                        rows={1}
                    />
                    <button className="options-btn" onClick={openOptions}>{isOptions ? "✕" :"+"}</button>
                    <button className="send-btn">↑</button>
                </>
            )}
        </div>
    );
};

export default ChatInput;