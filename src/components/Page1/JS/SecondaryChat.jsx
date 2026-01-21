import "../UX/SecondaryChat.css";
import { useState, useEffect, useRef } from "react";
import FastOptions from "./FastOptions";

const SecondaryChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const chatRef = useRef(null);

    const chats_name = [
        "Исследования в области искуссвенного интеллекта"
    ]

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleMenu = () => setIsOpen(true);
    const closeChat = () => setIsOpen(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chatRef.current && !chatRef.current.contains(event.target)) {
                closeChat();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen]);

    return (
        <div className={`secondary-chat-wrapper ${!isOpen && !isMobile ? 'notification-mode' : ''}`} tabIndex="-1">
            {!isMobile && !isOpen && (
                <div className="secondary-chat-notification" onClick={toggleMenu}>
                    <p className="fast-logo-text">Быстрые чаты</p>
                    <p className="fast-logo-second-text">Задавай любые вопросы для решения повседневных задач</p>
                </div>
            )}

            {isOpen && (
                <div 
                    className="chat-wrapper-2" 
                    ref={chatRef}
                    onClick={e => e.stopPropagation()}
                >
                    <button className="secondary-chat-close" onClick={closeChat}>✕</button>
                    <div className="chat-text"></div>
                    <FastOptions chats_name={chats_name}/>
                    <div className="secondary-textareas">
                        <textarea className="secondary-chat-textarea" placeholder="Задай вопрос..." />
                        <div className="secondary-buttons-below">
                            <button className="secondary-options-btn">+</button>
                            <button className="secondary-send-btn">↑</button>
                        </div>
                    </div>
                </div>
            )}

            {isMobile && !isOpen && (
                <button className="secondary-chat-burger" onClick={toggleMenu} aria-label="Открыть чат">☰</button>
            )}

            {isMobile && isOpen && (
                <div className="secondary-chat-overlay" onClick={closeChat} />
            )}
        </div>
    );
};

export default SecondaryChat;