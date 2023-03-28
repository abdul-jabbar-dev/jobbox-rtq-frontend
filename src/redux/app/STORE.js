import logger from "redux-logger";
import apiSlice from "../features/api/api.slice";
import authSlice from "../features/authentication/auth.slice";

const { configureStore } = require("@reduxjs/toolkit");

const STORE = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        authentiaction: authSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)

})


export default STORE