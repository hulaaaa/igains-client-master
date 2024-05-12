import { Dimensions, Modal, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import Tabs from '../../components/Tabs';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import HeaderText from '../../components/HeaderText';
import SearchBar from '../../components/SearchBar';
import TasksTodayHome from '../../components/TasksTodayHome';
import FavExercises from '../../components/FavExercises';
import { StatusBar } from 'expo-status-bar';
import TrainingCourse from '../../components/TrainingCourse';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

SplashScreen.preventAutoHideAsync();


const AWARDS_TEXT = "Complete your Awards 🔥";
const FAV_EXERCISES_TEXT = "Favourite Exercises ❤️";
const TRAINING_COURSES_TEXT = "Training courses 💪🏻";

export default function Home() {
  const [allEx, setAllEx] = useState({})
  const [getUser, setGetUser] = useState({})
  const navigation = useNavigation<any>();
  const [refreshing, setRefreshing] = useState(false);
  const [firstSweat, setFirstSweat] = useState(0)
  const [initialTime, setInitialTime] = useState(0)
  const [punctuality, setPunctuality] = useState(0)
  const [inLove, setInLove] = useState(0)

  const [fontsLoaded, fontError] = useFonts({
    'Regular': require('../../../assets/fonts/regular.otf'),
    'RegularItalic': require('../../../assets/fonts/regular-italic.otf'),
    'Light': require('../../../assets/fonts/light.otf'),
    'LightItalic': require('../../../assets/fonts/light-italic.otf'),
    'Bold': require('../../../assets/fonts/bold.otf'),
    'BoldItalic': require('../../../assets/fonts/bold-italic.otf'),
  });
  
  const checkAwards = useCallback(() => {
    if(getUser.latestTrainings && getUser.userCalendar){
      // 1) First Sweat  - виконав 5 тренувань
      const finishPoint = 5
      if(getUser.latestTrainings && getUser.latestTrainings.length >= finishPoint){
        setFirstSweat(100)
      }else{
        setFirstSweat(getUser.latestTrainings.length / finishPoint * 100)
      }

      // 2) Initial time  - перша година тренувань
      let total = 0
      for (const iterator of getUser.latestTrainings) {
        total+=iterator.exercise.exerciseDuration
      }
      setInitialTime(total / 60 * 100)

      // 3) punctuality - виконав перше завдання з календаря
      for (const iterator of getUser.userCalendar) {
        if(iterator.completed){
          setPunctuality(100)
        }else{
          setPunctuality(0)
        }
      }

      // 4) in love with training - 10 улюблених
      if(getUser.favorites.length >= 10){
        setInLove(100)
      }else{
        setInLove(getUser.favorites.length / 10 * 100)
      }
    }
  }, [getUser]);
  const handleFontLoading = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  const getAllExercises = async () => {
    try {
      const url = `http://192.168.0.214:8090/exercise/getall`;
      const response = await fetch(url);
      if (!response.ok) { throw new Error('Failed to fetch exercises')}
      const data = await response.json();
      const categoriesMap = {};
      data.forEach(item => { categoriesMap[item.exerciseCategory] = item.exerciseImage });
      setAllEx(categoriesMap);
    } catch (error) {
      console.error(error);
    }
    finally{
      const token = await AsyncStorage.getItem('token')
      const email = await AsyncStorage.getItem('email')
      const url = `http://192.168.0.214:8090/api/users/get/${email}`;
      fetch(url, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(response => {
        if (!response.ok) { throw new Error('Network response was not ok') }
        return response.json();
      })
      .then(data => {
        setGetUser(data)
      })
      .then(() => {
        checkAwards(); 
      });
    }
  };
  
  const handleRefresh = () => {
    setRefreshing(true);
    getAllExercises();
    setTimeout(() => {setRefreshing(false);}, 800);
  };
  useEffect(()=>{
    getAllExercises();
    handleRefresh()
  },[])
  useEffect(()=>{
    if(getUser){
      checkAwards()
    }
  },[getUser])
  if (!fontsLoaded && !fontError) {return null;}
  
  return (
    <View style={styles.container} onLayout={handleFontLoading}>
      <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor={'#E0FE10'}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        } showsVerticalScrollIndicator={false}>
          
        <View style={styles.header_search}>
          <HeaderText first={`Hello, ${getUser.userName} 👋🏻`} second={false} />
          <SearchBar />
        </View>
          <View style={styles.divtasks}>
            <Text style={{ fontFamily: 'Regular', fontSize: 21, color: 'white', }}>{AWARDS_TEXT}</Text>
            <TasksTodayHome firstSweat={firstSweat} initialTime={initialTime} punctuality={punctuality} inLove={inLove} getUser={getUser.userAwards} />
          </View>


          <View style={styles.divtasks}>
            <Text style={{ fontFamily: 'Regular', fontSize: 21, color: 'white', }}>{FAV_EXERCISES_TEXT}</Text>
            <FavExercises />
          </View>


          {allEx && Object.keys(allEx).length > 0 && (
            <View style={styles.divtasks}>
              <Text style={{ fontFamily: 'Regular', fontSize: 21, color: 'white', }}>{TRAINING_COURSES_TEXT}</Text>
              <TrainingCourse allEx={allEx} navigation={navigation} />
            </View>
          )}

        </ScrollView>
      </SafeAreaView>
      <Tabs />
      <StatusBar style="light" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: 'center',
    backgroundColor: '#06070A'
  },
  welcome: {
    textAlign: 'center',
    fontFamily: 'Regular',
    fontSize: 30,
    color: 'white',
  },
  header_search: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 25,
    marginTop: 20,
    width: Dimensions.get('window').width - 50,
  },
  divtasks: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 15,
    marginTop: 20,
    width: Dimensions.get('window').width - 50,
  },
})