import { Text, View, Image, ScrollView, FlatList } from "react-native";
import {StyleSheet, TextInput} from 'react-native';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { setKeyValue } from "../../Redux/reducers/Tester";
import AppButton from "../Components/appButton";
import styles from "../Helpers/styleSheet";
import { setLoginState } from "@/Redux/reducers/UserInfo";
import ListItem from "../Components/listItem";

export default function PetProfile({petInfo}: any) {
const dispatch = useDispatch();

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
      <AppButton style={styles.logoutButton} text={"Logout"} onPress={()=>{dispatch(setLoginState({loggedin: false}));}}/>
        <Image
            source={require('../Assets/temp.jpg')}
            style={{width: 100, height: 100, alignSelf: 'center'}}
        />
      <Text style={styles.titleText}>{petInfo.name}'s Profile</Text>
      <Text style={styles.subTitleText}>Type: {petInfo.type} Breed: {petInfo.breed}</Text>
      <Text style={styles.subTitleText}>DOB: {petInfo.DOB}</Text>
      <View style={{height: '70%', width: '70%', marginTop: 10, padding: 20, backgroundColor:"#F5F0CD"}}>
        <FlatList data={tester} renderItem={({item})=> <ListItem itemObj={item} itemType={"pet"} onPress={() => {console.log('Record press')}}/>}/>
        <ListItem itemObj={{addType: "record"}} itemType={"add"} onPress={() => {console.log('add press')}}/>
      </View>
    </View>
  );
}
