import { useMemo } from "react"
import { Box } from "@mui/material"

import { Header } from "../../components"
import { useContractDetailsStore } from "../../../../store"
import { useGetReports } from "../helpers/useGetReports"
import { useEffect } from "react"
import PDFViewer from "pdf-viewer-reactjs"
import { useRef } from "react"

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


  const pdfCanvasRef = useRef(null);

  return (
    <Box className="animate__animated animate__fadeIn">
      <Header title={headerTitle} subtitle="Visualiza el contrato y verifica que todo este en orden." />
      <PDFViewer
        document={{ url: "https://arxiv.org/pdf/quant-ph/0410100.pdf" }}
        canvasRef={pdfCanvasRef}
      />
    </Box>
  )
}
