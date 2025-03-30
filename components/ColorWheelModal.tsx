"use client"
import { SetStateAction } from "react"
import CloseIcon from '@mui/icons-material/Close';
import { Box } from "@mui/material";

const ColorWheelModal = ({
    isOpen,
    setOpen,
    children,
}: {
    isOpen: boolean
    setOpen?: React.Dispatch<SetStateAction<boolean>>
    children?: React.ReactNode
}) => {
    // Default Styles
    // var hidden = "opacity-0 h-0"
    // var visible = "h-fit min-h-1/4 opactity-100"

    // var overlayWrapper =
    //     "fixed z-50 h-fit min-h-3/4 w-full max-w-xl m-auto inset-x-0 inset-y-0 p-4 rounded-sm overflow-y-scroll bg-white"
    // var overlayDialog = "flex items-center justify-center h-full"

    if (isOpen) {
        return (
            <Box 
                sx={{ 
                    backgroundColor: "rgba(192, 192, 192, 0.25)", 
                    backdropFilter: "blur(2px)",
                    borderRadius: 2, 
                    width: 'fit-content', 
                    px: 4, 
                    py: 2 
                }}
            >
                <CloseIcon 
                    onClick={() => setOpen && setOpen(false)} 
                    sx={{
                        position: "absolute", 
                        right: 12, 
                        scale: 0.9,
                        borderRadius: 2,
                        "&:hover": {
                            backgroundColor: "rgba(192, 192, 192, 0.5)",
                        }
                    }}
                />
                {children}
            </Box>
        )
    }
}
export default ColorWheelModal
