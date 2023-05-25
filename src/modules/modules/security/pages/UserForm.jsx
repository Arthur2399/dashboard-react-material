import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';

import { Header } from "../../components"
import { Alert, AlertTitle, Autocomplete, Box, Button, TextField, useMediaQuery } from "@mui/material"
import { comunidadesCbx, rolesCbx } from '../../../../data/modules/security/mockDataSecurity';

import DeleteIcon from '@mui/icons-material/Delete';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';


export const UserForm = () => {

  const [alertMessage, setAlertMessage] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const onCreateUser = (data) => {
    setAlertMessage(!alertMessage)
    /* navigate("/seguridad/usuarios"); */
  }


  return (
    <Box className="animate__animated animate__fadeIn">
      <Header title="Crear usuario" subtitle="Crea los usuarios para que tengan acceso al aplicativo movil." />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onCreateUser(JSON.stringify(values))
        }}
      >
        {({ values, errors, touched, setFieldValue, setFieldTouched, resetForm }) => (
          <Form>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >

              {/* NOMBRE */}
              <Field
                as={TextField}
                type="text"
                fullWidth
                variant="filled"
                label="Nombre"
                placeholder="Ingrese el nombre"
                name="name"
                error={errors.name && touched.name}
                helperText={errors.name && touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />

              {/* APELLIDO */}
              <Field
                as={TextField}
                type="text"
                fullWidth
                variant="filled"
                label="Apellido"
                placeholder="Ingrese el apellido"
                name="lastName"
                error={errors.lastName && touched.lastName}
                helperText={errors.lastName && touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />

              {/* CORREO */}
              <Field
                as={TextField}
                type="text"
                fullWidth
                variant="filled"
                label="Correo electrónico"
                placeholder="Ingrese el correo electrónico"
                name="email"
                error={errors.email && touched.email}
                helperText={errors.email && touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />

              {/* NUMERO */}
              <Field
                as={TextField}
                type="text"
                fullWidth
                variant="filled"
                label="Número de celular"
                placeholder="Ingrese el número de celular"
                name="phone"
                error={errors.phone && touched.phone}
                inputProps={{
                  pattern: "[0-9]*",
                  maxLength: 10,
                  onKeyPress: handleKeyPress,
                }}
                helperText={errors.phone && touched.phone && errors.phone}
                sx={{ gridColumn: "span 4" }}
              />

              {/* COMUNIDAD */}
              <Autocomplete
                options={comunidadesCbx}
                getOptionLabel={(option) => option.label}
                value={comunidadesCbx.find((option) => option.value === values.communityId) || null}
                onBlur={() => setFieldTouched('communityId', true)}
                onChange={(event, newValue) => {
                  setFieldValue('communityId', newValue ? newValue.value : null);
                }}
                sx={{ gridColumn: "span 4" }}
                renderInput={(params) =>
                  <TextField {...params}
                    label="Comunidad"
                    placeholder="Busque y escoja una comunidad"
                    name="communityId"
                    error={errors.communityId && touched.communityId}
                    helperText={errors.communityId && touched.communityId && errors.communityId}
                    variant="filled" />}
              />

              {/* ROL */}
              <Autocomplete
                options={rolesCbx}
                getOptionLabel={(option) => option.label}
                value={rolesCbx.find((option) => option.value === values.rollId) || null}
                onBlur={() => setFieldTouched('rollId', true)}
                onChange={(event, newValue) => {
                  setFieldValue('rollId', newValue ? newValue.value : null);
                }}
                sx={{ gridColumn: "span 4" }}
                renderInput={(params) =>
                  <TextField {...params}
                    label="Rol comunitario"
                    placeholder="Escoja un rol"
                    name="rollId"
                    error={errors.rollId && touched.rollId}
                    helperText={errors.rollId && touched.rollId && errors.rollId}
                    variant="filled" />}
              />

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
  name: "",
  lastName: "",
  email: "",
  phone: "",
  communityId: null,
  rollId: null,
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'El nombre debe tener mínimo dos letras')
    .required('El nombre no puede estar vacío.'),
  lastName: Yup.string()
    .min(1, 'El apellido debe tener mínimo dos letras')
    .required('El apellido no puede estar vacío.'),
  email: Yup.string()
    .email('Ingrese un correo válido.')
    .required('El email no puede estar vacío.'),
  phone: Yup.string()
    .min(10, 'Ingrese un número de celular válido.')
    .required('El número de celular no puede estar vacío.'),
  communityId: Yup.string()
    .min(1, 'Debe seleccionar una comunidad')
    .required('Debe seleccionar una comunidad'),
  rollId: Yup.string()
    .min(1, 'Debe seleccionar un rol')
    .required('Debe seleccionar un rol'),
});

const handleKeyPress = (event) => {
  const regex = /[0-9]/g;
  const key = event.key;
  if (!regex.test(key)) {
    event.preventDefault();
  }
};