const Modal = ({
    isOpen,
    children,
}: {
    isOpen: boolean
    children: React.ReactNode
}) => {
    return (
        <div
            className={`${
                isOpen ? "opactity-100 h-fit" : "opacity-0 h-0"
            } transition-all ease-in-out delay-100 duration-250`}
        >
            {children}
        </div>
    )
}
export default Modal
