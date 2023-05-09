import { Alert, AlertTitle, Autocomplete, Box, Button, TextField, useMediaQuery } from "@mui/material";
import { Header } from "../../components";
import { Field, Form, Formik } from "formik";

import DeleteIcon from '@mui/icons-material/Delete';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react";
import { cityCbx, provineCbx, userCbx } from "../../../../data/modules/security/mockDataSecurity";

export const CommunityForm = () => {

    const [alertMessage, setAlertMessage] = useState(false);
    const isNonMobile = useMediaQuery("(min-width:600px)");


    return (
        <Box className="animate__animated animate__fadeIn">
            <Header title="Crear comunidad" subtitle="Crea la comunidad para organizar a los usuarios." />
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

                            {/* CIUDAD */}
                            <Autocomplete
                                options={provineCbx}
                                getOptionLabel={(option) => option.label}
                                value={provineCbx.find((option) => option.value === values.country) || null}
                                onBlur={() => setFieldTouched('country', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('country', newValue ? newValue.value : null);
                                }}
                                sx={{ gridColumn: "span 4" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Pais"
                                        placeholder="Busque y escoja un pais"
                                        name="country"
                                        error={errors.country && touched.country}
                                        helperText={errors.country && touched.country && errors.country}
                                        variant="filled" />}
                            />

                            {/* PROVINCIA */}
                            <Autocomplete
                                options={provineCbx}
                                getOptionLabel={(option) => option.label}
                                value={provineCbx.find((option) => option.value === values.province) || null}
                                onBlur={() => setFieldTouched('province', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('province', newValue ? newValue.value : null);
                                }}
                                sx={{ gridColumn: "span 2" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Provincia"
                                        placeholder="Busque y escoja una provincia"
                                        name="province"
                                        error={errors.province && touched.province}
                                        helperText={errors.province && touched.province && errors.province}
                                        variant="filled" />}
                            />

                            {/* CIUDAD */}
                            <Autocomplete
                                options={cityCbx}
                                getOptionLabel={(option) => option.label}
                                value={cityCbx.find((option) => option.value === values.city) || null}
                                onBlur={() => setFieldTouched('city', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('city', newValue ? newValue.value : null);
                                }}
                                sx={{ gridColumn: "span 2" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Ciudad"
                                        placeholder="Busque y escoja una ciudad"
                                        name="city"
                                        error={errors.city && touched.city}
                                        helperText={errors.city && touched.city && errors.city}
                                        variant="filled" />}
                            />

                            {/* DIRECCIÓN */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Dirección"
                                placeholder="Ingrese la dirección de la comunidad"
                                name="address"
                                error={errors.address && touched.address}
                                helperText={errors.address && touched.address && errors.address}
                                sx={{ gridColumn: "span 4" }}
                            />

                            {/* MENSAJE VERDE */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                multiline
                                variant="filled"
                                label="Mensaje de prioridad baja"
                                minRows={5}
                                placeholder="Ingrese mensaje de prioridad baja"
                                name="messageGreen"
                                error={errors.messageGreen && touched.messageGreen}
                                helperText={errors.messageGreen && touched.messageGreen && errors.messageGreen}
                                sx={{ gridColumn: "span 4" }}
                            />

                            {/* MENSAJE AMARILLO*/}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                multiline
                                variant="filled"
                                label="Mensaje de prioridad media"
                                minRows={5}
                                placeholder="Ingrese mensaje de prioridad media"
                                name="messageYellow"
                                error={errors.messageYellow && touched.messageYellow}
                                helperText={errors.messageYellow && touched.messageYellow && errors.messageYellow}
                                sx={{ gridColumn: "span 4" }}
                            />

                            {/* MENSAJE Rojo */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                multiline
                                variant="filled"
                                label="Mensaje de prioridad alta"
                                minRows={5}
                                placeholder="Ingrese mensaje de prioridad alta"
                                name="messageRed"
                                error={errors.messageRed && touched.messageRed}
                                helperText={errors.messageRed && touched.messageRed && errors.messageRed}
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
    communityName: "",
    country:null,
    province: null,
    city: null,
    address: "",
    messageGreen: "",
    messageYellow: "",
    messageRed: "",
}