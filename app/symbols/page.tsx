import Image from "next/image"
import * as images from "@/public/symbols/"

function Page() {
    const imageList = [...images.default]

    return (
        <>
            <h1>Chart Symbols</h1>

            {imageList.map((image, index) => (
                <Image
                    src={`${image.default.src}`}
                    width={image.default.width}
                    height={image.default.height}
                    alt={`chart-symbol-${index}`}
                    key={image.default.src}
                />
            ))}
        </>
    )
}

export default Page
