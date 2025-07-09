import { Text, View, Image, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import AppButton from "../Components/appButton";
import styles from "../Helpers/styleSheet";
import { setCurrentPetID, setCurrentScreen, setLoginState, setPetList, setPetRecords } from "@/Redux/reducers/UserInfo";
import ListItem from "../Components/listItem";
import AddNewListItem from "../Components/addNewListItem";
import { setIsAddPetOpen } from "@/Redux/reducers/SystemSettings";

export default function Dashboard() {
const dispatch = useDispatch();

const userName = useSelector((store: any)=> {
return store.userInfo.name;
});

const petList = useSelector((store: any)=> {
return store.userInfo.petList;
});

const [myName, setMyName] = useState(userName||'');
const [myPetList, setMyPetList] = useState(petList||[]);

useEffect(() => {
    setMyName(userName);
    console.log("userName: " + userName);
}, [userName]);

useEffect(() => {
    setMyPetList(petList);
    console.log("petList Dashboard: " + petList);
}, [petList]);


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
      <View style={{height: '70%', width: '100%', marginTop: 10, padding: 20, backgroundColor:"#F5F0CD"}}>
        <FlatList data={myPetList} renderItem={({item, index})=> <ListItem itemObj={item} itemType={"pet"} onPress={() => {dispatch(setCurrentPetID({currentPetIndex: index})); dispatch(setCurrentScreen({currentScreen: 'petProfile'}));}}/>}/>
        <ListItem itemObj={{addType: "pet"}} itemType={"add"} onPress={() => {dispatch(setIsAddPetOpen({isAddPetOpen: true}));}}/>
      </View>
      <AddNewListItem itemType={"pet"}/>
    </View>
  );
}
