import { useEffect, useState } from 'react';
import lit from './lit';
import './App.css';

function App() {
  // useEffect(() => {
  //   (async () => {
  //     lit.connect();
  //     const encrypted = await lit.encryptString(file);
  //     console.log(encrypted);
  //     const decrypted = await lit.decryptString(encrypted.encryptedFile, encrypted.encryptedSymmetricKey);
  //     console.log("decrypted:");
  //     console.log(decrypted);
  //   })();
  // }, []);

  const [file, setFile] = useState(null);
  const [encryptedFile, setEncryptedFile] = useState(null);
  const [encryptedSymmetricKey, setEncryptedSymmetricKey] = useState(null);
  const [fileContent, setFileContent] = useState("");

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  }

  const encryptFile = async () => {
    if (file === null) {
      alert("Please select a file before encrypting!");
      return;
    }
    console.log(file);
    const { encryptedFile, encryptedSymmetricKey } = await lit.encryptFile(file);
    console.log("Enc:");
    console.log(encryptedFile);
    console.log(encryptedSymmetricKey);
    setEncryptedFile(encryptedFile);
    setEncryptedSymmetricKey(encryptedSymmetricKey);
    alert("File Encrypted! Thanks for using Lit");
  }

  const decryptFile = async () => {
    if (encryptedFile === null) {
      alert("Please Encrypt your file first!");
      return;
    }
    const decrypted = await lit.decryptFile(encryptedFile, encryptedSymmetricKey);
    console.log(decrypted);
    var enc = new TextDecoder("utf-8");
    setFileContent(enc.decode(decrypted));
    alert("File Decrypted! See contents below");
  }

  useEffect(() => {
    console.log("encryptedFile:");
    console.log(encryptedFile);
  }, [encryptedFile]);

  useEffect(() => {
    console.log("encryptedSymmetricKey:");
    console.log(encryptedSymmetricKey);
  }, [encryptedSymmetricKey]);

  return (
    <div className="App">
        <h1>Encrypt & Decrypt a file using Lit SDK</h1>
        <input type="file" name="file" onChange={selectFile} />
        <div>
          <button onClick={encryptFile}>Encrypt</button>
          <button onClick={decryptFile}>Decrypt</button>
        </div>
        <div className="contents">
          {fileContent.length > 0 && (
            <div>{fileContent}</div>
          )}
        </div>
    </div>
  );
}

export default App;