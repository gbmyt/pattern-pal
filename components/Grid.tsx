import { useState } from "react";
import GridPixel from "@/components/Pixel";

// allow user to name the pattern and save to their account
function Grid({ height, width }: { height?: number; width?: number }) {
  const [mouseIsDown, setMouseDownState] = useState(false);

  var pixels: JSX.Element[][] = new Array(height).fill(
    new Array(width).fill(<GridPixel mouseIsDown={mouseIsDown} />)
  );

  pixels?.forEach((p) => {
    for (var i = 0; i < p.length; i++) {
      p[i] = <GridPixel mouseIsDown={mouseIsDown} key={i} />;
    }
  });

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
        <div
          style={{ gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))` }}
          className=" border-solid border-2 grid"
        >
          {pixels && pixels}
        </div>
      </div>
    </div>
  );
}

export default Grid;
