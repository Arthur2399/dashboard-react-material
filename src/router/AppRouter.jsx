import { Navigate, Route, Routes } from "react-router-dom"
import { AfterLogin, AuthRoutes } from "../auth"
import { useCheckAuth } from "../hooks/useCheckAuth"
import { ModulesRoutes } from "../modules"
import { CheckingAuth } from "../ui"

export const AppRouter = () => {

    const { status, statusCompany } = useCheckAuth();

    if (status === 'checking') {
        return <CheckingAuth msg="Validando credenciales ..." />
    }

    if (status === 'authenticated' && statusCompany === 'no-companies' || statusCompany === 'loading') {
        return <CheckingAuth msg="Cargando empresa ..." />
    }

    return (
        <Routes>
            {
                (status === 'authenticated')
                    ? <>
                        {
                            (statusCompany === 'only-company')
                                ? < Route path="/*" element={<ModulesRoutes />} />
                                : < Route path="/*" element={<AfterLogin />} />
                        }
                    </>
                    : < Route path="/auth/*" element={<AuthRoutes />} />
            }
            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}
