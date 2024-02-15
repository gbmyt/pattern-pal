"use client"
import { useGridContext } from "@/context/GridContext"
import Button from "./Button"
import { deletePixelGridServerAction } from "@/lib/actions"

const PatternDetail = ({ authorized }: { authorized: boolean }) => {
    const { pattern, currentPattern, pixelFillColor } = useGridContext()
    return (
        <div className="m-8">
            <span className="inline-flex items-center my-2">
                <h1 className="mr-4 font-semibold">Grid Details</h1>
                {authorized && (
                    <Button
                        buttonText="Delete Grid"
                        handleClick={async (e) => {
                            await deletePixelGridServerAction(pattern.id)
                        }}
                    />
                )}
            </span>
            <div>
                {/* <span>Id: {pattern.id}</span> */}
                Title:{" "}
                <span className="text-slate-500/75">
                    {authorized && currentPattern
                        ? pattern.title
                        : authorized && !currentPattern
                        ? "Untitled"
                        : "Create an Account to Name & Save Your Grid"}
                </span>
            </div>
            <div>
                Height:{" "}
                <span className="text-slate-500/75 mr-4">
                    {pattern.gridHeight}
                </span>
                Width:{" "}
                <span className="text-slate-500/75 mr-4">
                    {pattern.gridWidth}
                </span>
                Color:{" "}
                <span className="text-slate-500/75">{pixelFillColor}</span>
            </div>
        </div>
    )
}
export default PatternDetail
