import { Text, View } from "react-native";
import {StyleSheet, TextInput} from 'react-native';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { setKeyValue } from "../../Redux/reducers/Tester";
import AppButton from "../Components/appButton";
import styles from "../Helpers/styleSheet";
import { setLoginState } from "@/Redux/reducers/UserInfo";

export default function Dashboard() {
const dispatch = useDispatch();

const keyValue = useSelector((store: any)=> {
return store.tester.key;
});
const [text, onChangeText] = useState(keyValue);

useEffect(()=>{
dispatch(setKeyValue({value: text}));
},[text]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This is a new page.</Text>
      <Text>My keyvalue: {keyValue}</Text>
      <TextInput
          style={styles.shortTextInput}
          onChangeText={onChangeText}
          value={keyValue}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
      <AppButton style={styles.logoutButton} text={"Logout"} onPress={()=>{dispatch(setLoginState({loggedin: false}));}}/>
    </View>
  );
}
