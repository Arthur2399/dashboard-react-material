import { AppRouter } from "./router/AppRouter"
import { AppTheme } from "./theme"
import 'animate.css';

export const MorgquickApp = () => {
    return (
        <AppTheme>
            <AppRouter/>
        </AppTheme>
    )
}
