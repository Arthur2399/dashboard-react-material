
import { Header } from '../../components';
import { LineChart, StatBox } from '../components/';
import { tokens } from '../../../../theme';

import { Box, Button, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';

import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


export const DashboardPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:1000px)");

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Inicio" subtitle="¡Bienvenido a Morgquick!" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Descargar reporte
          </Button>
        </Box>
      </Box>


      {/* GRID & CHARTS */}
      <Box
        height="70vh"
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 1"
          backgroundColor={colors.grey[100]}
          display="flex"
          padding={2}
          borderRadius={3}
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,361"
            subtitle="Correos enviados"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 1"
          backgroundColor={colors.grey[100]}
          display="flex"
          padding={2}
          borderRadius={3}
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="431,225"
            subtitle="Ventas obtenidas"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 1"
          backgroundColor={colors.grey[100]}
          display="flex"
          padding={2}
          borderRadius={3}
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subtitle="Nuevos clientes"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 1"
          backgroundColor={colors.grey[100]}
          display="flex"
          padding={2}
          alignItems="center"
          borderRadius={3}
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Visitas recibidas"
            progress="0.80"
            increase="+43%"
            icon={
              <VisibilityIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* ROW 2 */}
        <Box
          gridColumn="span 4"
          borderRadius={3}
          backgroundColor={colors.grey[100]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[500]}
              >
                Ingresos generados
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="220px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

