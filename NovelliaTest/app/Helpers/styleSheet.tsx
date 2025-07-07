import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
      shortTextInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 250,
        textAlign: 'center'
      },
      longTextInput:{
        height: 150,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 150,
        textAlign: 'center'
      },
      confirmButton: {
        backgroundColor: "#578FCA",
        width: 170,
        height: 50,
        padding: 10, 
        borderRadius: 4,
        margin: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      loginButton: {
        backgroundColor: "#3674B5",
        width: 200,
        height: 50,
        padding: 10, 
        borderRadius: 4,
        margin: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      logoutButton: {
        backgroundColor: "#b57336",
        width: 200,
        height: 50,
        padding: 10, 
        borderRadius: 4,
        margin: 5,
        position: 'absolute',
        top: 0,
        left: 10 
      },
      titleText: {
        textAlign: 'center',
        fontSize: 35,
        marginTop: 15
      },
      subTitleText: {
        textAlign: 'center',
        fontSize: 29,
        marginTop: 10
      },
      bodyText: {
        textAlign: 'center',
        fontSize: 23,
        marginTop: 10
      },
      formView: {

      },
      spacingPadding: {paddingTop: 25, paddingBottom: 25}
    });

export default styles;