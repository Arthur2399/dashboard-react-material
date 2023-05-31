import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';


import { usePlanStore } from '../../../../store/modules/suscripciones/hooks/usePlanStore';
import { Header } from '../../components';

import { Box, Button, TextField, useMediaQuery } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { AlertMessage } from '../../../components/AlertMessage';

export const PlansForm = () => {

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();

    const { active, isLoading, errorMessage, serverMessage, startSavingPlan, startClearMessage } = usePlanStore()

    const [initialState, setInitialState] = useState({
        id: 0,
        company: '',
        company_id: null,
        code: '',
        value: '',
        name: '',
        state: null,
        created_at: '',
        updated_at: ''
    });

    const onSavePlan = (plan) => {
        startSavingPlan(plan);
    }
    const titleForm = useMemo(() => {
        if (active.id != 0) return `Editar a ${active.name}`;
        return 'Crear cliente';
    }, [active])

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
            <Header title={titleForm} subtitle="Crea plan para ofrecer a tu clientes." />
            <Formik
                initialValues={initialState}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    onSavePlan(values)
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

                            {/* VALOR */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                disabled
                                label="Valor"
                                placeholder="Ingrese el valor"
                                name="value"
                                error={errors.value && touched.value}
                                helperText={errors.value && touched.value && errors.value}
                                sx={{ gridColumn: "span 4" }}
                            />

                        </Box>

                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button onClick={() => { navigate(-1) }} type="button" title="Cancelar" color="primary" variant="outlined" sx={{ mr: 1 }}>
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

const validationSchema = Yup.object().shape({
    code: Yup.string()
        .min(1, 'El código debe tener al menos 1 carácter')
        .required('Ingrese un código'),
    name: Yup.string()
        .min(8, 'El nombre debe tener al menos 8 carácteres')
        .required('Este campo es obligatorio debe ingresar el nombre'),
});
