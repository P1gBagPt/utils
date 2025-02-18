"use client";
import { useRef } from "react";
import { hsvToRgb } from "@/services/hexPickerService";

interface AlphaSliderProps {
  color: { h: number; s: number; v: number };
  a: number;
  onChange: (a: number) => void;
}

export default function AlphaSlider({ color, a, onChange }: AlphaSliderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { r, g, b } = hsvToRgb(color.h, color.s, color.v);

  const handleMouse = (e: MouseEvent | React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    const newAlpha = x / rect.width;
    onChange(newAlpha);
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
      className="relative h-4 w-full rounded cursor-pointer"
      style={{
        background: `linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0), rgba(${r}, ${g}, ${b}, 1))`,
      }}
    >
      <div
        className="absolute h-4 w-1 bg-white"
        style={{
          left: `${a * 100}%`,
          transform: "translateX(-50%)",
        }}
      />
    </div>
  );
}
