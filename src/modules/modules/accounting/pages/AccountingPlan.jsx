import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../../theme/theme";
import { Header } from "../../dashboard/components/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
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
      <Header
        title="Plan contable"
        subtitle="Cree y gestione su plan contable."
      />
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
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
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
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </>
  );
}
