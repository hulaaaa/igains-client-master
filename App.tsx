import { NavigationContainer } from '@react-navigation/native';
import MainRouterStack from './src/router/layoutAuth';
import StartRouterStack from './src/router/layoutStart';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";



const toastConfig = {
  success: (props: any) => (
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

  error: (props: any) => (
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
  const [isAuth, setIsAuth] = useState(false);

  const checkAuthStatus = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
        AsyncStorage.removeItem('email');
        AsyncStorage.removeItem('token');
      }
    } else {
      setIsAuth(false);
    }
    SplashScreen.hideAsync();
  };

  const handleLogin = () => {
    setIsAuth(true);
  };

  const handleLogout = () => {
    setIsAuth(false);
    AsyncStorage.removeItem('email');
    AsyncStorage.removeItem('token');
  };

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    checkAuthStatus();
  }, []);
  return (
    <NavigationContainer>
      {isAuth ? <MainRouterStack handleLogout={handleLogout} /> : <StartRouterStack handleLogin={handleLogin} />}
      <Toast />
    </NavigationContainer>
  );
}