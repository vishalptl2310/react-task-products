import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProducts, getProductsByQuery } from '../api/productApi';
import { Product } from '../types/productTypes';

const initialState: Array<Product> = []

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // Define reducers if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsData.fulfilled, (state, actions) => {
                state.length = 0
                state.push(...actions.payload.products)
            })
            .addCase(fetchProductsByQuery.fulfilled, (state, actions) => {
                state.length = 0
                state.push(...actions.payload.products)
            })
    },
});

export const fetchProductsData = createAsyncThunk(
    'products/fetchProductsData',
    async () => {
        try {
            const response = (await getProducts()).data;
            return response;
        } catch (error) {
            console.error('Error fetching products data:', error);
        }
    },
);

export const fetchProductsByQuery = createAsyncThunk(
    'QueryProduct',
    async (searchText: String) => {
        try {
            const response = (await getProductsByQuery(searchText)).data;
            return response;
        } catch (error) {
            console.error('Error fetching products data:', error);
        }
    },
);

// export const {} = UserSlice.actions;
export default productSlice.reducer;
