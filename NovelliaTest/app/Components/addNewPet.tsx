import { Text, View, Modal, TextInput } from "react-native";
import styles from "../Helpers/styleSheet";
import AppButton from "./appButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setCurrentPetType, setIsAddPetOpen } from "@/Redux/reducers/SystemSettings";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import AnimalTypeSelect from "./animalTypeSelect";
import { setPetList } from "@/Redux/reducers/UserInfo";
import { PetInfo } from "../Helpers/typing";

export default function AddNewPet({itemType} : any){
    const dispatch = useDispatch();

    const curPetType = useSelector((store: any)=> {
        return store.systemSettings.currentPetType;
    });
    const isAddPetOpen = useSelector((store: any)=> {
        return store.systemSettings.isAddPetOpen;
    });
    const petList = useSelector((store: any)=> {
        return store.userInfo.petList;
    });

    const currentPetIndex = useSelector((store: any)=> {
        return store.userInfo.currentPetIndex;
    });
    const result : PetInfo[] = [];
    const [myPetList, setMyPetList] = useState(petList || result);

    const [name, setName] = useState('');
    const [type, setType] = useState(curPetType || '');
    const [breed, setBreed] = useState('');
    const [DOB, setDOB] = useState('');
    const [date, setDate] = useState(new Date())
    const [showCalendar, setShowCalendar] = useState(false);

    useEffect(()=>{
        setType(curPetType);
    }, [curPetType]);

    const [modalVisible, setModalVisible] = useState(isAddPetOpen);
    useEffect(() => {
        setModalVisible(isAddPetOpen);
    }, [isAddPetOpen]);

    useEffect(() => {
        dispatch(setCurrentPetType({currentPetType: ''}));
        setName('');
        setType('');
        setBreed('');
        setDOB('');
        setShowCalendar(false);

        if(itemType ==="petEdit"){
            console.log(myPetList[currentPetIndex]);
            setName(myPetList[currentPetIndex].name);
            setType(myPetList[currentPetIndex].type);
            setBreed(myPetList[currentPetIndex].breed);
            setDOB(myPetList[currentPetIndex].DOB);
            
            (new Date());
            dispatch(setCurrentPetType({currentPetType: myPetList[currentPetIndex].type}))
        }
    }, [modalVisible]);

    const onChange = (event:DateTimePickerEvent, selectedDate:Date) => {
        const currentDate = selectedDate;
        setDate(currentDate);
        
        //let myDate = currentDate.getMonth().toString() + "/" + currentDate.getDate().toString() + "/" + currentDate.getFullYear().toString();
        let myDate = currentDate.toLocaleDateString();
        console.log(Date.parse('2025-7-2'));
        if(myDate !== undefined){
            setDOB(myDate);
        }
    };

    useEffect(() => {
        setMyPetList(petList);
    },[petList]);

    useEffect(() => {
        if(showError){
            setShowError(false);
        }
    },[name, type, breed, DOB]);

    const [showError, setShowError] = useState(false);
    function saveNewPet(){
        if(name !== '' && type !== '' && breed !== '' && DOB !== ''){
            let newList = result;
            myPetList.forEach((element: PetInfo) => {
                newList.push(element);
            });
            newList.push({name: name, type: type, breed: breed, DOB: DOB, records: []});
            console.log(newList.toString())
            
            dispatch(setPetList({petList: newList}));
            dispatch(setIsAddPetOpen({isAddPetOpen: false}))
        }
        else{
            setShowError(true);
        }
    }

    function savePetEdit(){
        if(name !== '' && type !== '' && breed !== '' && DOB !== ''){
            let newList = result;
            myPetList.forEach((element: PetInfo, index: number) => {
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
                <Text style={styles.titleText}>{itemType === "pet" ? "Add a New Pet" : "Edit Pet Profile" }</Text>
                <View style={styles.spacingPadding}>
                    <TextInput
                        style={styles.shortTextInput}
                        onChangeText={setName}
                        value={name}
                        placeholder="Your Pet's Name"
                        placeholderTextColor={"#807e7c"}
                    />
                    <View style={{margin: 'auto'}}>
                        <Text style={styles.bodyText}>Animal Type:</Text>
                        <AnimalTypeSelect />
                    </View>
                    <TextInput
                        style={styles.shortTextInput}
                        onChangeText={setBreed}
                        value={breed}
                        placeholder="Your Pet's Breed"
                        placeholderTextColor={"#807e7c"}
                    />
                    <View style={{margin: 'auto'}}>
                        <Text style={styles.bodyText}>Select Your Pet's Birthday:</Text>
                        <View style={{ alignContent: 'center', marginBottom: 5, marginTop:5, width: '100%',}}>
                            <View style={{margin: 'auto'}}>
                                <AppButton text={DOB === '' ? "Select Birthday" : DOB} onPress={()=>{setShowCalendar(!showCalendar)}} style={styles.CalendarButton}/>
                            </View>
                            {showCalendar && <><DateTimePicker
                                style={{width: '100%', margin:'auto', }}
                                testID="dateTimePicker"
                                value={date}
                                mode={'date'}
                                onChange={onChange}
                                themeVariant={"light"}
                                maximumDate={new Date()}
                                 display="inline"
                            />
                            <TextInput 
                                style={styles.shortTextInput}
                                onChangeText={setDOB}
                                value={DOB}
                                placeholder="Your Pet's Birthday"
                                placeholderTextColor={"#807e7c"}/>
                            </>}
                        </View>
                    </View>
                    {showError && <Text style={styles.errorText}>Information missing for adding your pet, please add all information.</Text>}
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