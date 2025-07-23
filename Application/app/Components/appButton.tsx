import { Text, View, TouchableHighlight } from "react-native";

export default function AppButton({style, text, onPress} : any){
    return(
        <TouchableHighlight style={style} onPress={onPress} underlayColor={"#de5e43"}>
            <Text style={{color:'#ffffff', textAlign: 'center', fontSize: 20, fontWeight: '600'}}>{text}</Text>
        </TouchableHighlight>
    )
}