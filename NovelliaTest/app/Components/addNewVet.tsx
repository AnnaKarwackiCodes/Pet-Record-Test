import { Text, View, Modal, TextInput } from "react-native";
import styles from "../Helpers/styleSheet";
import AppButton from "./appButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setCurrentPetType, setIsAddPetOpen } from "@/Redux/reducers/SystemSettings";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import AnimalTypeSelect from "./animalTypeSelect";
import { setPetList } from "@/Redux/reducers/UserInfo";
import { VetInfo } from "../Helpers/typing";

export default function AddNewPet({itemType} : any){
    const dispatch = useDispatch();

    const isAddVetOpen = useSelector((store: any)=> {
        return store.systemSettings.isAddVetOpen;
    });
    const vetList = useSelector((store: any)=> {
        return store.userInfo.vetList;
    });

    const result : VetInfo[] = [];

    const [practiceName, setPracticeName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [vetName, setVetName] = useState('');
    const [myVetList, setMyVetList] = useState(vetList || result);


    const [modalVisible, setModalVisible] = useState(isAddVetOpen);
    useEffect(() => {
        setModalVisible(isAddVetOpen);
    }, [isAddVetOpen]);

    useEffect(() => {
        dispatch(setCurrentPetType({currentPetType: ''}));
        setPracticeName('');
        setPhoneNumber('');
        setVetName('');
    }, [modalVisible]);


    useEffect(() => {
        if(showError){
            setShowError(false);
        }
    },[practiceName, phoneNumber, vetName]);

    const [showError, setShowError] = useState(false);
    function saveNewPet(){
        if(practiceName !== '' && phoneNumber !== '' && vetName !== ''){
            let newList = result;
            myVetList.forEach((element: any) => {
                newList.push(element);
            });
            newList.push({practiceName: practiceName, phoneNumber: phoneNumber, vetName: vetName});
            console.log(newList.toString())
            
            dispatch(setPetList({petList: newList}));
            dispatch(setIsAddPetOpen({isAddPetOpen: false}))
        }
        else{
            setShowError(true);
        }
    }

    /*function savePetEdit(){
        if(practiceName !== '' && phoneNumber !== '' && vetName !== ''){
            let newList = result;
            myVetList.forEach((element: any, index: number) => {
                if(index === currentPetIndex){
                    newList.push({name: name, type: type, breed: breed, DOB: DOB, records: []});
                }
                else{
                    newList.push(element);
                }
            });
            dispatch(setPetList({petList: newList}));
            dispatch(setIsAddPetOpen({isAddPetOpen: false}))
        }
        else{
            setShowError(true);
        }
    }*/

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
                        placeholder="Vet Office's Phone Number"
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
                        <AppButton style={styles.loginButton} text={"Save"} onPress={()=>{if(itemType === "pet"){saveNewPet();} else if(itemType==="petEdit"){savePetEdit();}}}/>
                        <AppButton style={styles.loginButton} text={"Cancel"} onPress={()=>{dispatch(setIsAddPetOpen({isAddPetOpen: false}))}}/>
                    </View>
                </View>
            </View>
            </View>
        </Modal>
    )
}