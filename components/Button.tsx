function Button({
    modalIsOpen,
    buttonText,
    handleClick,
    type,
    style,
    extraStyle,
    children,
}: {
    style?: string
    extraStyle?: string
    modalIsOpen?: boolean
    buttonText: string
    handleClick?: (e: React.MouseEvent) => void
    type?: "button" | "submit" | "reset" | undefined
    children?: React.ReactNode
}) {
    const defaultStyle = `w-fit rounded-lg border-solid border-2 border-black/20 text-black/80 p-2 ${
        modalIsOpen && "hidden"
    }`
    return (
        <button
            type={type ? type : "button"}
            onClick={handleClick && handleClick}
            className={
                style == "link"
                    ? "underline w-fit mx-1 italic hover:text-blue-800"
                    : style == "none"
                    ? "mx-4 w-fit"
                    : style == "customPlain"
                    ? extraStyle
                    : style == "customWithDefaults"
                    ? `${defaultStyle} ${extraStyle}`
                    : defaultStyle
            }
        >
            {buttonText}
            {children}
        </button>
    )
}

export default Button
