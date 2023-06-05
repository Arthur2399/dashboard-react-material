import { useState } from "react";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

import { Header } from "../../components";
import { Box, Button, TextField, useMediaQuery } from "@mui/material";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect } from "react";
import { usePaymentTermStore } from "../../../../store/modules/suscripciones/hooks/usePaymentTermStore";
import { useMemo } from "react";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { AlertMessage } from "../../../components/AlertMessage";

export const PaymentTermForm = () => {

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();

    const {startClearMessage, active, errorMessage, serverMessage, isLoading, startSavingPaymentTerm} = usePaymentTermStore()

    const [initialState, setInitialState] = useState({
        id: 0,
        company: null,
        company_id: null,
        value: '',
        name: "",
        code: "",
        description: "",
        discount: '',
        status: '',
        created_at: "",
        updated_at: '',
    })


    const onSavingPaymentTerm = (values) => {
        startSavingPaymentTerm(values)
    }

    useEffect(() => {
        startClearMessage()
    }, [])


    const titleForm = useMemo(() => {
        if ( active.id !=0 ) return `Editar a ${active.name}`;
        return 'Crear plazo de pago';
    }, [ active ])

    useEffect(() => {
        if (active !== null) {
            setInitialState({ ...active });
        }

    }, [active])
    

    return (
        <Box className="animate__animated animate__fadeIn">
            <Header title={titleForm} subtitle="Crea los plazos para que tus clientes puedan pagar." />
            <Formik
                initialValues={initialState}
                enableReinitialize
                /* validationSchema={validationSchema} */
                onSubmit={(values) => {
                    onSavingPaymentTerm(values)
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
                            {/* CODIGO */}
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
                                label="Nombre de plazo de pago"
                                placeholder="Ingrese el nombre"
                                name="name"
                                error={errors.name && touched.name}
                                helperText={errors.name && touched.name && errors.name}
                                sx={{ gridColumn: "span 4" }}
                            />
                            {/* NUMERO DE DIAS */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Número de días"
                                placeholder="Ingrese número de meses"
                                name="description"
                                error={errors.description && touched.description}
                                helperText={errors.description && touched.description && errors.description}
                                sx={{ gridColumn: "span 4" }}
                            />

                            {/* PORCENTAJE DE DESCUENTO */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Porcentaje de descuento"
                                placeholder="Ingrese porcentaje de descuento"
                                name="discount"
                                error={errors.discount && touched.discount}
                                helperText={errors.discount && touched.discount && errors.discount}
                                sx={{ gridColumn: "span 4" }}
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
