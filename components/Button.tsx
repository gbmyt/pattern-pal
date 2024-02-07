function Button({
    modalIsOpen,
    buttonText,
    handleClick,
}: {
    modalIsOpen?: boolean
    buttonText: string
    handleClick?: (e: React.MouseEvent) => void
}) {
    return (
        <button
            onClick={handleClick && handleClick}
            className={`border-solid rounded-lg border-2 border-black/20 text-black/80 mr-2 p-2 ${
                modalIsOpen && "hidden"
            }`}
        >
            {buttonText}
        </button>
    )
}

export default Button
