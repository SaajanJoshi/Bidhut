import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  container: {
    borderRadius: 5
  },
  mainmenu: {
    backgroundColor: "skyblue",
    borderRadius: 5,
    padding: 15
  },
  mainmenuDashboard: {
    height: 150,
    width: screenWidth
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain"
  },
  mainmenuSignUpBox1: {
    backgroundColor: "skyblue",
    height: 130,
    width: screenWidth
  },
  mainmenuSignUpBox2: {
    backgroundColor: "coral",
    height: 300,
    width: screenWidth
  },
  mainmenuSignUpBox3: {
    backgroundColor: "green",
    height: 150,
    width: screenWidth
  },
  signUptypetext: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  RadioButton: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start"
  },
  TextInput: {
    fontSize: 20,
    height: 50,
    width: 150
  },
  outercircle: {
    borderWidth: 1,
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 180,
  },
  outerCircleAlign:{
     flex:1,
     flexDirection:'row',
     justifyContent:'center',
     paddingTop:10
  },
  imageCircle:{
      width: 100,
      height: 100,
      borderRadius: 180,
      flex: 1
  }
});

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
