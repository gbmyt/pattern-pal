import { SetStateAction } from "react"
import { Chart } from "./chart"

export type GridContextType = {
    advancedEditorOptionsOpen: boolean
    setAdvancedOptionsOpen: React.Dispatch<SetStateAction<boolean>>
    editorFillMode: string
    setFillMode: React.Dispatch<SetStateAction<string>>
    menuControlsOpen: boolean
    setMenuOpen: React.Dispatch<SetStateAction<boolean>>
    mouseIsDown: boolean
    gridlinesWidth: number
    setGridLines: React.Dispatch<SetStateAction<number>>
    pixelSizeInPixels: number
    setPixelSize: React.Dispatch<SetStateAction<number>>
    gridBorderWidth: number
    setGridBorder: React.Dispatch<SetStateAction<number>>
    setFillOnDrag: React.Dispatch<SetStateAction<boolean>>
    fillWhenDragged: boolean
    setMouseDownState: React.Dispatch<SetStateAction<boolean>>
    maxGridWidth: number
    grid: React.ReactNode[]
    renderEmptyGrid: () => void
    defaultFillColor: string
    pixelFillColor: string
    setPixelFillColor: React.Dispatch<SetStateAction<string>>
    chart: Chart
    setChart: React.Dispatch<SetStateAction<Chart>>
    chartFromDatabase: Chart | null
    setDbChart: React.Dispatch<SetStateAction<Chart | null>>
}
