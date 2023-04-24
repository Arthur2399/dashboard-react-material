import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AccountingPlan } from '../pages/AccountingPlan'

export const AccountingRoutes = () => {
  return (
    <Routes>
      <Route path="planContable" element={<AccountingPlan />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
