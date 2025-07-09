import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
      shortTextInput: {
        height: 40,
        margin: 'auto',
        marginTop: 10, 
        borderWidth: 1,
        padding: 10,
        width: 250,
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
        backgroundColor: "#FB4D27",
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
        backgroundColor: "#de7684",
        borderColor: '#d40824',
        borderWidth: 2,
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
        backgroundColor: "#FB4D27",
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
      backButton: {
        backgroundColor: "#FB4D27",
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
        position: 'absolute',
        top: 0,
        left: 0,
      },
      CalendarButton: {
        backgroundColor: "#FB4D27",
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
        backgroundColor: "#851800",
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
        backgroundColor: "#b55636",
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
      },
      titleText: {
        textAlign: 'center',
        fontSize: 32,
        marginTop: 5,
        fontWeight: 'bold'
      },
      subTitleText: {
        textAlign: 'center',
        fontSize: 24,
        marginTop: 0,
        fontWeight: '600'
      },
      bodyText: {
        textAlign: 'center',
        fontSize: 17,
        marginTop: 10,
        fontWeight: '500',
        flexWrap: 'wrap'
      },
      bodyTextWhite: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        fontWeight: '500',
        color: '#fff'
      },
      errorText:{
        fontSize: 15,
        marginTop: 10,
        color: "#9c0015"
      },
      formView: {

      },
      spacingPadding: {paddingTop: 5, paddingBottom: 5}
    });

export default styles;