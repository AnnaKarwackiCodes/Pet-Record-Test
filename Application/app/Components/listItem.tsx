import { Text, View, Image, Modal, TouchableOpacity } from "react-native";
import styles from "../Helpers/styleSheet";
import AppButton from "./appButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function ListItem({itemObj, itemType, onPress}: any){
    const dispatch = useDispatch();
    const [icon, setIcon] = useState(require('../Assets/error.png'));

    useEffect(()=> {
        if(itemType === "pet"){
            switch(itemObj.type){
                case "Cat" :
                    setIcon(require('../Assets/cat.png'));
                    break;
                case "Bird" :
                    setIcon(require('../Assets/bird.png'));
                    break;
                case "Bunny" :
                    setIcon(require('../Assets/bunny.png'));
                    break;
                default:
                    setIcon(require('../Assets/dog.png'));
                    break;
            }
        }
        else if(itemType === "record"){
            switch((itemObj.type)){
                case "Vaccine" :
                    setIcon(require('../Assets/vaccines.png'));
                    break;
                case "Allergies" :
                    setIcon(require('../Assets/allergies.png'));
                    break;
                default:
                    setIcon(require('../Assets/labs.png'));
                    break;
            }
        }
        else if(itemType === 'vet'){
            setIcon(require('../Assets/vet.png'));
        }
        else {
            setIcon(require('../Assets/add.png'));
        }
    }, []);

    return(
        <TouchableOpacity style={{marginBottom:10}} onPress={onPress}>
            {(itemType !== "add") && <View style={{width: 300, height: 'auto', backgroundColor: '#fff', flexDirection: 'row', borderColor:"#FB4D27", borderWidth: 1, borderRadius:15}}>
                <Image
                    source={icon}
                    style={{alignSelf: 'center', marginLeft: 5, marginRight: 5}}
                />
               {(itemType === "pet") &&
                    <View style={{margin:'auto', flexDirection: 'column', padding: 10}}>
                        <Text style={styles.bodyText}> Name: {itemObj.name}</Text>
                        <AppButton style={styles.confirmButton} text={"View Records"} onPress={onPress} />
                    </View> }
                {(itemType === "record") && 
                <View style={{margin:'auto', flexDirection: 'column', padding: 10}}>
                    <Text style={styles.bodyText}> Record Type: {itemObj.type}</Text>
                    <Text style={styles.bodyText}> Name: {itemObj.name}</Text>
                    <AppButton style={styles.confirmButton} text={"View Record"} onPress={onPress} />
                </View> }
                {(itemType === "vet") && 
                <View style={{margin:'auto', flexDirection: 'column', padding: 10}}>
                    <Text style={styles.bodyText}> {itemObj.practiceName}</Text>
                    <Text style={styles.bodyText}> {itemObj.phoneNumber}</Text>
                    <AppButton style={styles.confirmButton} text={"View Record"} onPress={onPress} />
                </View> }
            </View>}
            {(itemType === "add") && 
                <View style={{width: '100%', height: 50, backgroundColor: '#FB4D27', flexDirection: 'row', borderColor:"#FB4D27", borderWidth: 1, borderRadius:15}}>
                    <View style={{margin:'auto', flexDirection: 'row'}}> 
                        <Image
                            source={icon}
                            style={{alignSelf: 'center', marginLeft: 15, marginRight: 15}}
                        />
                        <Text style={styles.bodyTextWhite}> Add {itemObj.addType === "record"? "Record" : itemObj.addType === 'pet' ? "Pet" : "Vet"}</Text>
                    </View>
                </View>}
        </TouchableOpacity>
    )
}