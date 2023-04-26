import * as Yup from 'yup';
import { Autocomplete, Box, Button, TextField, useMediaQuery } from "@mui/material"
import { Header } from "../../components"
import { Field, Form, Formik } from "formik";
import { useState } from 'react';
import { comunidadesCbx, rolesCbx } from '../../../../data/modules/security/mockDataSecurity';

export const UserForm = () => {

  const isNonMobile = useMediaQuery("(min-width:600px)");


  return (
    <Box className="animate__animated animate__fadeIn">
      <Header title="Crear usuario" subtitle="Crea los usuarios para que tengan acceso al aplicativo movil." />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(JSON.stringify(values))
        }}
      >
        {({ values, errors, touched, setFieldValue, setFieldTouched }) => (
          <Form>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4 }}
            >
              Enviar
            </Button>
          </Form>
        )}
      </Formik>
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