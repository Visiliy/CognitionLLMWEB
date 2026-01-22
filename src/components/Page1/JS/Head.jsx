import Logo from "./Logo";
import "../UX/Head.css"
import EnterBtn from "./EnterBtn";

const Head = ({ logo_text, logo_src, openAutForm}) => {
    return (
        <div className="head-main-wrapper">
            <Logo 
                logo_text={logo_text}
                logo_src={logo_src}
            />
            <EnterBtn openAutForm={openAutForm}/>
        </div>
    );
}

export default Head;