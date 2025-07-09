import { Text, View, Image, Modal, TouchableHighlight, TextInput } from "react-native";
import styles from "../Helpers/styleSheet";
import AppButton from "./appButton";
import { useDispatch, useSelector } from "react-redux";
import { use, useEffect, useState } from "react";
import { setCurrentPetType, setCurrentRecordType, setIsAddPetOpen, setIsAddRecordOpen } from "@/Redux/reducers/SystemSettings";
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

    const currentRecordIndex = useSelector((store: any)=> {
        return store.userInfo.currentRecordIndex;
    });
    const result : PetInfo[] = [];
    const recordListFormat : any[] = [[]];
    const [myPetList, setMyPetList] = useState(petList || result);
    const [myRecordList, setMyRecordList] = useState(recordList || recordListFormat)

    const [name, setName] = useState('');
    const [type, setType] = useState(curPetType || '');
    const [breed, setBreed] = useState('');
    const [DOB, setDOB] = useState('');
    const [date, setDate] = useState(new Date())

    const [recordType, setRecordType] = useState('')

    const [vaccineName, setVaccineName] = useState('');
    const [vaccineDate, setVaccineDate] = useState('');

    const [allergyName, setAllergyName] = useState('');
    const [allergyReaction, setAllergyReaction] = useState('');
    const [allergySeverity, setAllergySeverity] = useState('');

    const [labName, setLabName] = useState('');
    const [labDosage, setLabDosage] = useState('');
    const [labInstruction, setLabInstruction] = useState('');

    const [showCalendar, setShowCalendar] = useState(false);

    useEffect(()=>{
        setType(curPetType);
    }, [curPetType]);

    const [currentRecordType, setCurRecordType] = useState(curRecordType || '')
    useEffect(()=>{
        setCurRecordType(curRecordType);
    }, [curRecordType]);

    const [modalVisible, setModalVisible] = useState((itemType=== "pet" || itemType === "petEdit")? isAddPetOpen : isAddRecordOpen);
    useEffect(() => {
        setModalVisible((itemType=== "pet" || itemType === "petEdit")? isAddPetOpen : isAddRecordOpen);
    }, [(itemType=== "pet" || itemType === "petEdit")? isAddPetOpen : isAddRecordOpen]);

    useEffect(() => {
        dispatch(setCurrentPetType({currentPetType: ''}));
        dispatch(setCurrentRecordType({curRecordType: ''}));
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
        else if(itemType === "recordEdit"){
            let record = myPetList[currentPetIndex].records[currentRecordIndex];
            console.log(record);
            let cur = record.type;
            dispatch(setCurrentRecordType({currentRecordType:cur}));
            setDate(new Date());
            if(cur === 'Vaccine'){
                setVaccineName(record.name);
                setVaccineDate(record.adminDate);
            }
            else if(cur === 'Allergy'){
                setAllergyName(record.name);
                setAllergyReaction(record.reaction);
                setAllergySeverity(record.severity);
            }
            else if(cur === 'Lab'){
                setLabName(record.name);
                setLabInstruction(record.instructions);
                setLabDosage(record.dosage);
            }
        }
    }, [modalVisible]);

    useEffect(() => {
        setMyRecordList(recordList);
    }, [recordList]);

    const onChange = (event:DateTimePickerEvent, selectedDate:Date) => {
        const currentDate = selectedDate;
        setDate(currentDate);
        
        //let myDate = currentDate.getMonth().toString() + "/" + currentDate.getDate().toString() + "/" + currentDate.getFullYear().toString();
        let myDate = currentDate.toLocaleDateString();
        console.log(Date.parse('2025-7-2'));
        if(itemType === "pet" || itemType === "petEdit" && myDate !== undefined){
            setDOB(myDate);
        }
        else if(itemType === "record" || itemType === "recordEdit" && myDate !== undefined){
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

    function saveRecordEdit(){
        let newList: any[] = []; 
        let newRecordList: any[] = []; 

        var today = new Date();
        var dd = String(today.getDate());
        var mm = String(today.getMonth() + 1);
        var yyyy = today.getFullYear();
        var date = mm + '/' + dd + '/' + yyyy;

        if(currentRecordType === 'Vaccine' && vaccineName !== '' && vaccineDate !==''){
            myPetList.forEach((element: PetInfo, index: number) => {
                if(index === currentPetIndex){
                    myPetList[currentPetIndex].records.forEach((ele: any, id: number) => {
                        if(id === currentRecordIndex){
                            newList.push({type: "Vaccine", name: vaccineName, dateAdmin: vaccineDate, updatedDate: date});
                        }
                        else{
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
            dispatch(setIsAddRecordOpen({isAddRecordOpen: false}))
        }
        else if(currentRecordType === 'Allergy' && allergyName !=='' && allergyReaction !=='' && allergySeverity !==''){
            myPetList.forEach((element: PetInfo, index: number) => {
                if(index === currentPetIndex){
                    myPetList[currentPetIndex].records.forEach((ele: any, id:number) => {
                        if(id === currentRecordIndex){
                            newList.push({type: "Allergy", name: allergyName, reaction: allergyReaction, severity: allergySeverity, updatedDate: date});
                        }
                        else{
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
            dispatch(setIsAddRecordOpen({isAddRecordOpen: false}))
        }
        else if(currentRecordType === 'Lab' && labName !=='' && labDosage !=='' && labInstruction !==''){
            myPetList.forEach((element: PetInfo, index: number) => {
                if(index === currentPetIndex){
                    myPetList[currentPetIndex].records.forEach((ele: any, id: number) => {
                        if(id === currentRecordIndex){
                            newList.push({type: "Lab", name: vaccineName, dosage: labDosage, instructions: labInstruction, updatedDate: date});
                        }
                        else{
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
            dispatch(setIsAddRecordOpen({isAddRecordOpen: false}))
        }
        else{
            setShowError(true);
        }
    }

    function saveRecord(){
        let newList: any[] = []; 
        let newRecordList: any[] = []; 

        var today = new Date();
        var dd = String(today.getDate());
        var mm = String(today.getMonth() + 1);
        var yyyy = today.getFullYear();
        var date = mm + '/' + dd + '/' + yyyy;

        if(currentRecordType === 'Vaccine' && vaccineName !== '' && vaccineDate !==''){
            myPetList.forEach((element: PetInfo, index: number) => {
                if(index === currentPetIndex){
                    myPetList[currentPetIndex].records.forEach((ele: any) => {
                        newList.push(ele);
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
        else if(currentRecordType === 'Allergy' && allergyName !=='' && allergyReaction !=='' && allergySeverity !==''){
            myPetList.forEach((element: PetInfo, index: number) => {
                if(index === currentPetIndex){
                    myPetList[currentPetIndex].records.forEach((ele: any) => {
                        newList.push(ele);
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
        else if(currentRecordType === 'Lab' && labName !=='' && labDosage !=='' && labInstruction !==''){
            myPetList.forEach((element: PetInfo, index: number) => {
                if(index === currentPetIndex){
                    myPetList[currentPetIndex].records.forEach((ele: any) => {
                        newList.push(ele);
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
            {(itemType === "pet" || itemType === "petEdit") && <View style={styles.spacingPadding}>
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
                        <View style={{ alignContent: 'center', margin: 20, marginTop:5, width: '100%',}}>
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
            </View>}
             {(itemType === "record" || itemType === "recordEdit") && <View style={styles.spacingPadding}>
                <Text style={styles.titleText}>{itemType === "pet" ? "Add a New Record" : "Edit Pet's Record" }</Text>
                <Text style={styles.bodyText}>Select Record Type</Text>
                <View style={{margin: 'auto'}}>
                    <RecordSelect />
                </View>
                <View style={styles.spacingPadding}>
                    {currentRecordType === "Vaccine" ? <View>
                        <TextInput
                            style={styles.shortTextInput}
                            onChangeText={setVaccineName}
                            value={vaccineName}
                            placeholder="Vaccine Name"
                            placeholderTextColor={"#807e7c"}
                        />
                        <View style={{margin: 'auto'}}>
                            <Text style={styles.bodyText}>Date Administered</Text>
                            <View style={{ alignContent: 'center', margin: 10, left: 0, width: '100%'}}>
                                <View style={{margin: 'auto'}}>
                                    <AppButton text={vaccineDate === '' ? "Select Date" : vaccineDate} onPress={()=>{setShowCalendar(!showCalendar)}} style={styles.CalendarButton}/>
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
                                    onChangeText={setVaccineDate}
                                    value={vaccineDate}
                                    placeholder="Administered Date"
                                    placeholderTextColor={"#807e7c"}/>
                                </>
                                }
                                </View>
                        </View>
                    </View> : null}
                    {currentRecordType === "Allergy" ? <View>
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
                    {currentRecordType ==="Lab" ? <View>
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
                        <AppButton style={styles.loginButton} text={"Save"} onPress={() => {if(itemType === "record"){saveRecord();}else{saveRecordEdit();}}}/>
                        <AppButton style={styles.loginButton} text={"Cancel"} onPress={()=>{dispatch(setIsAddRecordOpen({isAddRecordOpen: false}))}}/>
                    </View>
                </View>
            </View>}
            </View>
        </Modal>
    )
}