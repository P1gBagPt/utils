"use client";
import { useRef } from "react";

interface SaturationValuePickerProps {
  h: number;
  s: number;
  v: number;
  onChange: (s: number, v: number) => void;
}

export default function SaturationValuePicker({
  h,
  s,
  v,
  onChange,
}: SaturationValuePickerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouse = (e: MouseEvent | React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    x = Math.max(0, Math.min(x, rect.width));
    y = Math.max(0, Math.min(y, rect.height));
    const newS = x / rect.width;
    const newV = 1 - y / rect.height;
    onChange(newS, newV);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleMouse(e);
    const handleMove = (e: MouseEvent) => handleMouse(e);
    const handleUp = () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
  };

  return (
    <div
      ref={ref}
      onMouseDown={handleMouseDown}
      className="relative w-full h-64 rounded cursor-crosshair"
      style={{ background: `hsl(${h}, 100%, 50%)` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      <div
        className="absolute w-4 h-4 rounded-full border-2 border-white shadow"
        style={{
          left: `${s * 100}%`,
          top: `${(1 - v) * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}
