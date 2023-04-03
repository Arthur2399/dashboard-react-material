import { Navigate, Route, Routes } from "react-router-dom"
import { IconButton } from "@mui/material"
import ChatIcon from '@mui/icons-material/Chat';
import { ModulesLayout } from "../layout/ModulesLayout";
import { CompanyPages } from "../modules/company/pages/CompanyPages";


export const ModulesRoutes = () => {
  return (
    <ModulesLayout>
      <Routes>
        <Route path="/" element={<CompanyPages/>}>

        </Route>
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </ModulesLayout>
  )
}
