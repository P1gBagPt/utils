"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import toast, { Toaster } from "react-hot-toast";
import { parseJson, formatJson, downloadJson } from "@/services/jsonService";

export default function JsonFormatterPage() {
  const [jsonInput, setJsonInput] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [parsedJson, setParsedJson] = useState<any>(null);

  const handleParse = () => {
    try {
      const parsed = parseJson(jsonInput);
      setParsedJson(parsed);
      toast.success("Successfully parsed JSON!");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const errorMessage = e.message;
      const match = errorMessage.match(/at position (\d+)/);
      if (match) {
        const pos = parseInt(match[1], 10);
        const start = Math.max(0, pos - 10);
        const end = Math.min(jsonInput.length, pos + 10);
        const snippet = jsonInput.substring(start, end);
        toast.error(
          `Error at position ${pos}: ${errorMessage}. Around error: "${snippet}"`
        );
      } else {
        toast.error(errorMessage);
      }
      setParsedJson(null);
    }
  };

  const handleFormat = () => {
    if (parsedJson !== null) {
      const formatted = formatJson(parsedJson);
      setJsonInput(formatted);
      toast.success("JSON beautified successfully!");
    } else {
      toast.error("No valid JSON to format. Please parse first.");
    }
  };

  const handleDownload = () => {
    if (parsedJson !== null) {
      downloadJson(parsedJson);
      toast.success("JSON downloaded successfully!");
    } else {
      toast.error("No valid JSON to download. Please parse first.");
    }
  };

  return (
    <Card className="p-4 max-w-7xl mx-auto mt-10">
      <Toaster position="top-right" />
      <CardHeader>
        <CardTitle className="text-2xl">JSON Formatter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 h-[500px]">
          <div className="flex-1 flex flex-col">
            <Textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Paste your JSON here..."
              className="flex-1 w-full"
            />
          </div>

          <div className="flex flex-col justify-center items-center">
            <Button onClick={handleParse} className="w-32">
              Parse
            </Button>
            <Button onClick={handleFormat} className="mt-4 w-32">
              Format
            </Button>
            <Button onClick={handleDownload} className="mt-4 w-32">
              Download
            </Button>
          </div>

          <div className="flex-1 overflow-auto border p-2 rounded">
            {parsedJson ? (
              <pre className="whitespace-pre-wrap">
                {formatJson(parsedJson)}
              </pre>
            ) : (
              <p className="text-gray-500">
                Formatted JSON will appear here...
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
