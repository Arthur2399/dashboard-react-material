import { useNavigate } from "react-router-dom";

import { Header } from "../../components";
import { tokens } from "../../../../theme";
import { customStyles } from "../../../helpers";

import { useTheme } from "@emotion/react";
import { Box, Button, IconButton } from "@mui/material";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const Contract = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const { colorDataGrid } = customStyles();

  const columns = [
    {
      field: "code",
      headerName: "Código",
      flex: 1
    },
    {
      field: "client",
      headerName: "Cliente",
      flex: 1,
    },
    {
      field: "date_contract",
      headerName: "Fecha de contrato",
      flex: 1,
    },
    {
      field: "date_end",
      headerName: "Fecha de cierre",
      flex: 1,
    },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
    },
    {
      field: "sing",
      headerName: "Firma",
      flex: 1,
    },
    {
      field: "close_reason",
      headerName: "Razon de cierre",
      flex: 1,
    },
    {
      field: "ren_aut",
      headerName: "Renovación automática",
      flex: 1,
    },
    {
      field: "pay_form",
      headerName: "Forma de pago",
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
            <IconButton>
              <EditIcon onClick={handleEdit} />
            </IconButton>
            <IconButton>
              <DeleteIcon onClick={handleDelete} />
            </IconButton>
          </>
        );
      },
    },
  ];

  const onCreateContract = () => {
    navigate('formulario');
  }

  return (
    <Box className="animate__animated animate__fadeIn">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Contrato" subtitle="Crea contratos para tus clientes." />
        <Box>
          <Button
            onClick={onCreateContract}
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
