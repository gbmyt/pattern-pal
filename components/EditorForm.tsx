"use client"
import { useGridContext } from "@/context/GridContext"
import ChartDetail from "@/components/ChartDetail"
import Button from "@/components/Button"

import {
    createPixelGridServerAction,
    updatePixelGridServerAction,
} from "@/lib/actions"
import { useState } from "react"
import ColorWheelModal from "@/components/ColorWheelModal"

import EditorMenu from "./EditorMenu"

function EditorForm({ authorized }: { authorized: boolean }) {
    const {
        chart,
        setChart,
        setPixelFillColor,
        maxGridWidth,
        menuControlsOpen,
    } = useGridContext()
    const [modalIsOpen, setModalOpen] = useState(false)

    // FORM STATE
    const [formError, setFormError] = useState(false)
    const [formSaveText, setFormText] = useState<string | null>(null)

    const pixels = chart.pixels
    const saveGrid = createPixelGridServerAction.bind(
        null,
        pixels as unknown as FormData
    )
    const updateGrid = updatePixelGridServerAction.bind(
        null,
        pixels as unknown as FormData,
        chart.id
    )

    function handleChartFormChange(e: React.FormEvent) {
        const target = e.target as HTMLInputElement

        switch (target.name) {
            case "title":
                setChart((prevState) => ({
                    ...prevState,
                    title: target.value,
                }))
                break
            case "gridHeight":
                setChart((prevState) => ({
                    ...prevState,
                    gridHeight: target.valueAsNumber,
                    pixels: JSON.stringify(
                        new Array(chart.gridWidth || 0).fill(
                            new Array(
                                (target && target.valueAsNumber) ||
                                    (chart && chart.gridHeight) ||
                                    0
                            ).fill(null)
                        )
                    ),
                }))
                break
            case "gridWidth":
                if (target.valueAsNumber > maxGridWidth) {
                    alert(
                        "Sorry, your chart is too wide! Try setting a smaller width."
                    )
                } else {
                    setChart((prevState) => ({
                        ...prevState,
                        gridWidth: target.valueAsNumber,
                        pixels: JSON.stringify(
                            new Array(
                                (target && target.valueAsNumber) ||
                                    (chart && chart.gridWidth) ||
                                    0
                            ).fill(
                                new Array(
                                    (chart && chart.gridHeight) || 0
                                ).fill(null)
                            )
                        ),
                    }))
                }
                break
            case "pixelFillColor":
                setPixelFillColor(target.value)
                break
            default:
                break
        }
    }

    async function handleSubmit(data: FormData) {
        if (authorized) {
            const form = document.getElementById("form") as HTMLFormElement

            // TODO: Error-handling refactor
            if (!data.get("title")) {
                setFormText("Whoops! Please add a title and try again.")
                setFormError(true)
            } else if (menuControlsOpen && modalIsOpen) {
                try {
                    setFormText("Saving Your Changes..")
                    if (chart.id) {
                        updateGrid(data)
                    } else if (!chart.id || chart.id == null) {
                        await saveGrid(data)
                        setFormText("Saved!")
                    }
                } catch (e) {
                    setFormText(
                        "There was a problem saving your grid to the database. Try again later."
                    )
                    setFormError(true)
                } finally {
                    form && form.reset()
                    setModalOpen(false)
                    setFormError(false)
                    setInterval(() => {
                        setFormText(null)
                    }, 3000)
                }
            }
        } else {
            try {
                setFormError(true)
                setFormText(
                    "You must be logged in to save your pixel grid. Please log in and try again. "
                )
            } catch (e) {
                throw new Error(
                    "There was an unexpected problem accessing the database. Please check the logs for more information."
                )
            } finally {
                setFormError(false)
            }
        }
    }

    return (
        <>
            <EditorMenu modalIsOpen={modalIsOpen} setModalOpen={setModalOpen} />
            {/* <Modal isOpen={!formSaveText ? false : true}>{formSaveText}</Modal> */}

            {menuControlsOpen && modalIsOpen && (
                <div className="flex flex-row justify-center items-center">
                    <ColorWheelModal isOpen={modalIsOpen} setOpen={setModalOpen}>
                        <form
                            id="form"
                            action={async (data) => await handleSubmit(data)}
                            className="flex flex-col justify-between items-center w-3/4"
                        >
                            <>
                                <ChartDetail authorized={authorized} />
                                <div>
                                    <label htmlFor="title">Title</label>
                                    <input
                                        className="text-slate-600 border-2 border-black/10 rounded-md w-fit m-2"
                                        name="title"
                                        id="title"
                                        type="text"
                                        aria-label="title"
                                        placeholder="Name Your Grid"
                                        value={chart.title ? chart.title : ""}
                                        onChange={handleChartFormChange}
                                    />
                                </div>
                            </>

                            <div className="m-4 ml-0">
                                {authorized && (
                                    <Button
                                        type="submit"
                                        buttonText="Save Changes →"
                                    />
                                )}
                            </div>
                        </form>
                    </ColorWheelModal>
                </div>
            )}
        </>
    )
}

export default EditorForm
