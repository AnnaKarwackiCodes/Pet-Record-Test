import { Text, View } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Dashboard from "./dashboard";
import PetProfile from "./petProfile";
import RecordDetails from "./recordDetails";
import { setPetList } from "@/Redux/reducers/UserInfo";
import UserProfile from "./userProfile";

export default function LoggedInPage() {
  const dispatch = useDispatch();
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
      {myCurrentScreen === 'userProfile'?<UserProfile /> : null}
    </View>
  );
}
