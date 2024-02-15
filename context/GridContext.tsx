"use client"
import GridPixel from "@/components/Pixel"
import { DEFAULTGRIDHEIGHT, DEFAULTGRIDWIDTH } from "@/lib/globals"
import { GridContextType } from "@/types/context"
import { Pattern } from "@/types/pattern"
import {
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
    /** Grid Default Values */
    const maxGridWidth = 80
    const defaultGridWidth = DEFAULTGRIDWIDTH
    const defaultGridHeight = DEFAULTGRIDHEIGHT
    const defaultFillColor = "#0000FF"

    var defaultGrid = JSON.stringify(
        new Array(defaultGridWidth).fill(
            new Array(defaultGridHeight).fill(null)
        )
    )

    /** Grid State */
    const [mouseIsDown, setMouseDownState] = useState(false)
    const [fillWhenDragged, setFillOnDrag] = useState(false)
    const [grid, setGrid] = useState<React.ReactNode[]>([])

    /** Pixel State */
    const [pixelFillColor, setPixelFillColor] = useState(defaultFillColor)
    /** Pattern Maker Currently Rendered Pattern State (pulled from database) */
    const [currentPattern, setCurrentPattern] = useState<Pattern | null>(null)

    /** Pattern State */
    const [pattern, setPattern] = useState<Pattern>({
        id: "",
        title: "",
        gridHeight: defaultGridHeight,
        gridWidth: defaultGridWidth,
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
                id: "",
                title: "",
                gridHeight: defaultGridHeight,
                gridWidth: defaultGridWidth,
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
                            fillColor={row[i] as unknown as string}
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
        fillWhenDragged,
        setFillOnDrag,
        currentPattern,
        setCurrentPattern,
    }

    return <GridContext.Provider value={ctx}>{children}</GridContext.Provider>
}

export function useGridContext() {
    return useContext(GridContext) as GridContextType
}
