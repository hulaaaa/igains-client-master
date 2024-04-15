import { Dimensions, Modal, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState, useCallback } from 'react';
import Tabs from '../../components/Tabs';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import HeaderText from '../../components/HeaderText';
import SearchBar from '../../components/SearchBar';
import TasksTodayHome from '../../components/TasksTodayHome';
import FavExercises from '../../components/FavExercises';
import { StatusBar } from 'expo-status-bar';
import TrainingCourse from '../../components/TrainingCourse';

SplashScreen.preventAutoHideAsync();


export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
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
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  }
  
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor={'#E0FE10'}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        } showsVerticalScrollIndicator={false}>
        {/* HEADER and SEARCH BAR */}
        <View style={styles.header_search}>
          <HeaderText first="Hello, Dmytro 👋🏻" second={false} />
          <SearchBar />
        </View>
          {/* TASKS for TODAY */}
          <View style={styles.divtasks}>
            <Text style={{ fontFamily: 'Regular', fontSize: 21, color: 'white', }}>Complete your Awards 🔥</Text>
            <TasksTodayHome />
          </View>

          {/* FAVORITE EXERCISES */}
          <View style={styles.divtasks}>
            <Text style={{ fontFamily: 'Regular', fontSize: 21, color: 'white', }}>Favourite Exercises ❤️</Text>
            <FavExercises />
          </View>

          {/* TRAINING COURSES */}
          <View style={styles.divtasks}>
            <Text style={{ fontFamily: 'Regular', fontSize: 21, color: 'white', }}>Training courses 💪🏻</Text>
            <TrainingCourse/>
          </View>

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