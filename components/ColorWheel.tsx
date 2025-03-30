import { useGridContext } from "@/context/GridContext"
import { Sketch } from "@uiw/react-color"
import { SetStateAction, useState } from "react"
import Button from "./Button"
import { Typography } from "@mui/material"

function ColorWheel({
    disabled,
    setOpen,
}: {
    disabled: boolean
    setOpen: React.Dispatch<SetStateAction<boolean>>
}) {
    const { pixelFillColor, setPixelFillColor, defaultFillColor } =
        useGridContext()
    const [hex, setHex] = useState(pixelFillColor)
    return (
        <div 
            style={{ 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                flexDirection: "column", 
                margin: "24px auto 0",
            }}
        >
            <Sketch
                style={
                    disabled
                        ? { pointerEvents: "none", opacity: "0.4" }
                        : {}
                }
                color={hex}
                onChange={(color) => {
                    setHex(color.hex)
                    setPixelFillColor(color.hex)
                }}
            />
            <Typography
                sx={{ 
                    mt: 2,
                    textDecoration: "none", 
                    "&:hover": {
                        color: "purple",
                        opacity: 0.6
                    }, 
                }}
                component="button"
                onClick={() => {
                    setHex(defaultFillColor)
                    setPixelFillColor(defaultFillColor)
                }}
            >
                Reset Fill Color
            </Typography>
        </div>
    )
}

export default ColorWheel
