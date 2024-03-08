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
        fillWhenDragged,
        setFillOnDrag,
        editorFillMode,
    } = useGridContext()

    function handleGridPixelClick(e: React.MouseEvent) {
        const target = e.target as HTMLDivElement

        // Implementation TODO:
        // Hold down cmd + click/drag to erase when in paint mode, to paint when in erase mode,
        // and to select a block of pixels when in copy/paste mode
        if (target) {
            try {
                switch (editorFillMode) {
                    case "Paint":
                        setFillOnDrag(true)
                        setPixelIsFilled(true)
                        fillGridPixel(
                            target,
                            JSON.parse(chart.pixels),
                            position
                        )
                        break
                    case "Erase":
                        console.log("erase fill mode")
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
            if (fillWhenDragged) {
                setPixelIsFilled(true)
                fillGridPixel(target, JSON.parse(chart.pixels), position)
            } else {
                setPixelIsFilled(false)
                removePixelFill(target, JSON.parse(chart.pixels), position)
            }
        }
    }

    const fill = !filled ? undefined : fillColor ? fillColor : pixelFillColor
    return (
        <div
            onMouseDown={handleGridPixelClick}
            onMouseEnter={handleClickandDrag}
            style={{
                backgroundColor: fill,
            }}
            className="grid-pixel border-solid border-y border-x w-4 h-4 p-2"
        ></div> // Custom pixel size TODO
    )
}

export default GridPixel
