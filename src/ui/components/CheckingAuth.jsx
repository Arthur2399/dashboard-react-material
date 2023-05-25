import { CircularProgress, Grid, Typography } from '@mui/material';

export const CheckingAuth = ({ msg = "Cargando ..." }) => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
        >
            <Grid container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <CircularProgress sx={{ color: "white", mb: 2 }} />
                <Typography color="white">{msg}</Typography>
            </Grid>
        </Grid>
    )
}
