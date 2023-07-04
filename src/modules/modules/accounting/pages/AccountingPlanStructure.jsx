import { useNavigate } from "react-router-dom"

import { Box, Button } from "@mui/material"
import { useTheme } from "@emotion/react"
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid"

import { tokens } from "../../../../theme"
import { Header } from "../../components"
import { customStyles } from "../../../helpers"
import { getIcons } from "../../../../helpers/getIcons"
import { AlertConfirm, LoadingSpinner } from "../../../components"

export const AccountingPlanStructure = () => {

    const theme = useTheme();
    const navigate = useNavigate();
    const { colorDataGrid } = customStyles();
    const colors = tokens(theme.palette.mode);
    const icons = getIcons();


    const onCreateAccountingPlanStructure = () => {
        navigate("")
    }

    return (
        <Box className="animate__animated animate__fadeIn">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Clientes" subtitle="Crea los clientes de tu negocio." />
                <Box>
                    <Button
                        onClick={onCreateAccountingPlanStructure}
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
            />
        </Box>
    )
}
