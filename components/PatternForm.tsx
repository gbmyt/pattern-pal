import { Pattern } from "@/types/pattern";
import { SetStateAction, useEffect } from "react";

function PatternForm({
  pattern,
  setPattern,
}: {
  pattern: Pattern;
  setPattern: React.Dispatch<SetStateAction<Pattern>>;
}) {
  const handleSubmit: () => void = function handleSubmit() {
    console.log("saving pattern to your account");
  };

  const handleSave: (e: React.MouseEvent) => void = function handleSave(
    e: React.MouseEvent
  ) {
    e.preventDefault();
    console.log("saving pattern changes");
    const target = e.target as HTMLInputElement;

    target &&
      setPattern((prevState) => ({
        ...prevState,
        [target.id]: target.value,
      }));
  };

  useEffect(() => {
    pattern && console.log(pattern);
  }, [pattern, setPattern]);

  return (
    <form>
      <div className="border-solid border-2">
        <label htmlFor="title"></label>
        <input type="text" name="title" placeholder="Title" />

        <label htmlFor="grid-width"></label>
        <input type="text" name="size" placeholder="Grid Width" />

        <label htmlFor="grid-height"></label>
        <input type="text" name="size" placeholder="Grid Height" />
        <button onClick={handleSave} type="submit">
          Update Grid
        </button>
      </div>

      <button onClick={handleSubmit} type="submit">
        Save Pattern to your Account
      </button>
    </form>
  );
}

export default PatternForm;
