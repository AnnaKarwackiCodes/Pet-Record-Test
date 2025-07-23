import { Text, View, Image, Modal, TextInput } from "react-native";
import styles from "../Helpers/styleSheet";
import AppButton from "./appButton";
import { useDispatch, useSelector } from "react-redux";
import { setCreateAnAccount, setLoginState, setUserInfo } from "@/Redux/reducers/UserInfo";
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
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');

    function createAccout(){
        if(name !== '' && email !== '' && password !== '' && confirmPassword !== ''){
            if(password !== confirmPassword){
                setErrorMessage("Password doesn't match.")
                setShowError(true);
            }
            else{
                //proper auth check would go here, on error display a new message but we are just going to straight into the app
                dispatch(setUserInfo({name: name, email: email}));
                dispatch(setLoginState({loggedin: true})); dispatch(setCreateAnAccount({createAnAccount: false}))
            }
        }
        else{
            setErrorMessage("You are missing info to create your account.");
            setShowError(true);
        }
    }

    useEffect(() => {
        setShowError(false);
    }, [name, email, password, confirmPassword]);

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
                    height: '90%',
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
                        autoCorrect={false}
                    />
                    <TextInput
                        style={styles.shortTextInput}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Your Email"
                        placeholderTextColor={"#807e7c"}
                        autoCorrect={false}
                    />
                    <TextInput
                        style={styles.shortTextInput}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Password"
                        placeholderTextColor={"#807e7c"}
                        secureTextEntry={true}
                        autoCorrect={false}
                    />
                    <TextInput
                        style={styles.shortTextInput}
                        onChangeText={setConfirmPassword}
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        placeholderTextColor={"#807e7c"}
                        secureTextEntry={true}
                        autoCorrect={false}
                    />
                    {showError && <Text style={styles.errorText}>{errorMessage}</Text>}
                    <View style={{margin:'auto', paddingTop: 5, paddingBottom: 5}}>
                        <AppButton style={styles.loginButton} text={"Create an Account"} onPress={()=>{createAccout()}}/>
                        <AppButton style={styles.loginButton} text={"Cancel"} onPress={()=>{dispatch(setCreateAnAccount({createAnAccount: false}))}}/>
                    </View>
                </View>
            </View>
            </View>
        </Modal>
    )
}