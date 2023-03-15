import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { menuSlice } from "./ui/menu/menuSlice";

export const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        menu:menuSlice.reducer,
    }
});