import { Navigate, Route, Routes } from "react-router-dom"
import { ModulesPages } from "../pages/ModulesPages"

export const ModulesRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <ModulesPages/> } />
        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )
}
