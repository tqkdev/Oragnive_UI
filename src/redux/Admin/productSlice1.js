import { createSlice } from '@reduxjs/toolkit';
import { addProduct, deleteProduct, updateProduct } from './adminApiRequest1';

const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: {
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //addProduct
            .addCase(addProduct.pending, (state) => {
                state.product.isFetching = true;
            })
            .addCase(addProduct.fulfilled, (state) => {
                state.product.isFetching = false;
                state.product.error = false;
                state.product.success = true;
            })
            .addCase(addProduct.rejected, (state) => {
                state.product.isFetching = false;
                state.product.error = false;
                state.product.success = false;
            })
            //deleteProduct
            .addCase(deleteProduct.pending, (state) => {
                state.product.isFetching = true;
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.product.isFetching = false;
            })
            .addCase(deleteProduct.rejected, (state) => {
                state.product.isFetching = false;
                state.product.error = false;
            })
            //updateProduct
            .addCase(updateProduct.pending, (state) => {
                state.product.isFetching = true;
            })
            .addCase(updateProduct.fulfilled, (state) => {
                state.product.isFetching = false;
            })
            .addCase(updateProduct.rejected, (state) => {
                state.product.isFetching = false;
                state.product.error = true;
            });
    },
});

export const {
    getAllStart,
    getAllSuccess,
    getAllFailed,
    createStart,
    createSuccess,
    createFailed,
    deleteStart,
    deleteSuccess,
    deleteFailed,
    updateStart,
    updateSuccess,
    updateFailed,
} = productSlice.actions;

export default productSlice.reducer;
