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
        setGridBorder,
        setGridLines,
        chart,
        setChart,
        maxGridWidth,
    } = useGridContext()
    const [pxSliderValue, setPixelSlider] = useState(pixelSizeInPixels)
    const [borderSliderValue, setBorderSlider] = useState(1)
    const [gridlinesSliderValue, setGridlinesSlider] = useState(1)

    function handleSliderChange(e: React.ChangeEvent) {
        const target = e.target as HTMLInputElement
        switch (target.name) {
            case "border-width":
                setBorderSlider(target.valueAsNumber)
                break
            case "pixel-width":
                setPixelSlider(target.valueAsNumber)
                break
            case "gridlines-width":
                setGridlinesSlider(target.valueAsNumber)
                break
            default:
                console.log("default", target.name)
        }
    }

    useEffect(() => {
        pxSliderValue && setPixelSize(pxSliderValue)
    }, [setPixelSize, pxSliderValue])
    
    useEffect(() => {
        borderSliderValue && setGridBorder(borderSliderValue)
    }, [borderSliderValue, setGridBorder])
    
    useEffect(() => {
        gridlinesSliderValue && setGridLines(gridlinesSliderValue)
    }, [gridlinesSliderValue, setGridLines])

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
                <h3 className="font-semibold">Advanced Options</h3>

                <div className={`inline-flex items-center my-2 w-fit pr-4`}>
                    <span className="inline-block min-w-fit">
                        <label
                            htmlFor="pixel-width"
                            className="mb-2 text-sm font-medium text-gray-900 dark:text-white min-w-fit mr-2"
                        >
                            Pixel Size
                        </label>
                    </span>
                    <input
                        id="pixel-width"
                        name="pixel-width"
                        type="range"
                        min={16}
                        max={50}
                        value={pxSliderValue}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        onChange={handleSliderChange}
                    />
                </div>

                <div className={`inline-flex items-center my-2 w-fit pr-4`}>
                    <span className="inline-block min-w-fit">
                        <label
                            htmlFor="border-width"
                            className="mb-2 text-sm font-medium text-gray-900 dark:text-white min-w-fit mr-2"
                        >
                            Border Size
                        </label>
                    </span>
                    <input
                        id="border-width"
                        name="border-width"
                        type="range"
                        min={0}
                        max={10}
                        value={borderSliderValue}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        onChange={handleSliderChange}
                    />
                </div>
                
                <div className={`inline-flex items-center my-2 w-fit pr-4`}>
                    <span className="inline-block min-w-fit">
                        <label
                            htmlFor="gridlines-width"
                            className="mb-2 text-sm font-medium text-gray-900 dark:text-white min-w-fit mr-2"
                        >
                            Gridlines Size
                        </label>
                    </span>
                    <input
                        id="gridlines-width"
                        name="gridlines-width"
                        type="range"
                        min={1}
                        max={10}
                        step={0.5}
                        value={gridlinesSliderValue}
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
                        placeholder="Height in"
                    />
                    <label htmlFor="grid-width">Width</label>
                    <input
                        className="text-slate-600 border-2 border-black/10 rounded-md w-1/6 m-2"
                        name="gridWidth"
                        type="number"
                        aria-label="gridWidth"
                        onChange={handleChartFormChange}
                        placeholder="Width in"
                    />
                </div>
            </div>
        )
    }
}

export default AdvancedOptionsMenu
