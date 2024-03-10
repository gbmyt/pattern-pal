"use client"
import html2canvas from "html2canvas"
import { SetStateAction, useState } from "react"
import { deletePixelGridServerAction } from "@/lib/actions"

import { useGridContext } from "@/context/GridContext"
import { usePixelIsFilled } from "@/hooks/usePixelFillState"

// Components
import Modal from "./Modal"
import Button from "./Button"
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
        advancedEditorOptionsOpen,
        setAdvancedOptionsOpen,
        menuControlsOpen,
        setMenuOpen,
        defaultFillColor,
        renderEmptyGrid,
        setPixelFillColor,
        setFillMode,
    } = useGridContext()

    const [open, setOpen] = useState(false)
    const { setPixelIsFilled, removePixelFill } = usePixelIsFilled()
    const [colorwheelOpen, setColorWheelOpen] = useState(false)

    var menuLinks = [
        {
            type: "select",
            value: "Chart",
            options: ["Chart", "New", "Save", "Delete", "Export PNG"],
            handleChange: (e: React.ChangeEvent) => {
                let target = e.target as HTMLSelectElement

                try {
                    switch (target.value) {
                        case "Delete":
                            setOpen(!open)
                            break
                        case "Save":
                            setModalOpen(!modalIsOpen)
                            break
                        case "New":
                            handleResetGridToDefault()
                            break
                        case "Export PNG":
                            handleDownloadImage()
                            break
                        default:
                            console.log("targval", target.value)
                    }
                } catch (e) {
                    console.log("there was a problem in select Chart option")
                }
            },
            style: "none",
        },
        {
            type: "select",
            value: "Fill Mode",
            options: ["Fill Mode", "Paint", "Erase", "Symbol" /* "Paste"*/],
            handleChange: (e: React.ChangeEvent) => {
                let target = e.target as HTMLSelectElement
                setFillMode(target.value)
            },
            style: "none",
        },
        {
            type: "select",
            value: "Edit",
            options: ["Edit", "Remove Fill", "Reset Size"],
            handleChange: (e: React.ChangeEvent) => {
                let target = e.target as HTMLSelectElement
                switch (target.value) {
                    case "Remove Fill":
                        handleRemoveGridFill()
                        break
                    case "Reset Size":
                        renderEmptyGrid() // should this preserve the current fill? add a warning about data loss if not
                        break
                    default:
                        console.log("targval", target.value)
                }
            },
            style: "none",
        },
        {
            type: "button",
            value: "Advanced",
            handleClick: () =>
                setAdvancedOptionsOpen &&
                setAdvancedOptionsOpen(!advancedEditorOptionsOpen),
            style: "none",
        },
        {
            type: "button",
            value: "Color",
            handleClick: () => setColorWheelOpen(!colorwheelOpen),
            style: "none",
        },
    ]

    function handleResetGridToDefault() {
        renderEmptyGrid()
        handleRemoveGridFill()
        setPixelFillColor(defaultFillColor)
    }

    function handleRemoveGridFill() {
        let pixels = document.querySelectorAll(
            ".grid-pixel"
        ) as NodeListOf<HTMLDivElement>

        pixels &&
            pixels.forEach((p) => {
                removePixelFill(p)
                setPixelIsFilled(false)
            })
    }

    const handleDownloadImage = async () => {
        const element = document.getElementById("grid") as HTMLDivElement
        const canvas = await html2canvas(element)

        const data = canvas.toDataURL("image/jpg")
        const link = document.createElement("a")

        if (typeof link.download === "string") {
            link.href = data
            link.download = "image.jpg"

            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } else {
            window.open(data)
        }
    }

    const links =
        menuLinks &&
        menuLinks.map((link, index) => {
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
                    <select
                        className="rounded-md bg-transparent mx-1 text-center"
                        key={index}
                        onChange={link.handleChange}
                    >
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
                                await handleResetGridToDefault()
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
                            modalIsOpen
                                ? setModalOpen(false)
                                : setMenuOpen(!menuControlsOpen)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default EditorMenu
