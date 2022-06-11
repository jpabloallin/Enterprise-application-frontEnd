import { configureStore } from "@reduxjs/toolkit";
import providersReducer from '../features/providerSlice'
import productsReducer from '../features/productSlice'
import receiptsReducer from '../features/receiptSlice'

export const store = configureStore({
    reducer: {
        providers: providersReducer,
        products: productsReducer,
        receipts: receiptsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;