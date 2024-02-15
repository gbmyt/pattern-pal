import { SetStateAction } from "react"
import Button from "./Button"

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
    return (
        <div className="flex items-center justify-center mb-4">
            <div className="flex justify-between mb-4 border-x-2 border-b-2 rounded-md w-1/3 py-2 px-4">
                <div className={!menuControlsOpen ? "hidden" : ""}>
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
                        handleClick={(e) => {
                            console.log("Deleting pattern")
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
    )
}

export default EditorMenu
