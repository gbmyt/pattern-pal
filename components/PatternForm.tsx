"use client"
import { useGridContext } from "@/context/GridContext"
import Button from "@/components/Button"

import {
    createPixelGridServerAction,
    updatePixelGridServerAction,
} from "@/lib/actions"
import { useState } from "react"
import Modal from "@/components/Modal"
import ColorWheel from "./ColorWheel"
import EditorMenu from "./EditorMenu"

function PatternForm({ authorized }: { authorized: boolean }) {
    const {
        pattern,
        setPattern,
        setPixelFillColor,
        maxGridWidth,
        menuControlsOpen,
        modalIsOpen,
    } = useGridContext()

    // FORM STATE
    const [formError, setFormError] = useState(false)
    const [formSaveText, setFormText] = useState<string | null>(null)

    const pixels = pattern.pixels
    const saveGrid = createPixelGridServerAction.bind(
        null,
        pixels as unknown as FormData
    )
    const updateGrid = updatePixelGridServerAction.bind(
        null,
        pixels as unknown as FormData,
        pattern.id
    )

    function handlePatternFormChange(e: React.FormEvent) {
        const target = e.target as HTMLInputElement

        switch (target.name) {
            case "title":
                setPattern((prevState) => ({
                    ...prevState,
                    title: target.value,
                }))
                break
            case "gridHeight":
                setPattern((prevState) => ({
                    ...prevState,
                    gridHeight: target.valueAsNumber,
                    pixels: JSON.stringify(
                        new Array(pattern.gridWidth || 0).fill(
                            new Array(
                                (target && target.valueAsNumber) ||
                                    (pattern && pattern.gridHeight) ||
                                    0
                            ).fill(null)
                        )
                    ),
                }))
                break
            case "gridWidth":
                if (target.valueAsNumber > maxGridWidth) {
                    alert(
                        "Sorry, your pattern is too wide! Try setting a smaller width."
                    )
                } else {
                    setPattern((prevState) => ({
                        ...prevState,
                        gridWidth: target.valueAsNumber,
                        pixels: JSON.stringify(
                            new Array(
                                (target && target.valueAsNumber) ||
                                    (pattern && pattern.gridWidth) ||
                                    0
                            ).fill(
                                new Array(
                                    (pattern && pattern.gridHeight) || 0
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
                    if (pattern.id) {
                        updateGrid(data)
                    } else if (!pattern.id || pattern.id == null) {
                        await saveGrid(data)
                    }
                } catch (e) {
                    setFormText(
                        "There was a problem saving your grid to the database. Try again later."
                    )
                    setFormError(true)
                } finally {
                    form && form.reset()
                    setFormError(false)
                    setFormText("Saved!")
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
            <EditorMenu />
            <Modal isOpen={!formSaveText ? false : true}>{formSaveText}</Modal>

            {menuControlsOpen && modalIsOpen && (
                <div className="flex flex-row justify-center items-center">
                    <Modal isOpen={modalIsOpen}>
                        <form
                            id="form"
                            action={async (data) => await handleSubmit(data)}
                            className="flex flex-col justify-between w-3/4"
                        >
                            <>
                                <div>
                                    <label htmlFor="title">Title</label>
                                    <input
                                        className="text-slate-600 border-2 border-black/10 rounded-md w-1/4 m-2"
                                        name="title"
                                        id="title"
                                        type="text"
                                        aria-label="title"
                                        placeholder="Name Your Grid"
                                        value={
                                            pattern.title ? pattern.title : ""
                                        }
                                        onChange={handlePatternFormChange}
                                    />

                                    <label htmlFor="grid-height">Height</label>
                                    <input
                                        className="text-slate-600 border-2 border-black/10 rounded-md w-1/6 m-2"
                                        name="gridHeight"
                                        type="number"
                                        aria-label="height"
                                        onChange={handlePatternFormChange}
                                        placeholder="Height in Pixels"
                                    />

                                    <label htmlFor="grid-width">Width</label>
                                    <input
                                        className="text-slate-600 border-2 border-black/10 rounded-md w-1/6 m-2"
                                        name="gridWidth"
                                        type="number"
                                        aria-label="width"
                                        onChange={handlePatternFormChange}
                                        placeholder="Width in Pixels"
                                    />
                                </div>

                                <ColorWheel
                                    disabled={!modalIsOpen || !menuControlsOpen}
                                />
                            </>

                            <div className="m-4 ml-0">
                                {authorized && (
                                    <Button
                                        type="submit"
                                        buttonText="Save Grid"
                                    />
                                )}
                            </div>
                        </form>
                    </Modal>
                </div>
            )}
        </>
    )
}

export default PatternForm
