"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  hexToRgb,
  rgbToHexWithAlpha,
  hsvToRgb,
  rgbToHsv,
} from "@/services/hexPickerService";
import SaturationValuePicker from "@/components/HexPicker/SaturationValuePicker";
import HueSlider from "@/components/HexPicker/HueSlider";
import AlphaSlider from "@/components/HexPicker/AlphaSlider";

export default function HexPickerPage() {
  const [color, setColor] = useState({
    h: 0,
    s: 0,
    v: 1,
    a: 1,
  });
  const [inputHex, setInputHex] = useState(() => {
    const { r, g, b } = hsvToRgb(0, 0, 1);
    return rgbToHexWithAlpha(r, g, b, 1);
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const { r, g, b } = hsvToRgb(color.h, color.s, color.v);
    setInputHex(rgbToHexWithAlpha(r, g, b, color.a));
  }, [color]);

  const handleSaturationChange = (newS: number, newV: number) => {
    setColor((prev) => ({ ...prev, s: newS, v: newV }));
  };

  const handleHueChange = (newHue: number) => {
    setColor((prev) => ({ ...prev, h: newHue }));
  };

  const handleAlphaChange = (newAlpha: number) => {
    setColor((prev) => ({ ...prev, a: newAlpha }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputHex(e.target.value);
  };

  const handleInputBlur = () => {
    const rgb = hexToRgb(inputHex);
    if (rgb) {
      const { r, g, b, a } = rgb;
      const { h, s, v } = rgbToHsv(r, g, b);
      setColor({ h, s, v, a });
    } else {
      const { r, g, b } = hsvToRgb(color.h, color.s, color.v);
      setInputHex(rgbToHexWithAlpha(r, g, b, color.a));
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inputHex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const { r, g, b } = hsvToRgb(color.h, color.s, color.v);
  const previewColor = `rgba(${r}, ${g}, ${b}, ${color.a})`;

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Hex Color Picker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <SaturationValuePicker
              h={color.h}
              s={color.s}
              v={color.v}
              onChange={handleSaturationChange}
            />
            <HueSlider h={color.h} onChange={handleHueChange} />
            <AlphaSlider
              color={{ h: color.h, s: color.s, v: color.v }}
              a={color.a}
              onChange={handleAlphaChange}
            />
            <div>
              <Label
                htmlFor="hex-input"
                className="block text-sm font-medium text-gray-700"
              >
                Hex Color
              </Label>
              <div className="relative mt-1">
                <Input
                  id="hex-input"
                  value={inputHex}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder="#ffffff"
                  className="block w-full pr-20"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-500"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Preview
              </Label>
              <div
                className="mt-1 h-16 w-full rounded-md border border-gray-300"
                style={{ backgroundColor: previewColor }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
