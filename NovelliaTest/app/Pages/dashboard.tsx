import { Text, View } from "react-native";
import {StyleSheet, TextInput} from 'react-native';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { setKeyValue } from "../../Redux/reducers/Tester";

export default function dashboard() {
const dispatch = useDispatch();

const keyValue = useSelector((store: any)=> {
return store.tester.key;
});
const [text, onChangeText] = useState(keyValue);

useEffect(()=>{
dispatch(setKeyValue({value: text}));
},[text]);

    const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 150,
    textAlign: 'center'
  },
});
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
          style={styles.input}
          onChangeText={onChangeText}
          value={keyValue}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
    </View>
  );
}
