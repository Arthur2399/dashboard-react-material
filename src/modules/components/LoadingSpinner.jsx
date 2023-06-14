import { Box, CircularProgress, Dialog, Typography } from "@mui/material"

export const LoadingSpinner = ({ message, isSaving }) => {
    return (
        <Dialog
            PaperProps={{
                sx: {
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    elevation: 0,
                    boxShadow: 'none',
                },
            }}
            open={isSaving}
        >
            <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                <CircularProgress sx={{ color: "white" }} />
                <Typography sx={{ mt: 2, color: "white" }}>{message}</Typography>
            </Box>
        </Dialog>
    )
}
