import { Navigate, Route, Routes } from 'react-router-dom'
import { UserPages, UserForm, CommunityPage, CommunityForm, MapPage, PolicePage, PoliceForm } from '../pages'

export const SecurityRoutes = () => {
    return (
        <Routes>

            {/* USUARIOS */}
            <Route path="usuarios" element={<UserPages />} />
            <Route path="usuarios/crear" element={<UserForm />} />

            {/* COMUNIDAD */}
            <Route path="comunidad" element={<CommunityPage />} />
            <Route path="comunidad/crear" element={<CommunityForm />} />

            {/* UPC */}
            <Route path="policia" element={<PolicePage/>} />
            <Route path="policia/crear" element={<PoliceForm/>} />


            {/* MAPA */}
            <Route path="mapa" element={<MapPage />} />


            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    )
}
