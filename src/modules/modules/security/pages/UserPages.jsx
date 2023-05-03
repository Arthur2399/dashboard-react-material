import { Box, Button, useTheme } from "@mui/material"
import { Header } from "../../components"
import { customStyles } from "../../../helpers";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { tokens } from "../../../../theme";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { userData } from "../../../../data/modules/security/mockDataSecurity";
import { useNavigate } from "react-router-dom";


export const UserPages = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const { colorDataGrid } = customStyles();

  const columns = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1
    },
    {
      field: "last_name",
      headerName: "Apellido",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Número de celular",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Correo electrónico",
      flex: 1,
    },
    {
      field: "community",
      headerName: "Comunidad",
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
        <Header title="Usuarios" subtitle="Cree y gestione los usuarios de la comunidad." />
        <Box>
          <Button
            onClick={() => { navigate("crear") }}
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
          rows={userData}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  )
}
