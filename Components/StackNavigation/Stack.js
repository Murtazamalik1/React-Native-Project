import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet } from "react-native";
import LoginScreen from "./Login";
import HomeScreen from "../Home";
import Register from "./Register";
import UpdateUser from "../CrudOperation/UpdateUser";
import CustomDrawer from "../DrawerNavigation/CustomDrawer";
import Icon from "react-native-vector-icons/Ionicons"
import Delete from "../CrudOperation/Delete";
import AddUser from "../CrudOperation/Add";
import PushNotificationComponent from "../Notification/NotificationService";
const stacks = createNativeStackNavigator();
const Drawers = createDrawerNavigator();

function Root() {
  return (
    <Drawers.Navigator drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={styles.DrawerStyle}>
      {<Drawers.Screen name="Home" component={HomeScreen}/>}
      <Drawers.Screen name="Update" component={UpdateUser} />
      <Drawers.Screen name="Delete" component={Delete} />
      <Drawers.Screen name="Add" component={AddUser} />
      <Drawers.Screen name="Notification" component={PushNotificationComponent}/>
      
    </Drawers.Navigator>
  );
}
const AuthStack = () => {
  return (
    <NavigationContainer>
      <stacks.Navigator initialRouteName="Login"
        screenOptions={styles.ScreenStyle}>
        <stacks.Screen name="Login" component={LoginScreen} />
        <stacks.Screen name="Root" component={Root} />
        <stacks.Screen name="SignUp" component={Register} />
      </stacks.Navigator>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  ScreenStyle: {
    headerShown: false
  },
  DrawerStyle: {
    headerShown: true
  }
})
export default AuthStack;
