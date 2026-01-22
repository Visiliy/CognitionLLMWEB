import "../UX/EnterBtn.css";

const EnterBtn = ({ openAutForm }) => {
    return (
        <button onClick={openAutForm} className="enter-btn">Войти</button>
    );
}

export default EnterBtn;