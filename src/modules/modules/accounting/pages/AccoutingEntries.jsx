import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

import { Box, Button, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";

import { customStyles } from "../../../helpers";
import { getIcons } from "../../../../helpers";
import { tokens } from "../../../../theme";
import { Header } from "../../components";
import { asientosContables } from "../../../../data/modules/accounting/mockData";
import { useState } from "react";

export const AccoutingEntries = () => {

    const theme = useTheme();
    const navigate = useNavigate();
    const { colorDataGrid } = customStyles();
    const colors = tokens(theme.palette.mode);
    const icons = getIcons();

    const [anchorEl, setAnchorEl] = useState(null);
    const ITEM_HEIGHT = 48;
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const columns = [
        {
            field: "date_entries",
            headerName: "Fecha de asiento",
            flex: 1,
            headerAlign: "center",
            align: "left"
        },
        {
            field: "voucher",
            headerName: "Comprobante",
            flex: 1,
            headerAlign: "center",
            align: "left"
        },
        {
            field: "rollback_type",
            headerName: "Tipo de reversión",
            flex: 1,
            headerAlign: "center",
            align: "center"
        },
        {
            field: "rollback_number",
            headerName: "Nro. reversión",
            flex: 1,
            headerAlign: "center",
            align: "center"
        },
        {
            field: "paid",
            headerName: "Pagado",
            flex: 1,
            headerAlign: "center",
            align: "center"
        },

        {
            field: "description",
            headerName: "Descripción",
            flex: 2,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "total_debit",
            headerName: "Total débito",
            flex: 1,
            headerAlign: "center",
            align: "center"
        },
        {
            field: "total_credit",
            headerName: "Total crédito",
            flex: 1,
            headerAlign: "center",
            align: "center"
        },
        {
            field: "state",
            headerName: "Estado",
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
                const handleDetails = () => {
                    navigate(`detalle/${params.row.id}`)
                };
                return (
                    <>
                        <Tooltip title="Editar">
                            <IconButton onClick={handleEdit} sx={{ p: "4px", "&:hover": { color: colors.primary[400], background: colors.blueAccent[200] } }} >
                                {icons["EditIcon"]()}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Detalle">
                            <IconButton onClick={handleDetails} sx={{ p: "4px", "&:hover": { color: colors.primary[400], background: colors.blueAccent[200] }, }}>
                                {icons["DehazeIcon"]()}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Anular">
                            <IconButton onClick={handleDelete} sx={{ p: "4px", "&:hover": { color: colors.redAccent[700], background: colors.redAccent[200] }, }}>
                                {icons["CancelIcon"]()}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Más opciones">
                            <IconButton sx={{ p: "4px", "&:hover": { color: colors.primary[400], background: colors.blueAccent[200] }, }}
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? 'long-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                {icons["MoreVertIcon"]()}
                            </IconButton>
                        </Tooltip>

                        <Menu
                            id="long-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                style: {
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Ajusta el valor de sombra según tus preferencias
                                },
                            }} s
                        >
                            <MenuItem onClick={handleClose} sx={{ mt: "-10px", mb: "-10px", "&:hover": { background: colors.grey[200] } }}>
                                <IconButton sx={{ mr: "10px", ml: "-10px" }}>
                                    {icons["SyncIcon"]()}
                                </IconButton>
                                Reversar
                            </MenuItem>
                            <MenuItem onClick={handleClose} sx={{ mt: "-10px", mb: "-10px", "&:hover": { background: colors.grey[200] } }}>
                                <IconButton sx={{ mr: "10px", ml: "-10px" }}>
                                    {icons["ContentCopyIcon"]()}
                                </IconButton>
                                Copiar
                            </MenuItem>
                            <MenuItem onClick={handleClose} sx={{ mt: "-10px", mb: "-10px", "&:hover": { background: colors.grey[200] } }}>
                                <IconButton sx={{ mr: "10px", ml: "-10px" }}>
                                    {icons["LocalPrintshopIcon"]()}
                                </IconButton>
                                Imprimir
                            </MenuItem>
                            <MenuItem onClick={handleClose} sx={{ mt: "-10px", mb: "-10px", "&:hover": { background: colors.grey[200] } }}>
                                <IconButton sx={{ mr: "10px", ml: "-10px" }}>
                                    {icons["AdfScannerIcon"]()}
                                </IconButton>
                                Digitalizar
                            </MenuItem>
                        </Menu>
                    </>
                );
            },
        },
    ];

    const onCreateAccoutingEntries = () => {
        navigate("formulario")
    }


    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Asientos contables" subtitle="Crea y gestiona tus asientos contables." />
                <Box>
                    <Button
                        onClick={onCreateAccoutingEntries}
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
                    rows={asientosContables}
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
                    confirm={confirm}/> 
            */}
        </>
    )
}
