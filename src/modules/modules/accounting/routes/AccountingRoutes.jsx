import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AccountingPlan, Accounting } from '../pages';

export const AccountingRoutes = () => {
  return (
    <Routes>
      <Route path='contabilidad' element={<Accounting/>} />
      <Route path="planContable" element={<AccountingPlan />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
