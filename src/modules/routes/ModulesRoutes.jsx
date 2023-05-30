import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardPage, AccountingRoutes, ConfigurationRoutes, SecurityRoutes, SuscriotionsRoutes } from '../modules';
import { ModulesLayout } from '../layout';


export const ModulesRoutes = () => {
  return (
    <ModulesLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/configuracion/*" element={< ConfigurationRoutes />} />
        <Route path="/contabilidad/*" element={< AccountingRoutes />} />
        <Route path="/seguridad/*" element={< SecurityRoutes />} />
        <Route path="/suscripciones/*" element={<SuscriotionsRoutes/>} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </ModulesLayout>
  )
}
