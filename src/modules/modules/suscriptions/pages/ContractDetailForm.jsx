import { Form, Formik } from 'formik';
import { Autocomplete, Box, Button, TextField, useMediaQuery } from '@mui/material';
import { getIcons } from '../../../../helpers';
import { Header } from '../../components';
import { useGetComboxBox } from '../helpers/useGetComboxBox';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const ContractDetailForm = () => {

    const icons = getIcons();

    const {startGetPlans, plans} = useGetComboxBox();
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const navigate = useNavigate();

    useEffect(() => {
        startGetPlans();
    }, [])
    

    return (
        <Box className="animate__animated animate__fadeIn">
            <Header title="Crear nuevo detalle de contrato" subtitle="Cree un nuevo contrato para tus clientes." />
            <Formik
                /* initialValues={initialState} */
                enableReinitialize
                initialValues={{detailPlan:''}}
                onSubmit={(values) => {
                    onSaveContract(values)
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

                            {/* Plazos de pago*/}
                            <Autocomplete
                                options={plans}
                                getOptionLabel={(option) => option.label}
                                value={plans.find((option) => option.value === values.detailPlan) || null}
                                onBlur={() => setFieldTouched('detailPlan', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('detailPlan', newValue ? newValue.value : null);
                                }}
                                sx={{ gridColumn: "span 4 " }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Planes"
                                        placeholder="Busque y seleccione un plan"
                                        name="detailPlan"
                                        error={errors.detailPlan && touched.detailPlan}
                                        helperText={errors.detailPlan && touched.detailPlan && errors.detailPlan}
                                        variant="filled"
                                    />}
                            />

                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="button" onClick={() => { navigate('/suscripciones/contratos/detalle/') }} title="Cancelar" color="primary" variant="outlined" sx={{ mr: 1 }}>
                                {icons['ArrowBackIcon']()}
                            </Button>
                            <Button type="button" title="Reiniciar" color="primary" variant="outlined" sx={{ mr: 1 }}
                                onClick={resetForm}
                            >
                                {icons["RestartAltIcon"]()}
                            </Button>
                            <Button type="submit" onClick={() => { navigate('/suscripciones/contratos/detalle/') }} title="Crear" color="primary" variant="contained" sx={{ mr: 1 }}>
                                {icons["SaveIcon"]({ sx: { mr: 1 } })}
                                Guardar
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
{/*             <LoadingSpinner isSaving={isLoading} message={"Guardando cambios, por favor espere..."} />
            <AlertMessage severity="error" title="¡Ha ocurrido un error!" message={errorMessage} />
            <AlertMessage severity="warning" title="¡Hubo un error en el servidor!" message={serverMessage} /> */}
        </Box>
    )
}
