import { Navigate, Route, Routes } from "react-router-dom"
import { ModulesLayout } from "../layout/ModulesLayout";
import { DashboardPage } from "../modules/dashboard/pages/DashboardPage";


export const ModulesRoutes = () => {
  return (
    <ModulesLayout>
      <Routes>
        <Route path="/" element={<DashboardPage/>}>
        </Route>
      </Routes>
    </ModulesLayout>
  )
}
