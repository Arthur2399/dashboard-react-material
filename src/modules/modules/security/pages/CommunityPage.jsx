import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import { useNavigate } from "react-router-dom";
import { customStyles } from "../../../helpers";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Header } from "../../components";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { communityData } from "../../../../data/modules/security/mockDataSecurity";


export const CommunityPage = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();


    const { colorDataGrid } = customStyles();

    const columns = [
        {
            field: "name_community",
            headerName: "Nombre de comunidad",
            flex: 1
        },
        {
            field: "province",
            headerName: "Provincia",
            flex: 1,
        },
        {
            field: "city",
            headerName: "Ciudad",
            flex: 1,
        },
        {
            field: "address",
            headerName: "Dirección",
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
        <Box className="animate__animated animate__fadeIn">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Comunidad" subtitle="Cree y gestione las comunidades." />
                <Box>
                    <Button
                        onClick={() => { navigate("crear") }}
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
                    rows={communityData}
                    columns={columns}
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    )
}
