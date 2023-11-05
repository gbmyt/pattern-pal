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
        pattern,
        pixelFillColor,
        mouseIsDown,
        fillWhenDragged,
        setFillOnDrag,
    } = useGridContext()

    function handleClick(e: React.MouseEvent) {
        const target = e.target as HTMLDivElement

        if (target) {
            if (!pixelIsFilled) {
                setPixelIsFilled(true)
                fillGridPixel(target, JSON.parse(pattern.pixels), position)
                setFillOnDrag(true)
            } else if (pixelIsFilled) {
                setPixelIsFilled(false)
                removePixelFill(target, JSON.parse(pattern.pixels), position)
            }
        }
    }

    function handleClickandDrag(e: React.MouseEvent) {
        const target = e.target as HTMLDivElement

        if (target && mouseIsDown) {
            if (fillWhenDragged) {
                setPixelIsFilled(true)
                fillGridPixel(target, JSON.parse(pattern.pixels), position)
            } else {
                setPixelIsFilled(false)
                removePixelFill(target, JSON.parse(pattern.pixels), position)
            }
        }
    }

    const fill = !filled ? undefined : fillColor ? fillColor : pixelFillColor
    return (
        <div
            onMouseDown={handleClick}
            onMouseEnter={handleClickandDrag}
            style={{
                backgroundColor: fill,
            }}
            className="grid-pixel border-solid border-y border-x w-4 h-4 p-2"
        ></div>
    )
}

export default GridPixel
