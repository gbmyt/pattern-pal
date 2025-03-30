"use client"
import AssistantIcon from "@mui/icons-material/Assistant"
import { useState } from "react";
import AiAssistantDialogue from "./AiAssistantDialogue";
import { Box } from "@mui/material";

const AiAssistant = () => {
    const [chatOpen, setOpen] = useState(false);
        
    const handleOpenChat = () => {
        console.log('open');
        setOpen(true);
    }
    
    const handleClose = () => {
        console.log('Closing chat');
        setOpen(false);
    }
    return (
        <Box
            className="fill-purple"
            sx={{
                position: "absolute",
                right: 0,
                bottom: 0,
                padding: 2,
                borderRadius: 8,
                margin: "2em 3em",
                scale: 1.5,
                // "&:hover": {
                //     scale: 1.8,
                // },
            }}
        >
            {chatOpen && (<AiAssistantDialogue onClose={handleClose} />)}
            <AssistantIcon
                onClick={handleOpenChat}
                sx={{ fill: "var(--purple)" }}
            />
        </Box>
    )
}
export default AiAssistant
