import Button from "@/components/Button";

// todos
// allow user to create their own grid with custom size
// allow user to name the pattern and save to their account

// center the grid and add styles

// add a paint dropper tool
// allow selecting color with hex code/manually

// allow click to fill a pixel
// allow draggin to fill multiple pixels on the grid
function Grid({ children }: { children: JSX.Element[] }) {
  // TODO: split grid into rows and cols

  function handleResetGrid(e: React.MouseEvent) {
    e.preventDefault();
    const target = e.target as HTMLInputElement;

    let pixels = document.querySelectorAll(".grid-pixel");
    pixels &&
      pixels.forEach((p) => {
        p.classList.remove("bg-green-700");
        p.classList.remove("text-green-700");
        p.classList.add("text-white");
      });
  }

  return (
    <>
      <div className="flex justify-center">
        <div className=" border-solid border-2 grid grid-cols-12">
          {children}
        </div>
        <Button handleClick={handleResetGrid} buttonText="Reset Grid" />
      </div>
    </>
  );
}

export default Grid;
