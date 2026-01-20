import { useState, useEffect } from 'react';
import DataCloud from "../../Servises/DataCloud.js";
import ChatInput from "./JS/ChatInput.jsx";
import Head from "./JS/Head.jsx";
import "./Page1.css";
import Modes from './JS/Modes.jsx';
import Options from './JS/Options.jsx';

const Page1 = () => {
    const datacloud = new DataCloud();
    const [isMobile, setIsMobile] = useState(false);
    const [isOptions, setIsOptions] = useState(false);

    const openOptions = () => {
        setIsOptions(!isOptions);
    }

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1068);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const inputStyle = {
        borderRadius: "30px",
        display: "flex",
        backgroundColor: "#333",
        border: "1px solid #555",
        padding: "12px 16px",
        height: "54px",
        width: "100%",
    };

    const divStyles = {
        position: "absolute",
        width: isMobile ? "90%" : "50%",
        top: "60%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        boxSizing: "border-box",
        display: "grid",
    }

    return (
        <>
            <Head
                logo_text={datacloud.application_name}
                logo_src={datacloud.logo_src}
            />
            <div className="chat-wrapper">
                <div className='chat-block' style={divStyles}>
                    <p className='main-text'>Точность и информативность превыше всего</p>
                    {
                        isOptions && <Options />
                    }
                    <ChatInput style={inputStyle} openOptions={openOptions}/>
                    <Modes modes={datacloud.modes_array}/>
                </div>
                
            </div>
        </>
    );
}

export default Page1;
