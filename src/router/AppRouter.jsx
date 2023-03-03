import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth"
import { useCheckAuth } from "../hooks/useCheckAuth"
import { ModulesRoutes } from "../modules"
import { CheckingAuth } from "../ui"

export const AppRouter = () => {

    /* status : "authenticated","not-authenticated", "checking"; */

    const status = useCheckAuth();

    if (status === 'checking') {
        return <CheckingAuth />
    }

    return (
        <Routes>
            {
                (status === 'authenticated')
                    ? < Route path="/*" element={<ModulesRoutes />} />
                    : <Route path="/auth/*" element={<AuthRoutes />} />
            }
            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}
