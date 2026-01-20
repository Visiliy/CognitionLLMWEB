import "../UX/Logo.css";

const Logo = ({ logo_text, logo_src }) => {
    return (
        <div className="logo-wrapper">
            <img className="logo-img" src={logo_src}/>
            <p className="logo-text">{logo_text}</p>
        </div>
    );
}

export default Logo;