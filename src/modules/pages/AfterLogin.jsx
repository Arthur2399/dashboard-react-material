import { Box, Button, FormControl, Grid, InputLabel, Link, MenuItem, Select, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom';
import afterLoginGif from '/assets/img/after-login.gif'




export const AfterLogin = () => {




  const onCompanySelect = (e) => {
    e.preventDefault();

  }



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
            src={afterLoginGif}
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
          <Typography variant='h5' sx={{ mb: 0, color: "primary.main" }} textAlign="center">Seleccionar empresa</Typography>

          <Box component="form" onSubmit={onCompanySelect} noValidate sx={{ mt: 2 }}>


            <FormControl variant="standard" sx={{ width: '100%', mb: 2 }}>
              <InputLabel id="demo-simple-select-standard-label">Empresa</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ width: '100%', mb: 2 }}>
              <InputLabel id="demo-simple-select-standard-label">Ejercicio fiscal</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>



            <Grid
              className="animate__animated animate__fadeIn"
              container
              sx={{ mt: 1 }}>
              <Grid
                item
                xs={12}
              >
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: 4 }}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item xs >
                <Link
                  color='inherit'
                  href="https://www.erassoluciones.com"
                  sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" }, }}
                >
                  Contáctanos
                </Link>
              </Grid>
              <Grid item>
                <Link
                  component={RouterLink}
                  color='inherit'
                  to="/auth/password-recovery"
                  sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" }, }}
                >
                  Cerrar sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}
