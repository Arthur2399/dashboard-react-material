import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { MorgquickApp } from './MorgquickApp';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MorgquickApp />
    </BrowserRouter>
  </React.StrictMode>
)
