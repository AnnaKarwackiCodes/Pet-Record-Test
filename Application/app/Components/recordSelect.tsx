import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "../Helpers/styleSheet";
import { setCurrentRecordType } from "@/Redux/reducers/SystemSettings";
import { useDispatch, useSelector } from "react-redux";

export default function RecordSelect(){
    const dispatch = useDispatch();
    const notSelected = require('../Assets/box.png');
    const selected = require('../Assets/checked.png');

    const [isVaccineSelected, setIsVaccineSelected] = useState(false);
    const [isAllergySelected, setIsAllergySelected] = useState(false);
    const [isLabSelected, setIsLabSelected] = useState(false);
    const curRecordType = useSelector((store: any)=> {
        return store.systemSettings.currentRecordType;
    });
    const [type, setType] = useState(curRecordType || '');

    useEffect(()=>{
        let cur = '';
        if(isVaccineSelected){
            cur = 'Vaccine';
        }
        else if(isAllergySelected){
            cur = 'Allergy';
        }
        else if(isLabSelected){
            cur = 'Lab';
        }
        if(cur !== type){
            dispatch(setCurrentRecordType({currentRecordType: cur}))
        }     
    },[isVaccineSelected, isAllergySelected, isLabSelected]);

    useEffect(()=>{
        setType(curRecordType);
        setIsVaccineSelected(curRecordType === "Vaccine"); 
        setIsAllergySelected(curRecordType === "Allergy"); 
        setIsLabSelected(curRecordType === "Lab"); 
    }, [curRecordType]);

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
