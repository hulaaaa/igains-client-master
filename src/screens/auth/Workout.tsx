import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HoldToCallButton } from "react-native-hold-to-call-button";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View,Dimensions, Image } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useStore } from '../../services/ZustandModalPassword';
import { useNavigation } from '@react-navigation/native';
import { Circle, Path, Svg } from 'react-native-svg';
import { Alert } from 'react-native';
import * as Progress from 'react-native-progress';
import CircularProgress from 'react-native-circular-progress-indicator';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [lastExerciseFinished, setLastExerciseFinished] = useState(false);

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
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [exerciseResults, setExerciseResults] = useState([]);

  const [totalTime, setTotalTime] = useState(0);
  const [precentTime, setPrecentTime] = useState(0);
  const [timeNow, setTimeNow] = useState(0);
  const [finishKcal, setFinishKcal] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const timerRef = useRef(null);
  const [currentKcal, setCurrentKcal] = useState(0);

  const [caloriesPerSecond, setCaloriesPerSecond] = useState(0);

  const preStartFn = (intt) => {
    const selectedWorkout = selectedWorkouts[intt];
    setTotalTime(Number(selectedWorkout.exerciseDuration * 60));
    setFinishKcal(Number(selectedWorkout.exerciseKcal));
    setTimeNow(0); 
    setPrecentTime(0);  
    setIsPlay(false);  
    clearInterval(timerRef.current);  
  
    const caloriesPerSecond = Number(selectedWorkout.exerciseKcal) / (Number(selectedWorkout.exerciseDuration) * 60);
    setCaloriesPerSecond(caloriesPerSecond);
  }
  
  

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeNow(prevTime => {
        const newTime = prevTime + 1;
        if (newTime >= totalTime) {
          clearInterval(timerRef.current);
          setTimeNow(0);
          setPrecentTime(100);
          setCurrentKcal(prevKcal => {
            const newKcal = prevKcal + caloriesPerSecond;
            return newKcal;
          });
          nextExercise()
          return 0;
        }
        setPrecentTime(Math.floor((newTime / totalTime) * 100));
        return newTime;
      });
      setCurrentKcal(prevKcal => prevKcal + caloriesPerSecond);
    }, 1000);
  };
  
  
  
  const playBtnHndl = () => {
    setIsPlay(!isPlay);
    if (!isPlay) {
      startTimer();
    } else {
      clearInterval(timerRef.current);
    }
  };
  
  const nextExercise = () => { 
    completeExercise();
   
    if (currentExerciseIndex < selectedWorkouts.length - 1) {
      const nextIndex = currentExerciseIndex + 1;
      setCurrentExerciseIndex(nextIndex);
      preStartFn(nextIndex);
    } else { 
      setLastExerciseFinished(true);  
      setCompletedExercises([]);
      setExerciseResults([]);
    }
  };
  
  
  

  const completeExercise = () => {
    const currentExercise = selectedWorkouts[currentExerciseIndex]; 
    const isDuplicate = completedExercises.some(exercise => exercise.id === currentExercise.id);
    if (!isDuplicate) {
      const exerciseData = {
        id: currentExercise.id,
        name: currentExercise.exerciseTitle,
        time: timeNow,
        caloriesBurned: currentKcal.toFixed(1)
      };
      setCompletedExercises(prevExercises => [...prevExercises, exerciseData]);
    }
  };


  useEffect(() => {
    
    preStartFn(0);
    return () => {
      clearInterval(timerRef.current);
    };
  }, [])

  useEffect(() => {
    if (totalTime > 0) {
      const caloriesPerSecond = finishKcal / (totalTime * 60); 
      const interval = setInterval(() => {
        setCurrentKcal(prevKcal => prevKcal + caloriesPerSecond);
      }, 1000);
  
      return () => clearInterval(interval);
    }
  }, [totalTime, finishKcal]);
  useEffect(() => {
    if (currentExerciseIndex === selectedWorkouts.length - 1 && precentTime >= 99) {
      setLastExerciseFinished(true);
    } else {
      setLastExerciseFinished(false);
    }
  }, [currentExerciseIndex, precentTime, selectedWorkouts.length]);
  useEffect(() => {
    setExerciseResults(completedExercises);
  }, [completedExercises, currentExerciseIndex]);
  const [userInfo, setUserInfo] = useState([])
  async function getUser() {
    try {
      const token = await AsyncStorage.getItem('token');
      const email = await AsyncStorage.getItem('email');
      const url = `http://192.168.0.214:8090/api/users/get/${email}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUserInfo(data)
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      return null;
    }
  }
  
  const stopButtonPress = async() => {
    const token = await AsyncStorage.getItem('token');
    const email = await AsyncStorage.getItem('email');
    const url = `http://192.168.0.214:8090/training/add`;
    console.log("Selected exercises:");
    console.log(selectedWorkouts);
    for (const iterator of selectedWorkouts) {
      console.log(iterator.id);
      
       fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'exerciseId': iterator.id,
        'email': email,
      }),
    })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        Toast.show({
          type: 'success',
          visibilityTime: 4000,
          text1: `Wonderfull training!`,
          text2: `Let's train! 🏋️‍♂️`,
        });
        navigation.navigate('Home')
        return response.text();
      })
      .catch(err => {
        console.error(err);
      });
    }
   
  };
  
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
                  {currentKcal.toFixed(0)}
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
        <Image source={{uri: selectedWorkouts[currentExerciseIndex].exerciseImage}} style={styles.image}/>
      </SafeAreaView>
      <View style={styles.playerBottom}> 
        <View style={{
          display: 'flex',
          flexDirection:'row',
          width: '100%',
          justifyContent:'space-between',
        }}>
          <View style={{
            display: 'flex',
            flexDirection:'column',
            gap: 5
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
            {precentTime}%
          </Text>
          </View>
          
          <View style={{
            display: 'flex',
            alignItems:'flex-end',
            flexDirection:'column',
            gap: 5
          }}>
            <Text style={{
            color: '#06070A',
            fontSize: 15,
            fontFamily: 'Regular',
          }}>
            {selectedWorkouts[currentExerciseIndex].exerciseTitle}
          </Text>
          <Text style={{
            color: '#06070A',
            fontSize: 15,
            fontFamily: 'Bold',
          }}>
            {currentExerciseIndex+1}/{selectedWorkouts.length}
          </Text>
          </View>
        </View>
 
        <View style={styles.player}> 
            <TouchableOpacity style={{padding: 5}} >
              <Svg xmlns="http://www.w3.org/2000/svg" width={18} height={21}>
                <Path fill="transparent" fillRule="evenodd" d="M0 0h48v1H0z" />
              </Svg>
            </TouchableOpacity>
          
            {
            lastExerciseFinished && precentTime === 100  ? (
              <TouchableOpacity onPress={stopButtonPress}>
                <Text style={{ color: '#E03326', fontSize: 20, fontFamily: 'Bold' }}>Stop & Save</Text>
              </TouchableOpacity>
            ):(
              <TouchableOpacity onPress={playBtnHndl}>
                {
                    isPlay?(
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
                  ): (
                    <Svg width={71} height={71} fill="none">
                      <Circle cx={35.5} cy={35.5} r={35.5} fill="#06070A" />
                      <Path
                        fill="#E0FE10"
                        d="M46.5 34.634a1 1 0 0 1 0 1.732l-15.75 9.093a1 1 0 0 1-1.5-.866V26.407a1 1 0 0 1 1.5-.866l15.75 9.093Z"
                      />
                    </Svg>
                  )
                  
                }
              </TouchableOpacity>
            )
          }
          
 
            <TouchableOpacity style={{padding: 5}} >
              <Svg xmlns="http://www.w3.org/2000/svg" width={18} height={21}>
                <Path fill="transparent" fillRule="evenodd" d="M0 0h48v1H0z" />
              </Svg>
            </TouchableOpacity>
        </View>
 
        <View style={styles.progressView}>
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{color: '#06070A', fontSize: 15, fontFamily: 'Regular'}}>
            {formatTime(timeNow)}
            </Text>
            <Text style={{color: '#06070A', fontSize: 15, fontFamily: 'Regular'}}>
            {formatTime(totalTime)}
            </Text>
          </View>
          <Progress.Bar 
            progress={precentTime/100} 
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
