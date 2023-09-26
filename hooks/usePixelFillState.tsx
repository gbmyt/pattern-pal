import { useState } from "react";

export function usePixelIsFilled() {
  const [pixelIsFilled, setPixelIsFilled] = useState(false);

  function setPixelFillColor(pixel: Element, color: string) {
    pixel.classList.add(color);
  }

  function resetPixelFillColor(pixel: Element, color: string) {
    pixel.classList.remove("bg-green-700");
  }

  return {
    pixelIsFilled,
    setPixelIsFilled,
    setPixelFillColor,
    resetPixelFillColor,
  };
}
