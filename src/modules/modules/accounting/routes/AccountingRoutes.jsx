import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Accounting,Treasury } from '../pages';

export const AccountingRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Accounting/>} />
      <Route path="tesoreria" element={<Treasury />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
