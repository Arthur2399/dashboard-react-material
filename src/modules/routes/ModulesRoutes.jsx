import { Navigate, Route, Routes } from "react-router-dom"
import { ModulesLayout } from "../layout";
import { DashboardPage, AccountingRoutes, ConfigurationRoutes, SecurityRoutes } from "../modules";


export const ModulesRoutes = () => {
  return (
    <ModulesLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/configuracion/*" element={< ConfigurationRoutes />} />
        <Route path="/contabilidad/*" element={< AccountingRoutes />} />
        <Route path="/seguridad/*" element={< SecurityRoutes />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </ModulesLayout>
  )
}
