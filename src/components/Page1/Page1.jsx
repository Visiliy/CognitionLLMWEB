import DataCloud from "../../Servises/DataCloud.js";
import ChatInput from "./JS/ChatInput.jsx";
import Head from "./JS/Head";
import ChatText from "./JS/TextChat.jsx";
import "./Page1.css";

const Page1 = () => {

    const datacloud = new DataCloud();

    return (
        <>
            <Head 
                logo_text={datacloud.application_name} 
                logo_src={datacloud.logo_src}
            />
            <div className="chat-wrapper">
                <ChatText />
                <ChatInput />
            </div>
        </>
    );
}

export default Page1;