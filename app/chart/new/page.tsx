import Button from "@/components/Button"
import { withBorder } from "@/data/styles"
import Link from "next/link"

const NewChart = () => {
    function handleChartTypeChange(e: React.ChangeEvent) {
        const target = e.target as HTMLInputElement
        switch (target.value) {
            case "Knitting":
                // set the symbols filter to 'Knitting'
                // set line numbers based on user input
                break
            case "Crochet":
                // set the symbols filter to 'Crochet'
                // set line numbers based on user input
                break
            default:
                console.log("please choose a chart type")
                break
        }
    }

    return (
        <div className="m-16">
            <h1 className="font-semibold">Configure your Chart</h1>

            <div>
                <select
                    name="chart-type"
                    id="chart-type"
                    className="rounded-md m-4 px-4 py-1"
                >
                    <option value="chart-type">
                        What kind of chart is this?
                    </option>
                    <option value="knitting">Knitting</option>
                    <option value="crochet">Crochet</option>
                    {/* <option value="crochet">Cross-stitch</option>
                    <option value="crochet">Embroidery</option>
                    <option value="crochet">Diamond Painting</option>
                    <option value="crochet">Other</option> */}
                </select>
            </div>

            <div>
                <select
                    name="line-numbers"
                    id="line-numbers"
                    className="rounded-md m-4 px-4 py-1"
                >
                    <option value="line-numbers">-- Line Numbers --</option>
                    <option value="none">None</option>
                    <option value="right-side-only">Right Side Only</option>
                    <option value="alternating">Alternating</option>
                </select>
            </div>

            <div className={`${withBorder} m-4 w-fit rounded-md px-4`}>
                <Link href="/editor">Next &rarr;</Link>
            </div>
        </div>
    )
}

export default NewChart
