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
        third: {
            main: "#E8D5C4",
        },
        error: {
            main: red.A400
        }
    }
})
