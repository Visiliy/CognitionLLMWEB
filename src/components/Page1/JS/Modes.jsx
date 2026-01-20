import "../UX/Modes.css";

const Modes = ({ modes }) => {
    return (
        <div className="mods-wrapper">
            {modes.map((mode, index) => (
                <div className="mode-card" key={index}>
                    <p className="mode-name">{mode["mode_name"]}</p>
                    <p className="mode-text">{mode["mode_text"]}</p>
                </div>
            ))}
        </div>
    );
};

export default Modes;