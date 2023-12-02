import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'order',
    initialState: {
        product: {
            isFetching: false,
            error: false,
            success: false,
            order: [],
        },
    },
    reducers: {
        getOrderStart: (state) => {
            state.product.isFetching = true;
        },
        getOrderSuccess: (state, action) => {
            state.product.isFetching = false;
            state.product.order = action.payload;
        },
        getOrderFailed: (state) => {
            state.product.isFetching = false;
            state.product.error = false;
            state.product.success = false;
        },
        deleteOrderStart: (state) => {
            state.product.isFetching = true;
        },
        deleteOrderSuccess: (state) => {
            state.product.isFetching = false;
        },
        deleteOrderFailed: (state) => {
            state.product.isFetching = false;
            state.product.error = false;
        },
        updateOderStart: (state) => {
            state.product.isFetching = true;
        },
        updateOderSuccess: (state) => {
            state.product.isFetching = false;
        },
        updateOderFailed: (state) => {
            state.product.isFetching = false;
            state.product.error = false;
        },

        updateQualityStart: (state) => {
            state.product.isFetching = true;
        },
        updateQualitySuccess: (state) => {
            state.product.isFetching = false;
        },
        updateQualityFailed: (state) => {
            state.product.isFetching = false;
            state.product.error = false;
        },
    },
});

export const {
    getOrderStart,
    getOrderSuccess,
    getOrderFailed,
    deleteOrderStart,
    deleteOrderSuccess,
    deleteOrderFailed,
    updateOderStart,
    updateOderSuccess,
    updateOderFailed,
    updateQualityStart,
    updateQualitySuccess,
    updateQualityFailed,
} = productSlice.actions;

export default productSlice.reducer;
