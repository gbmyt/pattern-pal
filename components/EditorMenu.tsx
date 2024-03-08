"use client"
import { SetStateAction, useState } from "react"
import Button from "./Button"
import { useGridContext } from "@/context/GridContext"
import { usePixelIsFilled } from "@/hooks/usePixelFillState"
import Modal from "./Modal"
import { deletePixelGridServerAction } from "@/lib/actions"
import ColorWheel from "./ColorWheel"

function EditorMenu({
    modalIsOpen,
    setModalOpen,
}: {
    modalIsOpen: boolean
    setModalOpen: React.Dispatch<SetStateAction<boolean>>
}) {
    const {
        chart,
        menuControlsOpen,
        setMenuOpen,
        defaultFillColor,
        renderEmptyGrid,
        setPixelFillColor,
    } = useGridContext()

    const [open, setOpen] = useState(false)
    const { setPixelIsFilled, removePixelFill } = usePixelIsFilled()
    const [colorwheelOpen, setColorWheelOpen] = useState(false)

    var buttons = [
        {
            type: "select",
            value: "Mode",
            options: ["Mode", "Fill", "Erase", "Paste"],
            handleClick: () => {
                // setPMOpen(!paintModeOpen)
            },
            style: "none",
        },
        {
            type: "button",
            value: "Color",
            handleClick: () => setColorWheelOpen(!colorwheelOpen),
            style: "none",
        },
        {
            type: "button",
            value: "Remove Fill",
            handleClick: handleRemoveGridFill,
            style: "none",
        },
        {
            type: "button",
            value: "Reset Size",
            handleClick: handleResetGridSize,
            style: "none",
        },
        {
            type: "button",
            value: "New",
            handleClick: handleResetGridToDefault,
            style: "none",
        },

        {
            type: "button",
            value: "Delete", // only show this if rendering a saved chart TODO
            handleClick: () => {
                setOpen(!open)
            },
            modalIsOpen: modalIsOpen,
            style: "none",
        },
        {
            type: "button",
            value: "Save",
            handleClick: () => {
                setModalOpen(!modalIsOpen)
            },
            modalIsOpen: modalIsOpen,
            style: "none",
        },

        // { value: "", handleClick: () => {}, modalIsOpen: null, style: "" },
    ]

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

    const links =
        buttons &&
        buttons.map((link, index) => {
            if (link.type === "button") {
                return (
                    <Button
                        style={link.style}
                        handleClick={link.handleClick}
                        buttonText={link.value}
                        key={index}
                    />
                )
            } else if (link.type === "select") {
                return (
                    <select name="mode" key={index}>
                        {link.options &&
                            link.options.map((text, index) => {
                                return (
                                    <option key={index} value={text}>
                                        {text}
                                    </option>
                                )
                            })}
                    </select>
                )
            }
        })

    return (
        <div className="flex justify-center min-w-screen mb-4">
            <Modal isOpen={open} setOpen={setOpen}>
                <div className="flex flex-col justify-center items-center">
                    <div className="flex justify-center items-center p-8">
                        Are you sure you want to delete this chart? This action
                        cannot be undone.
                    </div>
                    <div className="flex justify-center items-center m-8">
                        <Button
                            style="customWithDefaults"
                            extraStyle="mx-2 text-red-800 border-red-800 hover:bg-red-800"
                            buttonText="Yes"
                            handleClick={async (e) => {
                                setOpen(false)
                                await handleResetGridToDefault(e)
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
                    </div>
                </div>
            </Modal>

            <div
                className={`flex justify-between w-auto max-w-fit border-x-2 border-b-2 rounded-b-md py-2 px-4 mb-4 ${
                    !menuControlsOpen ? "" : ""
                }`}
            >
                <div className="flex justify-between w-full">
                    <div
                        className={
                            !menuControlsOpen
                                ? "hidden"
                                : "flex justify-evenly w-full"
                        }
                    >
                        <Modal
                            isOpen={colorwheelOpen}
                            setOpen={setColorWheelOpen}
                        >
                            <ColorWheel
                                setOpen={setColorWheelOpen}
                                disabled={!colorwheelOpen || !menuControlsOpen}
                            />
                        </Modal>
                        {links && links}
                    </div>
                    <Button
                        style="none"
                        buttonText={`${menuControlsOpen ? "X" : "Menu +"}`}
                        handleClick={() => {
                            if (modalIsOpen) {
                                setModalOpen(false)
                            } else {
                                setMenuOpen(!menuControlsOpen)
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default EditorMenu
