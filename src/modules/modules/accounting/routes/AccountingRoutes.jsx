import React from 'react'
import { AccountingPage } from '../pages/AccountingPage'
import { Navigate, Route, Routes } from 'react-router-dom'

export const AccountingRoutes = () => {
  return (
    <Routes>
    <Route path="tesoreria" element={<AccountingPage/>} />
    <Route path="/*" element={<Navigate to="/" />} />
  </Routes>
  )
}
