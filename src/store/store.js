import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { menuSlice } from "./modules";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        menu: menuSlice.reducer,
    }
});