import { IProviderState, providerType } from '../types/providerTypes';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IProviderState = {
    providers: [],
}

export const providerSlice = createSlice({ 
    name: "providers",
    initialState,
    reducers: {
        providerAdded: (state, action: PayloadAction<providerType>) => {
            state.providers.push(action.payload);
        }
    }
})

export const { providerAdded } = providerSlice.actions;

export default providerSlice.reducer;