import "../UX/Options.css";

const Options = ({ onFileUpload }) => {
  const handleFileClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.onchange = onFileUpload;
    input.accept=".pdf,.doc,.docx,.txt";
    input.click();
  };

  return (
    <div className="options-wrapper">
      <ul className="options-ul">
        <li
          className="options-li"
          onClick={handleFileClick}
        >
          Добавить файл
        </li>
        <li className="options-li">Web-поиск</li>
      </ul>
    </div>
  );
};

export default Options;
