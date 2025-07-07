import { Text, View, Image, Modal, TextInput } from "react-native";
import styles from "../Helpers/styleSheet";
import AppButton from "./appButton";
import { useDispatch, useSelector } from "react-redux";
import { setCreateAnAccount, setLoginState } from "@/Redux/reducers/UserInfo";
import { useEffect, useState } from "react";

export default function CreateAccountModal(){
    const dispatch = useDispatch();
    

    const isCreateAnAccount = useSelector((store: any)=> {
    return store.userInfo.createAnAccount;
    });

    const [modalVisible, setModalVisible] = useState(isCreateAnAccount);

    useEffect(() => {
        setModalVisible(isCreateAnAccount);
        console.log("isCreateAnAccount " + isCreateAnAccount);
    }, [isCreateAnAccount]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
                <Text style={styles.titleText}>Create an Account</Text>
                <View style={styles.spacingPadding}>
                    <TextInput
                        style={styles.shortTextInput}
                        onChangeText={setName}
                        value={name}
                        placeholder="Your Name"
                        placeholderTextColor={"#807e7c"}
                    />
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
                    <TextInput
                        style={styles.shortTextInput}
                        onChangeText={setConfirmPassword}
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        placeholderTextColor={"#807e7c"}
                    />
                    <View style={{margin:'auto'}}>
                        <AppButton style={styles.loginButton} text={"Create an Account"} onPress={()=>{dispatch(setLoginState({loggedin: true})); dispatch(setCreateAnAccount({createAnAccount: false}))}}/>
                        <AppButton style={styles.loginButton} text={"Cancel"} onPress={()=>{dispatch(setCreateAnAccount({createAnAccount: false}))}}/>
                    </View>
                </View>
            </View>
            </View>
        </Modal>
    )
}