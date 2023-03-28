// import apiSlice from "../api.slice";

// const jobApiBuilder = apiSlice.injectEndpoints({

//     endpoints: (builder) => ({
//         postJob: builder.mutation({
//             query: (data) => ({
//                 method: "post",
//                 body: data,
//                 url: "/jobs",
//             }),
//             invalidatesTags: ['jobs']
//         }),
//         apply: builder.mutation({
//             query: (data) => ({
//                 method: "put",
//                 body: data,
//                 url: "/apply"
//             })
//         }),

//         job: builder.query({
//             query: () => ({
//                 url: "/jobs"
//             }),
//             providesTags: ['jobs']
//         }),

//         jobById: builder.query({
//             query: (id) => ({
//                 url: "/jobs/" + id
//             }),
//         }),
//         appliedJobs: builder.query({
//             query: (email) => "/appliedjob/" + email
//             ,
//         }),
//     })
// })

// const { useAppliedJobsQuery, useApplyMutation, useJobByIdQuery, useJobQuery, usePostJobMutation } = jobApiBuilder