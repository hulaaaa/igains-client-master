import { StyleSheet, Text,StatusBar, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashStart from '../screens/start/SplashStart'
import RegisterLayout from '../screens/start/RegisterLayout'
import LoginLayout from '../screens/start/LoginLayout'
  
const Stack = createNativeStackNavigator()
export default function StartRouterStack() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen options={{animation: 'fade',gestureEnabled: false, animationDuration: 400}} name="Start" component={SplashStart} />
      <Stack.Screen options={{ animation: 'fade',animationDuration: 400}} name="Register" component={RegisterLayout} />
      <Stack.Screen options={{ animation: 'fade',animationDuration: 400}} name="Login" component={LoginLayout} />
    </Stack.Navigator>
  )
}
const styles = StyleSheet.create({})