import { Text, View, FlatList, Modal } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import AppButton from "../Components/appButton";
import styles from "../Helpers/styleSheet";
import { setCurrentScreen, setPetList } from "@/Redux/reducers/UserInfo";
import AddNewListItem from "../Components/addNewListItem";
import { setIsAddRecordOpen } from "@/Redux/reducers/SystemSettings";

export default function RecordDetails() {
const dispatch = useDispatch();
const [modalVisible, setModalVisible] = useState(false);

const currentPetIndex = useSelector((store: any)=> {
    return store.userInfo.currentPetIndex;
});
const petList = useSelector((store: any)=> {
    return store.userInfo.petList;
});

const [currentPet, setCurrentPet] = useState({name: '', type: '', breed: '', DOB: ''});

const currentRecordIndex = useSelector((store: any)=> {
return store.userInfo.currentRecordIndex;
});

const [myPetList, setMyPetList] = useState(petList||null);
const [currentRecord, setCurrentRecord] = useState(myPetList[currentPetIndex].records[currentRecordIndex]||null);

useEffect(() => {
  setCurrentPet(myPetList[currentPetIndex]);
  setCurrentRecord(myPetList[currentPetIndex].records[currentRecordIndex]);
}, []);

useEffect(() => {
  setMyPetList(petList);
  setCurrentPet(petList[currentPetIndex]);
  setCurrentRecord(petList[currentPetIndex].records[currentRecordIndex]);
}, [petList])

function deleteRecord(){
  let newList: any[] = []; 
  let newRecordList: any[] = []; 
   myPetList.forEach((element: any, index: number) => {
    if(index === currentPetIndex){
        element.records.forEach((ele: any, id: number) => {
            if(id !== currentRecordIndex){
              newList.push(ele);
            }
        });
        newRecordList.push({name: element.name, type: element.type, breed: element.breed, DOB: element.DOB, records: newList})
    }
    else{
        newRecordList.push(element);
    }
  });
  dispatch(setPetList({petList: newRecordList}));
  setModalVisible(false);
  dispatch(setCurrentScreen({currentScreen: 'petProfile'}));
}


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        marginTop: 15,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <View style={{height: 'auto', width: '100%', marginTop: 10, marginBottom: 10, padding: 20}}>
      <Text style={styles.titleText}>{currentPet.name}'s {currentRecord.type} Record</Text>
      <AppButton style={styles.returnButton} text={"Edit Record"} onPress={()=>{dispatch(setIsAddRecordOpen({setIsAddRecordOpen: true}));}}/>
            {currentRecord.type === "Vaccine" ? <View style={{marginBottom: 25}}>
                <Text style={styles.subTitleText}>Vaccine Name: {currentRecord.name}</Text>
                <Text style={styles.subTitleText}>Date Administered: {currentRecord.dateAdmin}</Text>
                <Text style={styles.bodyText}>Record Last Update: {currentRecord.updatedDate}</Text>
            </View> : null}
            {currentRecord.type === "Allergy" ? <View style={{marginBottom: 25}}>
                <Text style={styles.subTitleText}>Allergy Name: {currentRecord.name}</Text>
                <Text style={styles.subTitleText}>Pet's Reaction: {currentRecord.reaction}</Text>
                <Text style={styles.subTitleText}>Reaction Severity: {currentRecord.severity}</Text>
                <Text style={styles.bodyText}>Record Last Update: {currentRecord.updatedDate}</Text>
            </View> : null}
            {currentRecord.type === "Lab" ? <View style={{marginBottom: 25}}>
                <Text style={styles.subTitleText}>Lab Name: {currentRecord.name}</Text>
                <Text style={styles.subTitleText}>Dosage: {currentRecord.dosage}</Text>
                <Text style={styles.subTitleText}>Instructions: {currentRecord.instructions}</Text>
                <Text style={styles.bodyText}>Record Last Update: {currentRecord.updatedDate}</Text>
            </View> : null}
        </View>
        <AppButton style={styles.returnButton} text={"Return to Profile"} onPress={()=>{dispatch(setCurrentScreen({currentScreen: 'petProfile'}));}}/>
        <AppButton style={styles.deleteButton} text={"DELETE RECORD"} onPress={()=>{setModalVisible(true)}}/>
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
            <Text style={styles.titleText}>You are about to delete a record.</Text>
            <Text style={styles.subTitleText}>Are you sure you want to continue with the deletion?</Text>
            <Text style={styles.subTitleText}>Once deleted the record cannot be recovered.</Text>
            <AppButton style={styles.deleteButton} text={"Delete Record"} onPress={()=>{deleteRecord();}}/>
            <AppButton style={styles.returnButton} text={"Cancel"} onPress={()=>{setModalVisible(false)}}/>
           </View>
        </Modal>
        <AddNewListItem itemType={'recordEdit'}/>
    </View>
  );
}
