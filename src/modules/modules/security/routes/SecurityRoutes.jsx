import { Navigate, Route, Routes } from 'react-router-dom'
import { UserPages } from '../pages'

export const SecurityRoutes = () => {
    return (
        <Routes>
            <Route path="usuarios" element={<UserPages />} />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    )
}
