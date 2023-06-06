import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../../components";
import { tokens } from "../../../../theme";
import { customStyles } from "../../../helpers";
import { LoadingSpinner } from "../../../components";
import { useServicesStore } from "../../../../store/";

import { useTheme } from "@emotion/react";
import { Box, Button, IconButton } from "@mui/material";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const Services = () => {

    const { services, isLoading, startonLoadingServices, startSetActiveService } = useServicesStore();


    const navigate = useNavigate();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { colorDataGrid } = customStyles();

    const columns = [
        {
            field: "internal_code",
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
            field: "price",
            headerName: "Precio",
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "detailed_type",
            headerName: "Tipo",
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "tax",
            headerName: "Impuesto",
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "tracking",
            headerName: "Seguimiento",
            flex: 1,
            headerAlign: "center",
            align: "center",
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
                    startSetActiveService(params.row);
                    navigate("formulario");
                };
                const handleDelete = () => {
                    // handle delete logic
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

    const onCreateNewService = () => {
        startSetActiveService({
            id: 0,
            barcode: "",
            company_id: '',
            company: "",
            detailed_type_id: '',
            detailed_type: "",
            image: '',
            internal_code: "",
            name: "",
            price: '',
            status: '',
            tax_id: '',
            tax: "",
            tracking_id: '',
            tracking: "",
        })
        navigate("formulario");
    }

    useEffect(() => {
        startonLoadingServices();
    }, [])


    return (
        <Box className="animate__animated animate__fadeIn">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Servicios" subtitle="Crea los servicios para tus planes." />
                <Box>
                    <Button
                        onClick={onCreateNewService}
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
                    rows={services}
                    columns={columns}
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
            <LoadingSpinner isSaving={isLoading} message={"Cargando servicios, por favor espere..."} />
        </Box>
    )
}
