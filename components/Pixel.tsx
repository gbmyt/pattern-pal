"use client"
import { useGridContext } from "@/context/GridContext"
import { usePixelIsFilled } from "@/hooks/usePixelFillState"

function GridPixel({
    filled,
    fillColor,
    position,
}: {
    filled?: boolean
    fillColor?: string
    position: string
}) {
    const { pixelIsFilled, setPixelIsFilled, fillGridPixel, removePixelFill } =
        usePixelIsFilled()
    const {
        chart,
        pixelFillColor,
        mouseIsDown,
        setMouseDownState,
        fillWhenDragged,
        setFillOnDrag,
        editorFillMode,
        pixelSizeInPixels,
    } = useGridContext()

    function handleFillGridPixel(e: React.MouseEvent) {
        const target = e.target as HTMLDivElement

        // Implementation TODO:
        // Hold down cmd + click/drag to erase when in paint mode, to paint when in erase mode,
        // and to select a block of pixels when in copy/paste mode
        if (target) {
            try {
                switch (editorFillMode) {
                    case "Paint":
                        setMouseDownState(true)
                        setFillOnDrag(true)

                        setPixelIsFilled(true)
                        fillGridPixel(
                            target,
                            JSON.parse(chart.pixels),
                            position
                        )
                        break
                    case "Erase":
                        // console.log("erase fill mode")
                        setMouseDownState(true)
                        setFillOnDrag(true)

                        setPixelIsFilled(false)
                        removePixelFill(
                            target,
                            JSON.parse(chart.pixels),
                            position
                        )
                        break
                    case "Symbol":
                        console.log("symbol fill mode")
                        // IMPLEMENTATION TODO
                        break
                    case "Paste":
                        console.log("paste fill mode")
                        // IMPLEMENTATION TODO
                        break
                }
            } catch (e) {
                console.log("problem filling grid pixel")
            }
        }
    }

    function handleClickandDrag(e: React.MouseEvent) {
        const target = e.target as HTMLDivElement

        if (target && mouseIsDown) {
            if (fillWhenDragged && editorFillMode === "Paint") {
                setPixelIsFilled(true)
                fillGridPixel(target, JSON.parse(chart.pixels), position)
            } else if (fillWhenDragged && editorFillMode === "Erase") {
                setPixelIsFilled(false)
                removePixelFill(target, JSON.parse(chart.pixels), position)
            } else {
                console.log("there was a problem with drag to fill")
            }
        }
    }

    const fill = !filled ? undefined : fillColor ? fillColor : pixelFillColor
    return (
        <div
            onMouseDown={handleFillGridPixel}
            onMouseEnter={handleClickandDrag}
            onMouseUp={() => {
                setFillOnDrag(false)
                setMouseDownState(false)
            }}
            style={{
                backgroundColor: fill,
                width: `${pixelSizeInPixels}px`,
                height: `${pixelSizeInPixels}px`,
            }}
            className={`grid-pixel border-solid border-y border-x p-2`}
        ></div>
    )
}

export default GridPixel
