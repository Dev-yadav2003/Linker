import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setImageUrl(res.data.url);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed");
    }
  };

  return (
    <div className="upload-wrapper">
      <div className="left-panel">
        <h1>Upload & Share Images Instantly</h1>
        <p>
          Choose an image from your device and get a shareable link. You can
          send it to friends, post it online, or save it for later.
        </p>
        {imageUrl && (
          <div style={{ marginTop: "20px" }}>
            <p>
              <strong>Image Link:</strong>
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="text"
                value={imageUrl}
                readOnly
                style={{
                  padding: "8px",
                  flex: 1,
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(imageUrl);
                  alert("Link copied to clipboard!");
                }}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#2196f3",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Copy
              </button>
            </div>

            <img
              src={imageUrl}
              alt="Uploaded"
              style={{
                marginTop: "15px",
                maxWidth: "100%",
                borderRadius: "8px",
              }}
            />
          </div>
        )}
      </div>

      <div className="right-panel">
        <div className="upload-box">
          <h2>Upload Your File</h2>
          <p>Select an image to upload</p>
          <form onSubmit={handleUpload}>
            <input
              type="file"
              className="file-input"
              onChange={handleFileChange}
            />
            <button
              type="submit"
              className="upload-button"
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
