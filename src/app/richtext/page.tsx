"use client";

import NavbarComponent from "@/components/navbar/page";
import { useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import "react-markdown-editor-lite/lib/index.css";

export default function RichTextPage() {
  const [markdown, setMarkdown] = useState<string>("");
  const mdParser = new MarkdownIt();

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
  };

  return (
    <>
      <NavbarComponent />
      <div className="max-w-7xl mx-auto mt-10 justify-center gap-4 p-4">
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">Markdown Editor</h2>
          <MdEditor
            value={markdown}
            style={{ height: "400px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={({ text }) => setMarkdown(text)}
          />
          <Button className="mt-2" onClick={handleCopy}>
            <Copy className="w-4 h-4 mr-2" /> Copy Markdown
          </Button>
        </Card>
      </div>
    </>
  );
}
