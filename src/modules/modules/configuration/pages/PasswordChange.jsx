import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik"
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, AlertTitle, Box, Button, FilledInput, FormControl, IconButton, Input, InputAdornment, InputLabel, useMediaQuery } from "@mui/material"

import DeleteIcon from '@mui/icons-material/Delete';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';

import { Header } from "../../components"

export const PasswordChange = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onChangePassword = () => {

  }


  return (
    <Box className="animate__animated animate__fadeIn">
      <Header title="Cambiar contraseña" subtitle="Cambie la contraseña para poder acceder al sistema." />
      <Formik
        initialValues={initialValues}
        //TODO hacer validaciones
        v/* alidationSchema={validationSchema} */
        onSubmit={(values) => {
          onChangePassword(JSON.stringify(values))
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
                <InputLabel htmlFor="current-password">Contraseña actual</InputLabel>
                < Field
                  as={FilledInput}
                  id="current-password"
                  placeholder="Escriba su contraseña"
                  type={showPassword ? 'text' : 'password'}
                  error={touched.password && Boolean(errors.password)}
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
                <ErrorMessage name="password">
                  {(msg) => <TextHelper sx={{ color: 'red' }}>{msg}</TextHelper>}
                </ErrorMessage>
              </FormControl>



            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="button" title="Cancelar" color="primary" variant="outlined" sx={{ mr: 1 }}>
                <DeleteIcon />
              </Button>
              <Button type="button" title="Reiniciar" color="primary" variant="outlined" sx={{ mr: 1 }}
                onClick={resetForm}
              >
                <RestartAltIcon />
              </Button>
              <Button type="submit" title="Crear" color="primary" variant="contained" sx={{ mr: 1 }}>
                <SaveIcon sx={{ mr: 1 }} />
                Guardar
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      <Alert
        variant="filled"
        severity="error"
        className='animate__animated animate__backInRight'
        onClick={() => { setAlertMessage(!alertMessage) }}
        sx={alertMessage === false ? { display: "none" }
          : {
            position: "fixed",
            top: "70px",
            right: "10px"
          }}>
        <AlertTitle>¡Error!</AlertTitle>
        Hubo un problema en el <strong>servidor.</strong>
      </Alert>
    </Box>
  )
}


const initialValues = {
  ant_pass: "",
  new_pass: "",
  confirm_pass: "",

}