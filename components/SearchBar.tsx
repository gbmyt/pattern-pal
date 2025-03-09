"use client"
import { TextField } from "@mui/material"

const SearchBar: React.FC = () => {
    return (
        <TextField
            sx={{ "& fieldset": { border: "none" } }}
            InputProps={{
                sx: {
                    width: 400,
                    borderRadius: 4,
                    height: 40,
                    "& .MuiInputBase-input": {
                        textAlign: "center",
                    },
                },
                className: "border-2 border-lavender text-lg text-gray-700",
            }}
            placeholder="⌘ + K"
        />
    )
}

export default SearchBar
