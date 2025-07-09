import { createSlice } from '@reduxjs/toolkit'

const SystemSettings = createSlice({
    name: 'SystemSettings',
    initialState:{
        isAddPetOpen: false,
        isAddRecordOpen: false,
        isAddVetOpen: false,
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
        setIsAddVetOpen: (state, action)=> {
            state.isAddVetOpen = action.payload.isAddVetOpen;
        },
        setCurrentRecordType: (state, action) => {
            state.currentRecordType = action.payload.currentRecordType;
        },
        setCurrentPetType: (state, action) => {
            state.currentPetType = action.payload.currentPetType;
        },
        resetSystem: (state, action) => {
            state.isAddPetOpen = false;
            state.isAddRecordOpen = false;
            state.isAddVetOpen = false;
            state.currentRecordType = '';
            state.currentPetType = '';
        }
    }
})

export const {setIsAddPetOpen, setIsAddRecordOpen, setCurrentRecordType, setCurrentPetType, setIsAddVetOpen, resetSystem} = SystemSettings.actions;

export default SystemSettings.reducer;