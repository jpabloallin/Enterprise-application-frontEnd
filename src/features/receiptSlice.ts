import { RootState } from './../app/store';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchReceiptStatus, IReceiptState, receiptType } from '../types/receiptTypes';

const URL_BASE = 'https://enterprise-app-sofkau.herokuapp.com';

const initialState: IReceiptState = {
    receipts: [],
    status: fetchReceiptStatus.IDLE,
    error: null,
}

// thunk actions
// get all
export const getAllReceipts:any = createAsyncThunk('/get/receipts', async () => {
    const response = await fetch(`${URL_BASE}/get/receipts`)
    return (await response.json()) as receiptType[]
})
//create a new receipt
export const createReceipt:any = createAsyncThunk('/save/receipt', async (receipt:receiptType) => {
    const response = await fetch(`${URL_BASE}/save/receipt`, {
        method: 'POST',
        headers: {'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(receipt),
    }) 
    return (await response.json()) as receiptType
})
  
export const receiptSlice = createSlice({ 
    name: "receipts",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        //get all receipts
        builder.addCase(getAllReceipts.pending, (state) => {
            state.status = fetchReceiptStatus.PENDING
        })
        builder.addCase(getAllReceipts.fulfilled, (state, action) => {
            state.status = fetchReceiptStatus.COMPLETED
            state.receipts = action.payload
        })
        builder.addCase(getAllReceipts.rejected, (state) => {
            state.status = fetchReceiptStatus.FAILED
            state.error = 'Something went wrong while fetching'
            state.receipts = []
        })
        // new receipt
        builder.addCase(createReceipt.pending, (state) => {
            state.status = fetchReceiptStatus.PENDING
        })
        builder.addCase(createReceipt.fulfilled, (state, action) => {
            state.status = fetchReceiptStatus.COMPLETED
            state.receipts.push(action.payload)
        })
        builder.addCase(createReceipt.rejected, (state) => {
            state.status = fetchReceiptStatus.FAILED
            state.error = 'Something went wrong while creating the receipt'
        })
    },
})


export const selectReceiptState = () => (state: RootState) => state.receipts.receipts
export const selectReceiptStatus = () => (state: RootState) => state.receipts.status
export const selectReceiptFetchError = () => (state: RootState) => state.receipts.error
export const selectProviderById = (id:string) => (state: RootState) => state.providers.providers.find(provider => provider.id === id)

export default receiptSlice.reducer;