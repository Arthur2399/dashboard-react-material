import { Autocomplete, Box, Button, TextField, useMediaQuery } from "@mui/material";
import { Header } from "../../components";
import { Field, Form, Formik } from "formik";

import DeleteIcon from '@mui/icons-material/Delete';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from "react-router-dom";


export const PlansDetailsForm = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();

    const servCBX = [
        {
            label: 'Internet',
            value: 1,
        },
        {
            label: 'Mensajes',
            value: 2,
        },
        {
            label: 'Llamadas',
            value: 3,
        }
    ]

    const ivaCBX = [
        {
            label: 'IVA 12%',
            value: 1,
        },
        {
            label: 'IVA 0%',
            value: 2,
        },
    ]

    return (
        <Box className="animate__animated animate__fadeIn">
            <Header title="Crear nuevo detalle del plan" subtitle="Crea detalle de tus planes para ofrecer a tu clientes." />
            <Formik
            /* initialValues={initialValues}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values) => {
                onCreateUser(JSON.stringify(values))
            }} */
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

                            {/* Servicio*/}
                            <Autocomplete
                                options={servCBX}
                                getOptionLabel={(option) => option.label}
                                /* value={servCBX.find((option) => option.value === values.country_id) || null} */
                                onBlur={() => setFieldTouched('country_id', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('country_id', newValue ? newValue.value : null);
                                    setIdCountry(newValue.value)
                                }}
                                sx={{ gridColumn: "span 4" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Servicios"
                                        placeholder="Busque escoja un servicio"
                                        name="country_id"
                                        error={errors.country_id && touched.country_id}
                                        helperText={errors.country_id && touched.country_id && errors.country_id}
                                        variant="filled" />}
                            />
                            {/* CANTIDAD*/}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Cantidad"
                                placeholder="Ingrese la cantidad"
                                name="name"
                                error={errors.name && touched.name}
                                helperText={errors.name && touched.name && errors.name}
                                sx={{ gridColumn: "span 4" }}
                            />

                            {/* VALOR*/}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Valor"
                                placeholder="Ingrese el valor"
                                name="name"
                                error={errors.name && touched.name}
                                helperText={errors.name && touched.name && errors.name}
                                sx={{ gridColumn: "span 4" }}
                            />


                            {/* Iva*/}
                            <Autocomplete
                                options={ivaCBX}
                                getOptionLabel={(option) => option.label}
                                /* value={ivaCBX.find((option) => option.value === values.country_id) || null} */
                                onBlur={() => setFieldTouched('country_id', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('country_id', newValue ? newValue.value : null);
                                    setIdCountry(newValue.value)
                                }}
                                sx={{ gridColumn: "span 4" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Servicios"
                                        placeholder="Busque escoja un servicio"
                                        name="country_id"
                                        error={errors.country_id && touched.country_id}
                                        helperText={errors.country_id && touched.country_id && errors.country_id}
                                        variant="filled" />}
                            />
                        </Box>

                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="button" onClick={() => { navigate(-1) }} title="Cancelar" color="primary" variant="outlined" sx={{ mr: 1 }}>
                                <DeleteIcon />
                            </Button>
                            <Button type="button" title="Reiniciar" color="primary" variant="outlined" sx={{ mr: 1 }}
                                onClick={resetForm}
                            >
                                <RestartAltIcon />
                            </Button>
                            <Button /* type="submit" */ onClick={() => { navigate(-1) }} type='button' title="Crear" color="primary" variant="contained" sx={{ mr: 1 }}>
                                <SaveIcon sx={{ mr: 1 }} />
                                Guardar
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}
