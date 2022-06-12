import { billType, fetchBillStatus } from './../types/billTypes';
import { RootState } from './../app/store';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchReceiptStatus, IReceiptState, receiptType } from '../types/receiptTypes';
import { IBillState } from '../types/billTypes';

const URL_BASE = 'http://localhost:8081';

const initialState: IBillState = {
    bills: [],
    status: fetchBillStatus.IDLE,
    error: null,
}

// thunk actions
// get all
export const getAllBills:any = createAsyncThunk('/get/bills', async () => {
    const response = await fetch(`${URL_BASE}/get/bills`)
    return (await response.json()) as billType[]
})
//create a new bill
export const createBill:any = createAsyncThunk('/save/bill', async (bill:billType) => {
    const response = await fetch(`${URL_BASE}/save/bill`, {
        method: 'POST',
        headers: {'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(bill),
    }) 
    return (await response.json()) as billType
})
  
export const billSlice = createSlice({ 
    name: "bills",
    initialState,
    reducers: {
        billAdded: (state, action) => {},
    },
    extraReducers: (builder) => {
        //get all bills
        builder.addCase(getAllBills.pending, (state, action) => {
            state.status = fetchBillStatus.PENDING
        })
        builder.addCase(getAllBills.fulfilled, (state, action) => {
            state.status = fetchBillStatus.COMPLETED
            state.bills = action.payload
        })
        builder.addCase(getAllBills.rejected, (state, action) => {
            state.status = fetchBillStatus.FAILED
            state.error = 'Something went wrong while fetching'
            state.bills = []
        })
        // new bill
        builder.addCase(createBill.pending, (state) => {
            state.status = fetchBillStatus.PENDING
        })
        builder.addCase(createBill.fulfilled, (state, action) => {
            state.status = fetchBillStatus.COMPLETED
            state.bills.push(action.payload)
        })
        builder.addCase(createBill.rejected, (state) => {
            state.status = fetchBillStatus.FAILED
            state.error = 'Something went wrong while creating the bill'
        })
    },
})

export const { billAdded } = billSlice.actions;

export const selectReceiptState = () => (state: RootState) => state.bills.bills
export const selectReceiptStatus = () => (state: RootState) => state.bills.status
export const selectReceiptFetchError = () => (state: RootState) => state.bills.error

export default billSlice.reducer;