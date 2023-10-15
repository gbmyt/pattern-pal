import { SetStateAction } from "react";
import { useGridContext } from "@/context/GridContext";
import { usePixelIsFilled } from "@/hooks/usePixelFillState";
import Button from "@/components/Button";
import { Pattern } from "@/types/pattern";

function PatternForm({
  pattern,
  setPattern,
}: {
  pattern: Pattern;
  setPattern: React.Dispatch<SetStateAction<Pattern>>;
}) {
  const { setPixelFillColor } = useGridContext();
  const { setPixelIsFilled, removePixelFill } = usePixelIsFilled();

  function handleSubmit(e: React.MouseEvent) {
    e.preventDefault();
    console.log("saving pattern to your account");
  }

  function handleUpdateGrid(e: React.MouseEvent) {
    e.preventDefault();

    const height = document.getElementById("height") as HTMLInputElement;
    const width = document.getElementById("width") as HTMLInputElement;
    const title = document.getElementById("title") as HTMLInputElement;
    const updatedPixelFillColor = document.getElementById(
      "pixelFillColor"
    ) as HTMLInputElement;

    const updatedPatternState = {
      title: title.value,
      gridWidth: width.valueAsNumber,
      gridHeight: height.valueAsNumber,
    };

    try {
      setPixelFillColor(updatedPixelFillColor.value);

      Object.entries(updatedPatternState).forEach((entry) => {
        if (entry[1]) {
          setPattern((prevState) => ({
            ...prevState,
            [entry[0]]: entry[1],
          }));
        }
      });
    } catch (e) {
      console.log("Error updating the grid", e);
      throw new Error();
    }
  }

  function handleResetGrid(e: React.MouseEvent) {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;

    let pixels = document.querySelectorAll(
      ".grid-pixel"
    ) as NodeListOf<HTMLDivElement>;
    pixels &&
      pixels.forEach((p) => {
        removePixelFill(p);
        setPixelIsFilled(false);
      });
  }

  return (
    <form className="flex flex-col justify-between w-3/4 my-4">
      <>
        <div>
          <label htmlFor="title">Title</label>
          <input
            className="rounded-md w-1/4 m-2"
            id="title"
            type="text"
            name="title"
            placeholder="Title"
          />

          <label htmlFor="grid-height">Height</label>
          <input
            className="rounded-md w-1/6 m-2"
            id="height"
            type="number"
            name="height"
            placeholder="Grid Height"
          />

          <label htmlFor="grid-width">Width</label>
          <input
            className="rounded-md w-1/6 m-2"
            id="width"
            type="number"
            name="width"
            placeholder="Grid Width"
          />
        </div>

        <div>
          <label htmlFor="pixelFillColor"> Color</label>
          <input
            className="rounded-md w-1/6 m-2"
            id="pixelFillColor"
            type="text"
            name="pixelFillColor"
            placeholder="#FFFFFF"
          />
        </div>
      </>

      <div className="m-4 ml-0">
        <Button handleClick={handleUpdateGrid} buttonText="Save Changes" />
        <Button handleClick={handleResetGrid} buttonText="Reset Grid" />
        <Button handleClick={handleSubmit} buttonText="Save Pattern" />
      </div>
    </form>
  );
}

export default PatternForm;
