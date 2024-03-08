"use client"
import GridPixel from "@/components/Pixel"
import { DEFAULTGRIDHEIGHT, DEFAULTGRIDWIDTH } from "@/lib/globals"
import { GridContextType } from "@/types/context"
import { Chart } from "@/types/chart"
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

    /** Editor Menu State */
    const [menuControlsOpen, setMenuOpen] = useState(true)

    /** Grid State */
    const [mouseIsDown, setMouseDownState] = useState(false)
    const [fillWhenDragged, setFillOnDrag] = useState(false)
    const [grid, setGrid] = useState<React.ReactNode[]>([])

    /** Pixel State */
    const [pixelFillColor, setPixelFillColor] = useState(defaultFillColor)

    /** Grid Currently Rendered in the Editor (from database) */
    const [chartFromDatabase, setDbChart] = useState<Chart | null>(null)

    const [chart, setChart] = useState<Chart>({
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
                chart.gridHeight && chart.gridHeight > 0 ? chart.gridHeight : 0
            ).fill(
                new Array(
                    chart.gridWidth && chart.gridWidth > 0 ? chart.gridWidth : 0
                ).fill(null)
            )

            setChart({
                id: "",
                title: "",
                gridHeight: defaultGridHeight,
                gridWidth: defaultGridWidth,
                pixels: defaultGrid,
            })
            setGrid(composeGrid(emptyGrid))
        },
        [setGrid, defaultGrid, chart]
    )

    var renderGridFromDatabase = useCallback(
        function () {
            chart && setGrid(composeGrid(JSON.parse(chart.pixels)))
        },
        [chart]
    )

    // ･ﾟ･｡✧･ﾟ: * .・。.・゜✭・.・✫・゜・。. ゜゜・。.・゜✭・
    // Lifecycle Stuff

    useEffect(() => {
        chart && chart.pixels ? renderGridFromDatabase() : renderEmptyGrid()
    }, [chart, renderGridFromDatabase, renderEmptyGrid])

    // either render a fresh grid or a grid from database
    function composeGrid(chart: PixelRowOptions[]) {
        var grid: React.ReactNode[] = []

        chart.forEach((row: PixelRowOptions, idx) => {
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
        menuControlsOpen,
        setMenuOpen,
        mouseIsDown,
        setMouseDownState,
        maxGridWidth,
        pixelFillColor,
        defaultFillColor,
        setPixelFillColor,
        chart,
        setChart,
        grid,
        renderEmptyGrid,
        fillWhenDragged,
        setFillOnDrag,
        chartFromDatabase,
        setDbChart,
    }

    return <GridContext.Provider value={ctx}>{children}</GridContext.Provider>
}

export function useGridContext() {
    return useContext(GridContext) as GridContextType
}
