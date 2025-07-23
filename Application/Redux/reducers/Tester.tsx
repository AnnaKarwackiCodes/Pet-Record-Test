import { createSlice } from '@reduxjs/toolkit'

const Tester = createSlice({
    name: 'my tester redux',
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

export const {setKeyValue} = Tester.actions;

export default Tester.reducer;