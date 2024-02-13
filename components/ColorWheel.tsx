import { useGridContext } from "@/context/GridContext"
import Sketch from "@uiw/react-color-wheel"
// import { Alpha, Hue, ShadeSlider, Saturation, Interactive, hsvaToHslaString } from '@uiw/react-color';
// import { EditableInput, EditableInputRGBA, EditableInputHSLA } from '@uiw/react-color';
import { SetStateAction, useContext, useState } from "react"
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
