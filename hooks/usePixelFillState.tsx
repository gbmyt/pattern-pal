"use client"
import { useGridContext } from "@/context/GridContext"
import { useState } from "react"

export function usePixelIsFilled() {
    const [pixelIsFilled, setPixelIsFilled] = useState(false)
    const { pixelFillColor, setPattern } = useGridContext()

    function updatePixelFillStateInGrid(
        type: string,
        pixels: string[][],
        position: string
    ) {
        let x = parseInt(position.split(",")[0])
        let y = parseInt(position.split(",")[1])
        pixels[x][y] = type === "fill" ? pixelFillColor : ""

        try {
            setPattern((prevState) => ({
                ...prevState,
                pixels: JSON.stringify(pixels),
            }))
        } catch (e) {
            console.log("Couldn't update pixel grid")
            return e
        }
    }

    function fillGridPixel(
        pixel: HTMLDivElement,
        pixels: string[][] | undefined = undefined,
        position: string | undefined = undefined
    ) {
        pixel.style.backgroundColor = ""
        pixel.style.backgroundColor = pixelFillColor
        if (pixels && position) {
            updatePixelFillStateInGrid("fill", pixels, position)
        }
    }

    function removePixelFill(
        pixel: HTMLDivElement,
        pixels: string[][] | undefined = undefined,
        position: string | undefined = undefined
    ) {
        pixel.style.backgroundColor = ""

        if (pixels && position) {
            updatePixelFillStateInGrid("clear", pixels, position)
        }
    }

    return {
        pixelIsFilled,
        setPixelIsFilled,
        fillGridPixel,
        removePixelFill,
    }
}
