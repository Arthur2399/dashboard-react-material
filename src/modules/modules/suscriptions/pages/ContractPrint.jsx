import { useMemo } from "react"
import { Box } from "@mui/material"

import { Header } from "../../components"
import { useContractDetailsStore } from "../../../../store"
import { useGetReports } from "../helpers/useGetReports"
import { useEffect } from "react"
import { Viewer, Worker } from "@react-pdf-viewer/core"
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

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


  /* const pdfUrl = 'http://154.12.236.19:128/media/contract/contrato_pdf/CON000000002_1.pdf'; */
  const pdfUrl = 'http://mangel-pc.local:8001/proxy/pdf?url=http://154.12.236.19:128/media/contract/contrato_pdf/CON000000002_1.pdf';
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <Box className="animate__animated animate__fadeIn">
      <Header title={headerTitle} subtitle="Visualiza el contrato y verifica que todo este en orden." />
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl="/pdf/test.pdf"

          plugins={[
            // Register plugins
            defaultLayoutPluginInstance]}

        />

      </Worker>
    </Box>
  )
}
