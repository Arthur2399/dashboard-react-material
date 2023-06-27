import { useTheme } from "@emotion/react";
import { Box, Button, IconButton } from "@mui/material";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";

import { customStyles } from "../../../helpers";
import { getIcons } from "../../../../helpers";
import { tokens } from "../../../../theme";
import { Header } from "../../components";
import { useMemo } from "react";
import { useContractDetailsStore } from "../../../../store/modules/suscripciones/hooks/useContractDetailsStore";
import { useEffect } from "react";
import { useNavigate } from "react-router";


export const ContractDetail = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { colorDataGrid } = customStyles();
  const navigate = useNavigate();

  const { headerContract, details, startLoadContractDetails, startSetActiveContractDetails } = useContractDetailsStore();
  const icons = getIcons();

  const columns = [
    {
      field: "plan",
      headerName: "Plan",
      flex: 2,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: "client",
      headerName: "Desde",
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: "date_start",
      headerName: "Hasta",
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: "date_end",
      headerName: "Razon de cierre",
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: "vat_total",
      headerName: "Valor",
      flex: 1,
      align: 'right',
      headerAlign: 'center',
    },
    {
      field: "sub_total",
      headerName: "Subtotal",
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: "status",
      headerName: "Estado",
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
        return (
          <>
            <IconButton title="Editar" onClick={handleEdit}>
              {icons['EditIcon']()}
            </IconButton>
            <IconButton title="Archivar" onClick={handleDelete} >
              {icons['DeleteIcon']()}
            </IconButton>
          </>
        );
      },
    },
  ];
  const initialValue = {
    contract_header_id: headerContract.id,
    plan_id: ""
  }
  const headerTitle = useMemo(() => {
    if (headerContract == null) {
      return '';
    }
    return `Detalle de ${headerContract.name}`;
  }, [headerContract])


  const onBackContract = () => {
    navigate("/suscripciones/contratos/");
  }

  const onCreateDetail = () => {
    startSetActiveContractDetails(initialValue);
    navigate("formulario");
  }

  useEffect(() => {
    startLoadContractDetails();
  }, [])


  return (
    <Box className="animate__animated animate__fadeIn">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={headerTitle} subtitle="Detalla los planes de tu contrato" />
        <Box>
          <Button
            color="primary" variant="outlined"
            onClick={onBackContract}
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
              mr: "10px",
              padding: "10px 20px",
            }}
          >
            {icons['ArrowBackIcon']({ sx: { mr: "10px" } })}
            Regresar
          </Button>
          <Button
            onClick={onCreateDetail}
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
            {icons['AddCircleIcon']({ sx: { mr: "10px" } })}
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
          rows={details}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  )
}

