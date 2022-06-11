import { configureStore } from "@reduxjs/toolkit";
import providersReducer from '../features/providerSlice'
import productsReducer from '../features/productSlice'

export const store = configureStore({
    reducer: {
        providers: providersReducer,
        products: productsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;