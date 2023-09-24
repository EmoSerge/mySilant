import { createTheme, lighten } from "@mui/material";

const theme = createTheme({
    components: {
        
        MuiButton: {
            styleOverrides: {
                root: {
                    
                        backgroundColor: "var(--secondary_color)",
                        fontFamily: "Astra, Inter, sans",
                        textTransform: "none",
                        borderRadius: "2px",
                        padding: "0 25px",
                        color: "var(--bg_color)",
                        maxHeight: "45px",
                        minHeight: "35px",

                        "&:hover": {
                            backgroundColor: lighten('#D20A11', 0.3),
                        }
                    
                }
            },
        }
    }
})

export { theme };