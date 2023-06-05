import { useTheme } from "@emotion/react";
import { tokens } from "../../../../theme";
import { useNavigate } from "react-router-dom";

import { usePaymentTermStore } from "../../../../store/modules/suscripciones/hooks/usePaymentTermStore";

import { Header } from "../../components";
import { Box, Button, IconButton } from "@mui/material";
import { customStyles } from "../../../helpers";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from "react";
import { LoadingSpinner } from "../../../components/LoadingSpinner";

export const PaymentTerm = () => {

  const { paymenyTerms, startonLoadingPaymentTerms, startSetActivePaymentTerm, isLoading, } = usePaymentTermStore();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { colorDataGrid } = customStyles();

  const columns = [
    {
      field: "code",
      headerName: "Codigo",
      flex: 1,
      align: 'center',
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      headerAlign: "center",
      align: 'center',
    },
    {
      field: "value",
      headerName: "Número de días",
      flex: 1,
      headerAlign: "center",
      align: 'center',
    },
    {
      field: "discount",
      headerName: "Porcentaje de descuento",
      flex: 1,
      headerAlign: "center",
      align: 'center',
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 1,
      headerAlign: "center",
      align: 'center',
    },
    {
      field: "actions",
      headerName: "Opciones",
      sortable: false,
      headerAlign: "center",
      align: 'center',
      width: "150",
      disableColumnMenu: true,
      renderCell: (params) => {
        const handleEdit = () => {
          // handle edit logic
          startSetActivePaymentTerm(params.row)
          navigate('formulario');
        };
        const handleDelete = () => {
          // handle delete logic
        };
        return (
          <>
            <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDelete} >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const onCreatePaymentTerm = () => {
    startSetActivePaymentTerm({
      id: 0,
      company: null,
      company_id: null,
      value: '',
      name: "",
      code: "",
      description: "",
      discount: '',
      status: '',
      created_at: "",
      updated_at: '',
    })
    navigate('formulario');
  }

  useEffect(() => {
    startonLoadingPaymentTerms();
  }, [])

  return (
    <Box className="animate__animated animate__fadeIn">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Plazos de pago" subtitle="Gestione los plazos de pago en el sistema." />
        <Box>
          <Button
            onClick={onCreatePaymentTerm}
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
          rows={paymenyTerms}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          components={{ Toolbar: GridToolbar }}
        />
        <LoadingSpinner isSaving={isLoading} message={"Cargando plazos de pago, por favor espere..."} />
      </Box>
    </Box>
  )
}
