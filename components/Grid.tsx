"use client"
import { useGridContext } from "@/context/GridContext"
import { useEffect, useRef } from "react"
import html2canvas from "html2canvas"

function Grid() {
    const {
        currentPattern,
        setPattern,
        grid,
        mouseIsDown,
        setMouseDownState,
        setFillOnDrag,
    } = useGridContext()
    const ref = useRef<HTMLDivElement>(null)

    // Render the pattern the user selected
    useEffect(() => {
        currentPattern && setPattern(currentPattern)
    }, [currentPattern, setPattern])

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

    return (
        <div onClick={handleClick}>
            <header>
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
                        {grid.length && grid}
                    </div>
                </div>
            </header>
            <button onClick={handleDownloadImage}>Download Img</button>
        </div>
    )
}

export default Grid
