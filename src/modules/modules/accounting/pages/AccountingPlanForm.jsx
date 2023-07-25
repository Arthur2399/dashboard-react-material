import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { Autocomplete, Box, Button, Modal, TextField, Typography, useMediaQuery } from "@mui/material";

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

                            {/* NUMERO DE CUENTA */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Número de cuenta"
                                placeholder="Ingrese número de cuenta"
                                name="identification_number"
                                sx={{ gridColumn: "span 1 " }}
                            /* error={errors.identification_number && touched.identification_number || !!errorAtributes.identification_number}
                            helperText={errors.identification_number && touched.identification_number && errors.identification_number || errorAtributes.identification_number} */
                            />

                            {/* PORCENTAJE DE IVA */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Porcentaje de IVA"
                                placeholder="Ingrese porcentaje de IVA"
                                name="identification_number"
                                sx={{ gridColumn: "span 1 " }}
                            /* error={errors.identification_number && touched.identification_number || !!errorAtributes.identification_number}
                            helperText={errors.identification_number && touched.identification_number && errors.identification_number || errorAtributes.identification_number} */
                            />


                            {/* PORCENTAJE DE IVA */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Porcentaje de retención"
                                placeholder="Ingrese porcentaje de retención"
                                name="identification_number"
                                sx={{ gridColumn: "span 1 " }}
                            /* error={errors.identification_number && touched.identification_number || !!errorAtributes.identification_number}
                            helperText={errors.identification_number && touched.identification_number && errors.identification_number || errorAtributes.identification_number} */
                            />
                            {/* RENTA */}
                            <Autocomplete
                                options={[{ value: 1, label: "Si" }]}
                                getOptionLabel={(option) => option.label}
                                value={[].find((option) => option.value === values.identification_type_id) || null}
                                onBlur={() => setFieldTouched('identification_type_id', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('identification_type_id', newValue ? newValue.value : null);
                                    setTypeIdentificationSelect(newValue);
                                }}
                                sx={{ gridColumn: "span 2" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Renta"
                                        placeholder="Seleccione una opción"
                                        name="identification_type_id"
                                        /*
                                        TODO: Manejar los errores desde el Backend
                                        error={errors.identification_type_id && touched.identification_type_id || !!errorAtributes.identification_type_id}
                                        helperText={errors.identification_type_id && touched.identification_type_id && errors.identification_type_id || errorAtributes.identification_number} */
                                        variant="filled" />} />

                            {/* SALDO DEBITO */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Saldo debito"
                                placeholder="Ingrese saldo debito"
                                name="identification_number"
                                sx={{ gridColumn: "span 2 " }}
                            /* error={errors.identification_number && touched.identification_number || !!errorAtributes.identification_number}
                            helperText={errors.identification_number && touched.identification_number && errors.identification_number || errorAtributes.identification_number} */
                            />

                            {/* CRÉDITO */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Crédito"
                                placeholder="Ingrese el valor de crédito"
                                name="identification_number"
                                sx={{ gridColumn: "span 2 " }}
                            /* error={errors.identification_number && touched.identification_number || !!errorAtributes.identification_number}
                            helperText={errors.identification_number && touched.identification_number && errors.identification_number || errorAtributes.identification_number} */
                            />

                            {/* SALDO INICIAL DÉBITO */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Saldo inicial débito"
                                placeholder="Ingrese el valor de saldo inicila debito"
                                name="identification_number"
                                sx={{ gridColumn: "span 2 " }}
                            /* error={errors.identification_number && touched.identification_number || !!errorAtributes.identification_number}
                            helperText={errors.identification_number && touched.identification_number && errors.identification_number || errorAtributes.identification_number} */
                            />

                            {/* CRÉDITO */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Crédito"
                                placeholder="Ingrese el valor de crédito"
                                name="identification_number"
                                sx={{ gridColumn: "span 2 " }}
                            /* error={errors.identification_number && touched.identification_number || !!errorAtributes.identification_number}
                            helperText={errors.identification_number && touched.identification_number && errors.identification_number || errorAtributes.identification_number} */
                            />
                            {/* ASOSIACION PRESUPUESTARIA */}
                            <Autocomplete
                                options={[{ value: 1, label: "Si" }]}
                                getOptionLabel={(option) => option.label}
                                value={[].find((option) => option.value === values.identification_type_id) || null}
                                onBlur={() => setFieldTouched('identification_type_id', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('identification_type_id', newValue ? newValue.value : null);
                                    setTypeIdentificationSelect(newValue);
                                }}
                                sx={{ gridColumn: "span 2" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Asociación presupuestaria"
                                        placeholder="Seleccione una opción"
                                        name="identification_type_id"
                                        /*
                                        TODO: Manejar los errores desde el Backend
                                        error={errors.identification_type_id && touched.identification_type_id || !!errorAtributes.identification_type_id}
                                        helperText={errors.identification_type_id && touched.identification_type_id && errors.identification_type_id || errorAtributes.identification_number} */
                                        variant="filled" />} />

                            {/* PARTIDA PRESUPUESTARIA */}
                            <Autocomplete
                                options={[{ value: 1, label: "Si" }]}
                                getOptionLabel={(option) => option.label}
                                value={[].find((option) => option.value === values.identification_type_id) || null}
                                onBlur={() => setFieldTouched('identification_type_id', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('identification_type_id', newValue ? newValue.value : null);
                                    setTypeIdentificationSelect(newValue);
                                }}
                                sx={{ gridColumn: "span 2" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Partida presupuestaria"
                                        placeholder="Busque y seleccione una opción"
                                        name="identification_type_id"
                                        /*
                                        TODO: Manejar los errores desde el Backend
                                        error={errors.identification_type_id && touched.identification_type_id || !!errorAtributes.identification_type_id}
                                        helperText={errors.identification_type_id && touched.identification_type_id && errors.identification_type_id || errorAtributes.identification_number} */
                                        variant="filled" />} />

                            {/* MODAL DE CREAR CLIENTE */}
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

                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="button" onClick={() => { navigate('/contabilidad/planContable/') }} title="Cancelar" color="primary" variant="outlined" sx={{ mr: 1 }}>
                                {icons["ArrowBackIcon"]()}
                            </Button>
                            <Button type="button" title="Reiniciar" color="primary" variant="outlined" sx={{ mr: 1 }}
                                onClick={resetForm}
                            >
                                {icons["RestartAltIcon"]()}
                            </Button>
                            <Button type="button" onClick={() => { navigate('/contabilidad/planContable/') }} title="Crear" color="primary" variant="contained" sx={{ mr: 1 }}>
                                {icons["SaveIcon"]({ sx: { mr: 1 } })}
                                Guardar
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </>
    )
}
