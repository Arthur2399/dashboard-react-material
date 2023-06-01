import { useTheme } from "@emotion/react";
import { tokens } from "../../../../theme";
import { useNavigate } from "react-router-dom";

import { Box, Button, IconButton } from "@mui/material";
import { Header } from "../../components";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArchiveIcon from '@mui/icons-material/Archive';
import EditIcon from '@mui/icons-material/Edit';
import { customStyles } from "../../../helpers";
import { usePlanDetailsStore } from "../../../../store/modules/suscripciones/hooks/usePlanDetailsStore";
import { useEffect } from "react";

export const PlansDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { colorDataGrid } = customStyles();
  const navigate = useNavigate();

  const { headerPlan, startonLoadingPlansDetails, details, startSetActivePlanDetails } = usePlanDetailsStore();

  const columns = [
    {
      field: "code",
      headerName: "Codigo",
      flex: 1
    },
    {
      field: "product",
      headerName: "Servicio",
      flex: 1,
    },
    {
      field: "value",
      headerName: "valor",
      flex: 1,
    },
    {
      field: "tax",
      headerName: "IVA",
      flex: 1,
    },
    {
      field: "total",
      headerName: "Total",
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
          startSetActivePlanDetails(params.row);
          navigate("formulario");
        };
        const handleDelete = () => {
          // handle delete logic
        };
        return (
          <>
            <IconButton  onClick={handleEdit} title="Editar">
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


  const onSavePlanDetails = () => {
    startSetActivePlanDetails({
      id:0,
		  plan_header: "",
		  plan_header_id:"",
		  product: "",
		  product_id:"",
		  tax: "",
		  tax_id:"",
		  quantity: "",
		  value: "",
		  sub_total: '',
		  vat_total: '',
		  total: '',
		  code: '',
    })
    navigate("formulario");
  }

  useEffect(() => {
    startonLoadingPlansDetails();
  }, [])


  return (
    <Box className="animate__animated animate__fadeIn">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={`Detalle del plan ${headerPlan.name}`} subtitle="Edite cada uno del detalle de planes." />
        <Box>
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
          rows={details}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  )
}
