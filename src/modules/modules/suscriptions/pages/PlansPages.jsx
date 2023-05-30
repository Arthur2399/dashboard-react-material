import { useTheme } from "@emotion/react";
import { tokens } from "../../../../theme/theme";
import { useNavigate } from "react-router-dom";
import { customStyles } from "../../../helpers";

import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { Box, Button, IconButton } from "@mui/material";
import { Header } from "../../components";
import { plansData } from "../../../../data/modules/suscriptions/mockSuscriptions";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DehazeIcon from '@mui/icons-material/Dehaze';
import ArchiveIcon from '@mui/icons-material/Archive';
import EditIcon from '@mui/icons-material/Edit';

export const PlansPages = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();


    const { colorDataGrid } = customStyles();

    const columns = [
        {
            field: "code",
            headerName: "Codigo",
            flex: 1
        },
        {
            field: "name",
            headerName: "Nombre",
            flex: 1,
        },
        {
            field: "value",
            headerName: "valor",
            flex: 1,
        },
        {
            field: "state",
            headerName: "Estado",
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
                const handleDetail = () => {
                    navigate('detalle')
                    console.log(params)
                };
                return (
                    <>
                        <IconButton title="Editar">
                            <EditIcon sx={{ color: colors.primary[400] }} />
                        </IconButton>
                        <IconButton title="Detalle" onClick={handleDetail}>
                            <DehazeIcon sx={{ color: colors.primary[400] }} />
                        </IconButton>
                        <IconButton title="Archivar" >
                            <ArchiveIcon sx={{ color: colors.primary[400] }} />
                        </IconButton>

                    </>
                );
            },
        },
    ];


    return (
        <Box className="animate__animated animate__fadeIn">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Planes" subtitle="Crea los planes de los servicios que vas a ofrecer." />
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
                    rows={plansData}
                    columns={columns}
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    )
}
