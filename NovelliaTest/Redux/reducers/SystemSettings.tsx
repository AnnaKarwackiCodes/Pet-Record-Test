import { createSlice } from '@reduxjs/toolkit'

const SystemSettings = createSlice({
    name: 'SystemSettings',
    initialState:{
        isAddPetOpen: false,
        isAddRecordOpen: false,
        currentRecordType: '',
        currentPetType: '',
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
        },
        setCurrentPetType: (state, action) => {
            state.currentPetType = action.payload.currentPetType;
        },
    }
})

export const {setIsAddPetOpen, setIsAddRecordOpen, setCurrentRecordType, setCurrentPetType} = SystemSettings.actions;

export default SystemSettings.reducer;