"use client"
import React, { useState } from "react"
import {
    TextField,
    Button,
    Box,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    SelectChangeEvent,
    TextareaAutosize,
    FormHelperText,
    Grid,
} from "@mui/material"
import { formElements } from "@/const/patterns"
import { createPattern } from "@/lib/actions"

interface FormData {
    [key: string]: string | string[]
}

const PatternForm = () => {
    const [formData, setFormData] = useState<FormData>({})
    const [error, setError] = useState<String | null>(null)

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            | SelectChangeEvent<string | string[]>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        try {
            console.log("Creating your pattern:", formData)
            // form submission logic here
            createPattern(formData);
        } catch (e: any) {
            setError(e.message ?? "Something went wrong saving your pattern.")
        }
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "85%",
                margin: "0 auto",
                mt: 5,
            }}
        >
            <Grid container spacing={2}>
                {formElements.length &&
                    formElements.map((elem, i) => {
                        switch (elem.type) {
                            case "text":
                                return (
                                    <Grid item xs={12} sm={6} key={i}>
                                        <TextField
                                            label={
                                                elem.name
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                elem.name.slice(1)
                                            }
                                            name={elem.name}
                                            value={formData[elem.name] || ""}
                                            onChange={handleChange}
                                            required={elem.required}
                                            fullWidth
                                        />
                                        <FormHelperText
                                            sx={{
                                                ml: 0,
                                                color: error ? "red" : "auto",
                                            }}
                                        >
                                            {error ?? elem.hint}
                                        </FormHelperText>
                                    </Grid>
                                )
                            case "textarea":
                                return (
                                    <Grid item xs={12} sm={6} key={i}>
                                        <FormControl
                                            fullWidth
                                            variant="outlined"
                                        >
                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    border: "1px solid rgba(0, 0, 0, 0.23)",
                                                    borderRadius: 1,
                                                    padding: "16.5px 14px",
                                                    fontFamily:
                                                        "Roboto, sans-serif",
                                                    fontSize: "1rem",
                                                    lineHeight: 1.5,
                                                    color: "rgba(0, 0, 0, 0.87)",
                                                    "&:focus-within": {
                                                        borderColor: "#1976d2",
                                                        boxShadow:
                                                            "0 0 0 2px rgba(25, 118, 210, 0.25)",
                                                    },
                                                }}
                                            >
                                                <TextareaAutosize
                                                    name={elem.name}
                                                    value={
                                                        (formData[elem.name] as string) || ""
                                                    }
                                                    onChange={handleChange}
                                                    required={elem.required}
                                                    placeholder={
                                                        elem.name
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                        elem.name.slice(1)
                                                    }
                                                    style={{
                                                        width: "100%",
                                                        border: "none",
                                                        outline: "none",
                                                        resize: "none",
                                                        background:
                                                            "transparent",
                                                        font: "inherit",
                                                        color: "inherit",
                                                    }}
                                                />
                                            </Box>
                                            <FormHelperText
                                                sx={{
                                                    ml: 0,
                                                    color: error
                                                        ? "red"
                                                        : "auto",
                                                }}
                                            >
                                                {error ?? elem.hint}
                                            </FormHelperText>
                                        </FormControl>
                                    </Grid>
                                )
                            case "select":
                            case "multi-select": 
                                return (
                                    <Grid item xs={12} sm={6} key={i}>
                                        <FormControl fullWidth>
                                            <InputLabel id="pattern-select-label">
                                                {elem.name
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    elem.name.slice(1)}
                                            </InputLabel>
                                            <Select
                                                name={elem.name}
                                                multiple={elem.type === "multi-select"}
                                                value={
                                                    formData[elem.name] ||
                                                    (elem.type === "multi-select" ? [] : "")
                                                }
                                                label={elem.name.charAt(0).toUpperCase() + elem.name.slice(1)}
                                                onChange={handleChange}
                                            >
                                                {elem.options.map((o, ix) => (
                                                    <MenuItem
                                                        key={ix}
                                                        value={o}
                                                    >
                                                        {o}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormHelperText
                                            sx={{
                                                ml: 0,
                                                color: error ? "red" : "auto",
                                            }}
                                        >
                                            {error ?? elem.hint}
                                        </FormHelperText>
                                    </Grid>
                                )
                            default:
                                return <></>
                        }
                    })}
            </Grid>

            <Button variant="contained" type="submit" sx={{ width: "20%"}}>
                Submit
            </Button>
        </Box>
    )
}

export default PatternForm
