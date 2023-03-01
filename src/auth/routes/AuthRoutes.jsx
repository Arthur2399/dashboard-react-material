import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage, RecoveryPassword } from "../pages"

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="password-recovery" element={<RecoveryPassword />} />

            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}
