"use client"

import { useGridContext } from "@/context/GridContext"
import { Chart } from "@prisma/client"

const Card = ({ p }: { p: Chart }) => {
    const { setDbChart } = useGridContext()

    const handleClick = async (e: React.MouseEvent) => {
        setDbChart(p)
    }
    return (
        <div className="h-full">
            <button className="h-full text-left w-72 border rounded-lg mb-2 md:mb-0 md:mr-4 px-4 py-10 md:py-0">
                <div className="font-semibold mb-2">{p.title}</div>
                {/* <div className="text-slate-400/75">description</div> */}

                {/* Grid Preview Image Here? */}

                <div className="inline-flex items-center">
                    <div className="text-slate-500/75 mr-1">Colors</div>
                    <div className="rounded-full bg-red-400 p-2 h-4 w-4 mr-1"></div>
                    <div className="rounded-full bg-green-400 p-2 h-4 w-4 mr-1"></div>
                </div>

                <div className="text-sm text-slate-400/75">
                    Last Updated: Date & Time (TODO)
                </div>

                {/* TODO Add a modal for confirming you want to lose current editor changes before loading a chart from the database */}
                <div onClick={handleClick} className="mt-2">
                    View &rarr;
                </div>
            </button>
        </div>
    )
}
export default Card
