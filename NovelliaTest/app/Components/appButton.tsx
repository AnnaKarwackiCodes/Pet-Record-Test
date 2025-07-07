import { Text, View, TouchableHighlight } from "react-native";

export default function AppButton({style, text, onPress} : any){
    return(
        <TouchableHighlight style={style} onPress={onPress} underlayColor={"#235991"}>
            <Text style={{color:'#ffffff', textAlign: 'center', fontSize: 20}}>{text}</Text>
        </TouchableHighlight>
    )
}