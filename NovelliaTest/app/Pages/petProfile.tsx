import { Text, View, Image, ScrollView, FlatList } from "react-native";
import {StyleSheet, TextInput} from 'react-native';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { setKeyValue } from "../../Redux/reducers/Tester";
import AppButton from "../Components/appButton";
import styles from "../Helpers/styleSheet";
import { setCurrentScreen, setLoginState } from "@/Redux/reducers/UserInfo";
import ListItem from "../Components/listItem";

export default function PetProfile() {
const dispatch = useDispatch();

const currentPetIndex = useSelector((store: any)=> {
    return store.userInfo.currentPetIndex;
});
const petList = useSelector((store: any)=> {
    return store.userInfo.petList;
});

const [currentPet, setCurrentPet] = useState({name: '', type: '', breed: '', DOB: ''});

useEffect(() => {
  setCurrentPet(petList[currentPetIndex]);
}, []);

const tester = [
  {type: "vaccine", name: "", date: ""},
  {type: "allergies", name: "", reaction: "", severity: ""},
  {type: "labs", name: "", dosage: "", instructions: ""},
]

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        marginTop: 15
      }}
    >
      <AppButton style={styles.confirmButton} text={"Return to Dashboard"} onPress={()=>{dispatch(setCurrentScreen({currentScreen: 'dashboard'}));}}/>

      <Text style={styles.titleText}>{currentPet.name}'s Profile</Text>
      <Text style={styles.subTitleText}>Type: {currentPet.type} Breed: {currentPet.breed}</Text>
      <Text style={styles.subTitleText}>DOB: {currentPet.DOB}</Text>
      <View style={{height: '70%', width: '70%', marginTop: 10, padding: 20, backgroundColor:"#F5F0CD"}}>
        <FlatList data={tester} renderItem={({item})=> <ListItem itemObj={item} itemType={"pet"} onPress={() => {console.log('Record press')}}/>}/>
        <ListItem itemObj={{addType: "record"}} itemType={"add"} onPress={() => {console.log('add press')}}/>
      </View>
    </View>
  );
}
