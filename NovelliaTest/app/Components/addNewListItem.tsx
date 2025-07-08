import { Text, View, Image, Modal, TouchableHighlight, TextInput } from "react-native";
import styles from "../Helpers/styleSheet";
import AppButton from "./appButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setIsAddPetOpen, setIsAddRecordOpen } from "@/Redux/reducers/SystemSettings";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import AnimalTypeSelect from "./animalTypeSelect";
import RecordSelect from "./recordSelect";
import { setPetList, setPetRecords } from "@/Redux/reducers/UserInfo";
import { PetInfo } from "../Helpers/typing";

export default function AddNewListItem({itemType, onClose}: any){
    const dispatch = useDispatch();

    const curPetType = useSelector((store: any)=> {
        return store.systemSettings.currentPetType;
    });
     const curRecordType = useSelector((store: any)=> {
        return store.systemSettings.currentRecordType;
    });
    const isAddPetOpen = useSelector((store: any)=> {
        return store.systemSettings.isAddPetOpen;
    });
    const isAddRecordOpen = useSelector((store: any)=> {
        return store.systemSettings.isAddRecordOpen;
    });
    const petList = useSelector((store: any)=> {
        return store.userInfo.petList;
    });

    const recordList = useSelector((store: any)=> {
        return store.userInfo.petRecords;
    });

    const currentPetIndex = useSelector((store: any)=> {
        return store.userInfo.currentPetIndex;
    });
    const result : PetInfo[] = [];
    const recordListFormat : any[] = [[]];
    const [myPetList, setMyPetList] = useState(petList || result);
    const [myRecordList, setMyRecordList] = useState(recordList || recordListFormat)

    const [name, setName] = useState('');
    const [type, setType] = useState(curPetType || '');
    const [breed, setBreed] = useState('');
    const [DOB, setDOB] = useState('');
    const [date, setDate] = useState(new Date(1598051730000))

    const [recordType, setRecordType] = useState('')

    const [vaccineName, setVaccineName] = useState('');
    const [vaccineDate, setVaccineDate] = useState('');

    const [allergyName, setAllergyName] = useState('');
    const [allergyReaction, setAllergyReaction] = useState('');
    const [allergySeverity, setAllergySeverity] = useState('');

    const [labName, setLabName] = useState('');
    const [labDosage, setLabDosage] = useState('');
    const [labInstruction, setLabInstruction] = useState('');

    useEffect(()=>{
        setType(curPetType);
    }, [curPetType]);

    const [currentRecordType, setCurRecordType] = useState(curRecordType || '')
    useEffect(()=>{
        setCurRecordType(curRecordType);
    }, [curRecordType]);

    const [modalVisible, setModalVisible] = useState(itemType=== "pet"? isAddPetOpen : isAddRecordOpen);
    useEffect(() => {
        setModalVisible(itemType=== "pet"? isAddPetOpen : isAddRecordOpen);
        console.log("isModalOpen: " + itemType=== "pet"? isAddPetOpen : isAddRecordOpen);
    }, [itemType=== "pet"? isAddPetOpen : isAddRecordOpen]);

    useEffect(() => {
        setName('');
        setType('');
        setBreed('');
        setDOB('');
        setAllergyName('');
        setAllergyReaction('');
        setAllergySeverity('');
        setVaccineName('');
        setVaccineDate('');
        setLabName('');
        setLabInstruction('');
        setLabDosage('');
    }, [modalVisible]);

    useEffect(() => {
        setMyRecordList(recordList);
    }, [recordList]);

    const onChange = (event:DateTimePickerEvent, selectedDate:Date) => {
        const currentDate = selectedDate;
        setDate(currentDate);
        let myDate = currentDate.getMonth().toString() + "-" + currentDate.getDate().toString() + "-" + currentDate.getFullYear().toString();
        if(itemType === "pet"){
            setDOB(myDate);
        }
        else if(itemType === "record"){
            setVaccineDate(myDate);
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

    function saveRecord(){
        let newList: any[] = []; 
        let newRecordList: any[] = []; 

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var date = mm + '-' + dd + '-' + yyyy;

        if(currentRecordType.toLowerCase() === 'vaccine' && vaccineName !== '' && vaccineDate !==''){
            myPetList.forEach((element: PetInfo, index: number) => {
                if(index === currentPetIndex){
                    myPetList[currentPetIndex].records.forEach((element: any) => {
                        newList.push(element);
                    });
                    newList.push({type: "Vaccine", name: vaccineName, dateAdmin: vaccineDate, updatedDate: date});
                    newRecordList.push({name: element.name, type: element.type, breed: element.breed, DOB: element.DOB, records: newList})
                }
                else{
                    newRecordList.push(element);
                }
            });

            dispatch(setPetList({petList: newRecordList}));
            dispatch(setIsAddRecordOpen({isAddRecordOpen: false}))
        }
        else if(currentRecordType.toLowerCase() === 'allergy' && allergyName !=='' && allergyReaction !=='' && allergySeverity !==''){
            myPetList.forEach((element: PetInfo, index: number) => {
                if(index === currentPetIndex){
                    myPetList[currentPetIndex].records.forEach((element: any) => {
                        newList.push(element);
                    });
                    newList.push({type: "Allergy", name: allergyName, reaction: allergyReaction, severity: allergySeverity, updatedDate: date});
                    newRecordList.push({name: element.name, type: element.type, breed: element.breed, DOB: element.DOB, records: newList})
                }
                else{
                    newRecordList.push(element);
                }
            });
            dispatch(setPetList({petList: newRecordList}));
            dispatch(setIsAddRecordOpen({isAddRecordOpen: false}))
        }
        else if(currentRecordType.toLowerCase() === 'lab' && labName !=='' && labDosage !=='' && labInstruction !==''){
            myPetList.forEach((element: PetInfo, index: number) => {
                if(index === currentPetIndex){
                    myPetList[currentPetIndex].records.forEach((element: any) => {
                        newList.push(element);
                    });
                    newList.push({type: "Lab", name: vaccineName, dosage: labDosage, instructions: labInstruction, updatedDate: date});
                    newRecordList.push({name: element.name, type: element.type, breed: element.breed, DOB: element.DOB, records: newList})
                }
                else{
                    newRecordList.push(element);
                }
            });
            dispatch(setPetList({petList: newRecordList}));
            dispatch(setIsAddRecordOpen({isAddRecordOpen: false}))
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
            {itemType === "pet" && <View style={styles.spacingPadding}>
                <Text style={styles.titleText}>Add a New Pet</Text>
                <View style={styles.spacingPadding}>
                    <TextInput
                        style={styles.shortTextInput}
                        onChangeText={setName}
                        value={name}
                        placeholder="Your Pet's Name"
                        placeholderTextColor={"#807e7c"}
                    />
                    <View>
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
                        <Text style={styles.bodyText}>Select Your Pet's Birthday</Text>
                        <View style={{ alignContent: 'center', margin: 20, left: 30, width: '100%', paddingRight:20}}>
                            <DateTimePicker
                                style={{width: '100%', margin:'auto', }}
                                testID="dateTimePicker"
                                value={date}
                                mode={'date'}
                                onChange={onChange}
                                themeVariant={"light"}
                            />
                        </View>
                    </View>
                    {showError && <Text style={styles.errorText}>Information missing for adding your pet, please add all information.</Text>}
                    <View style={{margin:'auto'}}>
                        <AppButton style={styles.loginButton} text={"Save"} onPress={()=>{saveNewPet();}}/>
                        <AppButton style={styles.loginButton} text={"Cancel"} onPress={()=>{dispatch(setIsAddPetOpen({isAddPetOpen: false}))}}/>
                    </View>
                </View>
            </View>}
             {itemType === "record" && <View style={styles.spacingPadding}>
                <Text style={styles.titleText}>Add a New Record</Text>
                <Text style={styles.bodyText}>Select Record Type</Text>
                <RecordSelect />
                <View style={styles.spacingPadding}>
                    {currentRecordType === "vaccine" ? <View>
                        <TextInput
                            style={styles.shortTextInput}
                            onChangeText={setVaccineName}
                            value={vaccineName}
                            placeholder="Vaccine Name"
                            placeholderTextColor={"#807e7c"}
                        />
                        <View style={{margin: 'auto'}}>
                            <Text style={styles.bodyText}>Date Administered</Text>
                            <View style={{ alignContent: 'center', margin: 20, left: 0, width: '100%', paddingRight:20}}>
                                <DateTimePicker
                                    style={{width: '100%', margin:'auto', }}
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={'date'}
                                    onChange={onChange}
                                    themeVariant={"light"}
                                />
                            </View>
                        </View>
                    </View> : null}
                    {currentRecordType === "allergy" ? <View>
                        <TextInput
                            style={styles.shortTextInput}
                            onChangeText={setAllergyName}
                            value={allergyName}
                            placeholder="Allergy Name"
                            placeholderTextColor={"#807e7c"}
                        />
                        <View style={{margin: 'auto'}}>
                            <Text style={styles.bodyText}>Pet's Reaction</Text>
                            <TextInput
                            style={styles.shortTextInput}
                            onChangeText={setAllergyReaction}
                            value={allergyReaction}
                            placeholder="Severity of Allergy"
                            placeholderTextColor={"#807e7c"}
                        />
                        </View>
                    </View> : null}
                    {currentRecordType==="lab" ? <View>
                        <View style={{margin: 'auto'}}>
                            <TextInput
                            style={styles.shortTextInput}
                            onChangeText={setLabName}
                            value={labName}
                            placeholder="Lab Name"
                            placeholderTextColor={"#807e7c"}
                        />
                            <TextInput
                                style={styles.shortTextInput}
                                onChangeText={setLabDosage}
                                value={labDosage}
                                placeholder="Dosage"
                                placeholderTextColor={"#807e7c"}
                            />
                            <TextInput
                                style={styles.longTextInput}
                                onChangeText={setLabInstruction}
                                value={labInstruction}
                                placeholder="Instructions"
                                placeholderTextColor={"#807e7c"}
                            />
                        </View>
                    </View> : null}
                    {showError && <Text style={styles.errorText}>Information missing for adding your pet's record, please add all information.</Text>}
                    <View style={{margin:'auto'}}>
                        <AppButton style={styles.loginButton} text={"Save"} onPress={() => {saveRecord();}}/>
                        <AppButton style={styles.loginButton} text={"Cancel"} onPress={()=>{dispatch(setIsAddRecordOpen({isAddRecordOpen: false}))}}/>
                    </View>
                </View>
            </View>}
            </View>
        </Modal>
    )
}