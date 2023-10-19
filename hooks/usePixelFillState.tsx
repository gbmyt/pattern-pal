import { useGridContext } from "@/context/GridContext"
import { useState } from "react"

export function usePixelIsFilled() {
    const [pixelIsFilled, setPixelIsFilled] = useState(false)
    const { pixelFillColor } = useGridContext()

    function fillGridPixel(pixel: HTMLDivElement) {
        pixel.style.backgroundColor = ""
        pixel.style.backgroundColor = pixelFillColor
    }

    function removePixelFill(pixel: HTMLDivElement) {
        pixel.style.backgroundColor = ""
    }

    return {
        pixelIsFilled,
        setPixelIsFilled,
        fillGridPixel,
        removePixelFill,
    }
}
