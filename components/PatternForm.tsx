import { SetStateAction } from "react";
import { useGridContext } from "@/context/GridContext";
import { usePixelIsFilled } from "@/hooks/usePixelFillState";
import Button from "@/components/Button";
import { Pattern } from "@/types/pattern";

function PatternForm({
    pattern,
    setPattern,
}: {
    pattern: Pattern
    setPattern: React.Dispatch<SetStateAction<Pattern>>
}) {
  const { setPixelFillColor, maxGridWidth } = useGridContext();
  const { setPixelIsFilled, removePixelFill } = usePixelIsFilled();

  function handleSubmit(e: React.MouseEvent) {
    e.preventDefault();
    console.log("saving pattern to your account");
  }

  function setPatternState(
    p: Pattern = {
      title: undefined,
      gridWidth: undefined,
      gridHeight: undefined,
    }

    function composePatternObj(p?: Pattern) {
        const heightInput = document.getElementById(
            "gridHeight"
        ) as HTMLInputElement
        const widthInput = document.getElementById(
            "gridWidth"
        ) as HTMLInputElement
        const titleInput = document.getElementById("title") as HTMLInputElement

        if (
            (p?.gridWidth && p.gridWidth > maxGridWidth) ||
            widthInput.valueAsNumber > maxGridWidth
        ) {
            return {
                msg: "Sorry, your pattern is too wide! Try setting a smaller width.",
            }
        }
        return {
            title: p?.title ? p.title : titleInput.value,
            gridWidth: p?.gridWidth
                ? p.gridWidth
                : widthInput.valueAsNumber <= maxGridWidth
                ? widthInput.valueAsNumber
                : null,
            gridHeight: p?.gridHeight
                ? p.gridHeight
                : heightInput.valueAsNumber,
        }
    }

    function setPatternState(
        p: Pattern = {
            title: undefined,
            gridWidth: undefined,
            gridHeight: undefined,
        }
    ) {
        // Get the new pattern state values from user or function args
        const updatedPatternState = composePatternObj(p)
        updatedPatternState.msg && alert(updatedPatternState.msg)

        // Don't update values unless they were explicitly modified
        Object.entries(updatedPatternState).forEach((entry) => {
            if (entry[1]) {
                setPattern((prevState) => ({
                    ...prevState,
                    [entry[0]]: entry[1],
                }))
            }
        })
    }

    function handleResetGrid(e: React.MouseEvent) {
        handleSetGridtoDefault(e)
        handleRemoveGridFill(e)
    }

    function handleSetGridtoDefault(e: React.MouseEvent) {
        e.preventDefault()
        setPatternState({
            title: "",
            gridWidth: 25,
            gridHeight: 25,
        })
    }

    function handleRemoveGridFill(e: React.MouseEvent) {
        e.preventDefault()
        let pixels = document.querySelectorAll(
            ".grid-pixel"
        ) as NodeListOf<HTMLDivElement>

        pixels &&
            pixels.forEach((p) => {
                removePixelFill(p)
                setPixelIsFilled(false)
            })
    }

    function handlePatternFormChange(e: React.FormEvent) {
        const target = e.target as HTMLInputElement
        target &&
            console.log("E Target", target.id, typeof target.valueAsNumber)

        switch (target.id) {
            case "title":
                setPattern((prevState) => ({
                    ...prevState,
                    title: target.value,
                }))
                break
            case "gridHeight":
                setPattern((prevState) => ({
                    ...prevState,
                    gridHeight: target.valueAsNumber,
                }))
                break
            case "gridWidth":
                setPattern((prevState) => ({
                    ...prevState,
                    gridWidth: target.valueAsNumber,
                }))
                break
            case "pixelFillColor":
                setPixelFillColor(target.value)
                break
            default:
                break
        }
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
                        value={pattern.title}
                        onChange={handlePatternFormChange}
                    />

                    <label htmlFor="grid-height">Height</label>
                    <input
                        className="rounded-md w-1/6 m-2"
                        id="gridHeight"
                        type="number"
                        name="height"
                        value={pattern.gridHeight}
                        onChange={handlePatternFormChange}
                        placeholder="Grid Height"
                    />

                    <label htmlFor="grid-width">Width</label>
                    <input
                        className="rounded-md w-1/6 m-2"
                        id="gridWidth"
                        type="number"
                        name="width"
                        value={pattern.gridWidth}
                        onChange={handlePatternFormChange}
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
                        value={pixelFillColor}
                        onChange={handlePatternFormChange}
                    />
                </div>
            </>

            <div className="m-4 ml-0">
                <Button handleClick={handleResetGrid} buttonText="Reset Grid" />
                <Button
                    handleClick={handleRemoveGridFill}
                    buttonText="Remove Pixel Fill"
                />
                <Button
                    handleClick={handleSetGridtoDefault}
                    buttonText="Reset Size"
                />
                <Button handleClick={handleSubmit} buttonText="Save Pattern" />
            </div>
        </form>
    )
}

export default PatternForm
