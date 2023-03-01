import { Grid, Typography } from "@mui/material"

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
                container
                backgroundColor="white"
                flexDirection="row"
                borderRadius={5}
                overflow="hidden"
                width={800}
            >
                <Grid
                    item
                    xs={0}
                    sm={6}
                    sx={{ display: { sm: "block", xs: "none" } }}
                >
                    <img
                        src="https://d11cuk1a0j5b57.cloudfront.net/blog/wp-content/uploads/2013/02/23171033/oficina-1800x1200-1.jpg"
                        alt="A beautiful landscape."
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
