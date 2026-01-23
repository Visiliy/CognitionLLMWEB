import { useState, useEffect, useCallback, useMemo } from 'react';
import DataCloud from "../../Servises/DataCloud.js";
import ChatInput from "./JS/ChatInput.jsx";
import Head from "./JS/Head.jsx";
import "./Page1.css";
import Modes from './JS/Modes.jsx';
import Options from './JS/Options.jsx';
import SecondaryChat from './JS/SecondaryChat.jsx';
import Authorization from './JS/Authorization.jsx';

const Page1 = () => {
  const datacloud = useMemo(() => new DataCloud(), []);
  const [isMobile, setIsMobile] = useState(false);
  const [isOptions, setIsOptions] = useState(false);
  const [isAutForm, setIsAutForm] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const fileManager = useMemo(() => ({
    addFiles: (files) => {
      const existingNames = new Set(uploadedFiles.map(f => f.name.toLowerCase()));
      const newFiles = Array.from(files)
        .filter(file => !existingNames.has(file.name.toLowerCase()))
        .map(file => ({
          id: Date.now() + Math.random(),
          name: file.name,
          size: file.size,
          file: file
        }));
      if (newFiles.length > 0) {
        setUploadedFiles(prev => [...prev, ...newFiles]);
      }
    },
    removeFile: (id) => {
      setUploadedFiles(prev => prev.filter(file => file.id !== id));
    },
    clearAll: () => setUploadedFiles([]),
    getFiles: () => uploadedFiles
  }), [uploadedFiles]);

  const openOptions = () => {
    setIsOptions(!isOptions);
  };

  const openAutForm = () => {
    setIsAutForm(!isAutForm);
  };

  const handleFileUpload = useCallback((event) => {
    fileManager.addFiles(event.target.files);
    event.target.value = '';
  }, [fileManager]);

  const formatFileName = useCallback((fileName) => {
    const extension = fileName.slice(fileName.lastIndexOf('.'));
    const nameWithoutExt = fileName.slice(0, -extension.length);
    return nameWithoutExt.length <= 10 ? fileName : nameWithoutExt.slice(0, 7) + '...' + extension;
  }, []);

  const handleFileClick = useCallback((id) => {
    fileManager.removeFile(id);
  }, [fileManager]);

  const handleSend = useCallback((message) => {
    console.log('Sending:', message, fileManager.getFiles());
  }, [fileManager]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1068);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const inputStyle = {
    borderRadius: "30px",
    display: "flex",
    backgroundColor: "#333",
    border: "1px solid #555",
    padding: "12px 16px",
    height: "fit-content",
    width: "100%",
  };

  const divStyles = {
    position: "absolute",
    width: isMobile ? "90%" : "50%",
    top: window.innerWidth > 468 ? "60%" : "55%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxSizing: "border-box",
    display: "grid",
  };

  const fileTagStyle = {
    background: '#444',
    padding: '4px 8px',
    borderRadius: '15px',
    margin: '2px',
    fontSize: '12px',
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    maxWidth: '150px',
    overflow: 'hidden',
    border: '1px solid #555',
  };

  return (
    <>
      <Head
        logo_text={datacloud.application_name}
        logo_src={datacloud.logo_src}
        openAutForm={openAutForm}
      />
      {!isAutForm ? (
        <div className="chat-wrapper">
          <div className="chat-block" style={divStyles}>
            <p className="main-text">Точность и информативность превыше всего</p>
            {isOptions && <Options onFileUpload={handleFileUpload} />}
            <ChatInput
              style={inputStyle}
              onOptionsToggle={openOptions}
              isOptions={isOptions}
              onSend={handleSend}
            />
            {uploadedFiles.length > 0 && (
              <div className='file-container'>
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="file-tag"
                    style={fileTagStyle}
                    onClick={() => handleFileClick(file.id)}
                    title={file.name}
                  >
                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', color: "white" }}>
                      {formatFileName(file.name)}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {window.innerWidth > 468 ? (
              <Modes modes={datacloud.modes_array} />
            ) : (
              <div>
                <button className="new-options-btn">Дополнительные опции</button>
              </div>
            )}
          </div>
          <SecondaryChat />
        </div>
      ) : (
        <Authorization onClose={() => setIsAutForm(false)} />
      )}
    </>
  );
};

export default Page1;
