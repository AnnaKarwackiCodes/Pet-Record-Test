import { Text, View } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Dashboard from "./dashboard";
import PetProfile from "./petProfile";
import RecordDetails from "./recordDetails";

export default function LoggedInPage() {

  const currentScreen = useSelector((store: any)=> {
    return store.userInfo.currentScreen;
  });

  const [myCurrentScreen, setMyCurrentScreen] = useState(currentScreen || 'dashboard');

  useEffect(() => {
    setMyCurrentScreen(currentScreen);
    console.log("currentScreen: " + currentScreen);
  }, [currentScreen]);
  return (
      <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {myCurrentScreen === 'dashboard'?<Dashboard /> : null}
      {myCurrentScreen === 'petProfile'?<PetProfile /> : null}
      {myCurrentScreen === 'recordDetails'?<RecordDetails /> : null}
    </View>
  );
}
