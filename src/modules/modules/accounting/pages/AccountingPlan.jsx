import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../../../theme/theme";
import { Header } from "../../dashboard/components/Header";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { planCuentas } from "../../../../data/modules/accounting/mockData";

export const AccountingPlan = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
      field: "",
      headerName: "Opciones",
      headerAlign: "left",
      align: "left",
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
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.primary[400],
            color: colors.grey[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-sortIcon": {
            color: colors.grey[100],
          },
          "& .MuiDataGrid-menuIconButton": {
            color: colors.grey[100],
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.grey[100],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.primary[300]} !important`,
          },
        }}
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
