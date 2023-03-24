import { Navigate, Route, Routes } from "react-router-dom"
import { ModulesPages } from "../pages"

export const ModulesRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<ModulesPages />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
