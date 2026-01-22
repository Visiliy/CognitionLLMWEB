import { useState } from "react";
import "../UX/Authorization.css";

const Authorization = () => {
    const [isRegWindow, setIsOpenRegWindow] = useState(false);
    return (
        <div className="authorization-wrapper">
            {
                !isRegWindow ? <div className="enter-window">
                    <p>Вход</p>
                    <input type="email"/>
                    <input type="password"/>
                </div> : <div className="reg-window">
                    <p>Регистрация</p>
                </div>
            }
        </div>
    );
};

export default Authorization;