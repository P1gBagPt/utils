"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import NavbarComponent from "@/components/navbar/page";
import { Copy, Check } from "lucide-react";

export default function ImageBase64Page() {
  const [image, setImage] = useState<string | null>(null);
  const [base64, setBase64] = useState<string>("");
  const [copied, setCopied] = useState(false);

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
      if (typeof reader.result === "string") {
        setBase64(reader.result);
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleConvert = () => {
    if (image) {
      setBase64(image);
    }
  };

  const handleLabelClick = () => {
    const fileInput = document.getElementById("SelectFile") as HTMLInputElement;
    if (fileInput) fileInput.click();
  };

  const handleRemoveImage = () => {
    setImage(null);
    setBase64("");
  };

  const handleCopy = () => {
    if (base64) {
      navigator.clipboard.writeText(base64);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="flex justify-center items-center h-screen space-x-4">
        {/* Left: Image Drop/Selection */}
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
                className="text-blue-500 cursor-pointer"
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

        {/* Middle: Action Buttons */}
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

        <div className="w-96">
          <div className="flex justify-end mb-2">
            {base64 && (
              <Button
                variant="ghost"
                onClick={handleCopy}
                className="flex items-center"
              >
                {!copied ? <Copy/> : <Check />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            )}
          </div>
          <textarea
            readOnly
            value={base64}
            className="w-full h-64 p-2 border dark:bg-grey-custom border-gray-300 rounded-md"
            placeholder="Base64 output will appear here..."
          />
        </div>
      </div>
    </>
  );
}
