import imageCompression from "browser-image-compression";
import React, { useEffect, useState } from "react";
import "./ImageCompressor.css";

const ImageCompressor = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileSize, setSelectedFileSize] = useState(null);
  const [compressing, setCompressing] = useState(false);
  const [compressedFile, setCompressedFile] = useState(null);
  const [compressedFileSize, setCompressedFileSize] = useState(null);
  console.log({ selectedFileSize, compressedFileSize });
  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];
    if (!imageFile) {
      return;
    }
    setSelectedFile(imageFile);
    setSelectedFileSize((imageFile.size / 1024 / 1024).toFixed(2));
    setCompressing(true);
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      setCompressedFile(compressedFile);
      setCompressedFileSize((compressedFile.size / 1024 / 1024).toFixed(2));
      setCompressing(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="imageCompressor">
      <input
        className="imageCompressor__input"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
      <div className="imageCompressor__imageContainer">
        <div className="imageCompressor__image">
          {selectedFile && (
            <img src={URL.createObjectURL(selectedFile)} alt="" />
          )}
        </div>
        {compressing && <p>Loading</p>}
        <div className="imageCompressor__image">
          {compressedFile && (
            <>
              <img src={URL.createObjectURL(compressedFile)} alt="" />
              <button>
                <a href={URL.createObjectURL(compressedFile)} download>
                  Download
                </a>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCompressor;
