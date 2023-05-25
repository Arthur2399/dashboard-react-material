import { Alert, AlertTitle } from "@mui/material"

export const AlertMessage = ({ severity, title, message }) => {
    return (
        <Alert
            variant="filled"
            severity={severity}
            className='animate__animated animate__backInRight'
            sx={!!message ? {
                position: "fixed",
                top: "70px",
                right: "10px"
            } : { display: "none" }
            }>
            <AlertTitle>{title}</AlertTitle>
            {message}
        </Alert>
    )
}
