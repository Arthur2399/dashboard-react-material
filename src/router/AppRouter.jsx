import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth"
import { useCheckAuth } from "../hooks/useCheckAuth"
import { ModulesRoutes } from "../modules"
import { CheckingAuth } from "../ui"

export const AppRouter = () => {

    const { status, satatusCompany } = useCheckAuth();

    if (status === 'checking') {
        return <CheckingAuth />
    }

    {/* <Route path="/after-login/*" element={<AfterLogin />} /> */ }




    return (
        <Routes>
            {
                (status === 'authenticated')
                    ? <>
                        {

                            < Route path="/*" element={<ModulesRoutes />} />
                        }
                      </>
                    : < Route path="/auth/*" element={<AuthRoutes />} />
            }
            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}
