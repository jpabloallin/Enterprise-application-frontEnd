import { RootState } from '../app/store';
import { createSlice } from "@reduxjs/toolkit";
import { productSoldType } from "../types/billTypes";

interface initialStateType {
    productsSold: productSoldType[]
}

const initialState: initialStateType = {
    productsSold: []
}

const productSoldSlice = createSlice (
    {
        name: 'soldproducts',
        initialState,
        reducers : {
            addProductSoldReducer(state, action): any{
                state.productsSold.push(action.payload)          
            },
            clearProductsSoldReducer(state): any{
                state.productsSold = []
            }
        }
    }
)
export default productSoldSlice.reducer

export const getItems = (state: RootState) => state.productsSold.productsSold
export const { addProductSoldReducer } = productSoldSlice.actions
export const { clearProductsSoldReducer } = productSoldSlice.actions
