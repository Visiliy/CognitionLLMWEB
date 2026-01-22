import { useState } from "react";
import "../UX/Authorization.css";

const Authorization = () => {
    const [isRegWindow, setIsOpenRegWindow] = useState(false);

    const openWindow = () => {
        setIsOpenRegWindow(!isRegWindow);
    }

    return (
        <div className="authorization-wrapper">
            {
                !isRegWindow ? <div className="enter-window">
                    <p>Вход</p>
                    <input type="email" placeholder="Почта"/>
                    <input type="password" placeholder="Пароль"/>
                    <button>Войти</button>
                    <div className="is-reg-div">
                        <p>Нет аккаунта?</p>
                        <p className="reg-link" onClick={openWindow}>Зарегистрироваться</p>
                    </div>
                </div> : <div className="reg-window">
                    <p>Регистрация</p>
                    <input type="email" placeholder="Почта"/>
                    <input type="password" placeholder="Пароль"/>
                    <button>Зарегистрироваться</button>
                    <div className="is-business-div">
                        <input className="business-checkbox" type="checkbox"/>
                        <p className="business-text">Создать бизнес аккаунт</p>
                    </div>
                    <div className="is-reg-div">
                        <p>Есть аккаунт?</p>
                        <p className="reg-link" onClick={openWindow}>Войти</p>
                    </div>
                </div>
            }
        </div>
    );
};

export default Authorization;