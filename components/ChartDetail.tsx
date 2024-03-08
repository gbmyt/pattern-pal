"use client"
import { useGridContext } from "@/context/GridContext"

const ChartDetail = ({ authorized }: { authorized: boolean }) => {
    const { chart, chartFromDatabase, pixelFillColor } = useGridContext()

    return (
        <div className="my-8">
            <h1 className="font-semibold">Grid Details</h1>
            <div>
                Title:{" "}
                <span className="text-slate-500/75">
                    {authorized && chartFromDatabase
                        ? chart.title
                        : authorized && !chartFromDatabase
                        ? "Untitled"
                        : "Create an Account to Name & Save Your Grid"}
                </span>
            </div>
            <div>
                Height:{" "}
                <span className="text-slate-500/75 mr-4">
                    {chart.gridHeight}
                </span>
                Width:{" "}
                <span className="text-slate-500/75 mr-4">
                    {chart.gridWidth}
                </span>
                Color:{" "}
                <span className="text-slate-500/75">{pixelFillColor}</span>
            </div>
        </div>
    )
}
export default ChartDetail
