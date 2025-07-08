import { createSlice } from '@reduxjs/toolkit'

const SystemSettings = createSlice({
    name: 'SystemSettings',
    initialState:{
        isAddPetOpen: false,
        isDogSelected: false,
        isCatSelected: false,
        isBirdSelected: false,
        isBunnySelected: false
    },
    reducers:{
        
        setIsAddPetOpen: (state, action)=> {
            state.isAddPetOpen = action.payload.isAddPetOpen;
        },
        setSelected: (state, action) => {
            state.isDogSelected = action.payload.isDogSelected;
            state.isCatSelected = action.payload.isCatSelected;
            state.isBirdSelected = action.payload.isBirdSelected;
            state.isBunnySelected = action.payload.isBunnySelected;
        },
        setTest: (state, action) => {
            console.log('lksjdfjklbfsjklbsfd');
        },
    }
})

export const {setIsAddPetOpen, setSelected, setTest} = SystemSettings.actions;

export default SystemSettings.reducer;