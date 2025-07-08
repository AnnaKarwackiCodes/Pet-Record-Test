import { Text, View } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Dashboard from "./dashboard";
import PetProfile from "./petProfile";
import RecordDetails from "./recordDetails";
import { setPetList, setPetRecords } from "@/Redux/reducers/UserInfo";

export default function LoggedInPage() {
  const dispatch = useDispatch();
  const currentScreen = useSelector((store: any)=> {
    return store.userInfo.currentScreen;
  });

  const [myCurrentScreen, setMyCurrentScreen] = useState(currentScreen || 'dashboard');

  useEffect(() => {
  dispatch(setPetList({petList: [
    {name: "Wulfred", type: "Dog", breed: "corgi", DOB: "07/02/2022", records: [{type: "Vaccine", name: "", dateAdmin: "", updatedDate: ""}]},
    {name: "Art Jr", type: "Cat", breed: "orange", DOB: "?", records: [{type: "Allergy", name: "", reaction: "", severity: "", updatedDate: ""}]},
    {name: "Raven", type: "Bird", breed: "raven", DOB: "?", records: [{type: "Lab", name: "", dosage: "", instructions: "", updatedDate: ""}]},
    {name: "BunBun", type: "Bunny", breed: "floppy", DOB: "?", records: [{type: "Vaccine", name: "", dateAdmin: "", updatedDate: ""},
      {type: "Allergy", name: "", reaction: "", severity: "", updatedDate: ""},
      {type: "Lab", name: "", dosage: "", instructions: "", updatedDate: ""}]},
  ]}))
}, []);

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
