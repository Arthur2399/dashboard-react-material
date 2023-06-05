import { useEffect, useMemo } from "react";

import { useTheme } from "@emotion/react";
import { tokens } from "../../../../theme";
import { useNavigate } from "react-router-dom";

import { Header } from "../../components";

import { Box, Button, IconButton } from "@mui/material";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { customStyles } from "../../../helpers";
import { usePlanDetailsStore } from "../../../../store/modules/suscripciones/hooks/usePlanDetailsStore";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArchiveIcon from '@mui/icons-material/Archive';
import EditIcon from '@mui/icons-material/Edit';
import { LoadingSpinner } from "../../../components/LoadingSpinner";

export const PlansDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { colorDataGrid } = customStyles();
  const navigate = useNavigate();

  const { headerPlan, startonLoadingPlansDetails, details, startSetActivePlanDetails, isLoading } = usePlanDetailsStore();

  const columns = [
    {
      field: "code",
      headerName: "Codigo",
      headerAlign: 'center',
      align: 'center',
      flex: 1
    },
    {
      field: "product",
      headerName: "Servicio",
      headerAlign: 'center',
      align: 'center',
      flex: 2,
    },
    {
      field: "value",
      headerName: "valor",
      flex: 1,
      headerAlign: 'center',
      align: 'right'
    },
    {
      field: "tax",
      headerName: "IVA",
      flex: 1,
      align: 'right',
      headerAlign: 'center',
    },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
      headerAlign: 'center',
      align: 'right'
    },
    {
      field: "actions",
      headerName: "Opciones",
      sortable: false,
      headerAlign: "center",
      align: "center",
      width: "150",
      disableColumnMenu: true,
      renderCell: (params) => {
        const handleEdit = () => {
          startSetActivePlanDetails(params.row);
          navigate("formulario");
        };
        const handleDelete = () => {
          // handle delete logic
        };
        return (
          <>
            <IconButton onClick={handleEdit} title="Editar">
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

  const onBackPlan = () => {
    navigate("/suscripciones/configuracion/planes/");
  }

  const onSavePlanDetails = () => {
    startSetActivePlanDetails({
      id: 0,
      plan_header: "",
      plan_header_id: "",
      product: "",
      product_id: "",
      tax: "",
      tax_id: "",
      quantity: "",
      value: "",
      sub_total: '',
      vat_total: '',
      total: '',
      code: '',
    })
    navigate("formulario");
  }

  const headerTitle = useMemo(() => {
    if (headerPlan == null) {
      return '';
    }
    return headerPlan.name;
  }, [headerPlan])


  const calculateTotalSum = (rows) => {
    let sum = 0;
    rows.forEach((row) => {
      sum += row.total;
    });
    return sum;
  }

  const totalSum = calculateTotalSum(details);

  const rows = [
    ...details.map((row) => ({
      ...row,
      value: row.value.toFixed(2),
      total: row.total.toFixed(2),
    })),
    {
      id: 'totalSum',
      code: '',
      product: '',
      value: '',
      tax: 'TOTAL',
      total: totalSum.toFixed(2),
    },
  ];

  useEffect(() => {
    startonLoadingPlansDetails();
  }, [])


  return (
    <Box className="animate__animated animate__fadeIn">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={`Detalle del plan ${headerTitle}`} subtitle="Edite cada uno del detalle de planes." />
        <Box>
          <Button
            color="primary" variant="outlined"
            onClick={onBackPlan}
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
              mr: "10px",
              padding: "10px 20px",
            }}
          >
            <ArrowBackIcon sx={{ mr: "10px" }} />
            Regresar
          </Button>
          <Button
            onClick={onSavePlanDetails}
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
          rows={rows}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      <LoadingSpinner isSaving={isLoading} message={"Cargando detalle, por favor espere..."} />
    </Box>
  )
}
