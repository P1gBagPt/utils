"use client";

import React, { useState } from "react";

const TokenLinkGenerator: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [linkOutput, setLinkOutput] = useState<string>("");

  const generateFromJSON = (): void => {
    try {
      const data = JSON.parse(jsonInput.trim());

      const token = encodeURIComponent(data.access_token);
      const refreshToken = encodeURIComponent(data.refresh_token);

      if (!token || !refreshToken) {
        setLinkOutput("Missing access_token or refresh_token.");
        return;
      }

      const baseUrl = "http://localhost:4200/Portal/login?";
      const fullLink = `${baseUrl}access-token=${token}&refresh-token=${refreshToken}`;

      setLinkOutput(
        `<a href="${fullLink}" target="_blank" rel="noopener noreferrer" class="underline text-blue-500 hover:text-blue-400">${fullLink}</a>`
      );
    } catch {
      setLinkOutput("Invalid JSON. Please check the format.");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 flex flex-col items-center justify-start">
      <div className="w-full max-w-xl space-y-4">
        <h2 className="text-2xl font-bold text-center">Paste Token JSON</h2>
        <textarea
          rows={10}
          value={jsonInput}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setJsonInput(e.target.value)
          }
          placeholder="Paste the full JSON response here..."
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={generateFromJSON}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition"
        >
          Generate Link
        </button>
        <div
          className="mt-4 break-words font-semibold"
          dangerouslySetInnerHTML={{ __html: linkOutput }}
        />
      </div>
    </div>
  );
};

export default TokenLinkGenerator;
