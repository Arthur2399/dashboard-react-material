import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

import { Box, Button, IconButton } from "@mui/material";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { planCuentas } from "../../../../data/modules/accounting/mockData";

import { Header } from "../../components";
import { tokens } from "../../../../theme";
import { getIcons } from "../../../../helpers";
import { customStyles } from "../../../helpers";

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
            field: "level_account",
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
                        <IconButton onClick={handleEdit} title="Editar" sx={{ p: "4px", "&:hover": { color: colors.primary[400], background: colors.blueAccent[200] } }} >
                            {icons["EditIcon"]()}
                        </IconButton>
                        <IconButton onClick={handleDelete} title="Archivar" sx={{ p: "4px", "&:hover": { color: colors.redAccent[700], background: colors.redAccent[200] }, }}>
                            {icons["ArchiveIcon"]()}
                        </IconButton>
                    </>
                );
            },
        },
    ];

    const onCreateAccoutingPlan = () => {
        navigate("formulario")
    }

    return (
        <Box className="animate__animated animate__fadeIn" width="100%" height="100%"  flexDirection="column" display="flex" justifyContent="space-evenly">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Plan contable" subtitle="Crea y gestiona tu cuentas contables." />
                <Box>
                    <Button
                        onClick={onCreateAccoutingPlan}
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
                    rows={planCuentas}
                    columns={columns}
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    components={{ Toolbar: GridToolbar }}
                    getRowId={(row) => row.id}
                />
            </Box>

            {/* TODO Spinner de carga cuando el Backend este listo */}
            {/*
            <LoadingSpinner isSaving={isLoading} message={"Cargando clientes, por favor espere..."} />
            <AlertConfirm
                title="¿Desea archivar a este cliente?"
                message="Esta acción hara que el cliente no este activo para futuros ingresos."
                confirm={confirm}
            /> */}
        </Box>
    )
}
