import { Text, View, Image, Modal, TouchableHighlight, TextInput } from "react-native";
import styles from "../Helpers/styleSheet";
import AppButton from "./appButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setIsAddPetOpen, setIsAddRecordOpen, setSelected } from "@/Redux/reducers/SystemSettings";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import CheckBox from "./checkbox";
import AnimalTypeSelect from "./animalTypeSelect";
import RecordSelect from "./recordSelect";

export default function AddNewListItem({itemType, onClose}: any){
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [type, setType] = useState('');
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

    const isAddPetOpen = useSelector((store: any)=> {
        return store.systemSettings.isAddPetOpen;
    });

    const isAddRecordOpen = useSelector((store: any)=> {
        return store.systemSettings.isAddRecordOpen;
    });

    const curRecordType = useSelector((store: any)=> {
        return store.systemSettings.currentRecordType;
    });

    const [currentRecordType, setCurRecordType] = useState(curRecordType || '')
    useEffect(()=>{
        setCurRecordType(curRecordType);
    }, [curRecordType])

    const [modalVisible, setModalVisible] = useState(itemType=== "pet"? isAddPetOpen : isAddRecordOpen);
    useEffect(() => {
        setModalVisible(itemType=== "pet"? isAddPetOpen : isAddRecordOpen);
        console.log("isModalOpen: " + itemType=== "pet"? isAddPetOpen : isAddRecordOpen);
    }, [itemType=== "pet"? isAddPetOpen : isAddRecordOpen]);

    const onChange = (event:DateTimePickerEvent, selectedDate:Date) => {
        const currentDate = selectedDate;
        setDate(currentDate);
        let myDate = currentDate.getMonth().toString() + "-" + currentDate.getDate().toString() + "-" + currentDate.getFullYear().toString();
        if(itemType === "pet"){
            setDOB(myDate);
        }
        else if(itemType === "record" && recordType === "Vaccine"){
            setVaccineDate(myDate);
        }
    };
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
                    <View style={{margin:'auto'}}>
                        <AppButton style={styles.loginButton} text={"Save"} onPress={()=>{dispatch(setIsAddPetOpen({isAddPetOpen: false}))}}/>
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
                            onChangeText={setName}
                            value={name}
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
                            onChangeText={setName}
                            value={name}
                            placeholder="Allergy Name"
                            placeholderTextColor={"#807e7c"}
                        />
                        <View style={{margin: 'auto'}}>
                            <Text style={styles.bodyText}>Pet's Reaction</Text>
                            <TextInput
                            style={styles.shortTextInput}
                            onChangeText={setName}
                            value={name}
                            placeholder="Severity of Allergy"
                            placeholderTextColor={"#807e7c"}
                        />
                        </View>
                    </View> : null}
                    {currentRecordType==="lab" ? <View>
                        <View style={{margin: 'auto'}}>
                            <TextInput
                            style={styles.shortTextInput}
                            onChangeText={setName}
                            value={name}
                            placeholder="Lab Name"
                            placeholderTextColor={"#807e7c"}
                        />
                            <TextInput
                                style={styles.shortTextInput}
                                onChangeText={setName}
                                value={name}
                                placeholder="Dosage"
                                placeholderTextColor={"#807e7c"}
                            />
                            <TextInput
                                style={styles.longTextInput}
                                onChangeText={setName}
                                value={name}
                                placeholder="Instructions"
                                placeholderTextColor={"#807e7c"}
                            />
                        </View>
                    </View> : null}

                    <View style={{margin:'auto'}}>
                        <AppButton style={styles.loginButton} text={"Save"} onPress={()=>{dispatch(itemType === "pet" ? setIsAddPetOpen({isAddPetOpen: false}) : setIsAddRecordOpen({isAddRecordOpen: false}))}}/>
                        <AppButton style={styles.loginButton} text={"Cancel"} onPress={()=>{dispatch(itemType === "pet" ? setIsAddPetOpen({isAddPetOpen: false}) : setIsAddRecordOpen({isAddRecordOpen: false}))}}/>
                    </View>
                </View>
            </View>}
            </View>
        </Modal>
    )
}