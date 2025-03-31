"use client"
import { SetStateAction } from "react"
import Button from "./Button"
import { transitionStyles, withDropShadowBorder } from "@/data/styles"

const Modal = ({
    isOpen,
    setOpen,
    children,
}: {
    isOpen: boolean
    setOpen?: React.Dispatch<SetStateAction<boolean>>
    children?: React.ReactNode
}) => {
    // Default Styles
    var hidden = "opacity-0 h-0"
    var visible = "h-fit min-h-1/4 opactity-100"

    var overlayWrapper =
        "fixed z-50 h-fit min-h-3/4 w-full max-w-xl m-auto inset-x-0 inset-y-0 p-4 rounded-sm overflow-y-scroll bg-white"
    var overlayDialog = "flex items-center justify-center h-full"

    // Modal Styles Selector
    const modalVisibility = `${isOpen ? visible : hidden}`

    if (isOpen) {
        return (
            <div
                className={`${modalVisibility} ${overlayWrapper} ${withDropShadowBorder}`}
            >
                <Button
                    style="none"
                    extraStyle="ml-4"
                    buttonText="X"
                    handleClick={() => {
                        setOpen && setOpen(false)
                    }}
                />
                <div className={`${overlayDialog} ${transitionStyles}`}>
                    {children}
                </div>
            </div>
        )
    }
}
export default Modal
