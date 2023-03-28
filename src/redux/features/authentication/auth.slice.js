import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from '../../../firebase/auth.config';
import { createUserFullfill, createUserPanding, createUserReject, getUserFullfill, getUserPanding, getUserReject, loginUserFullfill, loginUserPanding, loginUserReject } from '../../async_cases/auth.case';


const initialState = {
    user: {},
    _status: {
        isLoading: false,
        isError: false,
        error: ''
    }
}
export const createUser = createAsyncThunk("auth/createUser", async ({ email, password }) => {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    return res?.user.email
})

export const getUserInfo = createAsyncThunk("auth/userInfo", async (email) => {
    const res = await fetch(process.env.REACT_APP_URL+'/users/' + email)
    const data = await res.json()
    if (data?._id) {
        return data
    } else {
        return { email }
    }
})

export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }) => {
    const res = await signInWithEmailAndPassword(auth, email, password)
    return res?.user?.email
})

export const loginwithgoogle = createAsyncThunk("auth/loginwithgoogle", async () => {
    const provider = new GoogleAuthProvider()
    const res = await signInWithPopup(auth, provider)
    return res?.user.email
})


const auth_slice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        logoutUser: (state, action) => {
            state.user = ''
        },
        loadUser: (state, action) => {
            state.user.email = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, createUserPanding)
        builder.addCase(createUser.fulfilled, createUserFullfill)
        builder.addCase(createUser.rejected, createUserReject)

        builder.addCase(loginUser.pending, loginUserPanding)
        builder.addCase(loginUser.fulfilled, loginUserFullfill)
        builder.addCase(loginUser.rejected, loginUserReject)

        builder.addCase(loginwithgoogle.pending, loginUserPanding)
        builder.addCase(loginwithgoogle.fulfilled, loginUserFullfill)
        builder.addCase(loginwithgoogle.rejected, loginUserReject)

        builder.addCase(getUserInfo.pending, getUserPanding)
        builder.addCase(getUserInfo.fulfilled, getUserFullfill)
        builder.addCase(getUserInfo.rejected, getUserReject)

    }
})
export const { logoutUser, loadUser } = auth_slice.actions
export default auth_slice.reducer