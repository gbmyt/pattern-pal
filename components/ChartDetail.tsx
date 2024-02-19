"use client"
import { useGridContext } from "@/context/GridContext"
import Button from "./Button"
import { deletePixelGridServerAction } from "@/lib/actions"

const ChartDetail = ({ authorized }: { authorized: boolean }) => {
    const { chart, chartFromDatabase, pixelFillColor } = useGridContext()
    return (
        <div className="m-8">
            <span className="inline-flex items-center my-2">
                <h1 className="mr-4 font-semibold">Grid Details</h1>
                {authorized && (
                    <Button
                        buttonText="Delete Grid"
                        handleClick={async (e) => {
                            await deletePixelGridServerAction(chart.id)
                        }}
                    />
                )}
            </span>
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
