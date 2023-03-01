import { Grid, Typography } from "@mui/material"

export const AuthLayout = ({ children, title = '' }) => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
        >
            <Grid
                item
                xs={3}
                sx={{
                    width: { sm: 450 },
                    backgroundColor: 'white',
                    padding: 5,
                    borderRadius: 5
                }}>

                <Typography variant='h5' sx={{ mb: 0, color: "primary.main" }} textAlign="center">{title}</Typography>
                {children}
            </Grid>
        </Grid>
    )
}
