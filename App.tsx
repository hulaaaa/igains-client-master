import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainRouterStack from './src/router/layoutAuth';
import StartRouterStack from './src/router/lauoutStart';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setIsAuth(true); // Користувач авторизований
        } else {
          setIsAuth(false); // Користувач не авторизований
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    }

    SplashScreen.preventAutoHideAsync();
    checkAuth();
    SplashScreen.hideAsync();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token'); // Видалити токен
      setIsAuth(false); // Змінити стан на неавторизованого користувача
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <NavigationContainer>
      {isAuth ? (
        <MainRouterStack handleLogout={handleLogout} />
      ) : (
        <StartRouterStack />
      )}
    </NavigationContainer>
  );
}
