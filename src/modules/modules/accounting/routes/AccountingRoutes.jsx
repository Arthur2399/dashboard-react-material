import { Navigate, Route, Routes } from 'react-router-dom';
import {
  AccountingPlanStructure,
  Treasury,
} from '../pages';

export const AccountingRoutes = () => {
  return (
    <Routes>
      <Route path="tesoreria" element={<Treasury />} />
      <Route path="estructuraPlanContable" element={<AccountingPlanStructure />} />
      <Route path="planContable" element={<Treasury />} />
      <Route path="cuentasCierre" element={<Treasury />} />
      <Route path="conciliacionBancaria" element={<Treasury />} />
      <Route path="tiposComprobantes" element={<Treasury />} />

      {/* Movimientos */}
      <Route path="movimientos/asientosContables" element={<Treasury />} />
      <Route path="movimientos/comprobantesIngreso" element={<Treasury />} />

      {/* Procesos */}
      <Route path="procesos/contabilizarCierreTienda" element={<Treasury />} />
      <Route path="procesos/desaprobarMovimientosContables" element={<Treasury />} />
      <Route path="procesos/contabilizacionRolPagos" element={<Treasury />} />
      <Route path="procesos/desaprobarComprobantePago" element={<Treasury />} />
      <Route path="procesos/contabilizarRetencionesEMP" element={<Treasury />} />
      <Route path="procesos/contabilizacionAportesPatronales" element={<Treasury />} />
      <Route path="procesos/pasarDatosIngreso" element={<Treasury />} />
      <Route path="procesos/RecalculoSaldos" element={<Treasury />} />
      <Route path="procesos/RecalculoSaldos" element={<Treasury />} />
      <Route path="procesos/reversarAsientos" element={<Treasury />} />
      <Route path="procesos/recalcularCuentasPorPagar" element={<Treasury />} />
      <Route path="procesos/cierreAnual" element={<Treasury />} />

      {/* Reportes */}
      <Route path="reportes/libroMayorPorRaangoCuentas" element={<Treasury />} />
      <Route path="reportes/listadoPagos" element={<Treasury />} />
      <Route path="reportes/saldosContables" element={<Treasury />} />
      <Route path="reportes/libroDiario" element={<Treasury />} />
      <Route path="reportes/balanceComprobacion" element={<Treasury />} />
      <Route path="reportes/estadoSituacionFinanciera" element={<Treasury />} />
      <Route path="reportes/estadoPerdidadGanancias" element={<Treasury />} />
      <Route path="reportes/flujoEfectivo" element={<Treasury />} />
      <Route path="reportes/libroMayorAuxiliar" element={<Treasury />} />
      <Route path="reportes/libroMayor" element={<Treasury />} />
      <Route path="reportes/impuestoRenta" element={<Treasury />} />

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
