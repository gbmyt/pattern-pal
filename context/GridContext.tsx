import GridPixel from "@/components/Pixel"
import { GridContextType } from "@/types/context"
import { Pattern } from "@/types/pattern"
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react"

const GridContext = createContext<GridContextType | null>(null)
type PixelRowOptions = (React.ReactNode | string | string[] | null)[]

export default function ContextProvider({
    children,
}: {
    children: React.ReactNode
}) {
    /** State Stuff */
    const maxGridWidth = 80
    const [mouseIsDown, setMouseDownState] = useState(false)
    const [grid, setGrid] = useState<React.ReactNode[]>([])

    const defaultFillColor = "#0000FF"
    const [pixelFillColor, setPixelFillColor] = useState(defaultFillColor)

    var defaultGrid = JSON.stringify(new Array(3).fill(new Array(3).fill(null)))

    const [pattern, setPattern] = useState<Pattern>({
        title: "",
        gridHeight: 5,
        gridWidth: 5,
        pixels: defaultGrid,
    })

    // ･ﾟ･｡✧･ﾟ: * .・。.・゜✭・.・✫・゜・。. ゜゜・。.・゜✭・
    // Update UI Logic

    var renderEmptyGrid = useCallback(
        function () {
            var emptyGrid: React.ReactNode[][] = new Array(
                pattern.gridHeight && pattern.gridHeight > 0
                    ? pattern.gridHeight
                    : 0
            ).fill(
                new Array(
                    pattern.gridWidth && pattern.gridWidth > 0
                        ? pattern.gridWidth
                        : 0
                ).fill(null)
            )

            setPattern({
                title: "",
                gridHeight: 5,
                gridWidth: 5,
                pixels: defaultGrid,
            })
            setGrid(composeGrid(emptyGrid))
        },
        [setGrid, defaultGrid, pattern]
    )

    var renderGridFromPattern = useCallback(
        function () {
            pattern && setGrid(composeGrid(JSON.parse(pattern.pixels)))
        },
        [pattern]
    )

    // ･ﾟ･｡✧･ﾟ: * .・。.・゜✭・.・✫・゜・。. ゜゜・。.・゜✭・
    // Lifecycle Stuff

    useEffect(() => {
        pattern && pattern.pixels ? renderGridFromPattern() : renderEmptyGrid()
    }, [pattern, renderGridFromPattern, renderEmptyGrid])

    // either render a fresh grid or a grid from database
    function composeGrid(pattern: PixelRowOptions[]) {
        var grid: React.ReactNode[] = []

        pattern.forEach((row: PixelRowOptions, idx) => {
            var elements: JSX.Element[] = []

            for (var i = 0; i < row.length; i++) {
                elements[i] =
                    typeof row[i] === "string" ? (
                        <GridPixel
                            filled={true}
                            // fillColor={row[i]}
                            position={`${idx}, ${i}`}
                            key={i}
                        />
                    ) : (
                        <GridPixel position={`${idx}, ${i}`} key={i} />
                    )
            }

            grid.push(elements)
        })
        return grid
    }

    /** Export Stuff */
    const ctx: GridContextType = {
        mouseIsDown,
        setMouseDownState,
        maxGridWidth,
        pixelFillColor,
        defaultFillColor,
        setPixelFillColor,
        pattern,
        setPattern,
        grid,
        renderEmptyGrid,
    }

    return <GridContext.Provider value={ctx}>{children}</GridContext.Provider>
}

export function useGridContext() {
    return useContext(GridContext) as GridContextType
}
