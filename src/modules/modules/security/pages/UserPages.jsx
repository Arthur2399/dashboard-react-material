import { Box, Button, useTheme } from "@mui/material"
import { Header } from "../../components"
import { customStyles } from "../../../helpers";
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { tokens } from "../../../../theme";


export const UserPages = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

const {colorDataGrid} = customStyles();

  return (
    <Box className="animate__animated animate__fadeIn">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Usuarios" subtitle="Cree y gestione los usuarios de la comunidad." />
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
{/*         <DataGrid
          rows={planCuentas}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          components={{ Toolbar: GridToolbar }}
        /> */}
      </Box>
    </Box>
  )
}
