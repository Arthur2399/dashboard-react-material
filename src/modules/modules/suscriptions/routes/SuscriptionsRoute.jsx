import { Navigate, Route, Routes } from "react-router-dom"
import { PlansDetails, PlansDetailsForm, ClientsForm, ClientsPages, PaymentTerm, PaymentTermForm, PlansForm, PlansPages } from "../pages"

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

            {/* PLAZOS DE PAGO */}
            <Route path="configuracion/plazospago" element={< PaymentTerm />} />
            <Route path="configuracion/plazospago/formulario" element={< PaymentTermForm />} />


            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    )
}
