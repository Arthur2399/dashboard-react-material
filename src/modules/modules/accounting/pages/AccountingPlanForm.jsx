import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { Autocomplete, Box, Modal, TextField, Typography, useMediaQuery } from "@mui/material";

import { Header } from "../../components";
import { getIcons } from "../../../../helpers";

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
        <>
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
                            {/* CUENTA PADRE */}
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
                            {/* CUENTA */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Cuenta"
                                placeholder="Ingrese la cuenta"
                                name="identification_number"
                                sx={{ gridColumn: "span 2 " }}
                            /* error={errors.identification_number && touched.identification_number || !!errorAtributes.identification_number}
                            helperText={errors.identification_number && touched.identification_number && errors.identification_number || errorAtributes.identification_number} */
                            />
                            {/* NOMBRE */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Nombre"
                                placeholder="Ingrese nombre"
                                name="identification_number"
                                sx={{ gridColumn: "span 2 " }}
                            /* error={errors.identification_number && touched.identification_number || !!errorAtributes.identification_number}
                            helperText={errors.identification_number && touched.identification_number && errors.identification_number || errorAtributes.identification_number} */
                            />
                            {/* ULTIMO NIVEL */}
                            <Autocomplete
                                options={[{ value: 1, label: "Si" }]}
                                getOptionLabel={(option) => option.label}
                                value={[].find((option) => option.value === values.identification_type_id) || null}
                                onBlur={() => setFieldTouched('identification_type_id', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('identification_type_id', newValue ? newValue.value : null);
                                    setTypeIdentificationSelect(newValue);
                                }}
                                sx={{ gridColumn: "span 1" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Ultimo nivel"
                                        placeholder="Busque seleccione una cuenta contable"
                                        name="identification_type_id"
                                        /*
                                        TODO: Manejar los errores desde el Backend
                                        error={errors.identification_type_id && touched.identification_type_id || !!errorAtributes.identification_type_id}
                                        helperText={errors.identification_type_id && touched.identification_type_id && errors.identification_type_id || errorAtributes.identification_number} */
                                        variant="filled" />} />
                            {/* NIVEL CUENTA */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Nivel cuenta"
                                placeholder="Ingrese nombre"
                                name="identification_number"
                                sx={{ gridColumn: "span 1 " }}
                            /* error={errors.identification_number && touched.identification_number || !!errorAtributes.identification_number}
                            helperText={errors.identification_number && touched.identification_number && errors.identification_number || errorAtributes.identification_number} */
                            />
                            {/* ESTADO */}
                            <Autocomplete
                                options={[{ value: 1, label: "ACTIVO" }]}
                                getOptionLabel={(option) => option.label}
                                value={[].find((option) => option.value === values.identification_type_id) || null}
                                onBlur={() => setFieldTouched('identification_type_id', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('identification_type_id', newValue ? newValue.value : null);
                                    setTypeIdentificationSelect(newValue);
                                }}
                                sx={{ gridColumn: "span 1" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Estado"
                                        placeholder="Seleccione un estado"
                                        name="identification_type_id"
                                        /*
                                        TODO: Manejar los errores desde el Backend
                                        error={errors.identification_type_id && touched.identification_type_id || !!errorAtributes.identification_type_id}
                                        helperText={errors.identification_type_id && touched.identification_type_id && errors.identification_type_id || errorAtributes.identification_number} */
                                        variant="filled" />} />

                            {/* AUXILIAR */}
                            <Autocomplete
                                options={[{ value: 1, label: "NO" }]}
                                getOptionLabel={(option) => option.label}
                                value={[].find((option) => option.value === values.identification_type_id) || null}
                                onBlur={() => setFieldTouched('identification_type_id', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('identification_type_id', newValue ? newValue.value : null);
                                    setTypeIdentificationSelect(newValue);
                                }}
                                sx={{ gridColumn: "span 1" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Auxiliar"
                                        placeholder="Seleccione una opción"
                                        name="identification_type_id"
                                        /*
                                        TODO: Manejar los errores desde el Backend
                                        error={errors.identification_type_id && touched.identification_type_id || !!errorAtributes.identification_type_id}
                                        helperText={errors.identification_type_id && touched.identification_type_id && errors.identification_type_id || errorAtributes.identification_number} */
                                        variant="filled" />} />

                            {/* NIVEL MAYOR */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Nivel mayor"
                                placeholder="Ingrese nivel mayor"
                                name="identification_number"
                                sx={{ gridColumn: "span 1 " }}
                            /* error={errors.identification_number && touched.identification_number || !!errorAtributes.identification_number}
                            helperText={errors.identification_number && touched.identification_number && errors.identification_number || errorAtributes.identification_number} */
                            />

                            {/* CUENTA BANCARIA */}
                            <Autocomplete
                                options={[{ value: 1, label: "NO" }]}
                                getOptionLabel={(option) => option.label}
                                value={[].find((option) => option.value === values.identification_type_id) || null}
                                onBlur={() => setFieldTouched('identification_type_id', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('identification_type_id', newValue ? newValue.value : null);
                                    setTypeIdentificationSelect(newValue);
                                }}
                                sx={{ gridColumn: "span 1" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Cuenta bancaria"
                                        placeholder="Seleccione una opción"
                                        name="identification_type_id"
                                        /*
                                        TODO: Manejar los errores desde el Backend
                                        error={errors.identification_type_id && touched.identification_type_id || !!errorAtributes.identification_type_id}
                                        helperText={errors.identification_type_id && touched.identification_type_id && errors.identification_type_id || errorAtributes.identification_number} */
                                        variant="filled" />} />
                            {/* TIPO CUENTA BANCARIA */}
                            <Autocomplete
                                options={[{ value: 1, label: "Cta ahorros" }]}
                                getOptionLabel={(option) => option.label}
                                value={[].find((option) => option.value === values.identification_type_id) || null}
                                onBlur={() => setFieldTouched('identification_type_id', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('identification_type_id', newValue ? newValue.value : null);
                                    setTypeIdentificationSelect(newValue);
                                }}
                                sx={{ gridColumn: "span 1" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Tipo de cuenta bancaria"
                                        placeholder="Seleccione una opción"
                                        name="identification_type_id"
                                        /*
                                        TODO: Manejar los errores desde el Backend
                                        error={errors.identification_type_id && touched.identification_type_id || !!errorAtributes.identification_type_id}
                                        helperText={errors.identification_type_id && touched.identification_type_id && errors.identification_type_id || errorAtributes.identification_number} */
                                        variant="filled" />} />




                            <Modal
                                open={false}
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
        </>
    )
}
