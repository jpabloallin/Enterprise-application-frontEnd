import { RootState } from './../app/store';
import { fetchProviderStatus } from './../types/providerTypes';
import { IProviderState, providerType } from '../types/providerTypes';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const URL_BASE = 'http://localhost:8081';

const initialState: IProviderState = {
    providers: [],
    status: fetchProviderStatus.IDLE,
    error: null,
}

// thunk actions
// get all
export const getAllProviders:any = createAsyncThunk('/get/providers', async () => {
    const response = await fetch(`${URL_BASE}/get/providers`)
    return (await response.json()) as providerType[]
})
//create a new provider
export const createProvider:any = createAsyncThunk('/save/provider', async (provider:providerType) => {
    const response = await fetch(`${URL_BASE}/save/provider`, {
        method: 'POST',
        headers: {'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(provider),
    }) 
    return (await response.json()) as providerType
})
//delete a provider
export const deleteProvider:any = createAsyncThunk('/provider/delete', async (provider: providerType) => {
    const response = await fetch(`${URL_BASE}/delete/provider/${provider.id}`, {
      method: 'DELETE',
    })
    return { deleted: response.ok, providerId: provider.id }
  })
  
export const providerSlice = createSlice({ 
    name: "providers",
    initialState,
    reducers: {
        providerAdded: (state, action) => {},
        providerDeleted: (state, action) => {},
    },
    extraReducers: (builder) => {
        //get all providers
        builder.addCase(getAllProviders.pending, (state, action) => {
            state.status = fetchProviderStatus.PENDING
        })
        builder.addCase(getAllProviders.fulfilled, (state, action) => {
            state.status = fetchProviderStatus.COMPLETED
            state.providers = action.payload
        })
        builder.addCase(getAllProviders.rejected, (state, action) => {
            state.status = fetchProviderStatus.FAILED
            state.error = 'Something went wrong while fetching'
            state.providers = []
        })
        // new provider
        builder.addCase(createProvider.pending, (state) => {
            state.status = fetchProviderStatus.PENDING
        })
        builder.addCase(createProvider.fulfilled, (state, action) => {
            state.status = fetchProviderStatus.COMPLETED
            state.providers.push(action.payload)
        })
        builder.addCase(createProvider.rejected, (state) => {
            state.status = fetchProviderStatus.FAILED
            state.error = 'Something went wrong while creating the provider'
        })
        // delete
        builder.addCase(deleteProvider.pending, (state) => {
            state.status = fetchProviderStatus.PENDING
        })
        builder.addCase(deleteProvider.fulfilled, (state, action) => {
            state.status = fetchProviderStatus.COMPLETED
            if (action.payload.deleted) {
                state.providers = state.providers.filter((provider) => provider.id !== action.payload.providerId)
            }
        })
        builder.addCase(deleteProvider.rejected, (state) => {
            state.status = fetchProviderStatus.FAILED
            state.error = 'Something went wrong while deleting the provider'
        })
    },
})

export const { providerAdded, providerDeleted } = providerSlice.actions;

export const selectProviderState = () => (state: RootState) => state.providers.providers
export const selectProviderStatus = () => (state: RootState) => state.providers.status
export const selectProviderFetchError = () => (state: RootState) => state.providers.error

export default providerSlice.reducer;