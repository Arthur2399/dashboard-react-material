import { Navigate, Route, Routes } from "react-router-dom"
import { ClientsForm, ClientsPages, PlansForm, PlansPages } from "../pages"

export const SuscriotionsRoutes = () => {
    return (
        <Routes>

            {/* CLIENTES */}
            <Route path="clientes" element={< ClientsPages/>} />
            <Route path="clientes/formulario" element={<ClientsForm/>} />


            {/* PLANES */}
            <Route path="configuracion/planes" element={< PlansPages/>} />
            <Route path="configuracion/planes/formulario" element={< PlansForm/>} />
            

            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    )
}
