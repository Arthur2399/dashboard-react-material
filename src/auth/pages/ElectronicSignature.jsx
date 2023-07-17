import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import TextHelper from '@mui/material/FormHelperText';
import { UploadOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { AuthLayout } from '../layout'
import firmaGif from '/Img/firma.gif';
import {
    Alert,
    Box,
    Button,
    FormControl,
    Grid,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Typography,
    useTheme
} from '@mui/material';
import { tokens } from '../../theme';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useElectronicSignatureStore } from '../../store';
import { LoadingSpinner } from '../../modules/components/LoadingSpinner';
import { AlertConfirm } from '../../modules/components/AlertConfirm';
import { useNavigate } from 'react-router-dom';

export const ElectronicSignature = () => {

    /* Diseño - tema */
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate()

    /* Manejo de estado */
    const { startLoadUser, startPostElectronicSignature, isLoading, user, errorMessage, confirm } = useElectronicSignatureStore();
    console.log(errorMessage)

    const fileInputRef = useRef();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [token, setToken] = useState("")

    const onSubmitElectronicSignature = (values) => {
        startPostElectronicSignature(token, JSON.stringify(values))
    }

    useEffect(() => {
        const url = new URL(document.location)
        const authParam = url.searchParams.get('auth');
        setToken(authParam)
        startLoadUser(authParam)
    }, [])

    return (
        <AuthLayout title="Firma electrónica" imgSrc={firmaGif}>
            {errorMessage == null
                ? <>
                    <Typography
                        textAlign="center"
                        sx={{ mt: 2, fontSize: "14px" }}
                    >
                        Hola  {user[0]?.name_client} con  CI: {user[0]?.ruc_client}, para poder configurar el sistema de facturación electrónica, debes llenar los siguientes campos:
                    </Typography>
                    <Box display="flex" justifyContent="center" alignItems="center" marginTop={2}>
                        <img
                            src="/img/firmlog.png"
                            alt="logo"
                            style={{ width: "80px" }}
                        />
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <Formik
                            initialValues={{
                                password: '',
                                p_12: null
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                onSubmitElectronicSignature(values);
                            }}
                        >
                            {({ errors, touched, setFieldValue }) => (
                                <Form>
                                    {/* PASSWORD */}
                                    <FormControl sx={{ width: '100%', mb: 2 }} variant="standard">
                                        <InputLabel error={!!touched.password && !!errors.password} htmlFor="password">
                                            Contraseña de firma electrónica
                                        </InputLabel>
                                        <Field
                                            as={Input}
                                            id="password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Ingrese su contraseña"
                                            autoComplete="current-password"
                                            variant="standard"
                                            error={touched.password && Boolean(errors.password)}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        <ErrorMessage name="password">
                                            {(msg) => <TextHelper sx={{ color: 'red' }}>{msg}</TextHelper>}
                                        </ErrorMessage>
                                    </FormControl>
                                    <FormControl sx={{ width: '100%', mb: 2 }} variant="standard">
                                        <input
                                            id="p_12"
                                            name="p_12"
                                            type="file"
                                            accept=".p12"
                                            style={{ display: 'none' }}
                                            ref={fileInputRef}
                                            onChange={(event) => {
                                                const file = event.target.files[0];
                                                if (file != undefined) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        const base64Data = reader.result;
                                                        const data = {
                                                            change: true,
                                                            b64: base64Data.split(",")[1],
                                                            ext: "p12"/* base64Data.split(';')[0].split('/')[1] */
                                                        }
                                                        setFieldValue('p_12', data);
                                                    };
                                                    reader.readAsDataURL(file);
                                                } else {
                                                    setFieldValue('p_12', null)
                                                }
                                            }}
                                        />
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="start"
                                        >
                                            <Typography sx={{ color: colors.grey[500] }}>Subir el archivo <em><strong>P12</strong></em></Typography>
                                            <IconButton
                                                sx={{ background: colors.primary[400], color: "white", ml: 2, "&:hover": { color: colors.primary[400] } }}
                                                onClick={() => fileInputRef.current.click()}
                                            >
                                                <UploadOutlined />
                                            </IconButton>
                                        </Box>
                                        <ErrorMessage name="p_12">
                                            {(msg) => <TextHelper sx={{ color: 'red' }}>{msg}</TextHelper>}
                                        </ErrorMessage>
                                    </FormControl>


                                    {/* ALERT BOX */}
                                    <Grid
                                        className="animate__animated animate__fadeIn"
                                        container
                                        display={!!errorMessage ? '' : 'none'}
                                        sx={{ mt: 1 }}>
                                        <Grid
                                            item
                                            xs={12}
                                        >
                                            <Alert severity='error'>{errorMessage}</Alert>
                                        </Grid>
                                    </Grid>

                                    {/* LOG IN BUTTON */}
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, borderRadius: 2, background: colors.primary[400] }}
                                    >
                                        Enviar
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </>
                : <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{width:"100%", height:"100%"}}>
                    <img src="/img/denegado.png" alt="dengado" className='animate__animated animate__flash' style={{width:"100px"}}/>
                    <Typography variant='h3'mt={4}>{errorMessage}</Typography>
                </Box>
            }
            <LoadingSpinner isSaving={isLoading} message="Cargando información..." />
            <AlertConfirm confirm={confirm} title="Firma electrónica" message="Los datos han sido subidos correctamente" buttonConfirm={() => { navigate("/") }} />
        </AuthLayout>
    )
}

const validationSchema = Yup.object().shape({
    password: Yup.string()
        .required('Este campo es requerido'),
    p_12: Yup.object()
        .required('Este campo es requerido'),

})