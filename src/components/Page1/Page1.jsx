import { useState, useEffect } from 'react';
import DataCloud from "../../Servises/DataCloud.js";
import ChatInput from "./JS/ChatInput.jsx";
import Head from "./JS/Head";
import ChatText from "./JS/TextChat.jsx";
import "./Page1.css";

const Page1 = () => {
    const datacloud = new DataCloud();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 968);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const inputStyle = {
        width: isMobile ? "90%" : "50%",
        position: "absolute",
        borderRadius: "30px",
        backgroundColor: "#333",
        border: "1px solid #555",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "12px 16px",
        height: "54px",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    };

    return (
        <>
            <Head
                logo_text={datacloud.application_name}
                logo_src={datacloud.logo_src}
            />
            <div className="chat-wrapper">
                <ChatText />
                <div className="chat-input-wrapper" style={inputStyle}>
                    <ChatInput />
                </div>
            </div>
        </>
    );
}

export default Page1;
