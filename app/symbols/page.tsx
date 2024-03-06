import Image from "next/image"
import {
    ReactElement,
    JSXElementConstructor,
    ReactNode,
    ReactPortal,
    PromiseLikeOfReactNode,
} from "react"
// import * as images from "@/public/symbols/"
const reqSvgs = require.context("@/public/symbols/svg", true, /\.\/(.+)\.svg$/)

// -------
const IMAGE_WIDTH = 25
const IMAGE_HEIGHT = 25
var symbolStyles = "p-2 m-2 w-fit"

type symbolType = { default: { src: any }; name: string }
type svgType = {
    name:
        | string
        | number
        | boolean
        | ReactElement<any, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | ReactPortal
        | PromiseLikeOfReactNode
        | null
        | undefined
    svg: { default: { src: any } }
}

function Page() {
    var matches: string[] = []

    // Convert SVGs to an iterable
    const imagePaths = reqSvgs.keys()
    var svgs = imagePaths.map((path: string) => reqSvgs(path))

    console.log("imagesLis", imagePaths)

    // Get the symbol names from paths
    const regex = /(.+)\/(.+).svg$/

    imagePaths.forEach((path: string) => {
        let match = path.match(regex)
        match && matches.push(match[2])
    })

    svgs.map((svg: symbolType, index: number) => {
        svgs[index] = {
            svg,
            name: matches[index],
        }
    })

    function convertSVGs() {}

    // console.log("svgs mapped", svgs)

    return (
        <div className="ml-16">
            <div className="p-4">
                <h1>Knitting Chart Symbols</h1>

                <span>Dropdown for craft type here TODO ⇣</span>
            </div>

            {/* Add more symbols TODO */}
            {/* Figure out how to format the string names TODO */}
            {svgs.map((svg: svgType, index: number) => (
                <div key={index} className={symbolStyles}>
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
