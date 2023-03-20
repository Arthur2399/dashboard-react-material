import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth"
import { useCheckAuth } from "../hooks/useCheckAuth"
import { ModulesRoutes } from "../modules"
import { CheckingAuth } from "../ui"

export const AppRouter = () => {

    const { status } = useCheckAuth();

    if (status === 'checking') {
        return <CheckingAuth />
    }


    /* NOTA
        Aqui se deben hacer las validaciones de multiempresa
    */

    /* const { satatusCompany } = useCheckAuth(); */
    {/* <Route path="/after-login/*" element={<AfterLogin />} /> */ }


    return (
        <Routes>
            {
                (status === 'authenticated')
                    ? < Route path="/*" element={<ModulesRoutes />} />
                    : < Route path="/auth/*" element={<AuthRoutes />} />
            }
            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}
