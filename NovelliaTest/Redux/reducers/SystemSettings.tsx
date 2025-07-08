import { createSlice } from '@reduxjs/toolkit'

const SystemSettings = createSlice({
    name: 'SystemSettings',
    initialState:{
        isAddPetOpen: false,
        isAddRecordOpen: false,
        currentRecordType: 'vaccine',
    },
    reducers:{
        
        setIsAddPetOpen: (state, action)=> {
            state.isAddPetOpen = action.payload.isAddPetOpen;
        },
        setIsAddRecordOpen: (state, action)=> {
            state.isAddRecordOpen = action.payload.isAddRecordOpen;
        },
        setCurrentRecordType: (state, action) => {
            state.currentRecordType = action.payload.currentRecordType;
            console.log("setCurrentRecordType " + action.payload.currentRecordType);
        },
    }
})

export const {setIsAddPetOpen, setIsAddRecordOpen, setCurrentRecordType} = SystemSettings.actions;

export default SystemSettings.reducer;