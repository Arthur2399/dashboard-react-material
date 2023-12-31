import { Navigate, Route, Routes } from 'react-router-dom';

import { AfterLogin } from '../pages/AfterLogin';
import { ModulesRoutes } from '../../../modules/routes/ModulesRoutes';
import { useCompanyInfoStore } from '../../../modules/hooks/useCompanyInfoStore';

export const AfterLoginRoutes = () => {

    const { statusCompany } = useCompanyInfoStore();

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
