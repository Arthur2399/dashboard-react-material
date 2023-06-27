import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useTheme } from "@emotion/react";
import { Box, Button, IconButton } from "@mui/material";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";

import { Header } from "../../components";
import { tokens } from "../../../../theme";
import { customStyles } from "../../../helpers";
import { getIcons } from "../../../../helpers/getIcons";
import { AlertConfirm } from "../../../components/AlertConfirm";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { useClientStore } from "../../../../store/modules/suscripciones/hooks/useClientStore";
import { format } from "date-fns";

export const ClientsPages = () => {

    const theme = useTheme();
    const navigate = useNavigate();
    const { colorDataGrid } = customStyles();
    const colors = tokens(theme.palette.mode);
    const icons = getIcons();

    const { 
        clients,
        isLoading,
        confirm,
        startonLoadingClients,
        startSetActiveClient,
        startConfirmDelete
    } = useClientStore();

    const columns = [
        {
            field: "full_name",
            headerName: "Nombre completo",
            flex: 1,
            headerAlign: "center",
            align: "center"
        },
        {
            field: "identification_type",
            headerName: "Tipo de documento",
            flex: 1,
            headerAlign: "center",
            align: "center"
        },
        {
            field: "identification_number",
            headerName: "Cedula",
            flex: 1,
            headerAlign: "center",
            align: "center"
        },
        {
            field: "phone",
            headerName: "Número de celular",
            flex: 1,
            headerAlign: "center",
            align: "center"
        },
        {
            field: "email",
            headerName: "Correo electrónico",
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
                    startSetActiveClient(params.row);
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
                            {icons["ArchiveIcon"]()}
                        </IconButton>
                    </>
                );
            },
        },
    ];

    const onCreateClient = () => {
        startSetActiveClient(initialValues)
        navigate("formulario");
    }

    useEffect(() => {
        startonLoadingClients();
    }, [])


    return (
        <Box className="animate__animated animate__fadeIn">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Clientes" subtitle="Crea los clientes de tu negocio." />
                <Box>
                    <Button
                        onClick={onCreateClient}
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
                    rows={clients}
                    columns={columns}
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    components={{ Toolbar: GridToolbar }}
                    getRowId={(row) => row.id}
                />
            </Box>
            <LoadingSpinner isSaving={isLoading} message={"Cargando clientes, por favor espere..."} />
            <AlertConfirm
                title="¿Desea archivar a este cliente?"
                message="Esta acción hara que el cliente no este activo para futuros ingresos."
                confirm={confirm}
            /* buttonConfirm={startLogout} */
            />
        </Box>
    )
}
const date = new Date();
const dateString = format(new Date(date), 'yyyy-MM-dd').toString();

const initialValues ={
    id:0,
	address: "",
    birthdate: dateString,
	cantons_id:"",
	cellphone1 : "",
	cellphone2 : "",
	comercial_name : "",
	company_id: "",
	country_id:"",
	email: "",
	first_name:"",
	gender_id : "",
	identification_number: "",
	identification_type_id:"" ,
	kind_person_id:"",
	last_name: "" ,
	name: "",
	phone: "",
	province_id:"",
	second_last_name : "",
	stratum_id:"",
    second_name : "",
};