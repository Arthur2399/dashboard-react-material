import { Grid, Typography, useTheme } from "@mui/material"
import { tokens } from "../../theme";

export const AuthLayout = ({ children, title = '',imgSrc }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: "100vh", backgroundColor: colors.primary[400], paddingX: { sm: 10, xs: 4 } }}
        >

            <Grid
                className="animate__animated animate__fadeIn"
                container
                backgroundColor= {colors.grey[100]}
                flexDirection="row"
                borderRadius={5}
                overflow="hidden"
                width={930}
            >
                <Grid
                    item
                    xs={0}
                    sm={0}
                    md={6}
                    sx={{ display: {sm: "none", xs: "none", md:"block",backgroundColor:colors.primary[400]  } }}
                >
                    <img
                        src={imgSrc}
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
                    sm={12}
                    md={6}
                    sx={{
                        padding: 5,
                    }}>
                    <Typography variant='h5' sx={{ mb: 0, color: colors.primary[400] }} textAlign="center">{title}</Typography>
                    {children}
                </Grid>
            </Grid>
        </Grid>
    )
}
