import { Text, View, Image, ScrollView, FlatList } from "react-native";
import {StyleSheet, TextInput} from 'react-native';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { setKeyValue } from "../../Redux/reducers/Tester";
import AppButton from "../Components/appButton";
import styles from "../Helpers/styleSheet";
import { setLoginState } from "@/Redux/reducers/UserInfo";
import ListItem from "../Components/listItem";
import AddNewListItem from "../Components/addNewListItem";
import { setIsAddPetOpen } from "@/Redux/reducers/SystemSettings";

export default function Dashboard() {
const dispatch = useDispatch();

const userName = useSelector((store: any)=> {
return store.userInfo.name;
});

const [myName, setMyName] = useState(userName||'');

useEffect(() => {
    setMyName(userName);
    console.log("userName: " + userName);
}, [userName]);


const tester = [
  {name: "Wulfred", type: "dog", breed: "corgi", DOB: "07/02/2022"},
  {name: "Art Jr", type: "cat", breed: "orange", DOB: "?"},
  {name: "Raven", type: "bird", breed: "raven", DOB: "?"},
  {name: "BunBun", type: "bunny", breed: "floppy", DOB: "?"},
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
      <Text style={styles.titleText}>Welcome {myName}</Text>
      <Text style={styles.subTitleText}>This is you pet dashboard.</Text>
      <View style={{height: '70%', width: '70%', marginTop: 10, padding: 20, backgroundColor:"#F5F0CD"}}>
        <FlatList data={tester} renderItem={({item})=> <ListItem itemObj={item} itemType={"pet"} onPress={() => {console.log('pet press')}}/>}/>
        <ListItem itemObj={{addType: "pet"}} itemType={"add"} onPress={() => {dispatch(setIsAddPetOpen({isAddPetOpen: true}));  console.log('add press')}}/>
      </View>
      <AddNewListItem itemType={"pet"}/>
    </View>
  );
}
