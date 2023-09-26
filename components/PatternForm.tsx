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
    <form>
      <div className="border-solid border-2">
        <label htmlFor="title"></label>
        <input type="text" name="title" placeholder="Title" />

        <label htmlFor="grid-width"></label>
        <input type="text" name="size" placeholder="Grid Width" />

        <label htmlFor="grid-height"></label>
        <input type="text" name="size" placeholder="Grid Height" />

        <Button handleClick={handleUpdateGrid} buttonText="Update Grid" />
      </div>
      <Button
        handleClick={handleSubmit}
        buttonText="Save Pattern to your Account"
      />
      <Button handleClick={handleResetGrid} buttonText="Reset Grid" />
    </form>
  );
}

export default PatternForm;
