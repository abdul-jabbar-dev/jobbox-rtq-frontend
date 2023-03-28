
export const createUserPanding = (state) => {
    state._status.isLoading = true
}
export const createUserReject = (state, action) => {
    state._status.isLoading = false
    state._status.isError = true
    state._status.error = action.error.message
    state.user.email = ''
}
export const createUserFullfill = (state, action) => {
    state._status.isLoading = false
    state.user.email = action.payload

}

export const loginUserPanding = (state) => {
    state._status.isLoading = true
    state._status.isError = false
    state._status.error = ''
}
export const loginUserReject = (state, action) => {
    state._status.isLoading = false
    state._status.isError = true
    state._status.error = action.error.message
    state.user.email = ''
}
export const loginUserFullfill = (state, action) => { 
    state.user = { email: action.payload } 
    state._status.isLoading = false
    state._status.isError = false
    state._status.error = ''
}



export const getUserPanding = (state) => {
    state._status.isLoading = true
    state._status.isError = false
    state._status.error = ''
}
export const getUserReject = (state, action) => {
    state._status.isLoading = false
    state._status.isError = true
    state._status.error = action.error.message
}
export const getUserFullfill = (state, action) => { 
    state._status.isLoading = false
    state.user = action.payload
    state._status.isError = false
    state._status.error = ''
}


