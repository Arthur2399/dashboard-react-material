import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const blueTheme = createTheme({
    palette: {
        primary: {
            main: "#0A2647",
        },
        secondary: {
            main: "#144272",
        },
        error: {
            main: red.A400
        }
    }
})
