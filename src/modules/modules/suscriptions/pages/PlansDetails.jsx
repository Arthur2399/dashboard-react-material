import { useTheme } from "@emotion/react";
import { tokens } from "../../../../theme";
import { useNavigate } from "react-router-dom";

import { Box, Button, IconButton } from "@mui/material";
import { Header } from "../../components";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DehazeIcon from '@mui/icons-material/Dehaze';
import ArchiveIcon from '@mui/icons-material/Archive';
import EditIcon from '@mui/icons-material/Edit';
import { customStyles } from "../../../helpers";
import { plansDetails } from "../../../../data/modules/suscriptions/mockSuscriptions";

export const PlansDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const { colorDataGrid } = customStyles();

  const columns = [
    {
      field: "code",
      headerName: "Codigo",
      flex: 1
    },
    {
      field: "service",
      headerName: "Servicio",
      flex: 1,
    },
    {
      field: "value",
      headerName: "valor",
      flex: 1,
    },
    {
      field: "iva",
      headerName: "IVA",
      flex: 1,
    },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
    },
    {
      field: "state",
      headerName: "Estado",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Opciones",
      sortable: false,
      headerAlign: "center",
      width: "150",
      disableColumnMenu: true,
      renderCell: (params) => {
        const handleEdit = () => {
          // handle edit logic
        };
        const handleDelete = () => {
          // handle delete logic
        };
        const handleDetail = () => {
          navigate('detalle')
          console.log(params)
        };
        return (
          <>
            <IconButton title="Editar">
              <EditIcon sx={{ color: colors.primary[400] }} />
            </IconButton>
            <IconButton title="Archivar" >
              <ArchiveIcon sx={{ color: colors.primary[400] }} />
            </IconButton>
          </>
        );
      },
    },
  ];
const hola ='hola'

  return (
    <Box className="animate__animated animate__fadeIn">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={`Detalle de ${hola}`} subtitle="Edite cada uno del detalle de planes." />
        <Box>
          <Button
            onClick={() => { navigate("formulario") }}
            sx={{
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: colors.primary[300],
              }
            }}
          >
            <AddCircleIcon sx={{ mr: "10px" }} />
            Crear
          </Button>
        </Box>
      </Box>
      <Box
        m="0"
        height="70vh"
        sx={colorDataGrid}
      >
        <DataGrid
          rows={plansDetails}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  )
}
