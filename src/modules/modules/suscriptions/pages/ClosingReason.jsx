import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useTheme } from "@emotion/react";
import { Box, Button, IconButton } from "@mui/material";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";

import { Header } from "../../components";
import { tokens } from "../../../../theme";
import { customStyles } from "../../../helpers";
import { useClosingReasonStore } from "../../../../store";
import { getIcons } from "../../../../helpers/getIcons";




export const ClosingReason = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { colorDataGrid } = customStyles();

    const icons = getIcons();
    const navigate = useNavigate();


    const { reasons, startonLoadingReasons, startSetActiveReason } = useClosingReasonStore();


    const columns = [
        {
            field: "code",
            headerName: "Código interno",
            flex: 1,
            headerAlign: "center",
            align: "center",

        },
        {
            field: "name",
            headerName: "Nombre",
            flex: 1,
            headerAlign: "center",
            align: "center",

        },
        {
            field: "description",
            headerName: "Descripcion",
            flex: 2,
            headerAlign: "center",
            align: "center",
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
                    startSetActiveReason(params.row)
                    navigate("formulario");
                };
                const handleDelete = () => {
                };
                return (
                    <>
                        <IconButton onClick={handleEdit} >
                            {icons["EditIcon"]()}
                        </IconButton>
                        <IconButton onClick={handleDelete}>
                            {icons["DeleteIcon"]()}
                        </IconButton>
                    </>
                );
            },
        },
    ];


    const onCreateClosinReason = () => {
        startSetActiveReason(initialValues);
        navigate("formulario")
    }

    useEffect(() => {
        startonLoadingReasons();
    }, [])


    return (
        <Box className="animate__animated animate__fadeIn">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Razon de cierre" subtitle="Crear razon de cierre." />
                <Box>
                    <Button
                        onClick={onCreateClosinReason}
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
                        {icons["AddCircleIcon"]({ sx: { mr: "10px" } })}
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
                    rows={reasons}
                    columns={columns}
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    components={{ Toolbar: GridToolbar }}
                    getRowId={(row) => row.id}
                />
            </Box>
        </Box>
    )
}

const initialValues = {
    id: 0,
}
