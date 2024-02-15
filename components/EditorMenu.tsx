import { SetStateAction } from "react"
import Button from "./Button"
import { deletePixelGridServerAction } from "@/lib/actions"
import { useGridContext } from "@/context/GridContext"

function EditorMenu({
    modalIsOpen,
    menuControlsOpen,
    setModalOpen,
    setMenuOpen,
    handleResetGridToDefault,
}: {
    modalIsOpen: boolean
    menuControlsOpen: boolean
    setModalOpen: React.Dispatch<SetStateAction<boolean>>
    setMenuOpen: React.Dispatch<SetStateAction<boolean>>
    handleResetGridToDefault: (e: React.MouseEvent) => void
}) {
    const { pattern } = useGridContext()
    return (
        <div className="flex justify-center mb-4">
            <div
                className={`flex justify-between border-x-2 border-b-2 rounded-b-md py-2 px-4 mb-4 ${
                    !menuControlsOpen ? "w-auto" : "w-1/3"
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
                            handleClick={handleResetGridToDefault}
                            buttonText="New +"
                        />
                        <Button
                            style="none"
                            buttonText="Delete Grid"
                            handleClick={async (e) => {
                                await deletePixelGridServerAction(pattern.id)
                            }}
                        />
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
