import Logo from "./Logo";
import "../UX/Head.css"
import EnterBtn from "./EnterBtn";

const Head = ({ logo_text, logo_src}) => {
    return (
        <div className="head-main-wrapper">
            <Logo 
                logo_text={logo_text}
                logo_src={logo_src}
            />
            <EnterBtn />
        </div>
    );
}

export default Head;