import { Text, View, Image, ScrollView, FlatList, Modal } from "react-native";
import {StyleSheet, TextInput} from 'react-native';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { setKeyValue } from "../../Redux/reducers/Tester";
import AppButton from "../Components/appButton";
import styles from "../Helpers/styleSheet";
import { setCurrentRecordID, setCurrentScreen, setPetList } from "@/Redux/reducers/UserInfo";
import ListItem from "../Components/listItem";
import AddNewRecord from "../Components/addNewRecord";
import { setIsAddPetOpen, setIsAddRecordOpen } from "@/Redux/reducers/SystemSettings";
import AddNewPet from "../Components/addNewPet";

export default function PetProfile() {
const dispatch = useDispatch();

const currentPetIndex = useSelector((store: any)=> {
    return store.userInfo.currentPetIndex;
});
const petList = useSelector((store: any)=> {
    return store.userInfo.petList;
});

const [currentPet, setCurrentPet] = useState({name: '', type: '', breed: '', DOB: ''});
const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
const [modalEditVisible, setModalEditVisible] = useState(false);
const [myPetList, setMyPetList] = useState(petList||null);

useEffect(() => {
  setCurrentPet(petList[currentPetIndex]);
  console.log(petRecords);
}, []);

const petRecords = useSelector((store: any)=> {
return store.userInfo.petRecords;
});

useEffect(() => {
  setMyPetList(petList);
  setCurrentPet(petList[currentPetIndex]);
}, [petList])

function deletePetRecord(){
  let newList: any[] = []; 
  let newRecordList: any[] = []; 
   myPetList.forEach((element: any, index: number) => {
    if(index !== currentPetIndex){
        newList.push(element);
        newRecordList.push({name: element.name, type: element.type, breed: element.breed, DOB: element.DOB, records: newList})
    }
  });
  dispatch(setPetList({petList: newRecordList}));
  setModalDeleteVisible(false);
  dispatch(setCurrentScreen({currentScreen: 'dashboard'}));
}

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: 'auto',
        marginTop: 15,
      }}
    >
     <AppButton style={styles.backButton} text={"Back"} onPress={()=>{dispatch(setCurrentScreen({currentScreen: 'dashboard'}));}}/>
      <View 
        style={{
          height: '70%', 
          width: 'auto', 
          marginTop: 10, 
          padding: 20, 
          borderColor:"#FB4D27", 
          borderWidth: 2, 
          borderRadius:25,
          shadowColor: '#000',
          shadowOffset: {
          width: 0,
          height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          }}>
        <View style={{backgroundColor: '#fff', borderTopRightRadius: 20, borderTopLeftRadius: 30, borderColor:"#FB4D27", borderWidth: 2}}>
           <Text style={styles.titleText}>{currentPet.name}'s Profile</Text>
            <Text style={styles.bodyText}>Type: {currentPet.type} </Text>
            <Text style={styles.bodyText}>Breed: {currentPet.breed}</Text>
            <Text style={styles.bodyText}>DOB: {currentPet.DOB}</Text>
            <AppButton style={styles.confirmButton} text={"Edit Profile"} onPress={()=>{dispatch(setIsAddPetOpen({isAddPetOpen: true}));}}/>
        </View>
        {myPetList[currentPetIndex].records.length === 0 && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text style={styles.bodyText}>No Records Have Been Added</Text></View>}
        <FlatList data={myPetList[currentPetIndex].records} renderItem={({item, index})=> <ListItem itemObj={item} itemType={"record"} onPress={() => {dispatch(setCurrentRecordID({currentRecordIndex: index})); dispatch(setCurrentScreen({currentScreen: 'recordDetails'}));}}/>}/>
        <ListItem itemObj={{addType: "record"}} itemType={"add"} onPress={() => {dispatch(setIsAddRecordOpen({isAddRecordOpen: true}));}}/>
      </View>
      <AppButton style={styles.deleteButton} text={"DELETE PET RECORD"} onPress={()=>{setModalDeleteVisible(true)}}/>
      <AddNewRecord itemType={"record"}/>
      <Modal 
          animationType="slide"
          transparent={true}
          visible={modalDeleteVisible} 
          presentationStyle={"overFullScreen"}>
           <View style={{backgroundColor: 'white',
                    borderRadius: 20,
                    padding: '7%',
                    alignItems: 'center',
                    shadowColor: '#000',
                    width: '80%',
                    margin: 'auto',
                    shadowOffset: {
                    width: 0,
                    height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,}}>
            <Text style={styles.titleText}>You are about to delete a pet's record.</Text>
            <Text style={styles.subTitleText}>Are you sure you want to continue with the deletion?</Text>
            <Text style={styles.subTitleText}>Once deleted the record cannot be recovered.</Text>
            <AppButton style={styles.deleteButton} text={"Delete Record"} onPress={()=>{deletePetRecord();}}/>
            <AppButton style={styles.returnButton} text={"Cancel"} onPress={()=>{setModalDeleteVisible(false)}}/>
           </View>
        </Modal>
        <AddNewPet itemType={'petEdit'}/>
    </View>
  );
}
