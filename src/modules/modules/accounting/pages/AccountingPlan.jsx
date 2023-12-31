import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

import { Box, Button, IconButton, Tooltip } from "@mui/material";
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
            align: "left"
        },
        {
            field: "name",
            headerName: "Nombre",
            flex: 2,
            headerAlign: "center",
            align: "left"
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
                    <Tooltip title="Editar">
                        <IconButton onClick={handleEdit}  sx={{ p: "4px", "&:hover": { color: colors.primary[400], background: colors.blueAccent[200] } }} >
                            {icons["EditIcon"]()}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Anular">
                        <IconButton onClick={handleDelete}  sx={{ p: "4px", "&:hover": { color: colors.redAccent[700], background: colors.redAccent[200] }, }}>
                            {icons["CancelIcon"]()}
                        </IconButton>
                    </Tooltip>
                    </>
                );
            },
        },
    ];

    const onCreateAccoutingPlan = () => {
        navigate("formulario")
    }

    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Plan contable" subtitle="Crea y gestiona tu cuentas contables." />
                <Box>


                    <Tooltip title="Imprimir">
                        <Button
                            onClick={onCreateAccoutingPlan}
                            variant="outlined"
                            sx={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                ml: "5px",
                                padding: "10px 20px",
                                "&:hover": { backgroundColor: colors.primary[400], color: "white" }
                            }}
                        >
                            {icons["LocalPrintshopIcon"]()}
                        </Button>
                    </Tooltip>
                    <Tooltip title="Descargar Excel">
                        <Button
                            onClick={onCreateAccoutingPlan}
                            variant="outlined"
                            sx={{
                                fontSize: "14px",
                                ml: "5px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                                "&:hover": { backgroundColor: colors.primary[400], color: "white" }
                            }}
                        >
                            {icons["DownloadIcon"]()}
                        </Button>
                    </Tooltip>
                    <Tooltip title="Subir Excel">
                        <Button
                            onClick={onCreateAccoutingPlan}
                            variant="outlined"
                            sx={{
                                fontSize: "14px",
                                ml: "5px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                                "&:hover": { backgroundColor: colors.primary[400], color: "white" }
                            }}
                        >
                            {icons["FileUploadIcon"]()}
                        </Button>
                    </Tooltip>

                    <Button
                        onClick={onCreateAccoutingPlan}
                        variant="primary"
                        sx={{
                            backgroundColor: colors.primary[400],
                            color: colors.grey[100],
                            fontSize: "14px",
                            ml: "20px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                            "&:hover": { backgroundColor: colors.primary[300], }
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
                    density="compact"
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
        </>
    )
}
