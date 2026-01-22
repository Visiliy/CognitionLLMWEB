import { useState, useEffect } from 'react';
import DataCloud from "../../Servises/DataCloud.js";
import ChatInput from "./JS/ChatInput.jsx";
import Head from "./JS/Head.jsx";
import "./Page1.css";
import Modes from './JS/Modes.jsx';
import Options from './JS/Options.jsx';
import SecondaryChat from './JS/SecondaryChat.jsx';
import Authorization from './JS/Authorization.jsx';

const Page1 = () => {
    const datacloud = new DataCloud();
    const [isMobile, setIsMobile] = useState(false);
    const [isOptions, setIsOptions] = useState(false);
    const [isAutForm, setIsAutForm] = useState(false);

    const openOptions = () => {
        setIsOptions(!isOptions);
    }

    const openAutForm = () => {
        setIsAutForm(!isAutForm);
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
        height: "fit-content",
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
                openAutForm={openAutForm}
            />
            {
                !isAutForm ? <div className="chat-wrapper">
                    <div className='chat-block' style={divStyles}>
                        <p className='main-text'>Точность и информативность превыше всего</p>
                        {
                            isOptions && <Options />
                        }
                        <ChatInput style={inputStyle} openOptions={openOptions} isOptions={isOptions}/>
                        <Modes modes={datacloud.modes_array}/>
                    </div>
                    <SecondaryChat />
                </div> : <Authorization />
            }
        </>
    );
}

export default Page1;
