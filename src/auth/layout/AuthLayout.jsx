import { Grid, Typography, useTheme } from "@mui/material"
import { tokens } from "../../theme";
import { BorderLeftRounded } from "@mui/icons-material";

export const AuthLayout = ({ children, title = '', imgSrc }) => {
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
                flexDirection="row"
                overflow="hidden"
                width={930}
            >
                <Grid
                    overflow="hidden"
                    item
                    xs={0}
                    sm={0}
                    md={6}
                    sx={{
                        display: { sm: "none", xs: "none", md: "block", backgroundColor: colors.primary[400] },
                        borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px"
                    }}
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
                    backgroundColor="white"
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    sx={{
                        padding: 5,
                        borderTopRightRadius: { md: "20px", sm: "20px", xs: "20px" },
                        borderBottomRightRadius: { md: "20px", sm: "20px", xs: "20px" },
                        borderTopLeftRadius: { md: "0px", sm: "20px", xs: "20px" },
                        borderBottomLeftRadius: { md: "0px", sm: "20px", xs: "20px" },
                    }}>
                    <Typography variant='h4' sx={{ mb: 0, color: colors.primary[400] }} textAlign="center">{title}</Typography>
                    {children}
                </Grid>
            </Grid>
        </Grid>
    )
}
