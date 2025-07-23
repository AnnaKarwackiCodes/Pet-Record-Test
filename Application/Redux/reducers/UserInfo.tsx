import { createSlice } from '@reduxjs/toolkit'

const UserInfo = createSlice({
    name: 'UserInfo',
    initialState:{
        name: '',
        email: '',
        isLoggedIn: false,
        petList: [],
        vetRecords: [],
        createAnAccount: false,
        isLoggingIn: false,
        currentPetIndex: -1,
        currentScreen: 'dashboard',
        currentRecordIndex: -1,
        currentVetIndex: -1
    },
    reducers:{
        setUserInfo: (state, action)=> {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.petList = [];
        },
        setPetList: (state, action)=> {
           state.petList = action.payload.petList; 
        },
        setVetRecords: (state, action)=> {
           state.vetRecords = action.payload.vetRecords; 
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
        setCurrentRecordID: (state, action)=> {
            state.currentRecordIndex = action.payload.currentRecordIndex;
        },
        setCurrentVetID: (state, action)=> {
            state.currentVetIndex = action.payload.currentVetIndex;
        },
        setCurrentScreen: (state, action) => {
            state.currentScreen = action.payload.currentScreen;
        },
        resetUser: (state, action) => {
            state.name = '';
            state.email = '';
            state.isLoggedIn = false;
            state.petList = [];
            state.vetRecords = [];
            state.createAnAccount = false;
            state.isLoggingIn = false;
            state.currentPetIndex = -1;
            state.currentScreen = 'dashboard';
            state.currentRecordIndex = -1;
            state.currentVetIndex = -1;
        },
    }
})

export const {setUserInfo, setPetList, setLoginState, setCreateAnAccount, setIsLoggingIn, setCurrentPetID, setVetRecords, setCurrentRecordID, setCurrentScreen, setCurrentVetID, resetUser} = UserInfo.actions;

export default UserInfo.reducer;