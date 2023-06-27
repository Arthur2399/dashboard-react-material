import { useNavigate } from "react-router-dom";

import { customStyles } from "../../../helpers";
import { tokens } from "../../../../theme";
import { Header } from "../../components";

import { useTheme } from "@emotion/react";
import { Box, Button, IconButton } from "@mui/material";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useClosingReasonStore } from "../../../../store/modules/suscripciones/hooks/useClosingReasonStore";
import { useEffect } from "react";


export const ClosingReason = () => {

    const theme = useTheme();
    const { colorDataGrid } = customStyles();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const { reasons, startonLoadingReasons } = useClosingReasonStore();


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
            field: "descrip",
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
                    navigate("formulario");
                };
                const handleDelete = () => {
                    /* startConfirmDelete(); */
                };
                return (
                    <>
                        <IconButton onClick={handleEdit} >
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                );
            },
        },
    ];


    useEffect(() => {
        startonLoadingReasons();
    }, [])


    return (
        <Box className="animate__animated animate__fadeIn">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Razon de cierre" subtitle="Crear razon de cierre." />
                <Box>
                    <Button
                        onClick={() => { navigate("formulario") }}
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
