"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch"; // Import Switch
import toast, { Toaster } from "react-hot-toast";
import {
  parseJson,
  formatJson,
  downloadJson,
  sortJson,
} from "@/services/jsonService";
import ReactJson from "react-json-view";
import { Copy, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";

export default function JsonFormatterPage() {
  const [jsonInput, setJsonInput] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [parsedJson, setParsedJson] = useState<any>(null);
  const [collapseState, setCollapseState] = useState<number | boolean>(false);
  const [jsonKey, setJsonKey] = useState(0);
  const [autoParseEnabled, setAutoParseEnabled] = useState(false);

  const handleParse = () => {
    try {
      const parsed = parseJson(jsonInput);
      setParsedJson(parsed);
      setJsonKey((prev) => prev + 1);
      toast.success("Successfully parsed JSON!");
    } catch (e: unknown) {
      toast.error(`Error parsing JSON: ${e}`);
      setParsedJson(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
    if (autoParseEnabled) {
      try {
        const parsed = parseJson(e.target.value);
        setParsedJson(parsed);
        setJsonKey((prev) => prev + 1);
      } catch {
        setParsedJson(null);
      }
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

  const handleOrganize = () => {
    if (parsedJson !== null) {
      const organized = sortJson(parsedJson);
      setParsedJson(organized);
      setJsonKey((prev) => prev + 1);
      toast.success("JSON organized successfully!");
    } else {
      toast.error("No valid JSON to organize.");
    }
  };

  const handleCopy = () => {
    if (parsedJson !== null) {
      navigator.clipboard.writeText(formatJson(parsedJson));
      toast.success("JSON copied to clipboard!");
    } else {
      toast.error("No valid JSON to copy.");
    }
  };

  const handleCollapseAll = () => {
    setCollapseState(true);
    setJsonKey((prev) => prev + 1);
  };

  const handleExpandAll = () => {
    setCollapseState(false);
    setJsonKey((prev) => prev + 1);
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
              onChange={handleInputChange}
              placeholder="Paste your JSON here..."
              className="flex-1 w-full"
            />
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className="flex items-center gap-4 justify-between mb-2">
              <span className="text-sm font-medium">Auto-Parse</span>
              <Switch
                checked={autoParseEnabled}
                onCheckedChange={(checked) => setAutoParseEnabled(checked)}
              />
            </div>
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

          <div className="flex-1 overflow-auto border p-2 rounded relative">
            {parsedJson ? (
              <>
                <div className="sticky top-0 left-0 right-0 bg-white flex w-full flex-wrap md:flex-nowrap justify-center md:justify-end gap-2 p-2 border-b z-10 shadow-md overflow-x-auto">
                  <Button
                    variant="ghost"
                    onClick={handleCollapseAll}
                    className="whitespace-nowrap"
                  >
                    <ChevronUp className="h-4 w-4" />
                    <span className="hidden md:inline ml-1">Collapse All</span>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleExpandAll}
                    className="whitespace-nowrap"
                  >
                    <ChevronDown className="h-4 w-4" />
                    <span className="hidden md:inline ml-1">Expand All</span>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleOrganize}
                    className="whitespace-nowrap"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span className="hidden md:inline ml-1">Organize</span>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleCopy}
                    className="whitespace-nowrap"
                  >
                    <Copy className="h-4 w-4" />
                    <span className="hidden md:inline ml-1">Copy</span>
                  </Button>
                </div>

                <div className="mt-6">
                  <ReactJson
                    key={jsonKey}
                    src={parsedJson}
                    collapsed={collapseState}
                    name={false}
                    enableClipboard={false}
                    displayDataTypes={false}
                    indentWidth={2}
                  />
                </div>
              </>
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
