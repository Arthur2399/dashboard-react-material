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

  const { headerContract, details, startLoadContractDetails } = useContractDetailsStore();
  const icons = getIcons();

  const columns = [
    {
      field: "sig_tip",
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
      field: "date_start",
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
      field: "vat_total",
      headerName: "Total",
      flex: 1,
      align: 'right',
      headerAlign: 'center',
    },
    {
      field: "signature",
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
      field: "payment_places",
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
        const handleDetail = () => {
          startSetHeaderContract(params.row)
          navigate("detalle");
        }
        const handleSing = () => {
          navigate("firmar")

        }
        return (
          <>
            <IconButton title="Editar" onClick={handleEdit}>
              {icons['EditIcon']()}
            </IconButton>
            <IconButton title="Detalle" onClick={handleDetail}>
              {icons['DehazeIcon']()}
            </IconButton>
            <IconButton title="Firmar" onClick={handleSing}>
              {icons['GestureIcon']()}
            </IconButton>
            <IconButton title="Archivar" onClick={handleDelete} >
              {icons['DeleteIcon']()}
            </IconButton>
          </>
        );
      },
    },
  ];

  const headerTitle = useMemo(() => {
    if (headerContract == null) {
      return '';
    }
    return `Detalle de ${headerContract.name}`;
  }, [headerContract])


  const onBackContract = () => {
    navigate("/suscripciones/contratos/");
  }

  const onSaveContractDetails = () => {

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
            onClick={onSaveContractDetails}
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
