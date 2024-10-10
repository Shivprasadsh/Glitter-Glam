import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//import {getBaseUrl} from '../../../utils/baseURL.js'

const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:9000/api/product`,
        credentials: 'include',
    }),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        fetchAllProducts: builder.query({
            query: ({ category, color, minPrice, maxPrice, page = 1, limit = 10 }) => {
                const queryParams = new URLSearchParams({
                    category: category || '',
                    color: color || '',
                    minPrice: minPrice?.toString() || '0',
                    maxPrice: maxPrice?.toString() || '',
                    page: page.toString(),
                    limit: limit.toString(),
                }).toString();
                return `/?${queryParams}`;
            },
            providesTags: ['Products'],
        }),
        fetchProductById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: 'Products', id }],
        }),
        addProduct: builder.mutation({
            query: (newProduct) => ({
                url: '/create-product',
                method: 'POST',
                body: newProduct,
                credentials: 'include',
            }),
            invalidatesTags: ['Products'],
        }),
        fetchRelatedProducts: builder.query({
            query: (id) => `/related/${id}`,
        }),
        updateProduct: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/update-product/${id}`,
                method: 'PATCH',
                body: rest,
                credentials: 'include',
            }),
            invalidatesTags: ['Products'],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Products', id }],
        }),
    }),
});

export const {
    useFetchAllProductsQuery,
    useFetchProductByIdQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useFetchRelatedProductsQuery,
} = productApi;

export default productApi