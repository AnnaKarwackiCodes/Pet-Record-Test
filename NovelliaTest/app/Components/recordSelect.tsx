import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "../Helpers/styleSheet";
import { setCurrentRecordType } from "@/Redux/reducers/SystemSettings";
import { useDispatch } from "react-redux";

export default function RecordSelect(){
    const dispatch = useDispatch();
    const notSelected = require('../Assets/box.png');
    const selected = require('../Assets/checked.png');

    const [isVaccineSelected, setIsVaccineSelected] = useState(true);
    const [isAllergySelected, setIsAllergySelected] = useState(false);
    const [isLabSelected, setIsLabSelected] = useState(false);

    const [curSelected, setCurSelected] = useState('vaccine');

    useEffect(()=>{
        if(isVaccineSelected){
            setCurSelected('vaccine');
        }
        else if(isAllergySelected){
            setCurSelected('allergy');
        }
        else if(isLabSelected){
            setCurSelected('lab');
        }
        dispatch(setCurrentRecordType({currentRecordType: curSelected}))
    },[isVaccineSelected, isAllergySelected, isLabSelected]);

    return(
        <View>
            <TouchableOpacity style={{}} onPress={()=>{setIsVaccineSelected(!isVaccineSelected); setIsAllergySelected(false); setIsLabSelected(false)}}>
                <View style={{flexDirection:'row'}}>
                    <Image
                        source={isVaccineSelected? selected:notSelected}
                        style={{ alignSelf: 'center', marginRight: 15}}
                    />
                    <Text style={styles.bodyText}>Vaccine</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{}} onPress={()=>{setIsVaccineSelected(false); setIsAllergySelected(!isAllergySelected); setIsLabSelected(false)}}>
                <View style={{flexDirection:'row'}}>
                    <Image
                        source={isAllergySelected? selected:notSelected}
                        style={{ alignSelf: 'center', marginRight: 15}}
                    />
                    <Text style={styles.bodyText}>Allergy</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{}} onPress={()=>{setIsVaccineSelected(false); setIsAllergySelected(false); setIsLabSelected(!isLabSelected)}}>
                <View style={{flexDirection:'row'}}>
                    <Image
                        source={isLabSelected? selected:notSelected}
                        style={{ alignSelf: 'center', marginRight: 15}}
                    />
                    <Text style={styles.bodyText}>Lab</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
