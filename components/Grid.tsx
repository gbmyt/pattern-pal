import { useState } from "react";
import GridPixel from "@/components/Pixel";
import Button from "./Button";

// TODO
// allow user to create their own grid with custom size
// allow user to name the pattern and save to their account

// center the grid and add styles

// add a paint dropper tool
// allow selecting color with hex code/manually

// split grid into rows and cols
function Grid({ height, width }: { height?: number; width?: number }) {
  const [mouseIsDown, setMouseDownState] = useState(false);

  const pixels =
    height && width && new Array(height * width).fill(height * width);

  function handleClick(e: React.MouseEvent) {
    const target = e.target as HTMLInputElement;

    if (target) {
      target.addEventListener("mousedown", function () {
        setMouseDownState(true);
      });

      target.addEventListener("mouseup", function () {
        setMouseDownState(false);
      });
    }
  }

  return (
    <div onClick={handleClick}>
      <div className="flex justify-center">
        <div className=" border-solid border-2 grid grid-cols-12">
          {pixels &&
            pixels.map((p, i) => (
              <GridPixel mouseIsDown={mouseIsDown} key={i} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Grid;
