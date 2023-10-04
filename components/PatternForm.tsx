import { SetStateAction } from "react";
import { Pattern } from "@/types/pattern";
import { usePixelIsFilled } from "@/hooks/usePixelFillState";

import Button from "@/components/Button";

function PatternForm({
  pattern,
  setPattern,
}: {
  pattern: Pattern;
  setPattern: React.Dispatch<SetStateAction<Pattern>>;
}) {
  const {
    pixelIsFilled,
    setPixelIsFilled,
    setPixelFillColor,
    resetPixelFillColor,
  } = usePixelIsFilled();

  function handleSubmit(e: React.MouseEvent) {
    e.preventDefault();
    console.log("saving pattern to your account");
  }

  function handleUpdateGrid(e: React.MouseEvent) {
    e.preventDefault();
    console.log("Updating Grid State");
    const target = e.target as HTMLInputElement;

    target &&
      setPattern((prevState) => ({
        ...prevState,
        [target.id]: target.value,
      }));
  }

  function handleResetGrid(e: React.MouseEvent) {
    e.preventDefault();
    const target = e.target as HTMLInputElement;

    let pixels = document.querySelectorAll(".grid-pixel");
    pixels &&
      pixels.forEach((p) => {
        resetPixelFillColor(p, "bg-green-700");
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
            type="text"
            name="title"
            placeholder="Title"
          />

          <label htmlFor="grid-height">Height</label>
          <input
            className="rounded-md w-1/6 m-2"
            type="text"
            name="size"
            placeholder="Grid Height"
          />

          <label htmlFor="grid-width">Width</label>
          <input
            className="rounded-md w-1/6 m-2"
            type="text"
            name="size"
            placeholder="Grid Width"
          />
        </div>

        <div>
          <label htmlFor="grid-width">Pixel Fill Color</label>
          <input
            className="rounded-md w-1/6 m-2"
            type="text"
            name="size"
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
