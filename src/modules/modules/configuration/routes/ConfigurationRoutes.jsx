import { Navigate, Route, Routes } from "react-router-dom"
import { ConfigurationPages,CompanyPage } from "../pages"
import { PasswordChange } from "../pages/PasswordChange"

export const ConfigurationRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<ConfigurationPages />} />
      <Route path="empresa" element={<CompanyPage />} />
      <Route path="cambiarContrasena" element={<PasswordChange />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
  