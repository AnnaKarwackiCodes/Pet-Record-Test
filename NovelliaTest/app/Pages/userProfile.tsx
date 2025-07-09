import { Text, View, Image, ScrollView, FlatList, Modal } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import AppButton from "../Components/appButton";
import styles from "../Helpers/styleSheet";
import { setCurrentScreen, setLoginState } from "@/Redux/reducers/UserInfo";

export default function UserProfile() {
const dispatch = useDispatch();

const userName = useSelector((store: any)=> {
    return store.userInfo.name;
});
const userEmail = useSelector((store: any)=> {
    return store.userInfo.email;
});

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        marginTop: 15,
      }}
    >
     <AppButton style={styles.backButton} text={"Back"} onPress={()=>{dispatch(setCurrentScreen({currentScreen: 'dashboard'}));}}/>
      <View 
        style={{
          height: '70%', 
          width: '100%', 
          marginTop: 10, 
          padding: 20, 
          borderColor:"#FB4D27", 
          borderWidth: 2, 
          borderRadius:25,
          shadowColor: '#000',
          shadowOffset: {
          width: 0,
          height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          }}>
        <View style={{backgroundColor: '#fff', borderTopRightRadius: 20, borderTopLeftRadius: 30, borderWidth: 2, borderColor:"#FB4D27", padding: 15, width: 300}}>
           <Text style={styles.titleText}>Profile</Text>
            <Text style={styles.bodyText}>Name: {userEmail} </Text>
            <Text style={styles.bodyText}>Email: {userEmail} </Text>
            <AppButton style={styles.logoutButton} text={"Logout"} onPress={()=>{dispatch(setLoginState({loggedin: false}));}}/>
        </View>
        <Text style={styles.subTitleText}>Your Vets</Text>
      </View>
    </View>
  );
}
