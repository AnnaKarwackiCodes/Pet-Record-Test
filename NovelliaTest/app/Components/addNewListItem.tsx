import { Text, View, Image, Modal, TouchableHighlight, TextInput } from "react-native";
import styles from "../Helpers/styleSheet";
import AppButton from "./appButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setIsAddPetOpen } from "@/Redux/reducers/SystemSettings";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddNewListItem({itemType, onClose}: any){
    const dispatch = useDispatch();
    const [icon, setIcon] = useState(require('../Assets/error.png'));

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [breed, setBreed] = useState('');
    const [DOB, setDOB] = useState('');
    const [date, setDate] = useState(new Date(1598051730000))
    const [openDate, setOpenDate] = useState(false)

    const isModalOpen = useSelector((store: any)=> {
        return store.systemSettings.isAddPetOpen;
    });
    const [modalVisible, setModalVisible] = useState(isModalOpen);
        useEffect(() => {
        setModalVisible(isModalOpen);
        console.log("isModalOpen: " + isModalOpen);
    }, [isModalOpen]);

    const onChange = (event:any, selectedDate:Date) => {
    const currentDate = selectedDate;
    //setShow(false);
    setDate(currentDate);
    setDOB(currentDate.getMonth().toString() + "-" + currentDate.getDate().toString() + "-" + currentDate.getFullYear().toString());
    console.log(DOB)
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
            <View style={styles.spacingPadding}>
                <Text style={styles.titleText}>Add a New Pet</Text>
                <View style={styles.spacingPadding}>
                    <TextInput
                        style={styles.shortTextInput}
                        onChangeText={setName}
                        value={name}
                        placeholder="Your Pet's Name"
                        placeholderTextColor={"#807e7c"}
                    />
                    
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
            </View>
            </View>
        </Modal>
    )
}