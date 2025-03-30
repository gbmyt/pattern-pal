"use client"
import { useGridContext } from "@/context/GridContext"
import { useEffect } from "react"

function Grid() {
    const {
        chartFromDatabase,
        setChart,
        grid,
        gridBorderWidth,
        setMouseDownState,
        setFillOnDrag,
    } = useGridContext()

    // Fetch from db and render a user-selected grid
    useEffect(() => {
        chartFromDatabase && setChart(chartFromDatabase)
    }, [chartFromDatabase, setChart])

    function handleClick(e: React.MouseEvent) {
        const target = e.target as HTMLInputElement

        if (target) {
            target.addEventListener("mousedown", function () {
                setFillOnDrag(true)
                setMouseDownState(true)
            })

            target.addEventListener("mouseup", function () {
                setFillOnDrag(false)
                setMouseDownState(false)
            })
        }
    }

    if (grid.length) {
        return (
            <div
                id="grid"
                onMouseLeave={() => {
                    setFillOnDrag(false)
                    setMouseDownState(false)
                }}
                className="flex flex-col w-fit m-auto pt-8 pb-16"
                onClick={handleClick}
            >
                <div className="flex justify-center" aria-label="grid">
                    <div
                        style={{
                            gridTemplateColumns: `repeat(${grid.length}, minmax(0, 1fr))`,
                            border: `${gridBorderWidth || "0.5"}px solid rgba(192, 192, 192, 0.5)`
                        }}
                        className="grid rounded-lg"
                    >
                        {grid && grid}
                    </div>
                </div>
                <div className="h-0"></div>
            </div>
        )
    }
}

export default Grid
