import { Text, View, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import AppButton from "../Components/appButton";
import styles from "../Helpers/styleSheet";
import { setCurrentScreen } from "@/Redux/reducers/UserInfo";
import ListItem from "../Components/listItem";
import AddNewListItem from "../Components/addNewListItem";
import { setIsAddRecordOpen } from "@/Redux/reducers/SystemSettings";

export default function RecordDetails() {
const dispatch = useDispatch();

const currentPetIndex = useSelector((store: any)=> {
    return store.userInfo.currentPetIndex;
});
const petList = useSelector((store: any)=> {
    return store.userInfo.petList;
});

const [currentPet, setCurrentPet] = useState({name: '', type: '', breed: '', DOB: ''});

const petRecords = useSelector((store: any)=> {
return store.userInfo.petRecords;
});

const currentRecordIndex = useSelector((store: any)=> {
return store.userInfo.currentRecordIndex;
});

const [currentRecord, setCurrentRecord] = useState(petList[currentPetIndex].records[currentRecordIndex]||null);

useEffect(() => {
  setCurrentPet(petList[currentPetIndex]);
  setCurrentRecord(petList[currentPetIndex].records[currentRecordIndex]);
}, []);


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
      <AppButton style={styles.confirmButton} text={"Return to Profile"} onPress={()=>{dispatch(setCurrentScreen({currentScreen: 'petProfile'}));}}/>

      <Text style={styles.titleText}>{currentPet.name}'s Record</Text>
            {currentRecord.type === "Vaccine" ? <View>
                <Text style={styles.subTitleText}>Vaccine Name: {currentRecord.name}</Text>
                <Text style={styles.subTitleText}>Date Administered: {currentRecord.dateAdmin}</Text>
            </View> : null}
            {currentRecord.type === "Allergy" ? <View>
                <Text style={styles.subTitleText}>Allergy Name: {currentRecord.name}</Text>
                <Text style={styles.subTitleText}>Pet's Reaction: {currentRecord.reaction}</Text>
                <Text style={styles.subTitleText}>Reaction Severity: {currentRecord.severity}</Text>
            </View> : null}
            {currentRecord.type === "Lab" ? <View>
                <Text style={styles.subTitleText}>Lab Name: {currentRecord.name}</Text>
                <Text style={styles.subTitleText}>Dosage: {currentRecord.dosage}</Text>
                <Text style={styles.subTitleText}>Instructions: {currentRecord.instructions}</Text>
            </View> : null}
    </View>
  );
}
