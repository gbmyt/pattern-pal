import { SetStateAction } from "react"
import { Pattern } from "./pattern"

export type GridContextType = {
    modalIsOpen: boolean
    setModalOpen: React.Dispatch<SetStateAction<boolean>>
    menuControlsOpen: boolean
    setMenuOpen: React.Dispatch<SetStateAction<boolean>>
    mouseIsDown: boolean
    setFillOnDrag: React.Dispatch<SetStateAction<boolean>>
    fillWhenDragged: boolean
    setMouseDownState: React.Dispatch<SetStateAction<boolean>>
    maxGridWidth: number
    grid: React.ReactNode[]
    renderEmptyGrid: () => void
    defaultFillColor: string
    pixelFillColor: string
    setPixelFillColor: React.Dispatch<SetStateAction<string>>
    pattern: Pattern
    setPattern: React.Dispatch<SetStateAction<Pattern>>
    currentPattern: Pattern | null
    setCurrentPattern: React.Dispatch<SetStateAction<Pattern | null>>
}
