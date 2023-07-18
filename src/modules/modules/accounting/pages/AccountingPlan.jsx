import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

import { customStyles } from "../../../helpers";
import { tokens } from "../../../../theme";
import { getIcons } from "../../../../helpers";
import { IconButton } from "@mui/material";

export const AccountingPlan = () => {

    const theme = useTheme();
    const navigate = useNavigate();
    const { colorDataGrid } = customStyles();
    const colors = tokens(theme.palette.mode);
    const icons = getIcons();

    const columns = [
        {
            field: "account",
            headerName: "Cuenta",
            flex: 1,
            headerAlign: "center",
            align: "center"
        },
        {
            field: "name",
            headerName: "Nombre",
            flex: 2,
            headerAlign: "center",
            align: "center"
        },
        {
            field: "last_level",
            headerName: "Ultimo nivel",
            flex: 1,
            headerAlign: "center",
            align: "center"
        },
        {
            field: "account_level",
            headerName: "Nivel de cuenta",
            flex: 1,
            headerAlign: "center",
            align: "center"
        },
        {
            field: "actions",
            headerName: "Opciones",
            sortable: false,
            headerAlign: "center",
            width: "150",
            disableColumnMenu: true,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                const handleEdit = () => {
                    //TODO: Reemplazar esto
                    /* startSetActiveClient(params.row); */
                    navigate("formulario");
                };
                const handleDelete = () => {

                };
                return (
                    <>
                        <IconButton onClick={handleEdit} title="Editar" sx={{p:"4px" , "&:hover": { color: colors.primary[400], background: colors.blueAccent[200] }}} >
                            {icons["EditIcon"]()}
                        </IconButton>
                        <IconButton onClick={handleDelete} title="Archivar" sx={{p:"4px" , "&:hover": { color: colors.redAccent [700], background: colors.redAccent[200] },}}>
                            {icons["ArchiveIcon"]()}
                        </IconButton>
                    </>
                );
            },
        },
    ];
    return (
        <div>AccountingPlan</div>
    )
}
