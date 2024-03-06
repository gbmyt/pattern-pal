import { SymbolType } from "@/types/images"

export function convertSVGs(svgs) {
    var matches: string[] = []

    // Convert SVGs to an iterable
    const imagePaths = svgs.keys()
    var formattedSVGs = imagePaths.map((path: string) => svgs(path))

    // Get the symbol names from paths
    const regex = /(.+)\/(.+).svg$/

    // Convert the array of SVGs to an array that includes string symbol names
    // so they can be mapped over for rendering in the UI
    imagePaths.forEach((path: string) => {
        let match = path.match(regex)
        match && matches.push(match[2])
    })

    formattedSVGs.map((svg: SymbolType, index: number) => {
        formattedSVGs[index] = {
            svg,
            name: matches[index],
        }
    })

    return formattedSVGs
}
