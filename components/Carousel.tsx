async function Carousel({
    title,
    children,
}: {
    title?: string
    children: React.ReactNode
}) {
    const titleText: string = title ? title : "Recent"
    return (
        <div className="ml-32 my-8">
            <h1 className="font-semibold mb-2 text-center md:text-left">
                {titleText}
            </h1>
            <div className="md:h-60 flex flex-col justify-center items-center md:flex-row md:overflow-scroll md:flex-nowrap md:justify-start">
                {children}
            </div>
        </div>
    )
}
export default Carousel
