import { Text, View, Image, Modal, TouchableHighlight } from "react-native";
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
        else {
            setIcon(require('../Assets/add.png'));
        }
    }, []);

    return(
        <TouchableHighlight style={{marginBottom:10}} onPress={onPress}>
            <View style={{width: '100%', height: 100, backgroundColor: '#fff', flexDirection: 'row', borderColor:"#000", borderWidth: 1, borderRadius:15}}>
                <Image
                    source={icon}
                    style={{alignSelf: 'center', marginLeft: 15, marginRight: 15}}
                />
               {(itemType === "pet") ? <> 
                <View style={{margin:'auto', flexDirection: 'column'}}>
                        <Text style={styles.bodyText}> Name: {itemObj.name}</Text>
                        <Text style={styles.bodyText}> DOB: {itemObj.DOB}</Text>
                    </View> 
                    <View style={{position:'fixed', right: 5, top:18}}>
                        <AppButton style={styles.confirmButton} text={"View Records"} onPress={onPress} />
                    </View>
                </>: <></> }
                {(itemType === "record") ? <> 
                <View style={{margin:'auto', flexDirection: 'column'}}>
                    <Text style={styles.bodyText}> Record Type: {itemObj.type}</Text>
                    <Text style={styles.bodyText}> Name: {itemObj.name}</Text>
                </View> 
                <View style={{position:'fixed', right: 5, top:10}}>
                    <AppButton style={styles.confirmButton} text={"View Record"} onPress={onPress} />
                </View>
                </>: <></> }
                {(itemType === "add") ? <View style={{margin:'auto'}}> 
                    <Text style={styles.bodyText}> Add New {itemObj.addType === "record"? "Record" : "Pet"}</Text>
                </View>:<></>}
            </View>
        </TouchableHighlight>
    )
}