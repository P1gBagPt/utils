"use client";
import { useRef } from "react";

interface HueSliderProps {
  h: number;
  onChange: (h: number) => void;
}

export default function HueSlider({ h, onChange }: HueSliderProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouse = (e: MouseEvent | React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    const newHue = (x / rect.width) * 360;
    onChange(newHue);
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
        background:
          "linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)",
      }}
    >
      <div
        className="absolute h-4 w-1 bg-white"
        style={{
          left: `${(h / 360) * 100}%`,
          transform: "translateX(-50%)",
        }}
      />
    </div>
  );
}
