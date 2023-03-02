import { useMemo, useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from "../../hooks/useForm";
import { AuthLayout } from "../layout"
import { Alert, Box, Button, Checkbox, FormControl, FormControlLabel, Grid, IconButton, Input, InputAdornment, InputLabel, Link, TextField } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

const loginData = {
  user: '',
  password: '',
  rememberme: false,
}

export const LoginPage = () => {

  const {status, errorMessage} = useSelector ( state=> state.auth);

  const dispatch = useDispatch();

  const isAuthenticating = useMemo( () => status === 'checking', [status]);

  const [showPassword, setShowPassword] = useState(false);
  const { formState, onInputChange, onInputChangeCheckBox, user, password, rememberme } = useForm(loginData);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onLogin = (e) => {
    e.preventDefault();
    console.log(formState);
    dispatch();
  }

  return (
    <AuthLayout title="Iniciar sesión">

      <Box component="form" onSubmit={onLogin} noValidate sx={{ mt: 2 }}>
        <TextField
          autoComplete="user"
          fullWidth
          label="Usuario"
          margin="normal"
          placeholder="Ingrese su usuario"
          variant="standard"
          name="user"
          value={user}
          onChange={onInputChange}
        />
        <FormControl sx={{ width: '100%', mb: 2 }} variant="standard">
          <InputLabel >Password</InputLabel>
          <Input
            placeholder="Ingrese su contraseña"
            type={showPassword ? 'text' : 'password'}
            variant="standard"
            name="password"
            value={password}
            onChange={onInputChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControlLabel
          control={<Checkbox
            color="primary"
            name="rememberme"
            value={rememberme}
            onChange={onInputChangeCheckBox}
          />}
          label="Recuérdame"
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
          disabled={isAuthenticating}
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
              Contáctanos
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  )
}
