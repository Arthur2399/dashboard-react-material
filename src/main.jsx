import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MorgquickApp } from './MorgquickApp';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './styles/index.css'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MorgquickApp />
        </LocalizationProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
