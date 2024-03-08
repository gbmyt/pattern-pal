"use client"
import { useGridContext } from "@/context/GridContext"
import { Suspense, useEffect, useRef } from "react"
import html2canvas from "html2canvas"
import Button from "./Button"

function Grid() {
    const {
        chartFromDatabase,
        setChart,
        grid,
        setMouseDownState,
        setFillOnDrag,
    } = useGridContext()

    const ref = useRef<HTMLDivElement>(null)

    // Fetch from db and render a user-selected grid
    useEffect(() => {
        chartFromDatabase && setChart(chartFromDatabase)
    }, [chartFromDatabase, setChart])

    function handleClick(e: React.MouseEvent) {
        const target = e.target as HTMLInputElement

        if (target) {
            target.addEventListener("mousedown", function () {
                setMouseDownState(true)
            })

            target.addEventListener("mouseup", function () {
                setFillOnDrag(false)
                setMouseDownState(false)
            })
        }
    }

    const handleDownloadImage = async () => {
        const element = ref.current as HTMLDivElement
        const canvas = await html2canvas(element)

        const data = canvas.toDataURL("image/jpg")
        const link = document.createElement("a")

        if (typeof link.download === "string") {
            link.href = data
            link.download = "image.jpg"

            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } else {
            window.open(data)
        }
    }

    if (grid.length) {
        return (
            <div className="flex flex-col w-fit m-auto" onClick={handleClick}>
                <div
                    className="flex justify-center"
                    id="grid"
                    aria-label="grid"
                    data-testid="grid"
                >
                    <div
                        style={{
                            gridTemplateColumns: `repeat(${grid.length}, minmax(0, 1fr))`,
                        }}
                        className="border-solid border-2 grid rounded-lg"
                        ref={ref}
                    >
                        {grid && grid}
                    </div>
                </div>
                <div className="h-0"></div>

                <div className="flex justify-end my-4">
                    <Button
                        style="custom"
                        extraStyle="p-2 mt-4"
                        handleClick={handleDownloadImage}
                        buttonText="Download As Img"
                    />
                </div>
            </div>
        )
    }
}

export default Grid
