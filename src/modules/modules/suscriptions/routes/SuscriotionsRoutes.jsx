import { Navigate, Route, Routes } from "react-router-dom"
import { ClientsForm, ClientsPages } from "../pages"

export const SuscriotionsRoutes = () => {
    return (
        <Routes>

            {/* CLIENTES */}
            <Route path="clientes" element={< ClientsPages/>} />
            <Route path="clientes/formulario" element={<ClientsForm/>} />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    )
}
