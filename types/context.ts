import { SetStateAction } from "react"
import { Pattern } from "./pattern"

export type GridContextType = {
    mouseIsDown: boolean
    setMouseDownState: React.Dispatch<SetStateAction<boolean>>
    maxGridWidth: number
    grid: React.ReactNode[]
    renderEmptyGrid: () => void
    defaultFillColor: string
    pixelFillColor: string
    setPixelFillColor: React.Dispatch<SetStateAction<string>>
    pattern: Pattern
    setPattern: React.Dispatch<SetStateAction<Pattern>>
}
