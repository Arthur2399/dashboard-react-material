import { Box, Button } from "@mui/material"
import { Header } from "../../components"

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../../theme";
import { customStyles } from "../../../helpers";

export const CompanyPage = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { colorDataGrid } = customStyles();

  const columns = [
    { field: "account", headerName: "Cuenta", flex: 0.5 },
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
    },
    {
      field: "last_level",
      headerName: "Último nivel",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "level_account",
      headerName: "Nivel de cuenta",
      type: "number",
      headerAlign: "left",
      align: "left",
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
            <Button variant="contained" color="primary" onClick={handleEdit}>
              <EditIcon />
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];


  return (
    <Box className="animate__animated animate__fadeIn">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Empresa" subtitle="Configure y gestiones todas empresas" />
        <Box>
          <Button
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
          rows=""
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  )
}
