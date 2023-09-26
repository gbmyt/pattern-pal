import { useState } from "react";

// TODO: Look into using canvas instead of React/JS + event listeners
// https://stackoverflow.com/questions/28284754/dragging-shapes-using-mouse-after-creating-them-with-html5-canvas

// TODO remove hard-coded pixel fill color (set up color vars - tailwind config)
function GridPixel({ mouseIsDown }: { mouseIsDown: boolean }) {
  const [pixelIsFilled, setPixelFillState] = useState(false);

  function setPixelFillColor(pixel: HTMLInputElement, color: string) {
    pixel.classList.add(color);
  }

  function resetPixelFillColor(pixel: HTMLInputElement, color: string) {
    pixel.classList.remove("bg-green-700");
  }

  function handleClick(e: React.MouseEvent) {
    const target = e.target as HTMLInputElement;

    if (target) {
      setPixelFillState(!pixelIsFilled);

      if (!pixelIsFilled) {
        setPixelFillColor(target, "bg-green-700");
      } else if (pixelIsFilled) {
        resetPixelFillColor(target, "bg-green-700");
      }

      target.addEventListener("mouseenter", function () {
        if (mouseIsDown) {
          setPixelFillColor(target, "bg-green-700");
        }
      });
    }
  }

  function handleClickandDrag(e: React.MouseEvent) {
    const target = e.target as HTMLInputElement;

    if (target) {
      target.addEventListener("mouseenter", function () {
        if (mouseIsDown) {
          setPixelFillColor(target, "bg-green-700");
        }
      });
    }
  }

  return (
    <div
      onMouseDown={handleClick}
      onMouseEnter={handleClickandDrag}
      className="grid-pixel text-white border-solid border-y border-x w-4 h-4 p-4"
    ></div>
  );
}

export default GridPixel;
