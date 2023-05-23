import { Navigate, Route, Routes } from 'react-router-dom';
import { AfterLoginRoutes } from '../auth/afterLogin/routes';
import { useCheckStatus } from '../hooks';
import { ModulesRoutes } from '../modules';
import { AuthRoutes } from '../auth';
import { CheckingAuth } from '../ui';
import { getEnvironments } from '../helpers/getEnvironments';

export const AppRouter = () => {

    /*  
        PUNTO DE INICIO DE LA APLICACIÓN
            En estan parte se valida el estado de dos slice el authSlice y 
            companyInfoSlice donde segun su valor da paso o no a las rutas
            privadas y públicas.
    */

    // Hook verificador de estado
    const { status, statusCompany } = useCheckStatus();

    // Caso uno: Verificación de credenciales
    if (status === "checking") {
        return <CheckingAuth msg="Validando credenciales ..." />
    }

    // Caso dos: Obtención de datos de la empresa o empresas
    if (status === "authenticated" && statusCompany === "no-companies" || statusCompany === 'loading') {
        return <CheckingAuth msg="Cargando información de la empresa ..." />
    }

    return (
        <Routes>
            {
                /*
                    Si el valor de status es 'authenticated' dar paso a rutas privadas
                    caso contrario vuelva a redireccionar a /auth/login de AuthRoutes
                */
                (status === "authenticated")
                    ? <>
                        {
                            /*
                                Si el valor de statusCompany es "selected" direcciona 
                                a dashboard del sistema caso contrar manda al AfterLogin
                            */
                            (statusCompany === "selected")
                                ? < Route path="/*" element={<ModulesRoutes />} />
                                : < Route path="/*" element={<AfterLoginRoutes />} />
                        }
                    </>
                    : < Route path="/auth/*" element={<AuthRoutes />} />
            }
            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}
