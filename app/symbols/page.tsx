import { convertSVGs } from "@/lib/images"
import { SVGType } from "@/types/images"
import Image from "next/image"
const reqSvgs = require.context("@/public/symbols/svg", true, /\.\/(.+)\.svg$/)

const IMAGE_WIDTH = 25
const IMAGE_HEIGHT = 25

function Page() {
    return (
        <div className="ml-16">
            <div className="p-4">
                <h1>Knitting Chart Symbols</h1>

                <span>Dropdown for craft type here TODO ⇣</span>
            </div>

            {/* Add more symbols TODO */}
            {/* Figure out how to format the string names TODO */}
            {convertSVGs(reqSvgs).map((svg: SVGType, index: number) => (
                <div key={index} className="p-2 m-2 w-fit">
                    <div className="flex flex-row">
                        <div className="p-2 border-solid border-2 border-grey-200 rounded-sm">
                            <Image
                                src={`${svg.svg.default.src}`}
                                width={IMAGE_WIDTH}
                                height={IMAGE_HEIGHT}
                                className="aspect-square"
                                alt={`chart-symbol-${index}`}
                            />
                        </div>
                        <span className="ml-4"> |</span>
                        <span className="ml-4"> {svg.name}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Page
