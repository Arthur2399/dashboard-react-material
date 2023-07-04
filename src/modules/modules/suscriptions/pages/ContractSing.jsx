import { useNavigate } from "react-router-dom";
import SignatureCanvas from 'react-signature-canvas';

import { Box, Button } from "@mui/material"
import { Header } from "../../components"

import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRef } from "react";
import { useContractDetailsStore } from "../../../../store";
import { useMemo } from "react";

export const ContractSing = () => {

    const navigate = useNavigate();
    const signatureCanvasRef = useRef();

    const {headerContract} = useContractDetailsStore();

    const handleSave = () => {
        /* const signatureData = signatureCanvasRef.current.toDataURL();
        console.log(signatureData); */
        navigate('/suscripciones/contratos/');
    };
    const handleClear = () => {
        signatureCanvasRef.current.clear();
    };

    const headerTitle = useMemo(() => {
        if (headerContract == null) {
          return '';
        }
        return `Firma del contrato ${headerContract.client}`;
      }, [headerContract])

    return (
        <Box className="animate__animated animate__fadeIn">
            <Header title={headerTitle} subtitle="Por favor firme en el siguiente espacio." />

            <Box display="flex" justifyContent="center" alignItems="center" sx={{width:"100%"}}>
                <SignatureCanvas
                    ref={signatureCanvasRef}
                    penColor="black"
                    canvasProps={{ width: 700, height: 400, className: 'signature-canvas' }}
                />
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
                <Button type="button" onClick={() => { navigate('/suscripciones/contratos') }} title="Cancelar" color="primary" variant="outlined" sx={{ mr: 1 }}>
                    <ArrowBackIcon />
                </Button>
                <Button  onClick={handleClear} type="button" title="Reiniciar" color="primary" variant="outlined" sx={{ mr: 1 }}
                >
                    <RestartAltIcon />
                </Button>
                <Button  onClick={handleSave} type="submit" title="Crear" color="primary" variant="contained" sx={{ mr: 1 }}>
                    <SaveIcon sx={{ mr: 1 }} />
                    Guardar
                </Button>
            </Box>
        </Box>
    )
}
