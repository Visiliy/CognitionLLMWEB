import "../UX/ChatInput.css";
import { useRef, useState, useEffect, useCallback } from 'react';

const ChatInput = ({
  style,
  onOptionsToggle,
  isOptions,
  onSend,
}) => {
  const inputRef = useRef(null);
  const textareaRef = useRef(null);
  const [value, setValue] = useState('');
  const [isLongText, setIsLongText] = useState(false);

  const sendMessage = useCallback(() => {
    if (value.trim() && onSend) {
      onSend(value);
      setValue('');
      setIsLongText(false);
    }
  }, [value, onSend]);

  const handleChange = (e) => {
    const val = e.target.value;

    setValue(val);

    setTimeout(() => {
      if (!isLongText && inputRef.current) {
        if (inputRef.current.scrollWidth > inputRef.current.clientWidth) {
          setIsLongText(true);
        }
      } else if (isLongText && !val.includes('\n') && val.length < 30) {
        setIsLongText(false);
      }
    }, 0);
  };

  const scrollToBottom = useCallback(() => {
    if (textareaRef.current && isLongText) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
      setTimeout(() => {
        if (textareaRef.current) {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
          });
        }
      }, 10);
    }
  }, [isLongText]);

  useEffect(() => {
    if (isLongText && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(value.length, value.length);
      scrollToBottom();
    } else if (!isLongText && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(value.length, value.length);
    }
  }, [isLongText, value, scrollToBottom]);

  useEffect(() => {
    if (isLongText && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [value, isLongText]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.ctrlKey || e.metaKey || e.shiftKey) {
        e.preventDefault();
        sendMessage();
      } else {
        if (isLongText) {
          e.preventDefault();
          handleChange({ target: { value: value + '\n' } });
          setTimeout(() => {
            scrollToBottom();
          }, 10);
        } else {
          e.preventDefault();
          sendMessage();
        }
      }
    }
  };

  return (
    <div className="chat-input-wrapper" style={style}>
      {!isLongText ? (
        <>
          <button className="options-btn" onClick={onOptionsToggle}>
            {isOptions ? "✕" : "+"}
          </button>
          <input
            ref={inputRef}
            className="chat-input"
            type="text"
            placeholder="Задай любой вопрос..."
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button
            className="send-btn"
            onClick={sendMessage}
            disabled={!value.trim()}
          >
            ↑
          </button>
        </>
      ) : (
        <div className="textarea-wrapper-div">
          <textarea
            ref={textareaRef}
            className="chat-textarea"
            placeholder="Задай любой вопрос..."
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <div className="chats-btn">
            <button className="options-btn" onClick={onOptionsToggle}>
              {isOptions ? "✕" : "+"}
            </button>
            <button
              className="send-btn"
              onClick={sendMessage}
              disabled={!value.trim()}
            >
              ↑
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInput;
