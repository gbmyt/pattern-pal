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
      } else if (clickState) {
        target.classList.remove("bg-green-700");
      }
    }
  }
  return (
    <div onClick={handleClick} className="border-solid border-2 w-full">
      p
    </div>
  );
}

export default GridPixel;
