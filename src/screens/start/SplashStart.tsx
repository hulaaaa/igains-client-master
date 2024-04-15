import * as Haptics from 'expo-haptics';
import { SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Splash_IconGains from '../../../assets/svg/Splash_IconGains';
import Splash_GainsText from '../../../assets/svg/Splash_GainsText';
import Arrow from '../../../assets/svg/Arrow';
import Animated from 'react-native-reanimated';
import SplashStories from '../../components/SplashStories';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

export default function SplashStart() {
  const navigation = useNavigation<any>();
  const [fontsLoaded, fontError] = useFonts({
    'Regular': require('../../../assets/fonts/regular.otf'),
    'RegularItalic': require('../../../assets/fonts/regular-italic.otf'),
    'Light': require('../../../assets/fonts/light.otf'),
    'LightItalic': require('../../../assets/fonts/light-italic.otf'),
    'Bold': require('../../../assets/fonts/bold.otf'),
    'BoldItalic': require('../../../assets/fonts/bold-italic.otf'),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);
  if (!fontsLoaded && !fontError) {
    return null;
  }
  
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Image style={styles.imgBg} alt='img' source={require('../../../assets/images/app/splash_start_img.png')} />
      <View style={styles.contantDiv}>
        <View>
          <Splash_GainsText width={123} height={32} />
        </View>

        <View style={styles.mainContantDiv}>
          <View>
            <SplashStories />
          </View>
          <View style={styles.btnDiv}>
            <TouchableOpacity onPress={() => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
              navigation.navigate('Register')
            }}>
              <View style={{
                width: Dimensions.get('window').width - 80,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                paddingVertical: 20,
                backgroundColor: '#1E1E1E',
                borderRadius: 15,
              }}>
                <Text style={{
                  fontFamily: 'Bold',
                  fontSize: 17,
                  color: '#FFFFFF',
                  textAlign: 'center',
                }}>
                  Let's go
                </Text>
                <Arrow color={'#FFFFFF'} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
                navigation.navigate('Login') 
              }} 
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, }}>
              <Text style={{
                fontFamily: 'Light',
                fontSize: 16,
                color: '#FFFFFF',
              }}>
                Already have an account?
              </Text>
              <Text style={{
                fontFamily: 'Bold',
                fontSize: 16,
                color: '#FFFFFF',
              }}>
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <StatusBar style="dark" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Bold',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  imgBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    width: '100%',
    height: '100%',
  },
  contantDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    paddingVertical: '25%'
  },
  mainContantDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 40,
  },
  btnDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 30,
  }
})