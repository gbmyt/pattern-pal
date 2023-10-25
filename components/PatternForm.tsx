import { useGridContext } from "@/context/GridContext"
import { usePixelIsFilled } from "@/hooks/usePixelFillState"
import Button from "@/components/Button"

import { createNewPattern } from "@/lib/api"

function PatternForm() {
    const {
        pattern,
        setPattern,
        pixelFillColor,
        setPixelFillColor,
        renderEmptyGrid,
        maxGridWidth,
    } = useGridContext()
    const { setPixelIsFilled, removePixelFill } = usePixelIsFilled()

    async function handleSubmit(e: React.MouseEvent) {
        e.preventDefault()
        try {
            var dbSaveResult = await createNewPattern(pattern)
        } catch (e) {
            console.log(
                "There was a problem saving your pattern to the database, please try again.",
                e
            )
            throw new Error("Pattern couldn't be saved.")
        }
    }

    function handleResetGridToDefault(e: React.MouseEvent) {
        handleResetGridSize(e)
        handleRemoveGridFill(e)
    }

    function handleResetGridSize(e: React.MouseEvent) {
        e.preventDefault()
        renderEmptyGrid()
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
                    pixels: JSON.stringify(
                        new Array(pattern.gridWidth || 0).fill(
                            new Array(
                                (target && target.valueAsNumber) ||
                                    (pattern && pattern.gridHeight) ||
                                    0
                            ).fill(null)
                        )
                    ),
                }))
                break
            case "gridWidth":
                if (target.valueAsNumber > maxGridWidth) {
                    alert(
                        "Sorry, your pattern is too wide! Try setting a smaller width."
                    )
                } else {
                    setPattern((prevState) => ({
                        ...prevState,
                        gridWidth: target.valueAsNumber,
                        pixels: JSON.stringify(
                            new Array(
                                (target && target.valueAsNumber) ||
                                    (pattern && pattern.gridWidth) ||
                                    0
                            ).fill(
                                new Array(
                                    (pattern && pattern.gridHeight) || 0
                                ).fill(null)
                            )
                        ),
                    }))
                }
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
                        aria-label="title"
                        placeholder="Title"
                        value={pattern.title}
                        onChange={handlePatternFormChange}
                    />

                    <label htmlFor="grid-height">Height</label>
                    <input
                        className="rounded-md w-1/6 m-2"
                        id="gridHeight"
                        type="number"
                        aria-label="height"
                        value={pattern.gridHeight}
                        onChange={handlePatternFormChange}
                        placeholder="Grid Height"
                    />

                    <label htmlFor="grid-width">Width</label>
                    <input
                        className="rounded-md w-1/6 m-2"
                        id="gridWidth"
                        type="number"
                        aria-label="width"
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
                        aria-label="pixelFillColor"
                        placeholder="#FFFFFF"
                        value={pixelFillColor}
                        onChange={handlePatternFormChange}
                    />
                </div>
            </>

            <div className="m-4 ml-0">
                <Button
                    handleClick={handleResetGridToDefault}
                    buttonText="Reset Grid"
                />
                <Button
                    handleClick={handleRemoveGridFill}
                    buttonText="Remove Pixel Fill"
                />
                <Button
                    handleClick={handleResetGridSize}
                    buttonText="Reset Size"
                />
                <Button handleClick={handleSubmit} buttonText="Save Pattern" />
            </div>
        </form>
    )
}

export default PatternForm
