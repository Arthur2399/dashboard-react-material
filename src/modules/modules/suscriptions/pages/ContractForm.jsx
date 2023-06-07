import { Field, Form, Formik } from 'formik';
import { Autocomplete, Box, Button, TextField, useMediaQuery } from '@mui/material';

export const ContractForm = () => {
    
    const isNonMobile = useMediaQuery("(min-width:600px)");

    return (
        <Box className="animate__animated animate__fadeIn">
        <Header title={titleForm} subtitle="Crea los clientes de tu negocio." />
        <Formik
            initialValues={initialState}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values) => {
                onSaveClient(values)
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
                            sx={{ gridColumn: "span 4 " }}
                        />

                        {/* TIPO DE DOCUMENTO */}
                        <Autocomplete
                            options={typeIdentification}
                            getOptionLabel={(option) => option.label}
                            value={typeIdentification.find((option) => option.value === values.identification_type_id) || null}
                            onBlur={() => setFieldTouched('identification_type_id', true)}
                            onChange={(event, newValue) => {
                                setFieldValue('identification_type_id', newValue ? newValue.value : null);
                            }}
                            sx={{ gridColumn: "span 2" }}
                            renderInput={(params) =>
                                <TextField {...params}
                                    label="Tipo de identificación"
                                    placeholder="Busque y tipo de identificacion"
                                    name="identification_type_id"
                                    error={errors.identification_type_id && touched.identification_type_id}
                                    helperText={errors.identification_type_id && touched.identification_type_id && errors.identification_type_id}
                                    variant="filled" />}
                        />
                        {/* CEDULA */}
                        <Field
                            as={TextField}
                            type="text"
                            fullWidth
                            variant="filled"
                            label="Cedula"
                            placeholder="Ingrese el numero de cédula"
                            name="identification_number"
                            error={errors.identification_number && touched.identification_number}
                            helperText={errors.identification_number && touched.identification_number && errors.identification_number}
                            sx={{ gridColumn: "span 2 " }}
                        />

                        {/* CELULAR */}
                        <Field
                            as={TextField}
                            type="text"
                            fullWidth
                            variant="filled"
                            label="Celular"
                            placeholder="Ingrese el celular"
                            name="phone"
                            inputProps={{
                                pattern: "[0-9]*",
                                maxLength: 10,
                                onKeyPress: handleKeyPress,
                            }}
                            error={errors.phone && touched.phone}
                            helperText={errors.phone && touched.phone && errors.phone}
                            sx={{ gridColumn: "span 4" }}
                        />

                        {/* DIRECCIÓN */}
                        <Field
                            as={TextField}
                            type="text"
                            fullWidth
                            variant="filled"
                            label="Dirección"
                            placeholder="Ingrese la dirección"
                            name="address"
                            error={errors.address && touched.address}
                            helperText={errors.address && touched.address && errors.address}
                            sx={{ gridColumn: "span 4" }}
                        />

                        {/* CORREO ELECTRONICO */}
                        <Field
                            as={TextField}
                            type="text"
                            fullWidth
                            variant="filled"
                            label="Correo electrónico"
                            placeholder="Ingrese el correo electrónico"
                            name="email"
                            error={errors.email && touched.email}
                            helperText={errors.email && touched.email && errors.email}
                            sx={{ gridColumn: "span 4" }}
                        />
                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                        <Button type="button" onClick={() => { navigate('/suscripciones/clientes') }} title="Cancelar" color="primary" variant="outlined" sx={{ mr: 1 }}>
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
