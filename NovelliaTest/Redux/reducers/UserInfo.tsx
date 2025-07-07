import { createSlice } from '@reduxjs/toolkit'

const UserInfo = createSlice({
    name: 'UserInfo',
    initialState:{
        name: '',
        email: '',
        isLoggedIn: false,
        petList: []
    },
    reducers:{
        setUserInfo: (state, action)=> {
            console.log(action.payload.value);
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.isLoggedIn = action.payload.isLoggedIn;
            state.petList = action.payload.petList;
        },
        setPetList: (state, action)=> {
           state.petList = action.payload.petList; 
        }
    }
})

export const {setUserInfo, setPetList} = UserInfo.actions;

export default UserInfo.reducer;