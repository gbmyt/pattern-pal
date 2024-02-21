import { useGridContext } from "@/context/GridContext"
import {
    Slider,
    Sketch,
    Material,
    Colorful,
    Compact,
    Circle,
    Block,
    Github,
    Chrome,
} from "@uiw/react-color/src/index"
// import { Alpha, Hue, ShadeSlider, Saturation, Interactive, hsvaToHslaString } from '@uiw/react-color';
// import { EditableInput, EditableInputRGBA, EditableInputHSLA } from '@uiw/react-color';
import { useState } from "react"
import Button from "./Button"

function ColorWheel({ disabled }: { disabled: boolean }) {
    const { pixelFillColor, setPixelFillColor, defaultFillColor } =
        useGridContext()
    const [hex, setHex] = useState(pixelFillColor)
    return (
        <>
            <div className="flex m-6">
                <span>Fill Color</span>
                <Button
                    style="link"
                    buttonText="Reset Color"
                    handleClick={() => {
                        setHex(defaultFillColor)
                        setPixelFillColor(defaultFillColor)
                    }}
                />
            </div>
            <Sketch
                style={
                    disabled
                        ? { pointerEvents: "none", opacity: "0.4" }
                        : { marginLeft: 20 }
                }
                color={hex}
                onChange={(color) => {
                    setHex(color.hex)
                    setPixelFillColor(color.hex)
                }}
            />
        </>
    )
}

export default ColorWheel
