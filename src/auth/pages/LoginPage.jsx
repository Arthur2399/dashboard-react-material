import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Box, Button, Checkbox, FormControl, FormControlLabel, Grid, IconButton, Input, InputAdornment, InputLabel, Link, TextField } from "@mui/material"
import { useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from "../../hooks/useForm";
import { AuthLayout } from "../layout"

const loginData = {
  user: '',
  password: '',
}

export const LoginPage = () => {


  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const errorMessage = ""
  const isAuthenticating = false

  const { formState, onInputChange, user, password } = useForm(loginData)

  return (
    <AuthLayout title="Iniciar sesión">

      <Box component="form" noValidate sx={{ mt: 2 }}>
        <TextField
          autoComplete="user"
          autoFocus
          fullWidth
          label="Usuario"
          margin="normal"
          name="user"
          onChange={onInputChange}
          placeholder="Ingrese su usuario"
          value={user}
          variant="standard"
        />
        <FormControl sx={{ width: '100%', mb: 2 }} variant="standard">
          <InputLabel >Password</InputLabel>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Ingrese su contraseña"
            name="password"
            value={password}
            onChange={onInputChange}
            variant="standard"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Recuérdame"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, borderRadius: 4 }}
        >
          Ingresar
        </Button>
        <Grid container>
          <Grid item xs>
            <Link
              component={RouterLink}
              color='inherit'
              to="/auth/password-recovery"
              sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" }, }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </Grid>
          <Grid item>
            <Link
              color='inherit'
              href="https://www.erassoluciones.com"
              sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" }, }}
            >
              ¿Problemas?
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  )
}
