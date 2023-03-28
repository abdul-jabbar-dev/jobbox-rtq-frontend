import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getUserInfo } from '../authentication/auth.slice';

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_URL
    }),
    tagTypes: ['Jobs', 'post', 'user', 'qus'],
    endpoints: (builder) => ({

        register: builder.mutation({
            query: (data) => ({
                method: 'post',
                body: data,
                url: '/users'
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;
                    res && dispatch(getUserInfo(data.email))
                } catch (error) {

                }
            }
        }),

        postJob: builder.mutation({
            query: (data) => ({
                method: "post",
                body: data,
                url: "/jobs",
            }),
            invalidatesTags: ['jobs']
        }),
        apply: builder.mutation({
            query: (data) => ({
                method: "put",
                body: data,
                url: "/apply"
            })
        }),
        addQus: builder.mutation({
            query: (data) => ({
                method: "put",
                body: data,
                url: "/qus",    
            }),
            invalidatesTags: ['qus']
        }),
        sendReplay: builder.mutation({
            query: (data) => ({
                method: "put",
                body: data,
                url: "/qus/reply",
            }),
            invalidatesTags: ['qus']
        }),

        job: builder.query({
            query: () => ({
                url: "/jobs"
            }),
            providesTags: ['jobs']
        }),


        jobById: builder.query({
            query: (id) => ({
                url: "/jobs/" + id
            }),
            providesTags: ['qus']
        }),
        appliedJobs: builder.query({
            query: (email) => "/appliedjob/" + email
            ,
        }),


    })
})
export const {
    useRegisterMutation,
    usePostJobMutation,
    useJobQuery,
    useJobByIdQuery,
    useApplyMutation,
    useAppliedJobsQuery,
    useAddQusMutation,
    useSendReplayMutation } = apiSlice
export default apiSlice