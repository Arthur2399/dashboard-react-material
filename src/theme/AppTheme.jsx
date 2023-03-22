import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { blueTheme } from './blueTheme';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const AppTheme = ({ children }) => {
    return (
        <ThemeProvider theme={blueTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
