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
    )
}

export default EditorMenu
