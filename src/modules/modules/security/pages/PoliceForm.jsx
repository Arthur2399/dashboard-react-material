import { useState } from 'react';
import { Field, Form, Formik } from 'formik';

import { Header } from '../../components/Header';

import { Alert, AlertTitle, Box, Button, TextField, useMediaQuery } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';

export const PoliceForm = () => {
    const [alertMessage, setAlertMessage] = useState(false);
    const isNonMobile = useMediaQuery("(min-width:600px)");

    return (
        <Box className="animate__animated animate__fadeIn">
            <Header title="Crear UPC" subtitle="Crea una unidad policial que brinde apoyo a las comunidades." />
            <Formik
                initialValues={initialValues}
                /* validationSchema={validationSchema} */
                onSubmit={(values) => {
                    console.log(JSON.stringify(values))
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

                            {/* NOMBRE DE COMUNIDAD */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Nombre de comunidad"
                                placeholder="Ingrese el nombre de la comunidad"
                                name="communityName"
                                error={errors.communityName && touched.communityName}
                                helperText={errors.communityName && touched.communityName && errors.communityName}
                                sx={{ gridColumn: "span 4" }}
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
                /* onClick={() => { setAlertMessage(!alertMessage) }} */
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
    upcName: "",
    province: null,
    city: null,
    address: "",
    phone:"",
    cellphone: "",
}