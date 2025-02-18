export function parseJson(json: string): JSON {
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

export const sortJson = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(sortJson);
  } else if (value !== null && typeof value === "object") {
    const sortedObj: Record<string, unknown> = {};
    Object.keys(value as Record<string, unknown>)
      .sort()
      .forEach((key) => {
        sortedObj[key] = sortJson((value as Record<string, unknown>)[key]);
      });
    return sortedObj;
  }
  return value;
};
