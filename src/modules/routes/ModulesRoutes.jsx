import { Navigate, Route, Routes } from "react-router-dom"
import { ModulesLayout } from "../layout";
import { DashboardPage, AccountingRoutes, ConfigurationRoutes } from "../modules";


export const ModulesRoutes = () => {
  return (
    <ModulesLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/configuracion/*" element={< ConfigurationRoutes />} />
        <Route path="/contabilidad/*" element={< AccountingRoutes />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </ModulesLayout>
  )
}
