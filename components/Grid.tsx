import Button from "@/components/Button";
import GridPixel from "@/components/Pixel";

// todos
// allow user to create their own grid with custom size
// allow user to name the pattern and save to their account

// center the grid and add styles

// add a paint dropper tool
// allow selecting color with hex code/manually

// allow click to fill a pixel
// allow draggin to fill multiple pixels on the grid
function Grid({ height, width }: { height?: number; width?: number }) {
  // TODO
  // split into rows and cols
  const pixels = height && width && Array(height * width).fill(height * width);

  // TODO
  // Reset form to default color on click
  function handleResetGrid(e: React.MouseEvent) {
    e.preventDefault();
    console.log("Resetting the grid");
    const target = e.target as HTMLInputElement;

    // target &&
    // for pixel in pixels remove classes:
    //  - bg-green-700
    //  - text-green-700
    // add class text-white
  }
  return (
    <>
      <div className="flex justify-center">
        <div className=" border-solid border-2 grid grid-cols-12">
          {pixels && pixels.map((p, i) => <GridPixel key={i} />)}
        </div>
        <Button handleClick={handleResetGrid} buttonText="Reset Grid" />
      </div>
    </>
  );
}

export default Grid;
