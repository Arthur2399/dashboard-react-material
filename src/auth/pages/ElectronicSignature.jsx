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
    Checkbox,
    FormControl,
    FormControlLabel,
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

export const ElectronicSignature = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const fileInputRef = useRef();

 
    useEffect(() => {
        const url = new URL(document.location)
        const authParam = url.searchParams.get('auth');
        console.log(authParam)
    }, [])
    

    const errorMessage = "";

    const onFileInputChange = () => {

    }

    return (
        <AuthLayout title="Firma electrónica" imgSrc={firmaGif}>

            <Typography
                textAlign="center"
                sx={{ mt: 2, fontSize: "14px" }}
            >
                Hola  Efrían Raza con  CI:17273635467001, para poder configurar el sistema de facturación electrónica, debes llenar los siguientes campos:
            </Typography>

            <Box display="flex" justifyContent="center" alignItems="center" marginTop={2}>
                <img
                    src="/img/firmlog.png"
                    alt="logo"
                    style={{ width: "80px"}}
                />
            </Box>

            <Box sx={{ mt: 2 }}>
                <Formik
                /*    initialValues={{ email: '', password: '' }}
                      validationSchema={validationSchema}
                      onSubmit={(values) => {
                        onLogin(values);
                      }} 
                */
                >
                    {({ errors, touched }) => (
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

                            <input
                                type="file"
                                multiple
                                ref={fileInputRef}
                                onChange={onFileInputChange}
                                style={{ display: 'none' }}
                            />
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Typography sx={{ color: colors.grey[500] }}> Subir el archivo <em><strong>P12</strong></em> </Typography>
                                <IconButton
                                    sx={{ background: colors.primary[400], color: "white", ml: 2, "&:hover": { color: colors.primary[400] } }}
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    <UploadOutlined />
                                </IconButton>

                            </Box>

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
        </AuthLayout>
    )
}
