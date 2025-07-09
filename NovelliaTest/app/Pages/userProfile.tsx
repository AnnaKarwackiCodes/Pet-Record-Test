import { Text, View, Image, ScrollView, FlatList, Modal } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import AppButton from "../Components/appButton";
import styles from "../Helpers/styleSheet";
import { setCurrentScreen, setCurrentVetID, setLoginState, setVetRecords } from "@/Redux/reducers/UserInfo";
import AddNewVet from "../Components/addNewVet";
import ListItem from "../Components/listItem";
import { setIsAddVetOpen } from "@/Redux/reducers/SystemSettings";
import { useEffect, useState } from "react";

export default function UserProfile() {
const dispatch = useDispatch();

const userName = useSelector((store: any)=> {
    return store.userInfo.name;
});
const userEmail = useSelector((store: any)=> {
    return store.userInfo.email;
});

const vetList = useSelector((store: any)=> {
    return store.userInfo.vetRecords;
});
const vetID = useSelector((store: any)=> {
    return store.userInfo.currentVetIndex;
});

const [myVetList, setMyVetList] = useState(vetList||[]);
const [myVetID, setMyVetID] = useState(vetID||-1);
const [modalVisible, setModalVisible] = useState(false);
const [curVet, setCurVet] = useState({practiceName: '', phoneNumber: '', vetName: ''});
const [addType, setAddType] = useState('vet');
const [modalDeleteVisible, setModalDeleteVisible] = useState(false);

useEffect(() => {
    setMyVetList(vetList);
}, [vetList]);

useEffect(() => {
    setMyVetID(vetID);
    if(vetID !== -1){
        setCurVet(myVetList[vetID]);
    }
}, [vetID]);

function deleteVetRecord(){
  let newList: any[] = []; 
  let newRecordList: any[] = []; 
   myVetList.forEach((element: any, index: number) => {
    if(index !== myVetID){
        newList.push(element);
        newRecordList.push({practiceName: element.practiceName, phoneNumber: element.phoneNumber, vetName: element.vetName})
    }
  });
  dispatch(setVetRecords({vetRecords: newRecordList}));
  setModalDeleteVisible(false);
  setModalVisible(false);
}

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        marginTop: 15,
      }}
    >
     <AppButton style={styles.backButton} text={"Back"} onPress={()=>{dispatch(setCurrentScreen({currentScreen: 'dashboard'}));}}/>
      <View 
        style={{
          height: '70%', 
          width: '100%', 
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
        <View style={{backgroundColor: '#fff', borderTopRightRadius: 20, borderTopLeftRadius: 30, borderWidth: 2, borderColor:"#FB4D27", padding: 15, width: 300}}>
           <Text style={styles.titleText}>Profile</Text>
            <Text style={styles.bodyText}>Name: {userName} </Text>
            <Text style={styles.bodyText}>Email: {userEmail} </Text>
            <AppButton style={styles.logoutButton} text={"Logout"} onPress={()=>{dispatch(setLoginState({loggedin: false}));}}/>
        </View>
        <Text style={styles.subTitleText}>Your Vets</Text>
        {myVetList.length === 0 && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text style={styles.bodyText}>No Vets Have Been Added</Text></View>}
        <FlatList data={myVetList} renderItem={({item, index})=> <ListItem itemObj={item} itemType={"vet"} onPress={() => {setModalVisible(true); dispatch(setCurrentVetID({currentVetIndex: index}))}}/>}/>
        <ListItem itemObj={{addType: "vet"}} itemType={"add"} onPress={() => {setModalVisible(false); setAddType('vet'); dispatch(setIsAddVetOpen({isAddVetOpen: true}));}}/>
        <View>
            <AddNewVet itemType={addType} />
             <Modal 
                transparent={true}
                visible={modalVisible} 
                presentationStyle={"overFullScreen"}>
            <View style={{
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 35,
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
            <View style={styles.spacingPadding}>
                <Text style={styles.titleText}>Vet Profile</Text>
                <View style={styles.spacingPadding}>
                    <Text style={styles.bodyText}>Vet Office Name: {curVet.practiceName}</Text>
                    <Text style={styles.bodyText}>Phone Number: {curVet.phoneNumber}</Text>
                    <Text style={styles.bodyText}>Vet's Name: {curVet.vetName}</Text>
                    <AppButton style={styles.confirmButton} text={"Close"} onPress={() => {setModalVisible(false)}} />
                    <AppButton style={styles.confirmButton} text={"Edit"} onPress={() => {setModalVisible(false); setAddType('vetEdit'); dispatch(setIsAddVetOpen({isAddVetOpen: true}));}} />
                    <AppButton style={styles.deleteButton} text={"DELETE"} onPress={() => {setModalDeleteVisible(true)}} />
                </View>
            </View>
            </View>
        </Modal>
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
            <Text style={styles.titleText}>You are about to delete a Vet record.</Text>
            <Text style={styles.subTitleText}>Are you sure you want to continue with the deletion?</Text>
            <Text style={styles.subTitleText}>Once deleted the record cannot be recovered.</Text>
            <AppButton style={styles.deleteButton} text={"Delete Record"} onPress={()=>{deleteVetRecord();}}/>
            <AppButton style={styles.returnButton} text={"Cancel"} onPress={()=>{setModalDeleteVisible(false)}}/>
           </View>
        </Modal>
        </View>
      </View>
    </View>
  );
}
