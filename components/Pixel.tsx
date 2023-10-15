"use client";
import { usePixelIsFilled } from "@/hooks/usePixelFillState";

function GridPixel({ mouseIsDown }: { mouseIsDown: boolean }) {
  const { pixelIsFilled, setPixelIsFilled, fillGridPixel, removePixelFill } =
    usePixelIsFilled();

  function handleClick(e: React.MouseEvent) {
    const target = e.target as HTMLDivElement;

    if (target) {
      if (!pixelIsFilled) {
        setPixelIsFilled(true);
        fillGridPixel(target);
      } else if (pixelIsFilled) {
        setPixelIsFilled(false);
        removePixelFill(target);
      }
    }
  }

  function handleClickandDrag(e: React.MouseEvent) {
    const target = e.target as HTMLInputElement;

    if (target) {
      if (mouseIsDown) {
        setPixelIsFilled(true);
        fillGridPixel(target);
      }
    }
  }

  return (
    <div
      onMouseDown={handleClick}
      onMouseEnter={handleClickandDrag}
      className="grid-pixel border-solid border-y border-x w-4 h-4 p-2"
    ></div>
  );
}

export default GridPixel;
