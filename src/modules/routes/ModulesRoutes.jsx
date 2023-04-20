import { Navigate, Route, Routes } from "react-router-dom"
import { ModulesLayout } from "../layout/ModulesLayout";
import { DashboardPage } from "../modules/dashboard/pages/DashboardPage";
import { AccountingRoutes } from "../modules/accounting/routes/AccountingRoutes";


export const ModulesRoutes = () => {
  return (
    <ModulesLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/contabilidad/*" element={<AccountingRoutes />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </ModulesLayout>
  )
}
