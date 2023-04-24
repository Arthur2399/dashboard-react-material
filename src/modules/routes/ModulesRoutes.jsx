import { Navigate, Route, Routes } from "react-router-dom"
import { ModulesLayout } from "../layout/ModulesLayout";
import { DashboardPage } from "../modules/dashboard/pages/DashboardPage";
import { AccountingRoutes } from "../modules/accounting/routes/AccountingRoutes";
import { ConfigurationRoutes } from "../modules/configuration/routes/ConfigurationRoutes";


export const ModulesRoutes = () => {
  return (
    <ModulesLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/configuracion/*" element={< ConfigurationRoutes/>} />
        <Route path="/contabilidad/*" element={<AccountingRoutes />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </ModulesLayout>
  )
}
