import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth"
import { useCheckAuth } from "../hooks/useCheckAuth"
import { ModulesRoutes } from "../modules"
import { CheckingAuth } from "../ui"

export const AppRouter = () => {

    const { status, statusCompany } = useCheckAuth();

    if (status === 'checking') {
        return <CheckingAuth />
    } else if (statusCompany === 'loading') {
        return <CheckingAuth msg="Cargando empresa ..." />
    }

    {/* <Route path="/after-login/*" element={<AfterLogin />} /> */ }




    return (
        <Routes>
            {
                (status === 'authenticated')
                    ? <>
                        {
                            (statusCompany === 'only-company')
                                ? < Route path="/*" element={<ModulesRoutes />} />
                                : < Route path="/after-login/*" element={<><h1>Alfter Login</h1></>} />
                        }
                    </>
                    : < Route path="/auth/*" element={<AuthRoutes />} />
            }
            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}
