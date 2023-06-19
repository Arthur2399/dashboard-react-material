import { useNavigate } from "react-router-dom";

import { Header } from "../../components";
import { tokens } from "../../../../theme";
import { customStyles } from "../../../helpers";

import { useTheme } from "@emotion/react";
import { Box, Button, IconButton } from "@mui/material";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DehazeIcon from '@mui/icons-material/Dehaze';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import GestureIcon from '@mui/icons-material/Gesture';

import { contract } from "../../../../data/modules/suscriptions/mockSuscriptions";

export const Contract = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const { colorDataGrid } = customStyles();

  const columns = [
    {
      field: "code",
      headerName: "Código",
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: "client",
      headerName: "Cliente",
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: "date_contract",
      headerName: "Fecha de contrato",
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: "date_end",
      headerName: "Fecha de cierre",
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
      align: 'right',
      headerAlign: 'center',
    },
    {
      field: "sing",
      headerName: "Firma",
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: "close_reason",
      headerName: "Razon de cierre",
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: "ren_aut",
      headerName: "Renovación automática",
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: "pay_form",
      headerName: "Forma de pago",
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: "actions",
      headerName: "Opciones",
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      width: "150",
      disableColumnMenu: true,
      renderCell: (params) => {
        const handleEdit = () => {
          // handle edit logic
        };
        const handleDelete = () => {
          // handle delete logic
        };
        const handleSing = () => {
          navigate("firmar")

        }
        return (
          <>
            <IconButton title="Editar" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton title="Detalle" >
              <DehazeIcon />
            </IconButton>
            <IconButton title="Firmar" onClick={handleSing}>
              <GestureIcon />
            </IconButton>
            <IconButton title="Archivar" onClick={handleDelete} >
              <DeleteIcon />
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
          rows={contract}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  )
}
