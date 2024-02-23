import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProducts, getProductsByQuery } from '../api/productApi';
import { Product } from '../types/productTypes';

export interface IProductState {
    isModelOpen: boolean,
    products: Array<Product>,

}
const initialState: IProductState = {
    isModelOpen: false,
    products: []
}
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        openModel(state) {
            state.isModelOpen = true
        },
        closeModel(state) {
            state.isModelOpen = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsData.fulfilled, (state, actions) => {
                state.products = actions.payload.products
            })
            .addCase(fetchProductsData.pending, (state, actions) => {
                //if you want to implement loader
            })
            .addCase(fetchProductsData.rejected, (state, actions) => {
                state.products = []
            })
    },
});

export const fetchProductsData = createAsyncThunk(
    'products/fetchProductsData',
    async (searchText: String = "") => {
        try {
            if (searchText) {
                return (await getProductsByQuery(searchText)).data;
            } else {
                return (await getProducts()).data;
            }
        } catch (error) {
            console.error('Error fetching products data:', error);
        }
    },
);

export const { openModel, closeModel } = productSlice.actions;
export default productSlice.reducer;
