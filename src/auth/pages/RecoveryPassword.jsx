import { Alert, Box, Button, Grid, Link, TextField } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from "../../hooks/useForm"
import { AuthLayout } from "../layout"
import passwordImg from '/assets/img/password.png';

const RecoveryPasswordData = {
  email: ""
}

export const RecoveryPassword = () => {

  const { onInputChange, formState, email, } = useForm(RecoveryPasswordData);
  const errorMessage = ""


  return (
    <AuthLayout title="Recuperar contraseña">
      <Box component="form" noValidate sx={{ mt: 2 }}>
        <Grid
          container
          justifyContent="center"
        >
          <img
            src={passwordImg}
            alt="password"
            className="animate__animated animate__pulse"
            style={{
              borderBottomRightRadius: 4,
              display: 'block',
              width: '80px',
              height: '80px',
              objectFit: "cover"

            }}
          />
        </Grid>
        <TextField
          autoComplete="email"
          fullWidth
          type="email"
          label="Correo electrónico"
          margin="normal"
          name="email"
          onChange={onInputChange}
          placeholder="Ingrese su correo electrónico"
          value={email}
          variant="standard"
        />

        <Grid
          className="animate__animated animate__fadeIn"
          container
          display={!!errorMessage ? '' : 'none'}
          sx={{ mt: 1 }}>
          <Grid
            item
            xs={12}
          >
            <Alert severity='error'>{errorMessage}</Alert>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, borderRadius: 4 }}
        >
          Recuperar
        </Button>
        <Grid container>
          <Grid item xs>
            <Link
              component={RouterLink}
              color='inherit'
              to="/auth/login"
              sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" }, }}
            >
              Ingresar
            </Link>

          </Grid>

          <Grid item >
            <Link
              color='inherit'
              href="https://www.erassoluciones.com"
              sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" }, }}
            >
              Contáctanos
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  )
}
