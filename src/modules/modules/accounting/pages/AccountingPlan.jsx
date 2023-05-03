import { Header } from "../../components";
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../../../theme/theme";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { planCuentas } from "../../../../data/modules/accounting/mockData";
import { customStyles } from "../../../helpers";

export const AccountingPlan = () => {
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
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Plan contable" subtitle="Cree y gestione su plan contable." />
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
          rows={planCuentas}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </>
  );
}
