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
  const [fontsLoaded, fontError] = useFonts({
    'Regular': require('../../../assets/fonts/regular.otf'),
    'RegularItalic': require('../../../assets/fonts/regular-italic.otf'),
    'Light': require('../../../assets/fonts/light.otf'),
    'LightItalic': require('../../../assets/fonts/light-italic.otf'),
    'Bold': require('../../../assets/fonts/bold.otf'),
    'BoldItalic': require('../../../assets/fonts/bold-italic.otf'),
  });
 
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
    }
  };
  useEffect(()=>{handleRefresh()},[])
  const handleRefresh = () => {
    setRefreshing(true);
    getAllExercises();
    setTimeout(() => {setRefreshing(false);}, 800);
  };

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
            <TasksTodayHome getUser={getUser.userAwards} />
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