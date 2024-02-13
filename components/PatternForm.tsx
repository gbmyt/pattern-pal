"use client"
import { useGridContext } from "@/context/GridContext"
import { usePixelIsFilled } from "@/hooks/usePixelFillState"
import Button from "@/components/Button"

import { createPatternServerAction } from "@/lib/actions"
import { useState } from "react"
import Modal from "@/components/Modal"
import ColorWheel from "./ColorWheel"

function PatternForm() {
    const {
        pattern,
        setPattern,
        setPixelFillColor,
        renderEmptyGrid,
        maxGridWidth,
    } = useGridContext()
    const { setPixelIsFilled, removePixelFill } = usePixelIsFilled()
    const [modalIsOpen, setModalOpen] = useState(false)
    const [menuControlsOpen, setMenuOpen] = useState(true)

    const pixels = pattern.pixels
    const saveGrid = createPatternServerAction.bind(
        null,
        pixels as unknown as FormData
    )

    function handleResetGridToDefault(e: React.MouseEvent) {
        handleResetGridSize(e)
        handleRemoveGridFill(e)
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
        await saveGrid(data)
        const form = document.getElementById("form") as HTMLFormElement
        form && form.reset()
    }

    function handleUpdateCurrentPattern(e: React.MouseEvent) {
        console.log("Updating Pattern")
    }

    return (
        <>
            <div className="flex flex-row justify-center items-center mb-10">
                <Button
                    buttonText={`${menuControlsOpen ? "-" : "Menu +"}`}
                    handleClick={() => {
                        if (modalIsOpen) {
                            setModalOpen(false)
                        } else {
                            setMenuOpen(!menuControlsOpen)
                        }
                    }}
                />

                {/* TODO fix typescript error */}
                <div className={!menuControlsOpen ? "hidden" : ""}>
                    <Button
                        modalIsOpen={modalIsOpen}
                        buttonText="Edit ✎"
                        handleClick={() => {
                            setModalOpen(!modalIsOpen)
                        }}
                    />
                    <Button
                        handleClick={handleResetGridToDefault}
                        buttonText="New +"
                    />
                    <Button
                        buttonText="Delete Grid"
                        handleClick={(e) => {
                            console.log("Deleting pattern")
                        }}
                    />
                </div>
            </div>

            <div className="flex flex-row justify-center items-center">
                <Modal isOpen={modalIsOpen}>
                    <form
                        id="form"
                        // action={createPattern}
                        action={async (data) => await handleSubmit(data)}
                        className="flex flex-col justify-between w-3/4 my-4"
                    >
                        <>
                            <div>
                                <label htmlFor="title">Title</label>
                                <input
                                    required
                                    className="text-slate-600 border-2 border-black/10 rounded-md w-1/4 m-2"
                                    name="title"
                                    type="text"
                                    aria-label="title"
                                    placeholder="Name Your Grid"
                                    value={pattern.title ? pattern.title : ""}
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

                            <div>
                                <label htmlFor="pixelFillColor"> Color</label>
                                <input
                                    className="text-slate-600 border-2 border-black/10 rounded-md w-1/6 m-2"
                                    name="pixelFillColor"
                                    type="text"
                                    aria-label="pixelFillColor"
                                    placeholder="#FFFFFF"
                                    onChange={handlePatternFormChange}
                                />
                            </div>

                            <div>
                                <span>Fill Color</span>
                                <ColorWheel />
                            </div>
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
                            {/* TODO: If new text says save grid, otherwise save changes */}
                            <Button buttonText="Save Grid" />
                            {/* <Button buttonText="Save Changes" /> */}
                        </div>
                    </form>
                </Modal>
            </div>
        </>
    )
}

export default PatternForm
