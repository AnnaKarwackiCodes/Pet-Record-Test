import { createSlice } from '@reduxjs/toolkit'

const UserInfo = createSlice({
    name: 'UserInfo',
    initialState:{
        name: '',
        email: '',
        isLoggedIn: false,
        petList: [],
        createAnAccount: false,
        isLoggingIn: false,
    },
    reducers:{
        setUserInfo: (state, action)=> {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.isLoggedIn = action.payload.isLoggedIn;
            state.petList = action.payload.petList;
            state.createAnAccount = action.payload.createAnAccount;
        },
        setPetList: (state, action)=> {
           state.petList = action.payload.petList; 
        },
        setLoginState: (state, action)=> {
            state.isLoggedIn = action.payload.loggedin;
        },
        setCreateAnAccount: (state, action)=> {
            state.createAnAccount = action.payload.createAnAccount;
        },
        setIsLoggingIn: (state, action)=> {
            state.isLoggingIn = action.payload.isLoggingIn;
        }
    }
})

export const {setUserInfo, setPetList, setLoginState, setCreateAnAccount, setIsLoggingIn} = UserInfo.actions;

export default UserInfo.reducer;