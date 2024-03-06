export type Chart = {
    id: string
    title: string | undefined
    gridWidth: number | undefined
    gridHeight: number | undefined
    pixels: string
}
export type ChartTestType = {
    id: string
    title: string
    createdAt: Date
    userId: string
    gridWidth: number
    gridHeight: number
    pixels: string
}
