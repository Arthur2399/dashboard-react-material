import { useEffect, useMemo } from "react"
import { Box, Button } from "@mui/material"

import { Header } from "../../components"
import { useContractDetailsStore } from "../../../../store"
import { useGetReports } from "../helpers/useGetReports"
import { PDFViewers } from "../../../components/PDFViewers"
import { getIcons } from "../../../../helpers/getIcons"
import { useNavigate } from "react-router-dom"
import { useTheme } from "@emotion/react"
import { tokens } from "../../../../theme"
import { LoadingSpinner } from "../../../components/LoadingSpinner"


export const ContractPrint = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const icons = getIcons();

  const { headerContract } = useContractDetailsStore()
  const { contractPrint,isLoading, startGetContratPrint } = useGetReports();

  const headerTitle = useMemo(() => {
    if (headerContract == null) {
      return '';
    }
    return `Imprimir contrato ${headerContract.name}`;
  }, [headerContract])
  
  const documentPrint = useMemo(() => {
    if (contractPrint == "") {
      startGetContratPrint(headerContract.id)
      return;
    }
    return contractPrint.pdf_data;
  }, [contractPrint])


  return (
    <Box className="animate__animated animate__fadeIn">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={headerTitle} subtitle="Visualiza el contrato y verifica que todo este en orden." />
        <Box>
          <Button
            color="primary" variant="outlined"
            onClick={() => {
              navigate('/suscripciones/contratos');
            }}
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
              mr: "10px",
              padding: "10px 20px",
            }}
          >
            {icons["ArrowBackIcon"]({ sx: { mr: "10px" } })}
            Regresar
          </Button>
          <Button
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
            Compartir
          </Button>
        </Box>
      </Box>
      {
        isLoading == false
        ?<PDFViewers contractBase64={documentPrint} />
        :<></>
      }
      <LoadingSpinner  message ="Cargando contrato, por favor espere..." isSaving={isLoading}/>
    </Box>
  )
}
