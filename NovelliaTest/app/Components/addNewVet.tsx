import { Text, View, Modal, TextInput } from "react-native";
import styles from "../Helpers/styleSheet";
import AppButton from "./appButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setCurrentPetType, setIsAddPetOpen, setIsAddVetOpen } from "@/Redux/reducers/SystemSettings";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import AnimalTypeSelect from "./animalTypeSelect";
import { setPetList, setVetRecords } from "@/Redux/reducers/UserInfo";
import { VetInfo } from "../Helpers/typing";

export default function AddNewVet({itemType} : any){
    const dispatch = useDispatch();

    const isAddVetOpen = useSelector((store: any)=> {
        return store.systemSettings.isAddVetOpen;
    });
    const vetList = useSelector((store: any)=> {
        return store.userInfo.vetRecords;
    });
    const vetID = useSelector((store: any)=> {
        return store.userInfo.currentVetIndex;
    });

    const result : VetInfo[] = [];

    const [practiceName, setPracticeName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [vetName, setVetName] = useState('');
    const [myVetList, setMyVetList] = useState(vetList || result);
    const [myVetID, setMyVetID] = useState(vetID||-1);
    const [curVet, setCurVet] = useState({practiceName: '', phoneNumber: '', vetName: ''});


    const [modalVisible, setModalVisible] = useState(isAddVetOpen);
    useEffect(() => {
        setModalVisible(isAddVetOpen);
    }, [isAddVetOpen]);

    useEffect(() => {
        setMyVetList(vetList);
    }, [vetList]);

    useEffect(() => {
        if(itemType === "vetEdit"){
            setPracticeName(curVet.practiceName);
            setPhoneNumber(curVet.phoneNumber);
            setVetName(curVet.vetName);
        }
        else{
            setPracticeName('');
            setPhoneNumber('');
            setVetName('');
        }
    }, [modalVisible]);

    useEffect(() => {
        setMyVetID(vetID);
        if(vetID !== -1){
            setCurVet(myVetList[vetID]);
        }
    }, [vetID]);

    useEffect(() => {
        if(showError){
            setShowError(false);
        }
    },[practiceName, phoneNumber, vetName]);

    const [showError, setShowError] = useState(false);
    function saveNewVet(){
        if(practiceName !== '' && phoneNumber !== '' && vetName !== ''){
            let newList = result;
            myVetList.forEach((element: VetInfo) => {
                newList.push(element);
            });
            newList.push({practiceName: practiceName, phoneNumber: phoneNumber, vetName: vetName});
            console.log(newList.toString())
            
            dispatch(setVetRecords({vetRecords: newList}));
            dispatch(setIsAddVetOpen({isAddVetOpen: false}));
        }
        else{
            setShowError(true);
        }
    }

    function saveVetEdit(){
        if(practiceName !== '' && phoneNumber !== '' && vetName !== ''){
            let newList = result;
            myVetList.forEach((element: any, index: number) => {
                if(index === myVetID){
                    newList.push({practiceName: practiceName, phoneNumber: phoneNumber, vetName: vetName});
                }
                else{
                    newList.push(element);
                }
            });
            dispatch(setVetRecords({vetRecords: newList}));
            dispatch(setIsAddVetOpen({isAddVetOpen: false}));
        }
        else{
            setShowError(true);
        }
    }

    return(
        <Modal 
          animationType="slide"
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
                <Text style={styles.titleText}>{itemType === "vet" ? "Add a New Vet" : "Edit Vet Profile" }</Text>
                <View style={styles.spacingPadding}>
                    <TextInput
                        style={styles.shortTextInput}
                        onChangeText={setPracticeName}
                        value={practiceName}
                        placeholder="Vet Office Name"
                        placeholderTextColor={"#807e7c"}
                    />
                    <TextInput
                        style={styles.shortTextInput}
                        onChangeText={setPhoneNumber}
                        value={phoneNumber}
                        placeholder="Phone Number"
                        placeholderTextColor={"#807e7c"}
                    />
                    <TextInput
                        style={styles.shortTextInput}
                        onChangeText={setVetName}
                        value={vetName}
                        placeholder="Vet's Name"
                        placeholderTextColor={"#807e7c"}
                    />
                    {showError && <Text style={styles.errorText}>Information missing for adding your vet, please add all information.</Text>}
                    <View style={{margin:'auto'}}>
                        <AppButton style={styles.loginButton} text={"Save"} onPress={()=>{if(itemType === 'vet'){saveNewVet()}else{saveVetEdit()}}}/>
                        <AppButton style={styles.loginButton} text={"Cancel"} onPress={()=>{dispatch(setIsAddVetOpen({isAddVetOpen: false}))}}/>
                    </View>
                </View>
            </View>
            </View>
        </Modal>
    )
}