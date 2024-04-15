import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View,Dimensions, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useStore } from '../../services/ZustandModalPassword';
import { useNavigation } from '@react-navigation/native';
import { Circle, Path, Svg } from 'react-native-svg';
import { Alert } from 'react-native';
import * as Progress from 'react-native-progress';

SplashScreen.preventAutoHideAsync();

export default function Workout() {
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
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);
  if (!fontsLoaded && !fontError) {
    return null;
  }
  const navigation = useNavigation<any>();
  const selectedWorkouts = useStore((state) => state.selectWorkout);
  const confirmExit = () => {
    Alert.alert(
      'You can lose activities?',
      'You have unsaved activities. Are you sure to discard them and leave the screen?',
      [
        { text: "Don't leave", style: 'cancel', onPress: () => {navigation.dispatch()} },
        {
          text: 'Discard',
          style: 'destructive',
          onPress: () => navigation.navigate('Home'),
        },
      ]
    );
  }
  {/* 
    <TouchableOpacity 
      style={{marginTop:40}} 
      onPress={()=>navigation.navigate('SelectWork')}
    >
      <Text 
        style={{color: 'red',fontSize:30}}
      >
        QUITE
      </Text>
    </TouchableOpacity>
    {selectedWorkouts.map((item) =>
      (
        <Text style={{color:'white',fontSize:30}} key={item.id}>
          {item.title}
        </Text>
      )
    )} 
  */}

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <SafeAreaView>
        <View style={styles.header}>
            <TouchableOpacity style={{padding: 5}} onPress={()=>confirmExit()}>
              <Svg
                width={44}
                height={44}
                viewBox="0 0 44 44"
                fill="none"
              >
                <Path
                  d="M22 42c11.046 0 20-8.954 20-20S33.046 2 22 2 2 10.954 2 22s8.954 20 20 20zM26.715 17.286l-9.428 9.428M17.287 17.286l9.428 9.428"
                  stroke="#E0FE10"
                  strokeWidth={4}
                  strokeLinecap="round"
                />
              </Svg>
            </TouchableOpacity>
            <View style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
              <View style={{display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                <Svg
                  width={14}
                  height={22}
                  viewBox="0 0 14 22"
                  fill="none"
                >
                  <Path
                    d="M13.552 14.314a9.737 9.737 0 00-.847-3.076 11.82 11.82 0 00-1.61-2.57c-.184-.226-.371-.443-.468-.542l-.222-.244a2.737 2.737 0 00-.145-.156l-.066-.068a3.31 3.31 0 01-.226-.243 3.88 3.88 0 00-.099-.103c-.047-.048-.1-.102-.148-.162l-.02-.022a15.77 15.77 0 01-.87-1.036 6.912 6.912 0 01-.664-1.025 4.719 4.719 0 01-.437-1.242 7.614 7.614 0 01-.154-1.393c-.013-.46.015-.901.044-1.27.02-.244.044-.461.067-.653a.455.455 0 00-.566-.494 5.118 5.118 0 00-.658.223c-.462.188-.916.45-1.35.78a6.385 6.385 0 00-1.444 1.545 6.749 6.749 0 00-1.013 2.508 7.973 7.973 0 00.059 3.15 9.599 9.599 0 001.218 2.972c.307.49.601.899.893 1.242.086.108.325.388.328.39l.095.11c.067.076.115.133.163.191.045.054.082.098.123.142l.008.007c.454.544.774.943 1.038 1.297.292.389.55.765.785 1.152.252.412.431.773.565 1.133.151.41.251.854.297 1.322.043.412.043.874.001 1.41a13.212 13.212 0 01-.305 1.857.455.455 0 00.53.546c.214-.042.419-.097.622-.166a6.419 6.419 0 002.947-2.066 7.033 7.033 0 001.24-2.357c.293-.96.393-2.029.289-3.09zM4.647 17.098a5.396 5.396 0 00-.945-1.417l-.104-.114a1.835 1.835 0 00-.068-.074l-.029-.029a1.594 1.594 0 01-.11-.118l-.04-.04c-.022-.025-.045-.047-.064-.072a3.286 3.286 0 01-.712-.955 2.164 2.164 0 01-.2-.566 3.5 3.5 0 01-.07-.636c-.005-.195.006-.38.014-.503a.454.454 0 00-.648-.443 2.862 2.862 0 00-1.15 1.006 3.073 3.073 0 00-.462 1.144 3.64 3.64 0 00.027 1.438c.099.46.291.929.557 1.36.14.223.274.41.403.562.038.047.12.142.157.185l.04.046.076.09.05.059.008.007c.14.168.32.387.475.593.134.178.25.35.358.526a2.441 2.441 0 01.393 1.122c.02.187.02.398 0 .64a5.576 5.576 0 01-.06.462.455.455 0 00.618.498 2.927 2.927 0 001.175-.88c.25-.31.445-.682.565-1.076.132-.433.179-.934.132-1.411a4.46 4.46 0 00-.386-1.404z"
                    fill="#E0FE10"
                  />
                </Svg>
                <Text style={{
                  color: '#FFFFFF',
                  fontSize: 30,
                  fontFamily: 'BoldItalic',
                }}>
                  47
                </Text>
              </View>
              <Text style={{
                color: '#FFFFFF',
                fontSize: 25,
                fontFamily: 'LightItalic',
              }}>
                KCAL BURNED
              </Text>
            </View>
        </View>
        <Image source={require('../../../assets/images/app/workoutImg.png')} style={styles.image}/>
      </SafeAreaView>
      <View style={styles.playerBottom}>
        {/* COMPLETED */}
        <View style={{
          alignSelf:'flex-start',
          display: 'flex',
          flexDirection:'column'
        }}>
          <Text style={{
            color: '#06070A',
            fontSize: 15,
            fontFamily: 'Regular',
          }}>
            COMPLETED
          </Text>
          <Text style={{
            color: '#06070A',
            fontSize: 40,
            fontFamily: 'BoldItalic',
          }}>
            13%
          </Text>
        </View>

        {/* PLAYER BTN */}
        <View style={styles.player}>
          {/* PREV. */}
          <TouchableOpacity>
            <Svg
              width={18}
              height={21}
              viewBox="0 0 18 21"
              fill="none"
            >
              <Path
                d="M.5 11.366a1 1 0 010-1.732L16.25.541a1 1 0 011.5.866v18.186a1 1 0 01-1.5.866L.5 11.366z"
                fill="#000"
                fillOpacity={0.4}
              />
            </Svg>
          </TouchableOpacity>

          {/* PAUSE & PLAY */}
          <TouchableOpacity>
            <Svg
              width={71}
              height={71}
              viewBox="0 0 71 71"
              fill="none"
            >
              <Circle cx={35.5} cy={35.5} r={35.5} fill="#06070A" />
              <Path
                d="M30 26v19M41 26v19"
                stroke="#E0FE10"
                strokeWidth={3}
                strokeLinecap="round"
              />
            </Svg>
          </TouchableOpacity>

          {/* NEXT */}
          <TouchableOpacity>
            <Svg
              width={18}
              height={21}
              viewBox="0 0 18 21"
              fill="none"
            >
              <Path
                d="M17.5 9.634a1 1 0 010 1.732L1.75 20.459a1 1 0 01-1.5-.866V1.407A1 1 0 011.75.54L17.5 9.634z"
                fill="#000"
              />
            </Svg>
          </TouchableOpacity>
        </View>

        {/* PROGRESS */}
        <View style={styles.progressView}>
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{color: '#06070A', fontSize: 15, fontFamily: 'Regular'}}>
              03:47
            </Text>
            <Text style={{color: '#06070A', fontSize: 15, fontFamily: 'Regular'}}>
              12:30
            </Text>
          </View>
          <Progress.Bar 
            progress={0.3} 
            width={null} 
            borderWidth={1}
            borderColor='#06070A'
            unfilledColor='#06070A'
            color='#FFFFFF'
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#06070A'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 20,
    width: Dimensions.get('window').width - 50,
  },
  playerBottom: {
    position: 'absolute',
    bottom: '5%',
    backgroundColor: '#E0FE10',
    borderRadius: 20,
    gap: 6,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    width: Dimensions.get('window').width - 50,
  },
  player: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '75%',
  },
  progressView: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    width: '100%',
  },
  image: {
    width: Dimensions.get('window').width - 50,
    height: '45%',
    marginTop: '10%',
    borderRadius: 20,
  }
})