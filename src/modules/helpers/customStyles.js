import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";



export const customStyles = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const colorDataGrid = {
    "& .MuiDataGrid-root": {
      border: "none",
    },
    "& .MuiDataGrid-cell": {
      borderBottom: "none",
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: colors.primary[400],
      color: colors.grey[100],
      fontSize: "14px",
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
      fontSize: "14px",
    },
    "& .MuiDataGrid-footerContainer": {
      borderTop: "none",
      backgroundColor: colors.primary[200],
    },
    "& .MuiCheckbox-root": {
      color: `${colors.greenAccent[200]} !important`,
    },
    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
      color: `${colors.primary[300]} !important`,
    },
  }


  return {
    colorDataGrid

  }

}


