function Button({
    style,
    modalIsOpen,
    buttonText,
    handleClick,
    type,
}: {
    style?: string
    modalIsOpen?: boolean
    buttonText: string
    handleClick?: (e: React.MouseEvent) => void
    type?: "button" | "submit" | "reset" | undefined
}) {
    return (
        <button
            type={type ? type : "button"}
            onClick={handleClick && handleClick}
            className={
                style == "link"
                    ? "underline mx-1 italic hover:text-blue-800"
                    : style == "none"
                    ? "mx-2"
                    : `border-solid rounded-lg border-2 border-black/20 text-black/80 mr-2 p-2 ${
                          modalIsOpen && "hidden"
                      }`
            }
        >
            {buttonText}
        </button>
    )
}

export default Button
