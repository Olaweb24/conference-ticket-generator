import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ProfileUpload.css";

const ProfileUpload = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState(localStorage.getItem("fullName") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [imageUrl, setImageUrl] = useState(localStorage.getItem("avatar") || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState({ name: "", email: "", image: "" });

  useEffect(() => {
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("email", email);
    localStorage.setItem("avatar", imageUrl);
  }, [fullName, email, imageUrl]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError((prev) => ({ ...prev, image: "" }));

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "cuollmly"); // ✅ Replace this with your actual preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dnpznykpp/image/upload",
        formData
      );
      const uploadedUrl = response.data.secure_url;
      setImageUrl(uploadedUrl);
      localStorage.setItem("avatar", uploadedUrl);
    } catch (err) {
      console.error("Cloudinary Upload Error:", err.response?.data || err.message);
      setError((prev) => ({ ...prev, image: "Image upload failed. Try again." }));
    } finally {
      setUploading(false);
    }
  };

  const validateForm = () => {
    let isValid = true;
    let newError = { name: "", email: "", image: "" };

    if (!fullName.trim()) {
      newError.name = "Full Name is required.";
      isValid = false;
    }

    if (!email.trim()) {
      newError.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newError.email = "Enter a valid email address.";
      isValid = false;
    }

    if (!imageUrl) {
      newError.image = "Avatar is required.";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      navigate("/ticket");
    }
  };

  return (
    <div className="profile-upload-container">
      <div className="upload-description">
        <h2>Profile Upload</h2>
        <p className="step-info">Step 2/2</p>
        
      </div>
      
      <div className="progress-bar">
        <div className="progress" style={{ width: "66%" }}></div>
        
      </div>
      {/* Progress Bar */}
      <div className="box-container">
      


    {/* Drag and Drop Image Upload Box */}
    <div className="image-upload-container">
        <div className="upload-box-container">
            <h3>Upload profile photo</h3>
            <div className="upload-box-inner">
            <label className="upload-box">
            <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
            {uploading ? "Uploading..." : "Drag & Drop or Click to Upload Image"}
            </label>
            {error.image && <p className="error-message">{error.image}</p>}
            </div>
           
        </div>
        
    </div>


      {/* Name Input */}
      <div className="input-group">
        <label htmlFor="Name">Enter your full name</label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        {error.name && <p className="error-message">{error.name}</p>}
      </div>

      {/* Email Input */}
      <div className="input-group">
      <label htmlFor="Name">Enter your Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error.email && <p className="error-message">{error.email}</p>}
      </div>

      

      {/* Box Showing Uploaded Image URL */}
      {imageUrl && (
        <div className="image-url-box">
          <p>Uploaded Image URL:</p>
          <input type="text" value={imageUrl} readOnly className="url-display" />
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="button-group">
        <button onClick={() => navigate("/")} className="back-btn">Back</button>
        <button onClick={handleSubmit} className="next-btn" disabled={uploading}>Generate Ticket</button>
      </div>
     </div>
      
    </div>
  );
};

export default ProfileUpload;
