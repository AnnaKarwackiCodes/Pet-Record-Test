import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
      shortTextInput: {
        height: 40,
        margin: 'auto',
        marginTop: 10, 
        borderWidth: 1,
        padding: 10,
        width: 250,
        textAlign: 'center',
        fontSize: 20,
      },
      longTextInput:{
        height: 150,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 250,
        fontSize: 20,
      },
      confirmButton: {
        backgroundColor: "#578FCA",
        width: 'auto',
        height: 50,
        padding: 10, 
        borderRadius: 4,
        margin: 5,
        marginTop: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      deleteButton: {
        backgroundColor: "#d40824",
        width: 'auto',
        height: 50,
        padding: 10, 
        borderRadius: 4,
        margin: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      returnButton: {
        backgroundColor: "#578FCA",
        width: 'auto',
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
        top: 0,
        left: 0,
      },
      CalendarButton: {
        backgroundColor: "#578FCA",
        width: 200,
        height: 50,
        padding: 10, 
        borderRadius: 4,
        margin: 5,
        marginTop: 15,
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
        width: 100,
        height: 50,
        padding: 10, 
        borderRadius: 4,
        margin: 5,
        position: 'absolute',
        top: 0,
        right: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, 
      },
      titleText: {
        textAlign: 'center',
        fontSize: 32,
        marginTop: 15
      },
      subTitleText: {
        textAlign: 'center',
        fontSize: 26,
        marginTop: 10
      },
      bodyText: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10
      },
      errorText:{
        fontSize: 15,
        marginTop: 10,
        color: "#9c0015"
      },
      formView: {

      },
      spacingPadding: {paddingTop: 25, paddingBottom: 25}
    });

export default styles;