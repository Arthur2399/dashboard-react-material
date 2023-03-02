import { Grid, Typography } from "@mui/material"
import loginGif from '/assets/img/login.gif'

export const AuthLayout = ({ children, title = '' }) => {
    return (
        <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: "100vh", backgroundColor: "primary.main", paddingX: { sm: 10, xs: 4 } }}
        >

            <Grid
                className="animate__animated animate__fadeIn"
                container
                backgroundColor="white"
                flexDirection="row"
                borderRadius={5}
                overflow="hidden"
                width={930}
            >
                <Grid
                    item
                    xs={0}
                    sm={6}
                    backgroundColor="black"
                    sx={{ display: { sm: "block", xs: "none" } }}
                >
                    <img
                        src={loginGif}
                        alt="Login."
                        className="shadowLogin"
                        style={{
                            borderBottomRightRadius: 4,
                            display: 'block',
                            width: '100%',
                            height: '100%',
                            objectFit: "cover"

                        }}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{
                        padding: 5,
                    }}>
                    <Typography variant='h5' sx={{ mb: 0, color: "primary.main" }} textAlign="center">{title}</Typography>
                    {children}
                </Grid>
            </Grid>
        </Grid>
    )
}
