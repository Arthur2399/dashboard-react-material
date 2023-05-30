import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { Header } from '../../components';

import { Autocomplete, Box, Button, TextField, useMediaQuery } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';


export const ClientsForm = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();


    const typeCIb = [
        {
            label: 'ci',
            value: 0
        }
        , {
            label: 'ruc',
            value: 0
        }
    ]


    return (
        <Box className="animate__animated animate__fadeIn">
            <Header title="Crear cliente" subtitle="Crea los clientes de tu negocio." />
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
                                error={errors.name && touched.name}
                                helperText={errors.name && touched.name && errors.name}
                                sx={{ gridColumn: "span 2" }}
                            />

                            {/* TIPO DE DOCUMENTO */}
                            <Autocomplete
                                options={typeCIb}
                                getOptionLabel={(option) => option.label}
                                /* value={typeCIb.find((option) => option.value === values.country_id) || null} */
                                onBlur={() => setFieldTouched('country_id', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('country_id', newValue ? newValue.value : null);
                                    setIdCountry(newValue.value)
                                }}
                                sx={{ gridColumn: "span 2" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Tipo de documento"
                                        placeholder="Busque y tipo de identificacion"
                                        name="country_id"
                                        error={errors.country_id && touched.country_id}
                                        helperText={errors.country_id && touched.country_id && errors.country_id}
                                        variant="filled" />}
                            />
                            {/* CEDULA */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Cedula"
                                placeholder="Ingrese el numero de cédula"
                                name="lastName"
                                error={errors.name && touched.name}
                                helperText={errors.name && touched.name && errors.name}
                                sx={{ gridColumn: "span 2 " }}
                            />


                            {/* CORREO ELECTRONICO */}
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

const handleKeyPress = (event) => {
    const regex = /[0-9]/g;
    const key = event.key;
    if (!regex.test(key)) {
        event.preventDefault();
    }
};