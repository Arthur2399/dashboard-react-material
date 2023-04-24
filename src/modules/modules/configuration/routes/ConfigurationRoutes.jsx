import { Navigate, Route, Routes } from "react-router-dom"
import { ConfigurationPages } from "../pages"

export const ConfigurationRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<ConfigurationPages />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
