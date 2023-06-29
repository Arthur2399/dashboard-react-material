import { useNavigate } from "react-router-dom"
import { Field, Form, Formik } from "formik"
import * as Yup from 'yup';


import { Box, Button, TextField, useMediaQuery } from "@mui/material"

import { Header } from "../../components"
import { useClosingReasonStore } from "../../../../store"
import { LoadingSpinner, AlertMessage } from "../../../components"
import { useState } from "react"
import { useEffect } from "react"
import { useMemo } from "react"
import { getIcons } from "../../../../helpers";

export const ClosingReasonForm = () => {

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const icons = getIcons();
  const navigate = useNavigate();

  const {
    active,
    isLoading,
    errorMessage,
    serverMessage,
    startSavingReason,
    startClearMessage,
  } = useClosingReasonStore();

  const [initialState, setInitialState] = useState({
    id: 0,
    code: "",
    name: "",
    description: ""
  })

  const onSaveReason = (values) => {
    startSavingReason(values);
  }

  const titleForm = useMemo(() => {
    if (active?.id != 0) return `Editar a ${active?.name}`;
    return 'Crear razón de cierre';
  }, [active])

  useEffect(() => {
    if (active !== null) {
      setInitialState({ ...active });
    }
    else if (active == null) { navigate("/suscripciones/configuracion/razoncierre") }
  }, [active])

  useEffect(() => {
    startClearMessage();
  }, [])


  return (
    <Box className="animate__animated animate__fadeIn">
      <Header title={titleForm} subtitle="Crea las razones de cierre del contrato de tus clientes." />
      <Formik
        initialValues={initialState}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSaveReason(values)
        }}
      >
        {({ errors, touched, resetForm }) => (
          <Form>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {/* CODIGO*/}
              <Field
                as={TextField}
                type="text"
                fullWidth
                variant="filled"
                label="Código"
                placeholder="Ingrese el código"
                name="code"
                error={errors.code && touched.code}
                helperText={errors.code && touched.code && errors.code}
                sx={{ gridColumn: "span 4" }}
              />

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
                sx={{ gridColumn: "span 4" }}
              />

              {/* DESCRIPCIÓN */}
              <Field
                as={TextField}
                type="text"
                fullWidth
                variant="filled"
                label="Descripción"
                placeholder="Ingrese las descripción"
                name="description"
                error={errors.description && touched.description}
                helperText={errors.description && touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button onClick={() => { navigate("/suscripciones/configuracion/razoncierre") }} type="button" title="Cancelar" color="primary" variant="outlined" sx={{ mr: 1 }}>
                {icons["ArrowBackIcon"]()}
              </Button>
              <Button type="button" title="Reiniciar" color="primary" variant="outlined" sx={{ mr: 1 }}
                onClick={resetForm}>
                {icons["RestartAltIcon"]()}
              </Button>
              <Button type="submit" title="Crear" color="primary" variant="contained" sx={{ mr: 1 }}>
                {icons["SaveIcon"]({ sx: { mr: 1 } })}
                Guardar
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <LoadingSpinner isSaving={isLoading} message={"Guardando cambios, por favor espere..."} />
      <AlertMessage severity="error" title="¡Ha ocurrido un error!" message={errorMessage} />
      <AlertMessage severity="warning" title="¡Hubo un error en el servidor!" message={serverMessage} />
    </Box>
  )
}

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .min(1, 'El código debe tener al menos 1 caracter,')
    .required('Este campo es obligatorio.'),
  name: Yup.string()
    .min(8, 'El nombre debe tener al menos 8 caracteres.')
    .required('Este campo es obligatorio.'),
  description: Yup.string()
    .min(8, 'El nombre debe tener al menos 8 caracteres.')
    .required('Este campo es obligatorio.'),

});
