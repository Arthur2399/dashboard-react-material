import { Navigate, Route, Routes } from "react-router-dom"

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/*" element={<>ModuleRoutes</>} />
            <Route path="/auth/*" element={<>AuthRoutes</>} />
            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}
