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
            main: "#FFFFFF",
        },
        four: {
            main: "#F5F5F5",
        },
        error: {
            main: red.A400
        }
    }
})
