import { AppRouter } from "./router/AppRouter"
import { AppTheme } from "./theme"

export const MorgquickApp = () => {
    return (
        <AppTheme>
            <AppRouter/>
        </AppTheme>
    )
}
