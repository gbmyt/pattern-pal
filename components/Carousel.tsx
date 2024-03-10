function Carousel({
    title,
    children,
}: {
    title?: string
    children: React.ReactNode
}) {
    const headerText = title ? title : null
    return (
        <div className="max-w-3/4 w-fit mx-auto">
            <h1 className="font-semibold text-center md:text-left my-4">
                {headerText}
            </h1>
            <div className="md:h-60 flex flex-col justify-center items-center md:flex-row md:flex-nowrap md:justify-start">
                {children}
            </div>
        </div>
    )
}
export default Carousel
