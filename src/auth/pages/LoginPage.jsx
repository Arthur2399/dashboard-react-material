import { Alert, Button, Grid, Link, TextField } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from "../../hooks/useForm";
import { AuthLayout } from "../layout"

const loginData = {
  user: '',
  password: '',
}

export const LoginPage = () => {

  const errorMessage = ""
  const isAuthenticating = false


  const { formState, onInputChange, user, password } = useForm(loginData)

  return (
    <AuthLayout title="Ingresar">
      <form>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Usuario"
              type="text"
              placeholder="Ingrese su usuario"
              name="user"
              value={user}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Contraseña"
              type="password"
              placeholder="Ingrese su contraseña"
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid
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

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={12}>
              <Button
                disabled={isAuthenticating}
                type="submit"
                variant='contained'
                fullWidth>
                Ingresar
              </Button>
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Link
                component={RouterLink}
                sx={{
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                  mt: 2
                }}
                color='inherit' to="/auth/register">
                Olvidé mi contraseña
              </Link>
            </Grid>

          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
