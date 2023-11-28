import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: {
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        createStart: (state) => {
            state.product.isFetching = true;
        },
        createSuccess: (state) => {
            state.product.isFetching = false;
            state.product.error = false;
            state.product.success = true;
        },
        createFailed: (state) => {
            state.product.isFetching = false;
            state.product.error = false;
            state.product.success = false;
        },
        deleteStart: (state) => {
            state.product.isFetching = true;
        },
        deleteSuccess: (state) => {
            state.product.isFetching = false;
        },
        deleteFailed: (state) => {
            state.product.isFetching = false;
            state.product.error = false;
        },
        updateStart: (state) => {
            state.product.isFetching = true;
        },
        updateSuccess: (state) => {
            state.product.isFetching = false;
        },
        updateFailed: (state) => {
            state.product.isFetching = false;
            state.product.error = false;
        },
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
