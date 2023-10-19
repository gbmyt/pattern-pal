"use client"
import { useGridContext } from "@/context/GridContext"
import { usePixelIsFilled } from "@/hooks/usePixelFillState"

function GridPixel({
    filled,
    fillColor,
    position,
}: {
    filled?: boolean
    fillColor?: string
    position: string
}) {
    const { pixelIsFilled, setPixelIsFilled, fillGridPixel, removePixelFill } =
        usePixelIsFilled()
    const { pattern, setPattern, pixelFillColor, mouseIsDown } =
        useGridContext()

    // TODOs:
    // Allow User to set custom pixel size
    // Should the second click to a pixel reset its fill state to false and clear its color? Or change its color to the current pixelFillColor?
    function handleClick(e: React.MouseEvent) {
        const target = e.target as HTMLDivElement
        var pixelsArray = pattern.pixels && JSON.parse(pattern.pixels)
        var gridPosition =
            pixelsArray[position.split(",")[0]][position.split(",")[1].trim()]

        if (target) {
            // update the array with new fill state/color
            pixelsArray[position.split(",")[0]][position.split(",")[1].trim()] =
                !gridPosition ? pixelFillColor : null

            if (!pixelIsFilled) {
                setPixelIsFilled(true)
                fillGridPixel(target)
            } else if (pixelIsFilled) {
                setPixelIsFilled(false)
                removePixelFill(target)
            }

            setPattern((prevState) => ({
                ...prevState,
                pixels: JSON.stringify(pixelsArray),
            }))
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
