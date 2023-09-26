// TODO
// allow user to create their own grid with custom size
// allow user to name the pattern and save to their account

// center the grid and add styles

// add a paint dropper tool
// allow selecting color with hex code/manually

// allow dragging to fill multiple pixels on the grid
function Grid({ children }: { children: JSX.Element[] }) {
  // TODO: split grid into rows and cols

  return (
    <>
      <div className="flex justify-center">
        <div className=" border-solid border-2 grid grid-cols-12">
          {children}
        </div>
      </div>
    </>
  );
}

export default Grid;
