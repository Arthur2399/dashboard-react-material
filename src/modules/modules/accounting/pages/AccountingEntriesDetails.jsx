import { useParams, useNavigate } from "react-router-dom"
import { Field, Form, Formik } from "formik";
import { DatePicker } from "@mui/x-date-pickers";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { Autocomplete, Box, Button, IconButton, TextField, Tooltip, useMediaQuery } from "@mui/material";

import { Header } from "../../components";
import { getIcons } from "../../../../helpers";
import { customStyles } from "../../../helpers";
import { detalleAsientosConatable } from "../../../../data/modules/accounting/mockData";

export const AccountingEntriesDetails = () => {
    const { id } = useParams();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { colorDataGrid } = customStyles();
    const navigate = useNavigate();
    const icons = getIcons();
    
    const columns = [
        {
            field: "code",
            headerName: "Codigo Cuenta",
            flex: 1
        },
        {
            field: "name_account",
            headerName: "Nombre Cuenta",
            flex: 1,
        },
        {
            field: "debit",
            headerName: "Débito",
            align: 'right',
            headerAlign: 'center',
            flex: 1,
        },
        {
            field: "credit",
            headerName: "Crédito",
            align: 'right',
            headerAlign: 'center',
            flex: 1,
        },
        {
            field: "benit",
            headerAlign: 'center',
            headerName: "Beneficiario",
            flex: 1,
            align: 'center',
        },
        {
            field: "avoice",
            headerName: "Factura",
            flex: 1,
            align: 'center',
        },

        {
            field: "commitment",
            headerName: "Compromiso",
            flex: 1,
            align: 'center',
        },
        
        {
            field: "budget_item",
            headerName: "Partida Presupuestaria",
            flex: 1,
            align: 'center',
        },
        {
            field: "name_budget",
            headerName: "Nombre Partida",
            flex: 1,
            align: 'center',
        },

        {
            field: "order",
            headerName: "Orden",
            flex: 1,
            align: 'center',
        },
        
        {
            field: "actions",
            headerName: "Opciones",
            align: 'center',
            sortable: false,
            headerAlign: "center",
            width: "150",
            disableColumnMenu: true,
            renderCell: (params) => {
                const handleEdit = () => {
                    startSetActivePlan(params.row);
                    navigate('formulario')
                };
                const handleDelete = () => {
                    // handle delete logic
                };
                const handleDetail = () => {
                    startSetHeaderPlan(params.row)
                    navigate('detalle')
                };
                return (
                    <>
                    <Tooltip title="Editar">
                            <IconButton >
                                {icons["EditIcon"]()}
                            </IconButton>
                        </Tooltip>
                    <Tooltip title="Eliminar">
                        <IconButton >
                            {icons["DeleteIcon"]()}
                        </IconButton>
                    </Tooltip>


                    </>
                );
            },
        },
    ];
    return (
        <>
            <Header title="Detalle del asiento contable AV-484" subtitle="Edita y crea asientos contables." />
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
                            {/* CUENTA CONTABLE */}
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
                                        label="Cuenta contable"
                                        placeholder="Busque y seleccione la cuenta contable"
                                        name="identification_type_id"
                                        /*
                                        TODO: Manejar los errores desde el Backend
                                        error={errors.identification_type_id && touched.identification_type_id || !!errorAtributes.identification_type_id}
                                        helperText={errors.identification_type_id && touched.identification_type_id && errors.identification_type_id || errorAtributes.identification_number} */
                                        variant="filled" />} />

                            {/* DEBITO */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Debito"
                                placeholder="Ingrese debito"
                                name="identification_number"
                                sx={{ gridColumn: "span 1 " }}
                            /* error={errors.identification_number && touched.identification_number || !!errorAtributes.identification_number}
                            helperText={errors.identification_number && touched.identification_number && errors.identification_number || errorAtributes.identification_number} */
                            />

                            {/* CREDITO */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Credito"
                                placeholder="Ingrese credito"
                                name="identification_number"
                                sx={{ gridColumn: "span 1 " }}
                            /* error={errors.identification_number && touched.identification_number || !!errorAtributes.identification_number}
                            helperText={errors.identification_number && touched.identification_number && errors.identification_number || errorAtributes.identification_number} */
                            />

                            {/* BENEFICIARIO */}
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
                                        label="Beneficiario"
                                        placeholder="Busque y seleccione el beneficiario"
                                        name="identification_type_id"
                                        /*
                                        TODO: Manejar los errores desde el Backend
                                        error={errors.identification_type_id && touched.identification_type_id || !!errorAtributes.identification_type_id}
                                        helperText={errors.identification_type_id && touched.identification_type_id && errors.identification_type_id || errorAtributes.identification_number} */
                                        variant="filled" />} />

                            {/* FACTURA */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Factura"
                                placeholder="Ingrese factura"
                                name="identification_number"
                                sx={{ gridColumn: "span 1 " }}
                            /* error={errors.identification_number && touched.identification_number || !!errorAtributes.identification_number}
                            helperText={errors.identification_number && touched.identification_number && errors.identification_number || errorAtributes.identification_number} */
                            />

                            {/* FECHA */}
                            <DatePicker
                                label="Fecha"
                                slotProps={{ textField: { variant: 'filled' } }}
                                sx={{ gridColumn: "span 1" }}
                                format="yyyy-MM-dd"
                                name='date_start'
                            /*value={parse(values.date_start, 'yyyy-MM-dd', new Date())}
                             onChange={(event) => {
                                const newDate = format(new Date(event), 'yyyy-MM-dd')
                                setFieldValue('date_start', newDate);
                            }}
                            error={errors.date_start && touched.date_start} */
                            />

                            {/* CENTROS DE COSTOS */}
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
                                        label="Centros de costos"
                                        placeholder="Busque y seleccione el centro de costos"
                                        name="identification_type_id"
                                        /*
                                        TODO: Manejar los errores desde el Backend
                                        error={errors.identification_type_id && touched.identification_type_id || !!errorAtributes.identification_type_id}
                                        helperText={errors.identification_type_id && touched.identification_type_id && errors.identification_type_id || errorAtributes.identification_number} */
                                        variant="filled" />} />

                            {/* FECHA DE COMPROBANTE */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Fecha de comprobante"
                                placeholder="Ingrese fecha de comprobante"
                                name="identification_number"
                                sx={{ gridColumn: "span 1 " }}
                            /* error={errors.identification_number && touched.identification_number || !!errorAtributes.identification_number}
                            helperText={errors.identification_number && touched.identification_number && errors.identification_number || errorAtributes.identification_number} */
                            />

                            {/* FECHA POSTFECHADO */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Fecha posfechada"
                                placeholder="Ingrese credito"
                                name="identification_number"
                                sx={{ gridColumn: "span 1 " }}
                            /* error={errors.identification_number && touched.identification_number || !!errorAtributes.identification_number}
                            helperText={errors.identification_number && touched.identification_number && errors.identification_number || errorAtributes.identification_number} */
                            />

                            {/* TIPO DE COMPROBANTE */}
                            <Autocomplete
                                options={[]}
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
                                        label="Tipo de comprobante"
                                        placeholder="Busque y seleccione una opcion"
                                        name="identification_type_id"
                                        /*
                                        TODO: Manejar los errores desde el Backend
                                        error={errors.identification_type_id && touched.identification_type_id || !!errorAtributes.identification_type_id}
                                        helperText={errors.identification_type_id && touched.identification_type_id && errors.identification_type_id || errorAtributes.identification_number} */
                                        variant="filled" />} />

                            {/* DESCRIPCION */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Descripción"
                                placeholder="Ingrese descripcion"
                                name="identification_number"
                                sx={{ gridColumn: "span 3 " }}
                            /* error={errors.identification_number && touched.identification_number || !!errorAtributes.identification_number}
                            helperText={errors.identification_number && touched.identification_number && errors.identification_number || errorAtributes.identification_number} */
                            />
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
                                {icons["AddCircleIcon"]({ sx: { mr: "10px" } })}
                                Agregar
                            </Button>
                        </Box>

                        <Box
                            m="0"
                            mt={5}
                            height="70vh"
                            sx={colorDataGrid}
                        >
                            <DataGrid
                                rows={detalleAsientosConatable}
                                columns={columns}
                                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                                getRowId={(row) => row.id}
                                density="compact"
                            />
                        </Box>
                    </Form>
                )}
            </Formik>
        </>
    )
}
