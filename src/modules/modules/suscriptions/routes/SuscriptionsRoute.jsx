import { Navigate, Route, Routes } from "react-router-dom"
import { ClientsForm, ClientsPages, PaymentTerm, PlansForm, PlansPages } from "../pages"
import { PlansDetails } from "../pages/PlansDetails"
import { PlansDetailsForm } from "../pages/PlansDetailsForm"

export const SuscriptionsRoute = () => {
    return (
        <Routes>

            {/* CLIENTES */}
            <Route path="clientes" element={< ClientsPages />} />
            <Route path="clientes/formulario" element={<ClientsForm />} />


            {/* PLANES */}
            <Route path="configuracion/planes" element={< PlansPages />} />
            <Route path="configuracion/planes/formulario" element={< PlansForm />} />
            <Route path="configuracion/planes/detalle" element={< PlansDetails />} />
            <Route path="configuracion/planes/detalle/formulario" element={< PlansDetailsForm />} />

            <Route path="configuracion/plazospago" element={< PaymentTerm />} />

            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    )
}
