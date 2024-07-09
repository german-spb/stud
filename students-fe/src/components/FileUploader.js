import React, { useState } from "react";
import { API_URL } from "../constants";

const SingleFileUploader =() => {
  
  const [status, setStatus] = useState("initial");
  const [file, setFile] = useState();
  
  const  handleFileChange = (e) => {
    if (e.target.files) {
      setStatus("initial");
      setFile(e.target.files[0]);
    }
  };
  

const  handleUpload = async () => {
  
    if (file) {
      setStatus("uploading");
      
      const formData = new FormData();
      formData.append("name", (file.name).slice(0, file.name.lastIndexOf('.')));
      formData.append("email", "german@mail.ru");
      formData.append("document", file.type);
      formData.append("phone", file.size);
      
      try {
        const result = await fetch(API_URL, {
          method: "POST",
          body: formData,
               
        });
        
        const data = await result.status;
        console.log(data)
        if (data === 201) {
          setStatus("success");
       window.location.reload();
        }
            
      } catch (error) {
        console.error(error);
        setStatus("fail");
      }
    }
    
  };
/*-------------------*/

  return (
    <>
      <div className="input-group">
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input id="file" type="file" onChange={handleFileChange} />
      </div>
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {(file.name).slice(0, file.name.lastIndexOf('.'))}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && (
        <button onClick={handleUpload} className="submit">
          Загрузить файл
        </button>
      )}
      

      <Result status={status} />
     
    </>
  );
};

const Result = ({ status }) => {
  if (status === "success") {
    return <p>✅ File uploaded successfully!</p>;
  } else if (status === "fail") {
    return <p>❌ File upload failed!</p>;
  } else if (status === "uploading") {
    return <p>⏳ Uploading selected file...</p>;
  } else {
    return null;
  }
};

export default SingleFileUploader;
