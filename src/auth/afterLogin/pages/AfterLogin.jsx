import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { Formik, Form, ErrorMessage } from 'formik';
import { Box, Button, FormControl, Grid, InputLabel, Link, MenuItem, Select } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { AuthLayout } from "../../layout";
import afterLoginGif from '/Img/after-login.gif'
import TextHelper from '@mui/material/FormHelperText';


export const AfterLogin = () => {

  const { companies } = useSelector(state => state.companyInfo);
  const [idCompany, setidCompany] = useState('');
  const [fiscalExerciseList, setFiscalExerciseList] = useState([]);
  const [isDisable, setIsDisable] = useState(true);

  const dispatch = useDispatch();


  useEffect(() => {
    if (idCompany != '') {
      setFiscalExerciseList(companies[idCompany - 1].fiscal_exercise)
      setIsDisable(false)
    }
    else {
      setFiscalExerciseList([])
      setIsDisable(true)
    }
  }, [idCompany])


  const onCompanySelect = (data) => {
    /* dispatch(startSelectionCompany({...data})) */
  }

  const onLogout = () => {
   /*  dispatch(startLogout()) */
  }

  const validationSchema = Yup.object().shape({
    company: Yup.string()
      .min(1, 'Debe seleccionar una empresa')
      .required('Debe seleccionar una empresa'),
    fiscalExercise: Yup.string()
      .min(1, 'Debe seleccionar el ejercicio fiscal')
      .required('Debe seleccionar el ejercicio fiscal'),
  });

  return (
    <AuthLayout title="Seleccionar empresa" imgSrc={afterLoginGif}>

      <Box sx={{ mt: 2 }}>
        <Formik
          initialValues={{ company: '', fiscalExercise: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onCompanySelect(values);
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>

              <FormControl variant="standard" sx={{ width: '100%', mb: 2 }}>
                <InputLabel error={!!touched.company && !!errors.company} htmlFor="company">
                  Empresa
                </InputLabel>
                <Select
                  id="company"
                  label="Empresa"
                  name="company"
                  error={touched.company && Boolean(errors.company)}
                  value={values.company}
                  onChange={(event) => { handleChange(event); setidCompany(event.target.value) }}
                  onBlur={handleBlur}
                >
                  <MenuItem value="">
                    <em>Seleccione una</em>
                  </MenuItem>
                  {companies.map((company) => (
                    <MenuItem key={company.id} value={company.id}>
                      {company.name}
                    </MenuItem>
                  ))}
                </Select>
                <ErrorMessage name="company">
                  {(msg) => <TextHelper sx={{ color: 'red' }}>{msg}</TextHelper>}
                </ErrorMessage>
              </FormControl>


              <FormControl variant="standard" sx={{ width: '100%', mb: 2 }}>
                <InputLabel error={!!touched.fiscalExercise && !!errors.fiscalExercise} htmlFor="fiscalExercise">
                  Ejercicio fiscal
                </InputLabel>
                <Select
                  id="fiscalExercise"
                  disabled={isDisable}
                  label="Empresa"
                  name="fiscalExercise"
                  error={touched.fiscalExercise && Boolean(errors.fiscalExercise)}
                  value={values.fiscalExercise}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value="">
                    <em>Seleccione una</em>
                  </MenuItem>
                  {fiscalExerciseList.map((fiscalExercise) => (
                    <MenuItem key={fiscalExercise.value} value={fiscalExercise.value}>
                      {fiscalExercise.label}
                    </MenuItem>
                  ))}
                </Select>
                <ErrorMessage name="fiscalExercise">
                  {(msg) => <TextHelper sx={{ color: 'red' }}>{msg}</TextHelper>}
                </ErrorMessage>
              </FormControl>

              <Grid
                className="animate__animated animate__fadeIn"
                container
                sx={{ mt: 1 }}>
                <Grid
                  item
                  xs={12}
                >
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: 4 }}
              >
                Ingresar
              </Button>
              <Grid container>
                <Grid item xs >
                  <Link
                    color='inherit'
                    href="https://www.erassoluciones.com"
                    sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" }, }}
                  >
                    Contáctanos
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    onClick={onLogout}
                    color='inherit'
                    sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" }, cursor: "pointer" }}
                  >
                    Cerrar sesión
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </AuthLayout>
  )
}
