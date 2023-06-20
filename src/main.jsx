import React from 'react';
import ReactDOM from 'react-dom/client';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MorgquickApp } from './MorgquickApp';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MorgquickApp />
        </LocalizationProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
