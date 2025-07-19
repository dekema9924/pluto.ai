

import { createSlice } from "@reduxjs/toolkit";


interface userInterface {
    email: string | null
    isVerified: boolean
    name: string | null
    profileImage: string | null
    id: string | null
}

const initialState: userInterface = {
    email: null,
    isVerified: false,
    name: null,
    profileImage: null,
    id: null
}



export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        loginUser: (state, action) => {
            return action.payload
        },
        logoffUser: (state) => {
            return initialState
        }
    }

})


export const { loginUser, logoffUser } = userSlice.actions
export default userSlice.reducer