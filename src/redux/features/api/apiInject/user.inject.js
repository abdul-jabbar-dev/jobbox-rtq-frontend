// import { getUserInfo } from "../../authentication/auth.slice";
// import apiSlice from "../api.slice";

// const userApiBuilder = apiSlice.injectEndpoints({
//     endpoints: (builder) => ({


//         register: builder.mutation({
//             query: (data) => ({
//                 method: 'post',
//                 body: data,
//                 url: '/users'
//             }),
//             async onQueryStarted(data, { dispatch, queryFulfilled }) {
//                 try {
//                     const res = await queryFulfilled;
//                     res && dispatch(getUserInfo(data.email))
//                 } catch (error) {

//                 }
//             }
//         }),

//     })
// })

// const { useRegisterMutation } = userApiBuilder