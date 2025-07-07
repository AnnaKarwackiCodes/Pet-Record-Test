import { Text, View, Image } from "react-native";
import styles from "../Helpers/styleSheet";
import AppButton from "./appButton";

export default function loginComponent(){
    return(
        <View>
            <Image
                source={require('../Assets/temp.jpg')}
                style={{width: 100, height: 100, alignSelf: 'center'}}
            />
            <View style={styles.spacingPadding}>
                <Text style={styles.titleText}>Login</Text>
                <View style={styles.spacingPadding}>
                    <AppButton style={styles.loginButton} text={"Login"} onPress={()=>{console.log("click")}}/>
                    <AppButton style={styles.loginButton} text={"Create an Account"} onPress={()=>{console.log("click")}}/>
                </View>
            </View>
        </View>
    )
}