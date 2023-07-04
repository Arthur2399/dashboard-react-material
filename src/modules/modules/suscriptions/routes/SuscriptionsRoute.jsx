import { Navigate, Route, Routes } from "react-router-dom"
import {
    PlansDetails,
    PlansDetailsForm,
    ClientsForm,
    ClientsPages,
    PaymentTerm,
    PaymentTermForm,
    PlansForm,
    PlansPages,
    Services,
    ServiceForm,
    Contract,
    ContractForm,
    ContractSing,
    ContractDetail,
    ContractDetailForm,
    ContractPrint,
    ClosingReason,
    ClosingReasonForm,
} from "../pages"

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

            {/* SERVICIOS */}
            <Route path="configuracion/servicios" element={< Services />} />
            <Route path="configuracion/servicios/Formulario" element={< ServiceForm />} />

            <Route path="configuracion/razoncierre" element={< ClosingReason />} />
            <Route path="configuracion/razoncierre/formulario" element={< ClosingReasonForm />} />


            {/* CONTRATO */}
            <Route path="contratos" element={<Contract />} />
            <Route path="contratos/formulario" element={<ContractForm />} />
            <Route path="contratos/detalle" element={<ContractDetail />} />
            <Route path="contratos/detalle/formulario" element={<ContractDetailForm />} />
            <Route path="contratos/firmar" element={<ContractSing />} />
            <Route path="contratos/imprimir" element={<ContractPrint />} />

            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    )
}
