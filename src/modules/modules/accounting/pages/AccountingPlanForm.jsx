import { Autocomplete, Box, Modal, TextField, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getIcons } from "../../../../helpers";
import { Header } from "../../components";
import { Form, Formik } from "formik";

export const AccountingPlanForm = () => {

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const icons = getIcons();

    const onSaveAccountingPlan = () => {
        //TODO: Backend
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        focus: 'none',
        border: 'none',
        p: 4,
    };


    return (
        <Box className="animate__animated animate__fadeIn">
            <Header title="Crear cuenta contable" subtitle="Crea los clientes de tu negocio." />
            <Formik
            //initialValues={initialState}
            //enableReinitialize
            //validationSchema={validationSchema}
            /* onSubmit={(values) => {
                onSaveClient(values)
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
                            {/* TIPO DE DOCUMENTO */}
                            <Autocomplete
                                options={[]}
                                getOptionLabel={(option) => option.label}
                                value={[].find((option) => option.value === values.identification_type_id) || null}
                                onBlur={() => setFieldTouched('identification_type_id', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('identification_type_id', newValue ? newValue.value : null);
                                    setTypeIdentificationSelect(newValue);
                                }}
                                sx={{ gridColumn: "span 4" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Cuenta contable padre"
                                        placeholder="Busque seleccione una cuenta contable"
                                        name="identification_type_id"
                                        /*
                                        TODO: Manejar los errores desde el Backend
                                        error={errors.identification_type_id && touched.identification_type_id || !!errorAtributes.identification_type_id}
                                        helperText={errors.identification_type_id && touched.identification_type_id && errors.identification_type_id || errorAtributes.identification_number} */
                                        variant="filled" />} />

                            <Modal
                                open={true}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Text in a modal
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                    </Typography>
                                </Box>
                            </Modal>

                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}
