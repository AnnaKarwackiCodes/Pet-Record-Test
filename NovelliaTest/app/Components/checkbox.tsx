import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "../Helpers/styleSheet";

export default function CheckBox({text, onPress,  isPressed} : any){
    const [icon, setIcon] = useState(require('../Assets/box.png'));

    useEffect(()=> {
        setIcon(isPressed? require('../Assets/checked.png') : require('../Assets/box.png'))
    },[isPressed]);


    return(
        <TouchableOpacity style={{}} onPress={onPress}>
           <View style={{flexDirection:'row'}}>
                <Image
                    source={icon}
                    style={{ alignSelf: 'center', marginRight: 15}}
                />
                <Text style={styles.bodyText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}