import { useTheme } from "@emotion/react";
import { tokens } from "../../../../theme";
import { useNavigate } from "react-router-dom";
import { customStyles } from "../../../helpers";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button } from "@mui/material";
import { Header } from "../../components";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";

export const PaymentTerm = () => {

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
      field: "name",
      headerName: "Nombre",
      flex: 1,
    },
    {
      field: "month_number",
      headerName: "Número de meses",
      flex: 1,
    },
    {
      field: "discount",
      headerName: "Porcentaje de descuento",
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
        return (
          <>
            <EditIcon onClick={handleEdit} />
            <DeleteIcon onClick={handleDelete} />
          </>
        );
      },
    },
  ];
  return (
    <Box className="animate__animated animate__fadeIn">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Plazos de pago" subtitle="Gestione los plazos de pago en el sistema." />
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
          rows={[]}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  )
}
