import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { startLoginWithUserPassword } from '../../store/auth/thunks';
import { useForm } from '../../hooks/useForm';

import { AuthLayout } from '../layout'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import loginGif from '/Img/login.gif';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Link,
  TextField,
  useTheme
} from '@mui/material';
import { tokens } from '../../theme';


//TODO Borrar los datos iniciales
const loginData = {
  username: '',
  password: '',
  rememberme: false,
}

export const LoginPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State para mostrar contraseña escrita
  const [showPassword, setShowPassword] = useState(false);

  // Valores iniciales de authSlice.
  const { status, errorMessage } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  // Hook de validación y obtención de data del formulario.
  const { onInputChange, onInputChangeCheckBox, username, password, rememberme } = useForm(loginData);

  // Verificador de estado al ejecutar petición.
  const isAuthenticating = useMemo(() => status === 'checking', [status]);
  /* NOTA
      La constante isAuthenticating almacena un boleano que cambiara su valor depeniendo 
      del valor de status, es decir que si status es 'checking' su valor será true pero si
      su valor es cualquier otro su valor será false.
  */

  // Función de flecha para actualizar estado de vista de contraseña
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Función de flecha realiza el dispatch para hacer el POST del login.
  const onLogin = (e) => {
    e.preventDefault();
    //TODO Buscar funcionalidad para el rememberme.
    dispatch(startLoginWithUserPassword({ username, password }));
  }

  return (
    <AuthLayout title="Iniciar sesión" imgSrc={loginGif}>

      {/* USERNAME */}
      <Box component="form" onSubmit={onLogin} noValidate sx={{ mt: 2 }}>
        <TextField
          autoComplete="username"
          fullWidth
          label="Usuario"
          margin="normal"
          placeholder="Ingrese su usuario"
          variant="standard"
          name="username"
          value={username}
          onChange={onInputChange}
        />

        {/* PASSWORD */}
        <FormControl sx={{ width: '100%', mb: 2 }} variant="standard">
          <InputLabel >Password</InputLabel>
          <Input
            placeholder="Ingrese su contraseña"
            type={showPassword ? 'text' : 'password'}
            variant="standard"
            name="password"
            value={password}
            autoComplete="current-password"
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

        {/* REMEMBERME */}
        <FormControlLabel
          control={<Checkbox
            color="primary"
            name="rememberme"
            value={rememberme}
            onChange={onInputChangeCheckBox}
          />}
          label="Recuérdame"
        />

        {/* ALERT BOX */}
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

        {/* LOG IN BUTTON */}
        <Button
          disabled={isAuthenticating}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, borderRadius: 4, background:colors.primary[400] }}
        >
          Ingresar
        </Button>

        {/* LINKS TO */}
        <Grid container>
          <Grid item xs>
            <Link
              component={RouterLink}
              color={colors.primary[400]}
              to="/auth/password-recovery"
              sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" }, }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </Grid>
          <Grid item>
            <Link
              color={colors.primary[400]}
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
