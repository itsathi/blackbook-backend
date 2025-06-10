import { useState } from "react";
import axios from "axios";

const token = localStorage.getItem("token");

const UploadSamplePack = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadType] = useState("pack");
    const [uploadStatus, setUploadStatus] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [productImage, setProductImage] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/zip") {
            setSelectedFile(file);
        } else {
            setSelectedFile(null);
            setUploadStatus("Please select a .zip file.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setUploadStatus("Please select a .zip file.");
            return;
        }
        if (!productImage) {
            setUploadStatus("Please select a cover image.");
            return;
        }

        const formData = new FormData();
        formData.append("productFile", selectedFile);
        formData.append("category", uploadType);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("coverImage", productImage);  

        try {
            await axios.post("http://localhost:4000/products/upload", formData, {
                headers: { "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`, 
                 },
            });
            setUploadStatus("Upload successful!");
        } catch (err) {
            setUploadStatus("Upload failed.");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "2rem auto", padding: 20, border: "1px solid #ccc" }}>
            <h2>Upload Sample Pack</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ margin: "1rem 0" }}>
                    <input
                        type="file"
                        accept=".zip"
                        onChange={handleFileChange}
                    />
                </div>
                <div style={{ margin: "1rem 0" }}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div style={{ margin: "1rem 0" }}>
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                        rows={3}
                        style={{ width: "100%" }}
                    />
                </div>
                <div style={{ margin: "1rem 0" }}>
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        min="0"
                        step="0.01"
                        required
                    />
                </div>
                <div style={{ margin: "1rem 0" }}>
                    <input
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        onChange={e => setProductImage(e.target.files[0])}
                    />
                    <span style={{ marginLeft: 8 }}>Product Image (.png, .jpg, .jpeg)</span>
                </div>
                <button type="submit">Upload</button>
            </form>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
};

export default UploadSamplePack;
