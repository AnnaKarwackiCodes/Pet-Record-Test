import { Text, View, Image } from "react-native";
import styles from "../Helpers/styleSheet";
import AppButton from "./appButton";
import { useDispatch } from "react-redux";
import { setCreateAnAccount, setIsLoggingIn, setLoginState } from "@/Redux/reducers/UserInfo";
import CreateAccountModal from "./createAccountModal";
import LoginModal from "./loginModal";

export default function loginComponent(){
    const dispatch = useDispatch();

    return(
        <View>
            <Image
                source={require('../Assets/temp.jpg')}
                style={{width: 100, height: 100, alignSelf: 'center'}}
            />
            <View style={styles.spacingPadding}>
                <Text style={styles.titleText}>Login</Text>
                <View style={styles.spacingPadding}>
                    <AppButton style={styles.loginButton} text={"Login"} onPress={()=>{dispatch(setIsLoggingIn({loggedin: true}));}}/>
                    <AppButton style={styles.loginButton} text={"Create an Account"} onPress={()=>{dispatch(setCreateAnAccount({createAnAccount: true}))}}/>
                </View>
            </View>
            <CreateAccountModal />
            <LoginModal />
        </View>
    )
}