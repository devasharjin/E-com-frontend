import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getProducts = createAsyncThunk('product/getproduct', async ({ keyword, category, page = 1 }, { rejectWithValue }) => {
    try {
        // const link='/api/products'
        let link=`/api/products?page=${page}`
        if (keyword) {
            link += `&keyword=${encodeURIComponent(keyword)}`
        }
        if (category) {
           link += `&category=${encodeURIComponent(category)}`
        }
        
        const { data } = await axios.get(link)
        console.log(data)
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || 'something went wrong')
    }
})

export const getSingleProduct = createAsyncThunk('/product/getsingleproduct', async (id, { rejectWithValue }) => {
    try {
        const link = `/api/product/${id}`
        const { data } = await axios.get(link)
        console.log(data)
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || 'something went wrong')
    }
})

const productslice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        product: null,
        productCount: 0,
        resultPerPage: 4,
        totalPage: 0,
        loading: false,
        error: null
    },
    reducers: {
        removeError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state, action) => {
            state.loading = true,
                state.error = null
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.products = action.payload.products
            state.productCount = action.payload.productCount
            state.resultPerPage = action.payload.resultPerPage
            state.totalPage = action.payload.totalPage

        })
        builder.addCase(getProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'something went wrong'
            state.products = []
        })
        builder.addCase(getSingleProduct.pending, (state, action) => {
            state.loading = true,
                state.error = null
        })
        builder.addCase(getSingleProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.product = action.payload.product

        })
        builder.addCase(getSingleProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'something went wrong'
        })
    }
})

export const { removeError } = productslice.actions
export default productslice.reducer