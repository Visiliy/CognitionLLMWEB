import "../UX/SecondaryChat.css";
import { useState, useEffect } from "react";

const SecondaryChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) {
                setIsOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="secondary-chat-wrapper">

            {(isMobile ? isOpen : true) && (
                <textarea
                    className="secondary-chat-textarea"
                    placeholder="Введите сообщение..."
                />
            )}

            {isMobile && (
                <button
                    className="secondary-chat-burger"
                    onClick={toggleMenu}
                    aria-label="Toggle chat input"
                >
                    ☰
                </button>
            )}

            {isMobile && isOpen && (
                <div
                    className="secondary-chat-overlay"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default SecondaryChat;