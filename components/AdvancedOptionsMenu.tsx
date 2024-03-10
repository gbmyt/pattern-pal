"use client"

import { useGridContext } from "@/context/GridContext"
import { withBorder } from "@/data/styles"
import { useEffect, useState } from "react"
import Button from "./Button"

const AdvancedOptionsMenu = () => {
    const {
        advancedEditorOptionsOpen,
        setAdvancedOptionsOpen,
        pixelSizeInPixels,
        setPixelSize,
        chart,
        setChart,
        maxGridWidth,
    } = useGridContext()
    const [sliderValue, setSliderValue] = useState(pixelSizeInPixels)

    function handleSliderChange(e: React.ChangeEvent) {
        const target = e.target as HTMLInputElement
        setSliderValue(target.valueAsNumber)
    }

    useEffect(() => {
        sliderValue && setPixelSize(sliderValue)
    }, [setPixelSize, sliderValue])

    function handleChartFormChange(e: React.FormEvent) {
        const target = e.target as HTMLInputElement

        switch (target.name) {
            case "gridHeight":
                setChart((prevState) => ({
                    ...prevState,
                    gridHeight: target.valueAsNumber,
                    pixels: JSON.stringify(
                        new Array(chart.gridWidth || 0).fill(
                            new Array(
                                (target && target.valueAsNumber) ||
                                    (chart && chart.gridHeight) ||
                                    0
                            ).fill(null)
                        )
                    ),
                }))
                break
            case "gridWidth":
                if (target.valueAsNumber > maxGridWidth) {
                    alert(
                        "Sorry, your chart is too wide! Try setting a smaller width."
                    )
                } else {
                    setChart((prevState) => ({
                        ...prevState,
                        gridWidth: target.valueAsNumber,
                        pixels: JSON.stringify(
                            new Array(
                                (target && target.valueAsNumber) ||
                                    (chart && chart.gridWidth) ||
                                    0
                            ).fill(
                                new Array(
                                    (chart && chart.gridHeight) || 0
                                ).fill(null)
                            )
                        ),
                    }))
                }
                break
            default:
                console.log(
                    "there was a problem with the advanced options menu handleChange util"
                )
                break
        }
    }

    if (advancedEditorOptionsOpen) {
        return (
            <div className="flex flex-col items-left m-4 border-2 border-gray-200 rounded-md max-w-fit mx-auto px-8 pb-8 pt-4">
                <Button
                    style="customWithDefaults"
                    extraStyle="ml-0 mt-0 mr-4 mb-4 border-none px-0"
                    buttonText="X"
                    handleClick={() => {
                        setAdvancedOptionsOpen && setAdvancedOptionsOpen(false)
                    }}
                />
                <h3 className="font-semibold">Advanced Options</h3>

                <div className={`inline-flex items-center my-2 w-fit pr-4`}>
                    <span className="inline-block min-w-fit">
                        <label
                            htmlFor="pixel-size-range"
                            className="mb-2 text-sm font-medium text-gray-900 dark:text-white min-w-fit mr-2"
                        >
                            Pixel Size
                        </label>
                    </span>
                    <input
                        id="pixel-size-range"
                        type="range"
                        min={16}
                        max={50}
                        value={sliderValue}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        onChange={handleSliderChange}
                    />
                </div>

                <div>
                    <label htmlFor="grid-height">Height</label>
                    <input
                        className="text-slate-600 border-2 border-black/10 rounded-md w-1/6 m-2"
                        name="gridHeight"
                        type="number"
                        aria-label="gridHeight"
                        onChange={handleChartFormChange}
                        placeholder="Height in Pixels"
                    />
                    <label htmlFor="grid-width">Width</label>
                    <input
                        className="text-slate-600 border-2 border-black/10 rounded-md w-1/6 m-2"
                        name="gridWidth"
                        type="number"
                        aria-label="gridWidth"
                        onChange={handleChartFormChange}
                        placeholder="Width in Pixels"
                    />
                </div>
                <Button
                    style="customWithDefaults"
                    extraStyle="mr-4 mt-4"
                    buttonText="Done"
                    handleClick={() => {
                        setAdvancedOptionsOpen && setAdvancedOptionsOpen(false)
                    }}
                />
            </div>
        )
    }
}

export default AdvancedOptionsMenu
