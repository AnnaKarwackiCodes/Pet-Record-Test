import { Text, View } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import LoginComponent from "./Components/loginComponent";
import Dashboard from "./Pages/dashboard";
import LoggedInPage from "./Pages/loggedInPage";

export default function Index() {

  const isLoggedIn = useSelector((store: any)=> {
  return store.userInfo.isLoggedIn;
  });

  const [loggedIn, setLoggedIn] = useState(isLoggedIn || false);

  useEffect(() => {
    setLoggedIn(isLoggedIn);
    console.log("index isLoggedIN: " + isLoggedIn);
  }, [isLoggedIn]);
  return (
      <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loggedIn?<LoggedInPage /> : <LoginComponent/>}
    </View>
  );
}
