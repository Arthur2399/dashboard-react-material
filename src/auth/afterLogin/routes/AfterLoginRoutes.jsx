import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useCheckStatus } from '../../../hooks'
import { ModulesRoutes } from '../../../modules/routes/ModulesRoutes'
import { AfterLogin } from '../pages/AfterLogin'

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
