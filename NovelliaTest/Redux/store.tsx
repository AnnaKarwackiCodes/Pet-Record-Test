import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import Tester from "./reducers/Tester";
import UserInfo from "./reducers/UserInfo"

const allReducers = combineReducers({
    tester: Tester,
    userInfo: UserInfo
});

const store = configureStore({reducer: allReducers});
export default store;