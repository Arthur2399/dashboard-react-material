import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";

import { Header } from "../../components";
import { useGetComboxBox } from "../helpers/useGetComboxBox";
import { useServicesStore } from "../../../../store";

import { Autocomplete, Box, Button, TextField, useMediaQuery } from "@mui/material";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { AlertMessage } from "../../../components/AlertMessage";

export const ServiceForm = () => {

    const [initialState, setInitialState] = useState({
        id: 0,
        company_id: '',
        company: "",
        detailed_type_id: '',
        detailed_type: "",
        image_upload: '',
        internal_code: "",
        name: "",
        price: '',
        status: '',
        tax_id: '',
        tax: "",
        tracking_id: '',
        tracking: "",
    })

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();

    const { active, isLoading, errorMessage, serverMessage, startSavingService, startClearMessage } = useServicesStore();
    const { tax } = useGetComboxBox();

const onSaveService =(values) => {
    startSavingService(values);
}

    
    const titleForm = useMemo(() => {
        if ( active.id !=0 ) return `Editar a ${active.name}`;
        return 'Crear service';
    }, [ active ])
    
    useEffect(() => {
        if (active !== null) {
            setInitialState({ ...active });
        }
        
    }, [active])
    
    useEffect(() => {
        startClearMessage();
    }, [])
    return (
        <Box className="animate__animated animate__fadeIn">
            <Header title={titleForm} subtitle="Crea los servicios para tus planes." />
            <Formik
                initialValues={initialState}
                enableReinitialize
                /* validationSchema={validationSchema} */
                onSubmit={(values) => {
                    onSaveService(values)
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
                            {/* CODIGO INTERNO */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Código interno"
                                placeholder="Ingrese el código interno"
                                name="internal_code"
                                error={errors.internal_code && touched.internal_code}
                                helperText={errors.internal_code && touched.internal_code && errors.internal_code}
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
                                name="price"
                                error={errors.price && touched.price}
                                helperText={errors.price && touched.price && errors.price}
                                sx={{ gridColumn: "span 4" }}
                            />

                            {/* IMPUESTO */}
                            <Autocomplete
                                options={tax}
                                getOptionLabel={(option) => option.label}
                                value={tax.find((option) => option.value === values.tax_id) || null}
                                onBlur={() => setFieldTouched('tax_id', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('tax_id', newValue ? newValue.value : null);
                                }}
                                sx={{ gridColumn: "span 4" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Impuesto"
                                        placeholder="Busque y seleccione un impuesto"
                                        name="tax_id"
                                        error={errors.tax_id && touched.tax_id}
                                        helperText={errors.tax_id && touched.tax_id && errors.tax_id}
                                        variant="filled" />}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="button" onClick={() => { navigate(-1) }} title="Cancelar" color="primary" variant="outlined" sx={{ mr: 1 }}>
                                <ArrowBackIcon />
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
            <LoadingSpinner isSaving={isLoading} message={"Guardando cambios, por favor espere..."} />
            <AlertMessage severity="error" title="¡Ha ocurrido un error!" message={errorMessage} />
            <AlertMessage severity="warning" title="¡Hubo un error en el servidor!" message={serverMessage} />
        </Box>
    )
}
