import { Text, View } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import LoginComponent from "./Components/loginComponent";

export default function Index() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((store: any)=> {
  return store.userInfo.isLoggedIn;
  });
  return (
      <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoggedIn?<View></View> : <LoginComponent/>}
    </View>
  );
}
