import { configureStore } from "@reduxjs/toolkit";
import providersReducer from '../features/providerSlice'
import productsReducer from '../features/productSlice'
import receiptsReducer from '../features/receiptSlice'
import loggedInReducer from '../features/loggedInSlice'
import billsReducer from '../features/billSlice'
import productsSoldReducer from '../features/productSoldSlice'

export const store = configureStore({
    reducer: {
        providers: providersReducer,
        products: productsReducer,
        receipts: receiptsReducer,
        logged: loggedInReducer,
        bills: billsReducer,
        productsSold: productsSoldReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;