import { Box, Button, FormControl, Grid, InputLabel, Link, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from "../../../hooks/useForm";
import afterLoginGif from '/assets/img/after-login.gif'

const data = {
  id_company: '',
  id_fiscal_exercise: ''
}

export const AfterLogin = () => {

  const { companies } = useSelector(state => state.companyInfo);
  const [fiscalExerciseList, setFiscalExerciseList] = useState([]);
  const [isDisable, setIsDisable] = useState(true);

  const { onInputChange, onResetForm, formState, id_company, id_fiscal_exercise } = useForm(data)

  useEffect(() => {
    if (formState.id_company != '') {
      setFiscalExerciseList(companies[formState.id_company - 1].fiscal_exercise)
      setIsDisable(false)
    }
    else {
      onResetForm();
      setFiscalExerciseList([])
      setIsDisable(true)
    }
  }, [id_company])


  const onCompanySelect = (e) => {
    e.preventDefault();
    console.log(formState)

  }

  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", paddingX: { sm: 10, xs: 4 } }}
    >
      <Grid
        className="animate__animated animate__fadeIn"
        container
        backgroundColor="white"
        flexDirection="row"
        borderRadius={5}
        overflow="hidden"
        width={930}
      >
        <Grid
          item
          xs={0}
          sm={0}
          md={6}
          backgroundColor="black"
          sx={{ display: { sm: "none", xs: "none", md: "block" } }}
        >
          <img
            src={afterLoginGif}
            alt="Login."
            className="shadowLogin"
            style={{
              borderBottomRightRadius: 4,
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: "cover"

            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          sx={{
            padding: 5,
          }}>
          <Typography variant='h5' sx={{ mb: 0, color: "primary.main" }} textAlign="center">Seleccionar empresa</Typography>

          <Box component="form" onSubmit={onCompanySelect} noValidate sx={{ mt: 2 }}>
            <FormControl variant="standard" sx={{ width: '100%', mb: 2 }}>
              <InputLabel id="demo-simple-select-standard-label">Empresa</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Empresa"
                name="id_company"
                value={id_company}
                onChange={onInputChange}
              >
                <MenuItem value="">
                  <em>Seleccione una</em>
                </MenuItem>
                {
                  companies.map((company) => (
                    <MenuItem key={company.id} value={company.id}>{company.name}</MenuItem>

                  ))
                }
              </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ width: '100%', mb: 2 }}>
              <InputLabel id="demo-simple-select-standard-label">Ejercicio fiscal</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Age"
                disabled={isDisable}
                name='id_fiscal_exercise'
                value={id_fiscal_exercise}
                onChange={onInputChange}

              >
                <MenuItem value="">
                  <em>Seleccione uno</em>
                </MenuItem>
                {
                  fiscalExerciseList.map((fiscal) => (
                    <MenuItem key={fiscal.id} value={fiscal.id}>{fiscal.date}</MenuItem>

                  ))
                }
              </Select>
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
                  component={RouterLink}
                  color='inherit'
                  to="/auth/password-recovery"
                  sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" }, }}
                >
                  Cerrar sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}
