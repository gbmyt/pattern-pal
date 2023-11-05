"use client"
import { useGridContext } from "@/context/GridContext"

const PatternDetail = () => {
    const { pattern, currentPattern, pixelFillColor } = useGridContext()
    return (
        <>
            <div className="font-semibold">Current Pattern</div>
            <div>
                Title:{" "}
                <span className="text-slate-500/75">
                    {currentPattern
                        ? pattern.title
                        : "You Haven't Named Your Pattern Yet!"}
                </span>
            </div>
            <div>
                Height:{" "}
                <span className="text-slate-500/75">{pattern.gridHeight}</span>
            </div>
            <div>
                Width:{" "}
                <span className="text-slate-500/75">{pattern.gridWidth}</span>
            </div>
            <div>
                Color:{" "}
                <span className="text-slate-500/75">{pixelFillColor}</span>
            </div>
        </>
    )
}
export default PatternDetail
