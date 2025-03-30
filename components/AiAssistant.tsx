"use client"
import AssistantIcon from "@mui/icons-material/Assistant"
import { useState } from "react";
import AiAssistantDialogue from "./AiAssistantDialogue";
import { Box } from "@mui/material";
import DragWrapper from "./DragWrapper";

const AiAssistant = () => {
    const [chatOpen, setOpen] = useState(false);
        
    const handleOpenChat = () => {
        setOpen(true);
    }
    
    const handleClose = () => {
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
            {chatOpen && (
                // TODO: Resizable in addition to draggable
                <DragWrapper>
                    <AiAssistantDialogue onClose={handleClose} />
                </DragWrapper>
            )}
            <AssistantIcon
                onClick={handleOpenChat}
                sx={{ fill: "var(--purple)" }}
            />
        </Box>
    )
}
export default AiAssistant
