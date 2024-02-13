import Sketch from "@uiw/react-color-wheel"
// import { Alpha, Hue, ShadeSlider, Saturation, Interactive, hsvaToHslaString } from '@uiw/react-color';
// import { EditableInput, EditableInputRGBA, EditableInputHSLA } from '@uiw/react-color';
import { useState } from "react"

function ColorWheel() {
    const [hex, setHex] = useState("#fff")
    return (
        <Sketch
            style={{ marginLeft: 20 }}
            color={hex}
            onChange={(color) => {
                setHex(color.hex)
            }}
        />
    )
}

export default ColorWheel
