// services/jsonService.ts

export function parseJson(json: string): JSON {
  // This will throw if the JSON is invalid.
  return JSON.parse(json);
}

export function formatJson(json: JSON, indent: number = 2): string {
  return JSON.stringify(json, null, indent);
}

export function downloadJson(
  json: JSON,
  fileName: string = "formatted.json"
): void {
  const formatted = formatJson(json);
  const blob = new Blob([formatted], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
