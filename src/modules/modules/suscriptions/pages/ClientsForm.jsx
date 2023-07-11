import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { Autocomplete, Box, Button, TextField, useMediaQuery } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { format, parse } from 'date-fns';

import { Header } from '../../components';
import { useGetComboxBox } from '../helpers';
import { useClientStore } from '../../../../store';
import { getIcons } from '../../../../helpers/getIcons';
import { AlertMessage, LoadingSpinner } from '../../../components';


export const ClientsForm = () => {

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const icons = getIcons();

    const [initialState, setInitialState] = useState({
        id: 0,
        address: "",
        birthdate: new Date(),
        cantons_id: "",
        cellphone1: "",
        cellphone2: "",
        comercial_name: "",
        company_id: "",
        country_id: "",
        email: "",
        first_name: "",
        gender_id: "",
        identification_number: "",
        identification_type_id: "",
        kind_person_id: "",
        last_name: "",
        name: "",
        phone: "",
        province_id: "",
        second_last_name: "",
        stratum_id: "",
        second_name: "",
    });

    const [countryId, setCountryId] = useState("")
    const [provinceId, setProvinceId] = useState("")

    /* Validacion de tipo de documento */
    const [typeIdentificationSelect, setTypeIdentificationSelect] = useState("")
    const valueTypeIdentNameLastname = 4;
    const valueTypeIdentReasonSocial = 1;

    console.log(typeIdentificationSelect)

    const { errorAtributes, active, isLoading, serverMessage, errorMessage, startSavingClient, startClearMessage, } = useClientStore();
    console.log(errorAtributes)
    const {
        gender,
        countries,
        province,
        cantons,
        typeIdentification,
        KindOfPerson,
        stratum,
        startGetGender,
        startGetIdentificationType,
        startGetCountries,
        startGetProvince,
        startGetCanton,
        startGetKindPerson,
        startGetStratum,
    } = useGetComboxBox();

    const onSaveClient = (client) => {
        startSavingClient(client);
    }

    const titleForm = useMemo(() => {
        if (active?.id != 0) return `Editar a ${active?.full_name}`;
        return 'Crear cliente';
    }, [active])


    useEffect(() => {
        if (active !== null) {
            setInitialState({ ...active });
            setCountryId(active.country_id)
            setProvinceId(active.province_id)
        }
        else if (active == null) { navigate("/suscripciones/clientes") }
    }, [active]);

    useEffect(() => {
        if (countryId == "") return;
        startGetProvince(countryId);
    }, [countryId])

    useEffect(() => {
        if (provinceId == "") return;
        startGetCanton(provinceId);
    }, [provinceId])


    useEffect(() => {
        startGetCountries();
        startGetIdentificationType();
        startGetGender();
        startGetKindPerson();
        startGetStratum(),
            startClearMessage();
    }, []);

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
                            {/* TIPO DE DOCUMENTO */}
                            <Autocomplete
                                options={typeIdentification}
                                getOptionLabel={(option) => option.label}
                                value={typeIdentification.find((option) => option.value === values.identification_type_id) || null}
                                onBlur={() => setFieldTouched('identification_type_id', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('identification_type_id', newValue ? newValue.value : null);
                                    setTypeIdentificationSelect(newValue);
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
                                disabled ={typeIdentificationSelect == ""}
                                label={`Número de ${typeIdentificationSelect.label}`}
                                placeholder="Ingrese el numero de identificación"
                                name="identification_number"
                                error={errors.identification_number && touched.identification_number || !!errorAtributes.identification_number}
                                helperText={errors.identification_number && touched.identification_number && errors.identification_number || errorAtributes.identification_number}
                                sx={{ gridColumn: "span 2 " }}
                            />
                            {/* RAZON SOCIAL */}
                            <Field
                                as={TextField}
                                disabled = {typeIdentificationSelect.value ==  valueTypeIdentReasonSocial || typeIdentificationSelect.value == ""}
                                error={errors.comercial_name && touched.comercial_name}
                                fullWidth
                                helperText={errors.comercial_name && touched.comercial_name && errors.comercial_name}
                                label="Razon social"
                                name="comercial_name"
                                placeholder="Ingrese la razon social"
                                sx={{ gridColumn: "span 4 " }}
                                type="text"
                                variant="filled"
                            />
                            {/* NOMBRE */}
                            <Field
                                as={TextField}
                                disabled = {typeIdentificationSelect.value ==  valueTypeIdentNameLastname || typeIdentificationSelect.value == ""}
                                error={errors.first_name && touched.first_name}
                                fullWidth
                                helperText={errors.first_name && touched.first_name && errors.first_name}
                                label="Nombre"
                                name="first_name"
                                placeholder="Ingrese el nombre"
                                sx={{ gridColumn: "span 2 " }}
                                type="text"
                                variant="filled"
                            />
                            {/* SEGUNDO NOMBRE */}
                            <Field
                                as={TextField}
                                disabled = {typeIdentificationSelect.value ==  valueTypeIdentNameLastname || typeIdentificationSelect.value == ""}
                                error={errors.second_name && touched.second_name}
                                fullWidth
                                helperText={errors.second_name && touched.second_name && errors.second_name}
                                label="Segundo nombre"
                                name="second_name"
                                placeholder="Ingrese el segudno nombre"
                                sx={{ gridColumn: "span 2 " }}
                                type="text"
                                variant="filled"
                            />
                            {/* APELLIDO */}
                            <Field
                                as={TextField}
                                disabled = {typeIdentificationSelect.value ==  valueTypeIdentNameLastname || typeIdentificationSelect.value == ""}
                                error={errors.last_name && touched.last_name}
                                fullWidth
                                helperText={errors.last_name && touched.last_name && errors.last_name}
                                label="Apellido"
                                name="last_name"
                                placeholder="Ingrese el apellido paterno"
                                sx={{ gridColumn: "span 2 " }}
                                type="text"
                                variant="filled"
                            />
                            {/* SEGUNDO APELLIDO */}
                            <Field
                                as={TextField}
                                disabled = {typeIdentificationSelect.value ==  valueTypeIdentNameLastname || typeIdentificationSelect.value == ""}
                                error={errors.second_last_name && touched.second_last_name}
                                fullWidth
                                helperText={errors.second_last_name && touched.second_last_name && errors.second_last_name}
                                label="Segundo apellido"
                                name="second_last_name"
                                placeholder="Ingrese el apellido materno"
                                sx={{ gridColumn: "span 2 " }}
                                type="text"
                                variant="filled"
                            />


                            {/* FECHA DE NACIMIENTO */}
                            <DatePicker
                                label="Fecha de nacimiento"
                                slotProps={{ textField: { variant: 'filled' } }}
                                sx={{ gridColumn: "span 2" }}
                                format="yyyy-MM-dd"
                                name='birthdate'
                                value={parse(values.birthdate, 'yyyy-MM-dd', new Date())}
                                onChange={(event) => {
                                    const newDate = format(new Date(event), 'yyyy-MM-dd')
                                    setFieldValue('birthdate', newDate);
                                }}
                                error={errors.birthdate && touched.birthdate}
                                helperText={errors.birthdate && touched.birthdate && errors.birthdate}
                            />

                            {/* SEXO */}
                            <Autocomplete
                                options={gender}
                                getOptionLabel={(option) => option.label}
                                value={gender.find((option) => option.value === values.gender_id) || null}
                                onBlur={() => setFieldTouched('gender_id', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('gender_id', newValue ? newValue.value : null);
                                }}
                                sx={{ gridColumn: "span 2" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Sexo"
                                        placeholder="Busque y seleccione tipo de genero"
                                        name="gender_id"
                                        error={errors.gender_id && touched.gender_id}
                                        helperText={errors.gender_id && touched.gender_id && errors.gender_id}
                                        variant="filled" />}
                            />



                            {/* TELEFONO */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Teléfono"
                                placeholder="Ingrese el teléfono"
                                name="phone"
                                inputProps={{
                                    pattern: "[0-9]*",
                                    maxLength: 10,
                                    onKeyPress: handleKeyPress,
                                }}
                                error={errors.phone && touched.phone}
                                helperText={errors.phone && touched.phone && errors.phone}
                                sx={{ gridColumn: "span 2" }}
                            />
                            {/* CELULAR */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Celular"
                                placeholder="Ingrese el celular"
                                name="cellphone1"
                                inputProps={{
                                    pattern: "[0-9]*",
                                    maxLength: 10,
                                    onKeyPress: handleKeyPress,
                                }}
                                error={errors.cellphone1 && touched.cellphone1}
                                helperText={errors.cellphone1 && touched.cellphone1 && errors.cellphone1}
                                sx={{ gridColumn: "span 2" }}
                            />
                            {/*SEGUNDO  CELULAR */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Segundo celular"
                                placeholder="Ingrese el celular"
                                name="cellphone2"
                                inputProps={{
                                    pattern: "[0-9]*",
                                    maxLength: 10,
                                    onKeyPress: handleKeyPress,
                                }}
                                error={errors.cellphone2 && touched.cellphone2}
                                helperText={errors.cellphone2 && touched.cellphone2 && errors.cellphone2}
                                sx={{ gridColumn: "span 2" }}
                            />

                            {/* TIPO DE PERSONA */}
                            <Autocomplete
                                options={KindOfPerson}
                                getOptionLabel={(option) => option.label}
                                value={KindOfPerson.find((option) => option.value === values.kind_person_id) || null}
                                onBlur={() => setFieldTouched('kind_person_id', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('kind_person_id', newValue ? newValue.value : null);
                                    setCountryId(newValue.value);
                                }}
                                sx={{ gridColumn: "span 2" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Tipo de persona"
                                        placeholder="Busque y seleccione un tipo de persona"
                                        name="kind_person_id"
                                        error={errors.kind_person_id && touched.kind_person_id}
                                        helperText={errors.kind_person_id && touched.kind_person_id && errors.kind_person_id}
                                        variant="filled" />}
                            />
                            {/* ESTATUS SOCIAL */}
                            <Autocomplete
                                options={stratum}
                                getOptionLabel={(option) => option.label}
                                value={stratum.find((option) => option.value === values.stratum_id) || null}
                                onBlur={() => setFieldTouched('stratum_id', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('stratum_id', newValue ? newValue.value : null);
                                    setCountryId(newValue.value);
                                }}
                                sx={{ gridColumn: "span 2" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Estrato social"
                                        placeholder="Busque y seleccione un estrato social"
                                        name="stratum_id"
                                        error={errors.stratum_id && touched.stratum_id}
                                        helperText={errors.stratum_id && touched.stratum_id && errors.stratum_id}
                                        variant="filled" />}
                            />

                            {/* PAIS */}
                            <Autocomplete
                                options={countries}
                                getOptionLabel={(option) => option.label}
                                value={countries.find((option) => option.value === values.country_id) || null}
                                onBlur={() => setFieldTouched('country_id', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('country_id', newValue ? newValue.value : null);
                                    setCountryId(newValue.value);
                                }}
                                sx={{ gridColumn: "span 2" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Pais"
                                        placeholder="Busque y seleccione un pais"
                                        name="country_id"
                                        error={errors.country_id && touched.country_id}
                                        helperText={errors.country_id && touched.country_id && errors.country_id}
                                        variant="filled" />}
                            />
                            {/* PROVINCIA */}
                            <Autocomplete
                                options={province}
                                disabled={countryId == ""}
                                getOptionLabel={(option) => option.label}
                                value={province.find((option) => option.value === values.province_id) || null}
                                onBlur={() => setFieldTouched('province_id', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('province_id', newValue ? newValue.value : null);
                                    setProvinceId(newValue.value)
                                }}
                                sx={{ gridColumn: "span 2" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Departamento"
                                        placeholder="Busque y seleccione un departamento"
                                        name="province_id"
                                        error={errors.province_id && touched.province_id}
                                        helperText={errors.province_id && touched.province_id && errors.province_id}
                                        variant="filled" />}
                            />
                            {/* CANTON */}
                            <Autocomplete
                                options={cantons}
                                disabled={provinceId == ""}
                                getOptionLabel={(option) => option.label}
                                value={cantons.find((option) => option.value === values.cantons_id) || null}
                                onBlur={() => setFieldTouched('cantons_id', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('cantons_id', newValue ? newValue.value : null);
                                }}
                                sx={{ gridColumn: "span 2" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Ciudad"
                                        placeholder="Busque y seleccione una ciudad"
                                        name="cantons_id"
                                        error={errors.cantons_id && touched.cantons_id}
                                        helperText={errors.cantons_id && touched.cantons_id && errors.cantons_id}
                                        variant="filled" />}
                            />

                            {/*CODIGO POSTAL */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Código postal"
                                placeholder="Ingrese el codigo postal"
                                name="cellphone2"
                                inputProps={{
                                    pattern: "[0-9]*",
                                    maxLength: 10,
                                    onKeyPress: handleKeyPress,
                                }}
                                error={errors.cellphone2 && touched.cellphone2}
                                helperText={errors.cellphone2 && touched.cellphone2 && errors.cellphone2}
                                sx={{ gridColumn: "span 2" }}
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


                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="button" onClick={() => { navigate('/suscripciones/clientes') }} title="Cancelar" color="primary" variant="outlined" sx={{ mr: 1 }}>
                                {icons["ArrowBackIcon"]()}
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

const handleKeyPress = (event) => {
    const regex = /[0-9]/g;
    const key = event.key;
    if (!regex.test(key)) {
        event.preventDefault();
    }
};

const validationSchema = Yup.object().shape({
    first_name: Yup.string()
        .min(2, 'El nombre debe tener al menos dos caracteres')
        .required('Este campo es requerido'),

    second_name: Yup.string()
        .min(2, 'El nombre debe tener al menos dos caracteres')
        .required('Este campo es requerido'),

    last_name: Yup.string()
        .min(2, 'El apellido debe tener al menos dos caracteres')
        .required('Este campo es requerido'),

    second_last_name: Yup.string()
        .min(2, 'El apellido debe tener al menos dos caracteres')
        .required('Este campo es requerido'),

    comercial_name: Yup.string()
        .min(2, 'La razón social debe tener al menos dos caracteres'),

    birthdate: Yup.string()
        .required('Este campo es requerido'),

    kind_person_id: Yup.string()
        .required('Este campo es requerido'),

    stratum_id: Yup.string()
        .required('Este campo es requerido'),

    gender_id: Yup.string()
        .required('Este campo es requerido'),

    identification_type_id: Yup.string()
        .required('Este campo es requerido'),

    identification_number: Yup.string()
        .min(10, 'Ingrese una número de identificación válido')
        .required('Este campo es requerido'),

    phone: Yup.string()
        .min(4, 'Ingrese un celular válido'),

    cellphone1: Yup.string()
        .min(10, 'Ingrese un celular válido'),

    cellphone2: Yup.string()
        .min(10, 'Ingrese un celular válido'),

    country_id: Yup.string()
        .required('Este campo es requerido'),

    province_id: Yup.string()
        .required('Este campo es requerido'),

    cantons_id: Yup.string()
        .required('Este campo es requerido'),
    email: Yup.string()
        .email('Ingrese un correo válido.')
        .required('El email no puede estar vacío.'),

    address: Yup.string()
        .required('Este campo es obligatorio seleccione el tipo de identificación')
        .min(2, 'La dirección debe tener al menos dos caracteres'),
});