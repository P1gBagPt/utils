"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import NavbarComponent from "@/components/navbar/page";

export default function ImageBase64Page() {
  const [image, setImage] = useState<string | null>(null);
  const [base64, setBase64] = useState<string>("");

  // Explicitly type event parameter
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      convertToBase64(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      convertToBase64(file);
    }
  };

  const convertToBase64 = (file: Blob) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // Ensure reader.result is treated as a string
      if (typeof reader.result === "string") {
        setBase64(reader.result);
        setImage(reader.result); // Set the base64 string for preview
      }
    };
    reader.readAsDataURL(file);
  };

  const handleConvert = () => {
    if (image) {
      setBase64(image); // Directly set the base64 string from `image`
    }
  };

  const handleLabelClick = () => {
    const fileInput = document.getElementById("SelectFile") as HTMLInputElement;
    if (fileInput) fileInput.click();
  };

  // Remove Image
  const handleRemoveImage = () => {
    setImage(null);
    setBase64("");
  };

  return (
    <>
      <NavbarComponent />
      <div className="flex justify-center items-center h-screen space-x-4">
        <div
          className="w-64 h-64 border-2 border-gray-400 rounded-lg flex justify-center items-center"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {!image ? (
            <div className="text-center text-gray-500">
              <p>Drag and drop an image here</p>
              <p>or</p>
              <label
                className="form-control input-sm input-small input-inline text-blue-500 cursor-pointer"
                onClick={handleLabelClick}
              >
                Select File
              </label>
              <input
                type="file"
                hidden
                id="SelectFile"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt="Uploaded Image"
                layout="fill"
                objectFit="contain"
                className="rounded-md"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col items-center space-y-4">
          {image && (
            <Button
              onClick={handleRemoveImage}
              className="text-white bg-red-500 hover:bg-red-600"
            >
              Remove Image
            </Button>
          )}
          <Button
            onClick={handleConvert}
            className="w-32 dark:bg-gray-600 dark:text-white"
          >
            Convert to Base64
          </Button>
        </div>

        <div className="w-96 h-64">
          <textarea
            readOnly
            value={base64}
            className="w-full h-full p-2 border dark:bg-grey-custom border-gray-300 rounded-md"
            placeholder="Base64 output will appear here..."
          />
        </div>
      </div>
    </>
  );
}
