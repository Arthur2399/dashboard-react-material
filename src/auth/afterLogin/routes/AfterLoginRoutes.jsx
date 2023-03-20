import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useCheckAuth } from '../../../hooks/useCheckAuth'
import { ModulesRoutes } from '../../../modules'
import { AfterLogin } from '../pages/AfterLogin'

export const AfterLoginRoutes = () => {

    const { statusCompany } = useCheckAuth();

    return (
        <Routes>
            {(statusCompany === 'selected')
                ? < Route path="/*" element={<ModulesRoutes />} />
                : <Route path="after-login" element={<AfterLogin />} />
            }
            <Route path="/*" element={<Navigate to="after-login" />} />
        </Routes>
    )
}
