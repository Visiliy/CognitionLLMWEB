import { useState } from "react";
import "../UX/Authorization.css";
import DataCloud from "../../../Servises/DataCloud";
import AuthManager from "../../../Servises/AuthorizationAPI";

const Authorization = () => {
    const [isRegWindow, setIsOpenRegWindow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isBusiness, setIsBusiness] = useState(false);

    const data_cloud = new DataCloud()

    const openWindow = () => {
        setIsOpenRegWindow(!isRegWindow);
    };

    const loginDataToServer = async () => {
        const authManager = new AuthManager(data_cloud.base_url);
        const result = await authManager.login({ email, password });
        console.log(result);
    };

    const regDataToServer = async () => {
        const authManager = new AuthManager(data_cloud.base_url);
        const userData = {
            name,
            email,
            password,
            isBusiness
        };
        const result = await authManager.register(userData);
        console.log(result);
    };

    return (
        <div className="authorization-wrapper">
            {
                !isRegWindow ? (
                    <div className="enter-window">
                        <p>Вход</p>
                        <input
                            type="email"
                            placeholder="Почта"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={loginDataToServer}>Войти</button>
                        <div className="is-reg-div">
                            <p>Нет аккаунта?</p>
                            <p className="reg-link" onClick={openWindow}>Зарегистрироваться</p>
                        </div>
                    </div>
                ) : (
                    <div className="reg-window">
                        <p>Регистрация</p>
                        <input
                            type="text"
                            placeholder="Имя"
                            maxLength={10}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Почта"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={regDataToServer}>Зарегистрироваться</button>
                        <div className="is-business-div">
                            <input
                                className="business-checkbox"
                                type="checkbox"
                                checked={isBusiness}
                                onChange={(e) => setIsBusiness(e.target.checked)}
                            />
                            <p className="business-text">Создать управленческий аккаунт</p>
                        </div>
                        <div className="is-reg-div">
                            <p>Есть аккаунт?</p>
                            <p className="reg-link" onClick={openWindow}>Войти</p>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Authorization;