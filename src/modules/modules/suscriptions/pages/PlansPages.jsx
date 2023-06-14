import { useTheme } from "@emotion/react";
import { tokens } from "../../../../theme/theme";
import { useNavigate } from "react-router-dom";
import { customStyles } from "../../../helpers";

import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { Box, Button, IconButton } from "@mui/material";
import { Header } from "../../components";

import { usePlanStore } from "../../../../store/modules/suscripciones/hooks/usePlanStore";
import { useEffect } from "react";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { usePlanDetailsStore } from "../../../../store/modules/suscripciones/hooks/usePlanDetailsStore";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DehazeIcon from '@mui/icons-material/Dehaze';
import ArchiveIcon from '@mui/icons-material/Archive';
import EditIcon from '@mui/icons-material/Edit';

export const PlansPages = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const { isLoading, plans, startonLoadingPlans, startSetActivePlan } = usePlanStore();
    const { startSetHeaderPlan } = usePlanDetailsStore();



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
            align:'right',
            headerAlign: 'center',
            flex: 1,
        },
        {
            field: "state",
            headerAlign: 'center',
            headerName: "Estado",
            flex: 1,
            align:'center',
            valueGetter: (params) => (params.value === 1 ? 'Activo' : 'Inactivo'),
        },
        {
            field: "actions",
            headerName: "Opciones",
            align:'right',
            sortable: false,
            headerAlign: "center",
            width: "150",
            disableColumnMenu: true,
            renderCell: (params) => {
                const handleEdit = () => {
                    startSetActivePlan(params.row);
                    navigate('formulario')
                };
                const handleDelete = () => {
                    // handle delete logic
                };
                const handleDetail = () => {
                    startSetHeaderPlan(params.row)
                    navigate('detalle')
                };
                return (
                    <>
                        <IconButton title="Editar" onClick={handleEdit}>
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

    const onCreatePlan = () => {
        startSetActivePlan({
            id: 0,
            company: '',
            company_id: null,
            code: '',
            value: '',
            name: '',
            state: null,
            created_at: '',
            updated_at: ''
        })
        navigate("formulario");
    }

    const calculateTotalSum = (rows) => {
        let sum = 0;
        rows.forEach((row) => {
          sum += row.value;
        });
        return sum;
      }
    
      const totalSum = calculateTotalSum(plans);
    
      const rows = [
        ...plans.map((row) => ({
          ...row,
          value: row.value.toFixed(2),
        })),
        {
          id: 'totalSum',
          code: '',
          name: 'TOTAL',
          value: totalSum.toFixed(2),
          state: '',
          actions:'',
        },
      ];

    useEffect(() => {
        startonLoadingPlans();
    }, [])


    return (
        <Box className="animate__animated animate__fadeIn">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Planes" subtitle="Crea los planes de los servicios que vas a ofrecer." />
                <Box>
                    <Button
                        onClick={onCreatePlan}
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
                    rows={rows}
                    columns={columns}
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>

            <LoadingSpinner isSaving={isLoading} message={"Cargando planes, por favor espere..."} />
        </Box>
    )
}
