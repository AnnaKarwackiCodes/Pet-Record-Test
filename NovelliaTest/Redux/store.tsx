import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import Tester from "./reducers/Tester";

const allReducers = combineReducers({
    tester: Tester
});

const store = configureStore({reducer: allReducers});
export default store;