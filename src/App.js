import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import './App.css'
import logo from './logo.svg'

function App() {
  const [text, setText] = useState(""); // State to hold input text
  const [qrCode, setQrCode] = useState(""); // State to manage QR code text
  const [qrSize, setQrSize] = useState(380); // State to manage dynamic QR code size

  // Handler for text input
  const handleTextChange = (e) => {
    setText(e.target.value);
    setQrCode(e.target.value);
  };

  // Function to download the QR code as an image
  const downloadQRCode = () => {
    const qrCodeElement = document.getElementById("qrCodeElement");
    html2canvas(qrCodeElement).then((canvas) => {
      const link = document.createElement("a");
      link.download = "qr-code.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  // Adjust QR code size based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 840) {
        setQrSize(310); // Set smaller size for small screens
      } else {
        setQrSize(380); // Default size for larger screens
      }
    };

    // Set initial size based on current screen width
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className="nav-logo">
        <img src={logo} alt="Logo" />
        <h1>QR Code Generator</h1>
      </nav>
      <div className="body-content">
        <div className="text-area">
          <textarea
            placeholder="Type Your text here"
            value={text}
            onChange={handleTextChange}
          />
        </div>
        <div className="generator-area">
          <div className="qr-code-outline">
            <div id="qrCodeElement">
              {qrCode && <QRCodeCanvas value={qrCode} size={qrSize} />}
            </div>
            <div>
              <button onClick={downloadQRCode}>Download QR Code</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
