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
        currentPetIndex: -1,
        currentScreen: 'dashboard'
    },
    reducers:{
        setUserInfo: (state, action)=> {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.isLoggedIn = action.payload.isLoggedIn;
            state.petList = action.payload.petList;
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
        },
        setCurrentPetID: (state, action)=> {
            state.currentPetIndex = action.payload.currentPetIndex;
        },
        setCurrentScreen: (state, action) => {
            state.currentScreen = action.payload.currentScreen;
        },
    }
})

export const {setUserInfo, setPetList, setLoginState, setCreateAnAccount, setIsLoggingIn, setCurrentPetID, setCurrentScreen} = UserInfo.actions;

export default UserInfo.reducer;