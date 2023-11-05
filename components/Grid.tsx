"use client"
import { useGridContext } from "@/context/GridContext"

import { useEffect } from "react"

function Grid() {
    const {
        currentPattern,
        setPattern,
        grid,
        mouseIsDown,
        setMouseDownState,
        setFillOnDrag,
    } = useGridContext()

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
                    >
                        {grid.length && grid}
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Grid
