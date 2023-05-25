import * as Yup from 'yup';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik"
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, useMediaQuery } from "@mui/material"
import TextHelper from '@mui/material/FormHelperText';

import SaveIcon from '@mui/icons-material/Save';

import { Header } from "../../components"
import { clearValues } from "../../../../store/modules/configuration/changePassword/changePasswordSlice";
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { AlertMessage } from '../../../components/AlertMessage';
import { AlertConfirm } from '../../../components/AlertConfirm';

export const PasswordChange = () => {

  const [showPassword, setShowPassword] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { isSaving, messageError, serverErrorMessage, confirm } = useSelector(state => state.changePassword);
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    dispatch(clearValues())
  }, [])

  const onChangePassword = (value) => {
    /* dispatch(startChangePassowrd(value)) */
  }

  const confirmLogout = () => {
    /* dispatch(startLogout()) */
  }

  return (
    <Box className="animate__animated animate__fadeIn">
      <Header title="Cambiar contraseña" subtitle="Cambie la contraseña para poder acceder al sistema." />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onChangePassword(values)
        }}
      >
        {({ values, errors, touched, resetForm }) => (
          <Form>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >

              {/* CONTRASEÑA ACTUAL */}
              <FormControl sx={{ gridColumn: "span 4 " }} variant="filled">
                <InputLabel error={!!touched.ant_pass && !!errors.ant_pass} htmlFor="ant_pass">Contraseña actual</InputLabel>
                < Field
                  as={FilledInput}
                  id="ant_pass"
                  placeholder="Escriba su contraseña"
                  type={showPassword ? 'text' : 'password'}
                  error={touched.ant_pass && Boolean(errors.ant_pass)}
                  name="ant_pass"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <ErrorMessage name="ant_pass">
                  {(msg) => <TextHelper sx={{ color: 'red' }}>{msg}</TextHelper>}
                </ErrorMessage>
              </FormControl>

              {/* NUEVA CONTRASEÑA */}
              <FormControl sx={{ gridColumn: "span 4 " }} variant="filled">
                <InputLabel error={!!touched.new_pass && !!errors.new_pass} htmlFor="new_pass">Nueva contraseña</InputLabel>
                < Field
                  as={FilledInput}
                  id="new_pass"
                  placeholder="Escriba su nueva contraseña"
                  type={showPassword ? 'text' : 'password'}
                  error={touched.new_pass && Boolean(errors.new_pass)}
                  name="new_pass"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <ErrorMessage name="new_pass">
                  {(msg) => <TextHelper sx={{ color: 'red' }}>{msg}</TextHelper>}
                </ErrorMessage>
              </FormControl>

              {/*REPETIR CONTRASEÑA */}
              <FormControl sx={{ gridColumn: "span 4 " }} variant="filled">
                <InputLabel error={!!touched.confirm_pass && !!errors.confirm_pass} htmlFor="confirm_pass">Repetir contraseña</InputLabel>
                < Field
                  as={FilledInput}
                  id="confirm_pass"
                  placeholder="Repita la contraseña"
                  type={showPassword ? 'text' : 'password'}
                  error={touched.confirm_pass && Boolean(errors.confirm_pass)}
                  name="confirm_pass"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <ErrorMessage name="confirm_pass">
                  {(msg) => <TextHelper sx={{ color: 'red' }}>{msg}</TextHelper>}
                </ErrorMessage>
              </FormControl>

            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" title="Crear" color="primary" variant="contained" sx={{ mr: 1 }}>
                <SaveIcon sx={{ mr: 1 }} />
                Guardar
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      <AlertMessage severity="warning" title="¡Hubo un error en el servidor!" message={serverErrorMessage} />
      <AlertMessage severity="error" title="¡Ha ocurrido un error!!" message={messageError} />
      <LoadingSpinner isSaving={isSaving} message={"Cambiando contraseña, por favor espere."} />
      <AlertConfirm
        title="Contraseña cambiada correctamente"
        message="Por su seguridad vamos a cerrar la sesión en todos los dispositivos, por favor vuelva a ingresar con las nuevas credenciales"
        confirm={confirm}
        buttonConfirm={confirmLogout}
      />
    </Box>
  )
}

const initialValues = {
  ant_pass: "",
  new_pass: "",
  confirm_pass: "",
}

//Validaciones
const validationSchema = Yup.object().shape({
  ant_pass: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('Ingrese la contraseña actual'),
  new_pass: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('Ingrese su  nueva contraseña'),
  confirm_pass: Yup.string()
    .oneOf([Yup.ref('new_pass'), null], 'Los campos deben ser iguales')
    .required('Repita la nueva contraseña contraseña'),
});