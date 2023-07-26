import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { Autocomplete, Box, Button, TextField, useMediaQuery } from "@mui/material";

import { getIcons } from "../../../../helpers";
import { Header } from "../../components";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";

export const AccountingEntriesForm = () => {

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const icons = getIcons();

    return (
        <>
            <Header title="Crear asiento contable" subtitle="Crea los asientos conatables." />
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
                            {/* TIPO DE MOVIMIENTO */}
                            <Autocomplete
                                options={[]}
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
                                        label="Tipo de movimiento"
                                        placeholder="Busque y seleccione tipo de movimiento"
                                        name="identification_type_id"
                                        /*
                                        TODO: Manejar los errores desde el Backend
                                        error={errors.identification_type_id && touched.identification_type_id || !!errorAtributes.identification_type_id}
                                        helperText={errors.identification_type_id && touched.identification_type_id && errors.identification_type_id || errorAtributes.identification_number} */
                                        variant="filled" />} />

                            {/* TIPO DE NUMERO */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Tipo número"
                                placeholder="ingrese tipo número"
                                name="identification_number"
                                sx={{ gridColumn: "span 2 " }}
                            /* error={errors.identification_number && touched.identification_number || !!errorAtributes.identification_number}
                            helperText={errors.identification_number && touched.identification_number && errors.identification_number || errorAtributes.identification_number} */
                            />

                            {/* REFERENCIA */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Referencia"
                                placeholder="Ingrese referencia"
                                name="identification_number"
                                sx={{ gridColumn: "span 2 " }}
                            /* error={errors.identification_number && touched.identification_number || !!errorAtributes.identification_number}
                            helperText={errors.identification_number && touched.identification_number && errors.identification_number || errorAtributes.identification_number} */
                            />

                            {/* DESCRIPCION */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Descripcion"
                                placeholder="Ingrese descripcion"
                                name="identification_number"
                                sx={{ gridColumn: "span 2 " }}
                            /* error={errors.identification_number && touched.identification_number || !!errorAtributes.identification_number}
                            helperText={errors.identification_number && touched.identification_number && errors.identification_number || errorAtributes.identification_number} */
                            />

                            {/* FECHA DE ASIENTO */}
                            <DatePicker
                                label="Fecha de asiento"
                                slotProps={{ textField: { variant: 'filled' } }}
                                sx={{ gridColumn: "span 2" }}
                                format="yyyy-MM-dd"
                                name='date_start'
                            /*value={parse(values.date_start, 'yyyy-MM-dd', new Date())}
                             onChange={(event) => {
                                const newDate = format(new Date(event), 'yyyy-MM-dd')
                                setFieldValue('date_start', newDate);
                            }}
                            error={errors.date_start && touched.date_start} */
                            />

                            {/* CENTRO DE COSTOS */}
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
                                        label="Centro de costos"
                                        placeholder="Busque y seleccione una opción"
                                        name="identification_type_id"
                                        /*
                                        TODO: Manejar los errores desde el Backend
                                        error={errors.identification_type_id && touched.identification_type_id || !!errorAtributes.identification_type_id}
                                        helperText={errors.identification_type_id && touched.identification_type_id && errors.identification_type_id || errorAtributes.identification_number} */
                                        variant="filled" />} />

                            {/* BENEFICIARIO */}
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
                                        label="Beneficiario"
                                        placeholder="Busque y seleccione un beneficiario"
                                        name="identification_type_id"
                                        /*
                                        TODO: Manejar los errores desde el Backend
                                        error={errors.identification_type_id && touched.identification_type_id || !!errorAtributes.identification_type_id}
                                        helperText={errors.identification_type_id && touched.identification_type_id && errors.identification_type_id || errorAtributes.identification_number} */
                                        variant="filled" />} />

                            {/* TIPO PAGADO */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Tipo pagado"
                                placeholder="Ingrese tipo pagado"
                                name="identification_number"
                                sx={{ gridColumn: "span 2 " }}
                            /* error={errors.identification_number && touched.identification_number || !!errorAtributes.identification_number}
                            helperText={errors.identification_number && touched.identification_number && errors.identification_number || errorAtributes.identification_number} */
                            />

                            {/* NUMERO DE FACTURA */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Número de factura"
                                placeholder="Ingrese número de factura"
                                name="identification_number"
                                sx={{ gridColumn: "span 2 " }}
                            /* error={errors.identification_number && touched.identification_number || !!errorAtributes.identification_number}
                            helperText={errors.identification_number && touched.identification_number && errors.identification_number || errorAtributes.identification_number} */
                            />

                            {/* TIPO DE REVERSIÓN */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Tipo de reversión"
                                placeholder="Ingrese tipo de reversión"
                                name="identification_number"
                                sx={{ gridColumn: "span 2 " }}
                            /* error={errors.identification_number && touched.identification_number || !!errorAtributes.identification_number}
                            helperText={errors.identification_number && touched.identification_number && errors.identification_number || errorAtributes.identification_number} */
                            />

                            {/* OBRA */}
                            <Autocomplete
                                options={[{ value: 1, label: "Si" }]}
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
                                        label="Obra"
                                        placeholder="Busque y seleccione una obra"
                                        name="identification_type_id"
                                        /*
                                        TODO: Manejar los errores desde el Backend
                                        error={errors.identification_type_id && touched.identification_type_id || !!errorAtributes.identification_type_id}
                                        helperText={errors.identification_type_id && touched.identification_type_id && errors.identification_type_id || errorAtributes.identification_number} */
                                        variant="filled" />} />

                        </Box>

                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="button" onClick={() => { navigate('/contabilidad/movimientos/asientosContables/') }} title="Cancelar" color="primary" variant="outlined" sx={{ mr: 1 }}>
                                {icons["ArrowBackIcon"]()}
                            </Button>
                            <Button type="button" title="Reiniciar" color="primary" variant="outlined" sx={{ mr: 1 }}
                                onClick={resetForm}
                            >
                                {icons["RestartAltIcon"]()}
                            </Button>
                            <Button type="button" onClick={() => { navigate('/contabilidad/movimientos/asientosContables/') }} title="Crear" color="primary" variant="contained" sx={{ mr: 1 }}>
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
