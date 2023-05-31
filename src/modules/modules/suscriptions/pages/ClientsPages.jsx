import { useNavigate } from "react-router-dom";

import { useTheme } from "@emotion/react";
import { customStyles } from "../../../helpers";
import { tokens } from "../../../../theme";
import { Header } from "../../components";

import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";


import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from "react";
import { useClientStore } from "../../../../store/modules/suscripciones/hooks/useClientStore";

export const ClientsPages = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const { startonLoadingClients, clients } = useClientStore()

    const { colorDataGrid } = customStyles();

    const columns = [
        {
            field: "name",
            headerName: "Nombre completo",
            flex: 1
        },
        {
            field: "identification_type",
            headerName: "Tipo de documento",
            flex: 1,
        },
        {
            field: "identification_number",
            headerName: "Cedula",
            flex: 1,
        },
        {
            field: "phone",
            headerName: "Número de celular",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Correo electrónico",
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
                    // handle edit logic
                };
                const handleDelete = () => {
                    // handle delete logic
                };
                return (
                    <>
                        <EditIcon onClick={handleEdit} />
                        <DeleteIcon onClick={handleDelete} />
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        startonLoadingClients();
    }, [])


    return (
        <Box className="animate__animated animate__fadeIn">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Clientes" subtitle="Crea los clientes de tu negocio." />
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
                    rows={clients}
                    columns={columns}
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    )
}
