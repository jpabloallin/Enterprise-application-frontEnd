import { configureStore } from "@reduxjs/toolkit";
import providersReducer from '../features/providerSlice'

export const store = configureStore({
    reducer: {
        providers: providersReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;