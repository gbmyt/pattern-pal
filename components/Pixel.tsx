import { useState } from "react";

function GridPixel() {
  const [clickState, setClickState] = useState(false);

  function handleClick(e: React.MouseEvent) {
    const target = e.target as HTMLInputElement;

    if (target) {
      // TODO remove hard-coded pixel fill color
      setClickState(!clickState);
      if (!clickState) {
        target.classList.add("bg-green-700");
        target.classList.remove("text-white");
        target.classList.add("text-green-700");
      } else if (clickState) {
        target.classList.remove("bg-green-700");
        target.classList.remove("text-green-700");
        target.classList.add("text-white");
      }
    }
  }
  return (
    <div
      onClick={handleClick}
      className="grid-pixel text-white border-solid border-y border-x w-4 h-4 p-4"
    ></div>
  );
}

export default GridPixel;
