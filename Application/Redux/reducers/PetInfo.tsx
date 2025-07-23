import { createSlice } from '@reduxjs/toolkit'

const PetInfo = createSlice({
    name: 'PetInfo',
    initialState:{
        key: 'value'
    },
    reducers:{
        setKeyValue: (state, action)=> {
            console.log(action.payload.value);
            state.key = action.payload.value;
        }
    }
})

export const {setKeyValue} = PetInfo.actions;

export default PetInfo.reducer;