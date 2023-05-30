import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";

import { Header } from "../../components";
import { Autocomplete, Box, Button, TextField, useMediaQuery } from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';

export const ServiceForm = () => {

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();

    const impuesto = [
        {
            label: 'IVA 12%',
            value: 1,
        },
        {
            label: 'IVA 0%',
            value: 1,
        }

    ]

    return (
        <Box className="animate__animated animate__fadeIn">
            <Header title="Crear servicios" subtitle="Crea los servicios para tus planes." />
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
                            {/* CODIGO INTERNO */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Código interno"
                                placeholder="Ingrese el código interno"
                                name="name"
                                error={errors.name && touched.name}
                                helperText={errors.name && touched.name && errors.name}
                                sx={{ gridColumn: "span 4" }}
                            />

                            {/* NOMBRE */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Nombre del servicio"
                                placeholder="Ingrese el nombre del servicio"
                                name="name"
                                error={errors.name && touched.name}
                                helperText={errors.name && touched.name && errors.name}
                                sx={{ gridColumn: "span 4" }}
                            />

                            {/*PRECIO */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Precio"
                                placeholder="Ingrese el precio"
                                name="name"
                                error={errors.name && touched.name}
                                helperText={errors.name && touched.name && errors.name}
                                sx={{ gridColumn: "span 4" }}
                            />

                            {/* IMPUESTO */}
                            <Autocomplete
                                options={impuesto}
                                getOptionLabel={(option) => option.label}
                                /* value={impuesto.find((option) => option.value === values.country_id) || null} */
                                onBlur={() => setFieldTouched('country_id', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('country_id', newValue ? newValue.value : null);
                                    setIdCountry(newValue.value)
                                }}
                                sx={{ gridColumn: "span 4" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Impuesto"
                                        placeholder="Busque y seleccione un impuesto"
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
                            <Button /* type="submit" */ onClick={() => { navigate(-1) }} title="Crear" color="primary" variant="contained" sx={{ mr: 1 }}>
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
