import { useMemo } from "react"
import { Box } from "@mui/material"

import { Header } from "../../components"
import { useContractDetailsStore } from "../../../../store"
import { useGetReports } from "../helpers/useGetReports"
import { useEffect } from "react"

export const ContractPrint = () => {

  const { headerContract } = useContractDetailsStore()
  const { contractPrint, startGetContratPrint } = useGetReports();

  console.log(contractPrint.url)

  const headerTitle = useMemo(() => {
    if (headerContract == null) {
      return '';
    }
    return `Imprimir contrato ${headerContract.name}`;
  }, [headerContract])

  useEffect(() => {
    startGetContratPrint(headerContract.id)
  }, [])

  const documentPrint = useMemo(() => {
    if (contractPrint == "") {
      return '';
    }
    return `{contractPrint.url}`;
  }, [contractPrint])


  const pdfUrl = 'http://154.12.236.19:128/media/contract/contrato_pdf/CON000000002_1.pdf';

  return (
    <Box className="animate__animated animate__fadeIn">
      <Header title={headerTitle} subtitle="Visualiza el contrato y verifica que todo este en orden." />
    </Box>
  )
}
