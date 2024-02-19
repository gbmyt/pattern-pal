import { SetStateAction } from "react"
import Button from "./Button"
import { deletePixelGridServerAction } from "@/lib/actions"
import { useGridContext } from "@/context/GridContext"
import { usePixelIsFilled } from "@/hooks/usePixelFillState"

function EditorMenu() {
    const {
        pattern,
        menuControlsOpen,
        setMenuOpen,
        modalIsOpen,
        setModalOpen,
        defaultFillColor,
        renderEmptyGrid,
        setPixelFillColor,
    } = useGridContext()
    const { setPixelIsFilled, removePixelFill } = usePixelIsFilled()

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

    return (
        <div className="flex justify-center mb-4">
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
                        <Button
                            style="none"
                            modalIsOpen={modalIsOpen}
                            buttonText="Edit ✎"
                            handleClick={() => {
                                setModalOpen(!modalIsOpen)
                            }}
                        />
                        <Button
                            style="none"
                            handleClick={handleRemoveGridFill}
                            buttonText="Remove Fill"
                        />
                        <Button
                            style="none"
                            handleClick={handleResetGridToDefault}
                            buttonText="Reset Grid to Default"
                        />
                        {/* <Button
                            style="none"
                            handleClick={handleResetGridSize}
                            buttonText="Reset Size"
                        /> */}
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
