import { NavigationContainer } from '@react-navigation/native';
import MainRouterStack from './src/router/layoutAuth';
import StartRouterStack from './src/router/lauoutStart';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const toastConfig = {
  success: (props:any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#E0FE10', backgroundColor: '#17181B' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontFamily: 'Bold',
        fontSize: 17,
        fontWeight: '400',
        color: 'white'
      }}
    />
  ),

  error: (props:any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#E03326', backgroundColor: '#17181B' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontFamily: 'Bold',
        fontSize: 17,
        fontWeight: '400',
        color: 'white'
      }}
    />
  ),
};


export default function App() {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    SplashScreen.hideAsync();
  }, []);
  const isAuth = true;

  return (
    <NavigationContainer >
      {
        isAuth ? (<MainRouterStack />) : (<StartRouterStack />)
      }
      <Toast config={toastConfig}/>
    </NavigationContainer>
  );
}
