import { usePixelIsFilled } from "@/hooks/usePixelFillState";

// TODO: Look into using canvas instead of React/JS + event listeners
// https://stackoverflow.com/questions/28284754/dragging-shapes-using-mouse-after-creating-them-with-html5-canvas

// TODO remove hard-coded pixel fill color (set up color vars - tailwind config)
function GridPixel({ mouseIsDown }: { mouseIsDown: boolean }) {
  const {
    pixelIsFilled,
    setPixelIsFilled,
    setPixelFillColor,
    resetPixelFillColor,
  } = usePixelIsFilled();

  function handleClick(e: React.MouseEvent) {
    const target = e.target as HTMLInputElement;

    if (target) {
      if (!pixelIsFilled) {
        setPixelIsFilled(true);
        setPixelFillColor(target, "bg-green-700");
      } else if (pixelIsFilled) {
        setPixelIsFilled(false);
        resetPixelFillColor(target, "bg-green-700");
      }
    }
  }

  function handleClickandDrag(e: React.MouseEvent) {
    const target = e.target as HTMLInputElement;

    if (target) {
      if (mouseIsDown) {
        setPixelIsFilled(true);
        setPixelFillColor(target, "bg-green-700");
      }
    }
  }

  return (
    <div
      onMouseDown={handleClick}
      onMouseEnter={handleClickandDrag}
      className="grid-pixel border-solid border-y border-x w-4 h-4 p-3"
    ></div>
  );
}

export default GridPixel;
