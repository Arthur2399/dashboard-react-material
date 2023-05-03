import { Navigate, Route, Routes } from "react-router-dom"
import { ConfigurationPages,CompanyPage } from "../pages"

export const ConfigurationRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<ConfigurationPages />} />
      <Route path="empresa" element={<CompanyPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
