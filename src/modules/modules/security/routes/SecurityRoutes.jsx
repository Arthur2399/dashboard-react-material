import { Navigate, Route, Routes } from 'react-router-dom'
import { SecurityPage } from '../pages'

export const SecurityRoutes = () => {
    return (
        <Routes>
            <Route path="usuarios" element={<SecurityPage />} />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    )
}
