"use client"
import { Box, Modal, TextField } from "@mui/material"
import { SetStateAction, } from "react"
import { useSearch } from "@/hooks/useSearch";

interface SearchProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>; 
}

const SearchBarModal: React.FC<SearchProps> = ({ open, setOpen }) => {
  const { searchText, setText } = useSearch();

  return (
      <>
          <Modal
              open={open}
              onClose={() => setOpen(false)}
              BackdropProps={{
                  sx: {
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      backdropFilter: "blur(5px)",
                  },
              }}
          >
              <Box
                  sx={{
                      position: "absolute",
                      top: "35%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "45%",
                      boxShadow: 24,
                      outline: "none",
                      border: "transparent",
                      borderRadius: 4,
                      // p: 4,
                  }}
              >
                  <TextField
                      fullWidth
                      className="bg-dkGrey"
                      onChange={(e: any) => {
                          const { target } = e
                          setText(target.value)
                      }}
                      placeholder="Type something..."
                      sx={{
                          borderRadius: 4,
                          "& .MuiOutlinedInput-root": {
                              height: 70,
                              color: "#FFF",
                              "&:hover fieldset": {
                                  outline: "none",
                                  borderColor: "transparent",
                              },
                              "&.Mui-focused fieldset": {
                                  outline: "none",
                                  borderColor: "transparent",
                              },
                              "& fieldset": {
                                  outline: "none",
                                  borderColor: "transparent",
                              },
                          },
                      }}
                      value={searchText}
                  />
              </Box>
          </Modal>
      </>
  )
}

export default SearchBarModal
