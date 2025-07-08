import { Text, View, Image, ScrollView, FlatList, Modal } from "react-native";
import {StyleSheet, TextInput} from 'react-native';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { setKeyValue } from "../../Redux/reducers/Tester";
import AppButton from "../Components/appButton";
import styles from "../Helpers/styleSheet";
import { setCurrentRecordID, setCurrentScreen, setPetList } from "@/Redux/reducers/UserInfo";
import ListItem from "../Components/listItem";
import AddNewListItem from "../Components/addNewListItem";
import { setIsAddRecordOpen } from "@/Redux/reducers/SystemSettings";

export default function PetProfile() {
const dispatch = useDispatch();

const currentPetIndex = useSelector((store: any)=> {
    return store.userInfo.currentPetIndex;
});
const petList = useSelector((store: any)=> {
    return store.userInfo.petList;
});

const [currentPet, setCurrentPet] = useState({name: '', type: '', breed: '', DOB: ''});
const [modalVisible, setModalVisible] = useState(false);
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
  setModalVisible(false);
  dispatch(setCurrentScreen({currentScreen: 'dashboard'}));
}

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
        <FlatList data={petList[currentPetIndex].records} renderItem={({item, index})=> <ListItem itemObj={item} itemType={"record"} onPress={() => {dispatch(setCurrentRecordID({currentRecordIndex: index})); dispatch(setCurrentScreen({currentScreen: 'recordDetails'}));}}/>}/>
        <ListItem itemObj={{addType: "record"}} itemType={"add"} onPress={() => {dispatch(setIsAddRecordOpen({isAddRecordOpen: true}));}}/>
      </View>
      <AppButton style={styles.deleteButton} text={"Delete Pet Record"} onPress={()=>{setModalVisible(true)}}/>
      <AddNewListItem itemType={"record"}/>
      <Modal 
          animationType="slide"
          transparent={true}
          visible={modalVisible} 
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
            <AppButton style={styles.returnButton} text={"Cancel"} onPress={()=>{setModalVisible(false)}}/>
           </View>
        </Modal>
    </View>
  );
}
