import "../UX/FastOptions.css";

const FastOptions = ({ chats_name }) => {
    return (
        <div className="fast-options-wrapper">
            {
                chats_name.map((name, index) => {
                    <p key={index} className="chats-name">{name}</p>
                })
            }
        </div>
    );
}

export default FastOptions;