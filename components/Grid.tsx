import { useGridContext } from "@/context/GridContext"
import { Pattern } from "@/types/pattern"
import { useEffect } from "react"

function Grid({ pattern }: { pattern: Pattern | null }) {
    const { setPattern, grid, setMouseDownState } = useGridContext()

    // Render the pattern the user selected
    useEffect(() => {
        pattern && setPattern(pattern)
    }, [pattern, setPattern])

    function handleClick(e: React.MouseEvent) {
        const target = e.target as HTMLInputElement

        if (target) {
            target.addEventListener("mousedown", function () {
                setMouseDownState(true)
            })

            target.addEventListener("mouseup", function () {
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
                        className="border-solid border-2 grid"
                    >
                        {grid.length && grid}
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Grid
