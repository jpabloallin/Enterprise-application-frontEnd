import { RootState } from './../app/store';
import { productType } from './../types/productTypes';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductStatus, IProductState } from '../types/productTypes';


const URL_BASE = 'http://localhost:8081';

const initialState: IProductState = {
    products: [],
    status: fetchProductStatus.IDLE,
    error: null,
}

// thunk actions
// get all products
export const getAllProducts:any = createAsyncThunk('/get/products', async () => {
    const response = await fetch(`${URL_BASE}/get/products`)
    return (await response.json()) as productType[]
})
//create a new product
export const createProduct:any = createAsyncThunk('/save/product', async (product:productType) => {
    const response = await fetch(`${URL_BASE}/save/product`, {
        method: 'POST',
        headers: {'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(product),
    }) 
    return (await response.json()) as productType
})
//delete a product
export const deleteProduct:any = createAsyncThunk('/product/delete', async (product: productType) => {
    const response = await fetch(`${URL_BASE}/delete/product/${product.id}`, {
      method: 'DELETE',
    })
    return { deleted: response.ok, productId: product.id }
  })
  
export const productSlice = createSlice({ 
    name: "products",
    initialState,
    reducers: {
        productAdded: (state, action) => {},
        productDeleted: (state, action) => {},
    },
    extraReducers: (builder) => {
        //get all providers
        builder.addCase(getAllProducts.pending, (state, action) => {
            state.status = fetchProductStatus.PENDING
        })
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.status = fetchProductStatus.COMPLETED
            state.products = action.payload
        })
        builder.addCase(getAllProducts.rejected, (state, action) => {
            state.status = fetchProductStatus.FAILED
            state.error = 'Something went wrong while fetching'
            state.products = []
        })
        // new product
        builder.addCase(createProduct.pending, (state) => {
            state.status = fetchProductStatus.PENDING
        })
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.status = fetchProductStatus.COMPLETED
            state.products.push(action.payload)
        })
        builder.addCase(createProduct.rejected, (state) => {
            state.status = fetchProductStatus.FAILED
            state.error = 'Something went wrong while creating the product'
        })
        // delete
        builder.addCase(deleteProduct.pending, (state) => {
            state.status = fetchProductStatus.PENDING
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.status = fetchProductStatus.COMPLETED
            if (action.payload.deleted) {
                state.products = state.products.filter((product) => product.id !== action.payload.productId)
            }
        })
        builder.addCase(deleteProduct.rejected, (state) => {
            state.status = fetchProductStatus.FAILED
            state.error = 'Something went wrong while deleting the product'
        })
    },
})

export const { productAdded, productDeleted } = productSlice.actions;

export const selectProviderState = () => (state: RootState) => state.providers.providers
export const selectProviderStatus = () => (state: RootState) => state.providers.status
export const selectProviderFetchError = () => (state: RootState) => state.providers.error

export default productSlice.reducer;