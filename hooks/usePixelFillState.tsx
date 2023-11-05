"use client"
import { useGridContext } from "@/context/GridContext"
import { Pattern } from "@prisma/client"
import { SetStateAction, useState } from "react"

export function usePixelIsFilled() {
    const [pixelIsFilled, setPixelIsFilled] = useState(false)
    const { pixelFillColor, setPattern } = useGridContext()

    function fillGridPixel(
        pixel: HTMLDivElement,
        pixels: string | undefined = undefined,
        position: string | undefined = undefined
    ) {
        pixel.style.backgroundColor = ""
        pixel.style.backgroundColor = pixelFillColor

        if (pixels && position) {
            let x = parseInt(position.split(",")[0])
            let y = parseInt(position.split(",")[1])

            var gridPosition = pixels[x][y]
            pixels[x][y] = !gridPosition && pixelFillColor
        }

        try {
            setPattern((prevState) => ({
                ...prevState,
                pixels: JSON.stringify(pixels),
            }))
        } catch (e) {
            console.log("Couldn't fill grid pixel")
        }
    }

    function removePixelFill(
        pixel: HTMLDivElement,
        pixels: string | undefined = undefined,
        position: string | undefined = undefined
    ) {
        pixel.style.backgroundColor = ""

        if (pixels && position) {
            let x = parseInt(position.split(",")[0])
            let y = parseInt(position.split(",")[1])

            var gridPosition = pixels[x][y]
            pixels[x][y] = gridPosition && null
        }

        try {
            setPattern((prevState) => ({
                ...prevState,
                pixels: JSON.stringify(pixels),
            }))
        } catch (e) {
            console.log("Couldn't remove pixel fill")
        }
    }

    return {
        pixelIsFilled,
        setPixelIsFilled,
        fillGridPixel,
        removePixelFill,
    }
}
