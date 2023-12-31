import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Form, Formik } from 'formik';
import { DatePicker } from '@mui/x-date-pickers';
import { format, parse } from 'date-fns';

import { Autocomplete, Box, Button, TextField, useMediaQuery } from '@mui/material';

import { Header } from '../../components';
import { getIcons } from '../../../../helpers';
import { useContractStore } from '../../../../store';
import { useGetComboxBox } from '../helpers/useGetComboxBox';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { AlertMessage } from '../../../components/AlertMessage';

export const ContractForm = () => {

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();

    const [initialState, setInitialState] = useState([{
        id: 0,
        client_id: null,
        company_id: null,
        date_end: new Date(),
        date_start: new Date(),
        payment_places_id: null,
    }])

    const { active, isLoading, errorMessage, serverMessage, startSavingContract } = useContractStore();
    const { user, payForm, startGetClients, startGetPayForm } = useGetComboxBox();
    const icons = getIcons();

    const onSaveContract = (contractData) => {
        startSavingContract(contractData);
    }

    const titleForm = useMemo(() => {
        if (active.id != 0) return `Editar contrato ${active.name}`;
        return 'Crear nuevo contrato';
    }, [active])

    useEffect(() => {
        if (active !== null) {
            setInitialState({ ...active });
        }
    }, [active]);

    useEffect(() => {
        startGetClients();
        startGetPayForm();
    }, [])


    return (
        <Box className="animate__animated animate__fadeIn">
            <Header title={titleForm} subtitle="Cree un nuevo contrato para tus clientes." />
            <Formik
                initialValues={initialState}
                enableReinitialize
                /*validationSchema={validationSchema} */
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
                            {/* Cliente*/}
                            <Autocomplete
                                options={user}
                                getOptionLabel={(option) => option.label}
                                value={user.find((option) => option.value === values.client_id) || null}
                                onBlur={() => setFieldTouched('client_id', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('client_id', newValue ? newValue.value : null);
                                }}
                                sx={{ gridColumn: "span 2" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Cliente"
                                        placeholder="Busque y seleccione a un cliente"
                                        name="client_id"
                                        error={errors.client_id && touched.client_id}
                                        helperText={errors.client_id && touched.client_id && errors.client_id}
                                        variant="filled"
                                    />}
                            />

                            {/* Plazos de pago*/}
                            <Autocomplete
                                options={payForm}
                                getOptionLabel={(option) => option.label}
                                value={payForm.find((option) => option.value === values.payment_places_id) || null}
                                onBlur={() => setFieldTouched('payment_places_id', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('payment_places_id', newValue ? newValue.value : null);
                                }}
                                sx={{ gridColumn: "span 2" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Forma de pago"
                                        placeholder="Busque y seleccione la forma de pago"
                                        name="payment_places_id"
                                        error={errors.payment_places_id && touched.payment_places_id}
                                        helperText={errors.payment_places_id && touched.payment_places_id && errors.payment_places_id}
                                        variant="filled"
                                    />}
                            />
                            {/* Fecha de incio */}
                            <DatePicker
                                label="Fecha de inicio"
                                slotProps={{ textField: { variant: 'filled' } }}
                                sx={{ gridColumn: "span 2" }}
                                format="yyyy-MM-dd"
                                name='date_start'
                                value={parse(values.date_start, 'yyyy-MM-dd', new Date())}
                                onChange={(event) => {
                                    const newDate = format(new Date(event), 'yyyy-MM-dd')
                                    setFieldValue('date_start', newDate);
                                }}
                                error={errors.date_start && touched.date_start}
                                helperText={errors.date_start && touched.date_start && errors.date_start}
                            />

                            {/* Fecha fin */}
                            <DatePicker
                                label="Fecha de finalización"
                                slotProps={{ textField: { variant: 'filled' } }}
                                sx={{ gridColumn: "span 2" }}
                                format="yyyy-MM-dd"
                                name='date_end'
                                value={parse(values.date_end, 'yyyy-MM-dd', new Date())}
                                onChange={(event) => {
                                    const newDate = format(new Date(event), 'yyyy-MM-dd')
                                    setFieldValue('date_end', newDate);
                                }}
                                error={errors.date_end && touched.date_end}
                                helperText={errors.date_end && touched.date_end && errors.date_end}
                            />

                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="button" onClick={() => { navigate('/suscripciones/contratos') }} title="Cancelar" color="primary" variant="outlined" sx={{ mr: 1 }}>
                                {icons['ArrowBackIcon']()}
                            </Button>
                            <Button type="button" title="Reiniciar" color="primary" variant="outlined" sx={{ mr: 1 }}
                                onClick={resetForm}
                            >
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
