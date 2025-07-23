import { Text, View, Image, Modal, TextInput } from "react-native";
import styles from "../Helpers/styleSheet";
import AppButton from "./appButton";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggingIn, setLoginState } from "@/Redux/reducers/UserInfo";
import { useEffect, useState } from "react";

export default function LoginModal(){
    const dispatch = useDispatch();
    

    const isLoggingIn = useSelector((store: any)=> {
    return store.userInfo.isLoggingIn;
    });

    const [modalVisible, setModalVisible] = useState(isLoggingIn);

    useEffect(() => {
        setModalVisible(isLoggingIn);
        console.log("isLoggingIn " + isLoggingIn);
    }, [isLoggingIn]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <Modal 
          animationType="slide"
          transparent={true}
          visible={modalVisible} 
          presentationStyle={"overFullScreen"}>
            <View style={{
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 35,
                    alignItems: 'center',
                    shadowColor: '#000',
                    width: '80%',
                    height: '70%',
                    margin: 'auto',
                    shadowOffset: {
                    width: 0,
                    height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,}}>
                <Image
                source={require('../Assets/temp.jpg')}
                style={{width: 100, height: 100, alignSelf: 'center'}}
            />
            <View style={styles.spacingPadding}>
                <Text style={styles.titleText}>Enter Login Info</Text>
                <View style={styles.spacingPadding}>
                    <TextInput
                        style={styles.shortTextInput}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Your Email"
                        placeholderTextColor={"#807e7c"}
                    />
                    <TextInput
                        style={styles.shortTextInput}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Password"
                        placeholderTextColor={"#807e7c"}
                    />
                    <View style={{margin:'auto', paddingTop: 5, paddingBottom: 5}}>
                        <AppButton style={styles.loginButton} text={"Login"} onPress={()=>{
                            dispatch(setIsLoggingIn({isLoggingIn: false}));
                            dispatch(setLoginState({loggedin:true}));
                        }}/>
                        <AppButton style={styles.loginButton} text={"Cancel"} onPress={()=>{dispatch(setIsLoggingIn({isLoggingIn: false}))}}/>
                    </View>
                </View>
            </View>
            </View>
        </Modal>
    )
}