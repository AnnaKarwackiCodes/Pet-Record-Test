import { createSlice } from '@reduxjs/toolkit'

const SystemSettings = createSlice({
    name: 'SystemSettings',
    initialState:{
        isAddPetOpen: false,
    },
    reducers:{
        
        setIsAddPetOpen: (state, action)=> {
            state.isAddPetOpen = action.payload.isAddPetOpen;
        }
    }
})

export const {setIsAddPetOpen} = SystemSettings.actions;

export default SystemSettings.reducer;