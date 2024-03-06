"use client"
import { useGridContext } from "@/context/GridContext"
import Button from "./Button"
import { deletePixelGridServerAction } from "@/lib/actions"
import Modal from "./Modal"
import { useState } from "react"

const ChartDetail = ({ authorized }: { authorized: boolean }) => {
    const { chart, chartFromDatabase, pixelFillColor } = useGridContext()
    const [open, setOpen] = useState(false) // organize modal states, Grid uses another, formError yet another

    return (
        <div className="my-8">
            <Modal isOpen={open}>
                Are you sure you want to delete this chart? This action cannot
                be undone.
                <Button
                    style="customWithDefaults"
                    extraStyle="mx-2 text-red-800 border-red-800 hover:bg-red-800"
                    buttonText="Yes"
                    handleClick={async (e) => {
                        setOpen(false)
                        await deletePixelGridServerAction(chart.id)
                    }}
                />
                <Button
                    buttonText="Cancel"
                    style="customWithDefaults"
                    extraStyle="mx-2 text-gray-800 border-gray-800 hover:bg-gray-800"
                    handleClick={() => {
                        setOpen(false)
                    }}
                />
            </Modal>

            <span className="inline-flex items-center my-2">
                <h1 className="my-4 mr-4 font-semibold">Grid Details</h1>
                {authorized && (
                    <Button
                        style="custom"
                        extraStyle="py-2 px-3 border-2 rounded-[55%]"
                        buttonText="❌"
                        handleClick={async (e) => setOpen(true)}
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
