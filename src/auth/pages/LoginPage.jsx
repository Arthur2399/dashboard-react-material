import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextHelper from '@mui/material/FormHelperText';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { startLoginWithUserPassword } from '../../store/auth/thunks';
import { AuthLayout } from '../layout'
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


export const LoginPage = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State para mostrar contraseña escrita
  const [showPassword, setShowPassword] = useState(false);

  // Valores iniciales de authSlice.
  const { status, errorMessage } = useSelector(state => state.auth);
  const dispatch = useDispatch();


  // Verificador de estado al ejecutar petición.
  const isAuthenticating = useMemo(() => status === 'checking', [status]);
  /* NOTA
      La constante isAuthenticating almacena un boleano que cambiara su valor depeniendo 
      del valor de status, es decir que si status es 'checking' su valor será true pero si
      su valor es cualquier otro su valor será false.
  */

  // Función de flecha para actualizar estado de vista de contraseña
  const handleClickShowPassword = () => setShowPassword((show) => !show);


  const onLogin = (data) => {
    //TODO Buscar funcionalidad para el rememberme.
    dispatch(startLoginWithUserPassword(data));
  }

  return (
    <AuthLayout title="Iniciar sesión" imgSrc={loginGif}>

      {/* USERNAME */}
      <Box sx={{ mt: 2 }}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onLogin(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>

              {/* EMAIL */}
              <Field
                as={TextField}
                autoComplete="email"
                type="email"
                fullWidth
                variant="standard"
                margin="normal"
                label="Correo electrónico"
                placeholder="Ingrese su correo"
                name="email"
                error={errors.email && touched.email}
                helperText={errors.email && touched.email && errors.email}
              />

              {/* PASSWORD */}
              <FormControl sx={{ width: '100%', mb: 2 }} variant="standard">
                <InputLabel error={!!touched.password && !!errors.password} htmlFor="password">
                  Contraseña
                </InputLabel>
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Ingrese su contraseña"
                  autoComplete="current-password"
                  variant="standard"
                  error={touched.password && Boolean(errors.password)}
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
                <ErrorMessage name="password">
                  {(msg) => <TextHelper sx={{ color: 'red' }}>{msg}</TextHelper>}
                </ErrorMessage>
              </FormControl>

              {/* REMEMBERME */}
              <FormControlLabel
                control={<Checkbox
                  color="primary"
                  name="rememberme"
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
                sx={{ mt: 3, mb: 2, borderRadius: 4, background: colors.primary[400] }}
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
            </Form>
          )}
        </Formik>
      </Box>
    </AuthLayout>
  )
}

//Validaciones
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Ingrese un correo electrónico válido')
    .required('Ingrese su correo electrónico'),
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('Ingrese su contraseña'),
});