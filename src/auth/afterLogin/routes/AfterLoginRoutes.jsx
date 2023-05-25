import { Navigate, Route, Routes } from 'react-router-dom';
import { ModulesRoutes } from '../../../modules/routes/ModulesRoutes';
import { AfterLogin } from '../pages/AfterLogin';
import { useCheckStatus } from '../../../hooks';

export const AfterLoginRoutes = () => {

    const { statusCompany } = useCheckStatus();

    return (
        <Routes>
            {(statusCompany === 'selected')
                ? < Route path="/*" element={<ModulesRoutes />} />
                : < Route path="after-login" element={<AfterLogin />} />
            }
            <Route path="/*" element={<Navigate to="after-login" />} />
        </Routes>
    )
}
