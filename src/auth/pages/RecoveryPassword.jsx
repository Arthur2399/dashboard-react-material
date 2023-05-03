import * as Yup from 'yup';
import { Alert, Box, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from "../layout"
import passwordImg from '/Img/password.png';
import loginGif from '/Img/login.gif'
import { Field, Form, Formik } from 'formik';



export const RecoveryPassword = () => {

  const errorMessage = ""

  const onPasswordRecovery = (data) => {
    //TODO Hacer peticion para recuperar contaseña
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Ingrese un correo electrónico válido')
      .required('Ingrese su correo electrónico')
  });


  return (
    <AuthLayout title="Recuperar contraseña" imgSrc={loginGif}>
      <Box sx={{ mt: 2 }}>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onPasswordRecovery(JSON.stringify(values));
          }}
        >
          {
            (
              { errors, touched }) => (
              <Form>
                <Grid
                  container
                  justifyContent="center"
                >
                  <Typography sx={{ textAlign: "center" }}>Por favor ingresa tu correo para reestrablecer tu contraseña.</Typography>
                  <img
                    src={passwordImg}
                    alt="password"
                    className="animate__animated animate__pulse"
                    style={{
                      marginTop: 25,
                      borderBottomRightRadius: 4,
                      display: 'block',
                      width: '80px',
                      height: '80px',
                      objectFit: "cover"

                    }}
                  />
                </Grid>
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
                  <Grid container justifyContent="end">
                    <Link
                      component={RouterLink}
                      color='inherit'
                      to="/auth/login"
                      sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" }, }}
                    >
                      Ingresar al sistema
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
