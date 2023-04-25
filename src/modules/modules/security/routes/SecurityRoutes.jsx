import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { UserPages } from '../pages'
import { UserForm } from '../pages/UserForm'

export const SecurityRoutes = () => {
    return (
        <Routes>
            <Route path="usuarios" element={<UserPages />} />
            <Route path="usuarios/crear" element={<UserForm />} />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    )
}
