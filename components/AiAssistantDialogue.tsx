"use client"
import CloseIcon from '@mui/icons-material/Close';
import { Box, Input, Typography } from '@mui/material';

const AiAssistantDialogue = ({ onClose }: { onClose: () => void }) => {

    return (
        <Box
            className="rounded-lg my-10 mx-8"
            sx={{
                position: "absolute",
                right: -12,
                bottom: 10,
                width: "200px",
                height: "250px",
                border: "1px solid rgba(192,192,192, 0.25)",

                // generic 
                boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;",
                
                // with border 
                // boxShadow: "rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;",
                
                // inset
                // boxShadow: "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;",
                
                // bottom
                // boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;",
                
                // fun
                // boxShadow: "rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px;",
            }}
        >
            <div style={{ margin: "2px 0 4px 0" }}>
                <CloseIcon
                    sx={{
                        position: "absolute",
                        right: 0,
                        scale: 0.65,
                        "&:hover": {
                            // color: "rgba(240, 46, 170, 1)",
                            color: "var(--purple)",
                            opacity: 0.5,
                            borderRadius: 6,
                            cursor: "pointer",
                        },
                    }}
                    onClick={onClose}
                />
            </div>
            <Box    
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    scale: 0.85,
                    backgroundColor: "rgba(192,192,192, 0.35)",
                    borderRadius: 1,
                    height: "100%",
                    width: "100%",
                }}
            >
                <Box
                    className="font-semibold"
                    sx={{ flex: 2 }}
                    p={2}
                >
                    <Typography component="p" fontSize={11}>Ai Assistant</Typography>
                    <Typography component="p" fontSize={11}>Chat Window</Typography>
                </Box>
                
                <Input 
                    sx={{
                        border: "1px solid silver",
                        borderRadius: 2,
                        padding: 0,
                        fontSize: 11,
                        m: 1,
                    }}
                    disableUnderline={true}
                />
            </Box>
        </Box>
    )
}
export default AiAssistantDialogue
