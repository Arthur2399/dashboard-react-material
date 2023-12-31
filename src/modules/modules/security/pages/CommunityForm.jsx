import { useEffect } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';

import { Autocomplete, Box, Button, TextField, useMediaQuery } from "@mui/material";
import { Header } from "../../components";
import { useState } from "react";
import { useCommunityStore } from "../../../../store/modules/security/hooks/useCommunityStore";
import { useGetComboBox } from "../helpers/useGetComboBox";

import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { LoadingSpinner } from "../../../components/LoadingSpinner";

export const CommunityForm = () => {

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const { active, startSavingCommunity,isLoadingCommunity } = useCommunityStore();
    const { country, province, city, startProvince, startGetCity } = useGetComboBox();


    const [idCountry, setIdCountry] = useState('');
    const [idProvince, setIdProvince] = useState('');

    useEffect(() => {
        startProvince(idCountry)
        startGetCity(idProvince)
    }, [idCountry, idProvince])

    const [initialState, setInitialState] = useState({
        company_id: null,
        name_community: "",
        country_id: null,
        province_id: null,
        city_id: null,
        address: "",
        low_message: "",
        med_message: "",
        high_message: "",
    })

    useEffect(() => {
        if (active !== null) {
            setInitialState({ ...active });
            setIdCountry(active.country_id)
            setIdProvince(active.province_id)
        }

    }, [active])


    const onSubmit = async(communityData) =>{
        await startSavingCommunity(communityData);
    }

    return (
        <Box className="animate__animated animate__fadeIn">
            <Header title="Crear comunidad" subtitle="Crea la comunidad para organizar a los usuarios." />
            <Formik
                initialValues={initialState}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    onSubmit(values);
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
                            {/* NOMBRE DE COMUNIDAD */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Nombre de comunidad"
                                placeholder="Ingrese el nombre de la comunidad"
                                name="name_community"
                                error={errors.name_community && touched.name_community}
                                helperText={errors.name_community && touched.name_community && errors.name_community}
                                sx={{ gridColumn: "span 4" }}
                            />

                            {/* PAIS */}
                            <Autocomplete
                                options={country}
                                getOptionLabel={(option) => option.label}
                                value={country.find((option) => option.value === values.country_id) || null}
                                onBlur={() => setFieldTouched('country_id', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('country_id', newValue ? newValue.value : null);
                                    setIdCountry(newValue.value)
                                }}
                                sx={{ gridColumn: "span 4" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Pais"
                                        placeholder="Busque y escoja un pais"
                                        name="country_id"
                                        error={errors.country_id && touched.country_id}
                                        helperText={errors.country_id && touched.country_id && errors.country_id}
                                        variant="filled" />}
                            />

                            {/* PROVINCIA */}
                            <Autocomplete
                                options={province}
                                getOptionLabel={(option) => option.label}
                                value={province.find((option) => option.value === values.province_id) || null}
                                onBlur={() => setFieldTouched('province_id', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('province_id', newValue ? newValue.value : null);
                                    setIdProvince(newValue.value)
                                }}
                                sx={{ gridColumn: "span 2" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Provincia"
                                        placeholder="Busque y escoja una provincia"
                                        name="province_id"
                                        error={errors.province_id && touched.province_id}
                                        helperText={errors.province_id && touched.province_id && errors.province_id}
                                        variant="filled" />}
                            />

                            {/* CIUDAD */}
                            <Autocomplete
                                options={city}
                                getOptionLabel={(option) => option.label}
                                value={city.find((option) => option.value === values.city_id) || null}
                                onBlur={() => setFieldTouched('city_id', true)}
                                onChange={(event, newValue) => {
                                    setFieldValue('city_id', newValue ? newValue.value : null);
                                }}
                                sx={{ gridColumn: "span 2" }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Cantón"
                                        placeholder="Busque y escoja un cantón"
                                        name="city_id"
                                        error={errors.city_id && touched.city_id}
                                        helperText={errors.city_id && touched.city_id && errors.city_id}
                                        variant="filled" />}
                            />

                            {/* DIRECCIÓN */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                variant="filled"
                                label="Dirección"
                                placeholder="Ingrese la dirección de la comunidad"
                                name="address"
                                error={errors.address && touched.address}
                                helperText={errors.address && touched.address && errors.address}
                                sx={{ gridColumn: "span 4" }}
                            />

                            {/* MENSAJE VERDE */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                multiline
                                variant="filled"
                                label="Mensaje de prioridad baja"
                                minRows={1}
                                placeholder="Ingrese mensaje de prioridad baja"
                                name="low_message"
                                error={errors.low_message && touched.low_message}
                                helperText={errors.low_message && touched.low_message && errors.low_message}
                                sx={{ gridColumn: "span 4" }}
                            />

                            {/* MENSAJE AMARILLO*/}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                multiline
                                variant="filled"
                                label="Mensaje de prioridad media"
                                minRows={1}
                                placeholder="Ingrese mensaje de prioridad media"
                                name="med_message"
                                error={errors.med_message && touched.med_message}
                                helperText={errors.med_message && touched.med_message && errors.med_message}
                                sx={{ gridColumn: "span 4" }}
                            />

                            {/* MENSAJE Rojo */}
                            <Field
                                as={TextField}
                                type="text"
                                fullWidth
                                multiline
                                variant="filled"
                                label="Mensaje de prioridad alta"
                                minRows={1}
                                placeholder="Ingrese mensaje de prioridad alta"
                                name="high_message"
                                error={errors.high_message && touched.high_message}
                                helperText={errors.high_message && touched.high_message && errors.high_message}
                                sx={{ gridColumn: "span 4" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="button" title="Cancelar" color="primary" variant="outlined" sx={{ mr: 1 }}>
                                <DeleteIcon />
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
            <LoadingSpinner isSaving={isLoadingCommunity} message={"Cargando, por favor espere..."} />
        </Box>
    )
}

const validationSchema = Yup.object().shape({
    name_community: Yup.string()
        .required('Este campo es obligatorio'),
    country_id: Yup.string()
        .required('Este campo es obligatorio'),
    province_id: Yup.string()
        .required('Este campo es obligatorio'),
    city_id: Yup.string()
        .required('Este campo es obligatorio'),
    address: Yup.string()
        .required('Este campo es obligatorio'),
    low_message: Yup.string()
        .required('Este campo es obligatorio'),
    med_message: Yup.string()
        .required('Este campo es obligatorio'),
    high_message: Yup.string()
        .required('Este campo es obligatorio'),
});