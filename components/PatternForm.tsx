"use client"
import { useGridContext } from "@/context/GridContext"
import { usePixelIsFilled } from "@/hooks/usePixelFillState"
import Button from "@/components/Button"

import { createPatternServerAction } from "@/lib/actions"
import { useState } from "react"
import Modal from "@/components/Modal"
import ColorWheel from "./ColorWheel"
import EditorMenu from "./EditorMenu"

function PatternForm() {
    const {
        pattern,
        setPattern,
        setPixelFillColor,
        renderEmptyGrid,
        maxGridWidth,
        defaultFillColor,
    } = useGridContext()
    const { setPixelIsFilled, removePixelFill } = usePixelIsFilled()

    // CONTROLS
    const [modalIsOpen, setModalOpen] = useState(false)
    const [menuControlsOpen, setMenuOpen] = useState(true)

    // FORM STATE
    const [formError, setFormError] = useState(false)
    const [formSaveText, setFormText] = useState<string | null>(null)

    const pixels = pattern.pixels
    const saveGrid = createPatternServerAction.bind(
        null,
        pixels as unknown as FormData
    )

    function handleResetGridToDefault(e: React.MouseEvent) {
        handleResetGridSize(e)
        handleRemoveGridFill(e)
        setPixelFillColor(defaultFillColor)
    }

    function handleResetGridSize(e: React.MouseEvent) {
        e.preventDefault()
        renderEmptyGrid()
    }

    function handleRemoveGridFill(e: React.MouseEvent) {
        e.preventDefault()
        let pixels = document.querySelectorAll(
            ".grid-pixel"
        ) as NodeListOf<HTMLDivElement>

        pixels &&
            pixels.forEach((p) => {
                removePixelFill(p)
                setPixelIsFilled(false)
            })
    }

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
        const form = document.getElementById("form") as HTMLFormElement

        if (!data.get("title")) {
            console.log("Whoops! Please add a title and try again.")
            setFormText("Whoops! Please add a title and try again.")
            setFormError(true)
        } else if (menuControlsOpen && modalIsOpen) {
            try {
                await saveGrid(data)
            } catch (e) {
                console.log("Error Message:", e)
                throw new Error(
                    "There was a problem saving your grid to the database. Try again later."
                )
            } finally {
                form && form.reset()
                setFormError(false)
                setFormText("Saved!")
            }
        }
    }

    function handleUpdateCurrentPattern(e: React.MouseEvent) {
        console.log("Updating Pattern")
    }

    return (
        <>
            <EditorMenu
                menuControlsOpen={menuControlsOpen}
                modalIsOpen={modalIsOpen}
                setModalOpen={setModalOpen}
                setMenuOpen={setMenuOpen}
                handleResetGridToDefault={handleResetGridToDefault}
            />
            <Modal isOpen={!formSaveText ? false : true}>{formSaveText}</Modal>

            {menuControlsOpen && modalIsOpen && (
                <div className="flex flex-row justify-center items-center">
                    <Modal isOpen={modalIsOpen}>
                        <form
                            id="form"
                            action={async (data) => await handleSubmit(data)}
                            className="flex flex-col justify-between w-3/4 my-4"
                        >
                            <>
                                <div>
                                    <label htmlFor="title">Title</label>
                                    {/* <input
                                        className="hidden"
                                        name="pixelGridId"
                                        type="text"
                                        aria-label="pixelGridId"
                                        placeholder="Grid Id"
                                        value={
                                            pattern.id
                                                ? pattern.id
                                                : "Missing ID error"
                                        }
                                        onChange={handlePatternFormChange}
                                    /> */}

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
                                <Button
                                    handleClick={handleRemoveGridFill}
                                    buttonText="Remove Pixel Fill"
                                />
                                <Button
                                    handleClick={handleResetGridSize}
                                    buttonText="Reset Size"
                                />
                                <Button type="submit" buttonText="Save Grid" />
                            </div>
                        </form>
                    </Modal>
                </div>
            )}
        </>
    )
}

export default PatternForm
