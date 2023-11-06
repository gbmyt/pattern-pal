"use client"
import { useGridContext } from "@/context/GridContext"
import { useState } from "react"

export function usePixelIsFilled() {
    const [pixelIsFilled, setPixelIsFilled] = useState(false)
    const { pixelFillColor, setPattern } = useGridContext()

    async function updatePixelFillStateInGrid(
        type: string,
        pixels: (string | null)[][],
        position: string
    ) {
        let x = parseInt(position.split(",")[0])
        let y = parseInt(position.split(",")[1])
        pixels[x][y] = type === "fill" ? pixelFillColor : null

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

    async function fillGridPixel(
        pixel: HTMLDivElement,
        pixels: string[][] | undefined = undefined,
        position: string | undefined = undefined
    ) {
        pixel.style.backgroundColor = ""
        pixel.style.backgroundColor = pixelFillColor
        if (pixels && position) {
            await updatePixelFillStateInGrid("fill", pixels, position)
        }
    }

    async function removePixelFill(
        pixel: HTMLDivElement,
        pixels: string[][] | undefined = undefined,
        position: string | undefined = undefined
    ) {
        pixel.style.backgroundColor = ""

        if (pixels && position) {
            await updatePixelFillStateInGrid("clear", pixels, position)
        }
    }

    return {
        pixelIsFilled,
        setPixelIsFilled,
        fillGridPixel,
        removePixelFill,
    }
}
