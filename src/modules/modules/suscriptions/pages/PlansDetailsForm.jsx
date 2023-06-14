import { Autocomplete, Box, Button, TextField, Typography, useMediaQuery } from "@mui/material";
import { Header } from "../../components";
import { Field, Form, Formik } from "formik";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePlanDetailsStore } from "../../../../store/modules/suscripciones/hooks/usePlanDetailsStore";
import { useGetComboxBox } from "../helpers/useGetComboxBox";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { AlertMessage } from "../../../components/AlertMessage";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../../theme";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';


export const PlansDetailsForm = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();

    const { active, startSavingPlanDetail, isLoading, errorMessage, serverMessage, startClearMessage } = usePlanDetailsStore();
    const { service, tax, serviceData, startGetServicesData } = useGetComboxBox()


    const [idService, setIdService] = useState(null);

    const [quantity, setQuantity] = useState('')
    const [value, setValue] = useState('')
    const [taxes, setTaxes] = useState('')

    const [subTotal, setSubTotal] = useState(0);
    const [iva, setIvA] = useState(0);
    const [total, setTotal] = useState(0);

    const [initialState, setInitialState] = useState({
        id: 0,
        plan_header: "",
        plan_header_id: "",
        product: "",
        product_id: "",
        tax: "",
        tax_id: "",
        quantity: "",
        value: "",
        sub_total: '',
        vat_total: '',
        total: '',
        code: '',
    })


    useEffect(() => {
        if (active !== null) {
            setInitialState({ ...active });
        }
    }, [active])

    useEffect(() => {
        if (idService != null) {
            startGetServicesData(idService);
        }
    }, [idService])

    useEffect(() => {
        if (serviceData != null) {
            setInitialState({ ...active, product_id: serviceData.id, value: serviceData.price, tax_id: serviceData.tax_id, });
            setValue(serviceData.price)
            setTaxes(serviceData.tax_id)
        }
    }, [serviceData])


    useEffect(() => {

        const taxValue = parseFloat(tax.find((tax) => tax.value === taxes)?.vat_value)

        const subtotalValue = value * parseFloat(quantity);
        const ivaValue = (subtotalValue * taxValue) / 100;
        const totalValue = subtotalValue + ivaValue;
        setSubTotal(subtotalValue)
        setIvA(ivaValue)
        setTotal(totalValue)
    }, [quantity,value,taxes])



    useEffect(() => {
        startClearMessage();
    }, [])

    const onSavePlanDetail = (detail) => {
        startSavingPlanDetail({...detail,sub_total: subTotal, vat_total: iva, total: total})
    }



    return (
        <Box className="animate__animated animate__fadeIn">
            <Header title="Crear nuevo detalle del plan" subtitle="Crea detalle de tus planes para ofrecer a tu clientes." />
            <Formik
                initialValues={initialState}
                enableReinitialize
                /* validationSchema={validationSchema} */
                onSubmit={(values) => {
                    onSavePlanDetail(values)
                }}
            >
                {({ values, errors, touched, setFieldValue, setFieldTouched, resetForm }) => (
                    <Form>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
                            }}
                        >

                            {/* Servicio*/}
                            <Autocomplete
                                options={service}
                                getOptionLabel={(option) => option.label}
                                value={service.find((option) => option.value === values.product_id) || null}
                                onBlur={() => setFieldTouched('product_id', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('product_id', newValue ? newValue.value : null);
                                    setIdService(newValue.value);
                                }}
                                sx={{ gridColumn: "span 2" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Servicios"
                                        placeholder="Busque escoja un servicio"
                                        name="product_id"
                                        error={errors.product_id && touched.product_id}
                                        helperText={errors.product_id && touched.product_id && errors.product_id}
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
                                name="quantity"
                                onChange={(event) => {
                                    const newValue = event.target.value;
                                    setFieldValue("quantity", newValue); // Actualiza el valor en Formik
                                    setQuantity(event.target.value);
                                }}
                                error={errors.quantity && touched.quantity}
                                helperText={errors.quantity && touched.quantity && errors.quantity}
                                sx={{ gridColumn: "span 2" }}
                            />

                            {/* VALOR*/}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Valor"
                                placeholder="Ingrese el valor"
                                name="value"
                                onChange={(event) => {
                                    const newValue = event.target.value;
                                    setFieldValue("value", newValue); // Actualiza el valor en Formik
                                    setValue(event.target.value);
                                }}
                                error={errors.value && touched.value}
                                helperText={errors.value && touched.value && errors.value}
                                sx={{ gridColumn: "span 2" }}
                            />


                            {/* Iva*/}
                            <Autocomplete
                                options={tax}
                                getOptionLabel={(option) => option.label}
                                value={tax.find((option) => option.value === values.tax_id) || null}
                                onBlur={() => setFieldTouched('tax_id', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('tax_id', newValue ? newValue.value : null);
                                    setTaxes(newValue.value);
                                }}
                                sx={{ gridColumn: "span 2" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="IVA"
                                        placeholder="Busque escoja el iva"
                                        name="tax_id"
                                        error={errors.tax_id && touched.tax_id}
                                        helperText={errors.tax_id && touched.tax_id && errors.tax_id}
                                        variant="filled" />}
                            />
                        </Box>


                        <Box display='flex' justifyContent='end' alignContent='end'>
                            <Box mt="20px"
                                sx={{
                                    padding: '20px',
                                    width: 'auto',
                                    borderRadius: '5px',
                                    backgroundColor: colors.grey[100],
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gridTemplateRows: 'repeat(3, 1fr)',
                                    gap: '10px',
                                }}
                            >
                                <Typography variant="h4" sx={{ justifySelf: 'end' }}><strong>Subtotal:</strong></Typography>
                                <Typography variant="h4">$ {isNaN(subTotal) ? 0 : subTotal.toFixed(2)}</Typography>
                                <Typography variant="h4" sx={{ justifySelf: 'end' }}><strong>IVA:</strong></Typography>
                                <Typography variant="h4">$ {isNaN(iva) ? 0 : iva.toFixed(2)}</Typography>
                                <Typography variant="h4" sx={{ justifySelf: 'end' }}><strong>Total:</strong></Typography>
                                <Typography variant="h4">$ {isNaN(total) ? 0 : total.toFixed(2)}</Typography>

                            </Box>

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
