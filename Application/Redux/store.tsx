import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import Tester from "./reducers/Tester";
import UserInfo from "./reducers/UserInfo"
import SystemSettings from "./reducers/SystemSettings"

const allReducers = combineReducers({
    tester: Tester,
    userInfo: UserInfo,
    systemSettings: SystemSettings,
});

const store = configureStore({reducer: allReducers});
export default store;