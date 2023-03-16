import { Navigate, Route, Routes } from "react-router-dom"
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { AfterLogin } from "../pages/AfterLogin";
import { ModulesPages } from "../pages/ModulesPages"

export const ModulesRoutes = () => {

  const { multicompany } = useCheckAuth();




  return (
    <Routes>
      {
        (multicompany === true)
          ? <Route path="/after-login/*" element={<AfterLogin />} />
          : <Route path="/*" element={<ModulesPages />} />
      }
      {/* <Route path="home" element={<ModulesPages />} /> */}

      <Route path="/*" element={<Navigate to="/after-login" />} />
    </Routes>
  )
}
