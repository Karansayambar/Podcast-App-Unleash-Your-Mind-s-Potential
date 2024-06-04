import { useState } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";

function FileInput({ accept, id, fileHandleFunc, text }) {
    const [fileName, setFileName] = useState("");

    const onChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            fileHandleFunc(file);
        }
    };

    return (
        <>
            <label htmlFor={id} className='custom-input'>
                {fileName ? fileName : text} {fileName ? "" : <FaCloudDownloadAlt className="icon" />}
            </label>
            <input className='custom-input' type="file" accept={accept} id={id} style={{ display: "none" }} onChange={onChange} />
        </>
    );
}

export default FileInput;
