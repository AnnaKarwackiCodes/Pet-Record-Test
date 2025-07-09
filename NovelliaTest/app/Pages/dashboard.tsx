import { Text, View, Image, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import AppButton from "../Components/appButton";
import styles from "../Helpers/styleSheet";
import { setCurrentPetID, setCurrentScreen } from "@/Redux/reducers/UserInfo";
import ListItem from "../Components/listItem";
import { setIsAddPetOpen } from "@/Redux/reducers/SystemSettings";
import AddNewPet from "../Components/addNewPet";

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
        <Image
            source={require('../Assets/temp.jpg')}
            style={{width: 100, height: 100, alignSelf: 'center'}}
        />
      <Text style={styles.titleText}>Welcome {myName}</Text>
      <Text style={styles.subTitleText}>This is you pet dashboard.</Text>
      <AppButton style={styles.returnButton} text={"View Profile"} onPress={()=>{dispatch(setCurrentScreen({currentScreen: 'userProfile'}));}}/>
      <View style={{height: '60%', width: '100%', marginTop: 10, padding: 20, borderColor:"#FB4D27", borderWidth: 2, borderRadius:25}}>
         {myPetList.length === 0 && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text style={styles.bodyText}>No Pets Have Been Added</Text></View>}
        <FlatList data={myPetList} renderItem={({item, index})=> <ListItem itemObj={item} itemType={"pet"} onPress={() => {dispatch(setCurrentPetID({currentPetIndex: index})); dispatch(setCurrentScreen({currentScreen: 'petProfile'}));}}/>}/>
        <ListItem itemObj={{addType: "pet"}} itemType={"add"} onPress={() => {dispatch(setIsAddPetOpen({isAddPetOpen: true}));}}/>
      </View>
      <AddNewPet itemType="pet"/>
    </View>
  );
}
