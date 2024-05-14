import { BarChart } from "react-native-gifted-charts";
import { Alert, Dimensions, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Tabs from '../../components/Tabs'
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import HeaderText from '../../components/HeaderText';
import { StatusBar } from 'expo-status-bar';
import BellAlertIcon from '../../../assets/svg/BellAlertIcon';
import * as Haptics from 'expo-haptics';
import CalBurnIcon from '../../../assets/svg/CalBurnIcon';
import SpendTimIcon from '../../../assets/svg/SpendTimIcon';
import TotalTrainIcon from '../../../assets/svg/TotalTrainIcon';
import StillDayIcon from "../../../assets/svg/StillDayIcon";
import JustArrow from "../../../assets/svg/JustArrow";
import { useNavigation } from "@react-navigation/native";
import RecentActiv from "../../components/RecentActiv";
import RunningIcon from "../../../assets/svg/SportIcon/RunningIcon";
import SwimmingIcon from "../../../assets/svg/SportIcon/SwimmingIcon";
import GymIcon from "../../../assets/svg/SportIcon/GymIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

SplashScreen.preventAutoHideAsync();

export default function Stat() {
  const unActiveColor = '#4F4F4F'
  const activeColor = '#DFFD10'
  const futureColor = 'white'
  let barData = [
    { value: 250, label: 'Mon', fontColor: unActiveColor },
    { value: 500, label: 'Tue', fontColor: unActiveColor },
    { value: 745, label: 'Wed', fontColor: unActiveColor },
    { value: 320, label: 'Thu', fontColor: activeColor },
    { value: 50, label: 'Fri', fontColor: futureColor },
    { value: 50, label: 'Sat', fontColor: futureColor },
    { value: 50, label: 'Sun', fontColor: futureColor }
  ];
  
  const [chartData, setChartData] = useState(barData)
  const [activeToday, setActiveToday] = useState('Today')
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
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  
  const [latTrain, setLatTrain] = useState([])
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
      return data;
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      return null;
    }
  }
  
  const createLatestTrain = (user) => {
    if(user){
      const reformattedData = user.map(item => ({
        id: item.id,
        trainingDate: item.trainingDate,
        trainingTime: item.trainingTime,
        exerciseCategory: item.exercise.exerciseCategory,
        exerciseDuration: item.exercise.exerciseDuration,
        exerciseImage: item.exercise.exerciseImage,
        exerciseKcal: item.exercise.exerciseKcal,
        exerciseSelected: item.exercise.exerciseSelected,
        exerciseTitle: item.exercise.exerciseTitle
      }));
      setLatTrain(reformattedData)
    }
  }   
  
  const filterDataByPeriod = (data, period) => {
    const currentDate = new Date();
    switch(period) {
      case 'Today':
        return data.filter(item => {
          return  moment(item.trainingDate, "ddd MMM DD HH:mm:ss zzz YYYY").format('ddd MMM DD YYYY') === currentDate.toDateString();
        });
      case 'Weekly':
        const oneWeekAgo = new Date(currentDate.getTime() - 6 * 24 * 60 * 60 * 1000);
        return data.filter(item => {
          const options = {
            weekday: 'short',
            month: 'short',
            day: '2-digit',
            year: 'numeric'
          };
          const startOfWeek = moment().startOf('week');
          const formattedDateString = new Intl.DateTimeFormat('en-US', options).format(oneWeekAgo);
          return data.filter(item => {
            return moment(item.trainingDate, "ddd MMM DD HH:mm:ss zzz YYYY").isSameOrAfter(startOfWeek);
          });
        });
      case 'Monthly':
        const oneMonthAgo = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
        return data.filter(item => {
          return moment(item.trainingDate, "ddd MMM DD HH:mm:ss zzz YYYY").format('ddd MMM DD YYYY') >= moment(oneMonthAgo).format('ddd MMM DD YYYY');
        });
      case 'All time':
        return data;
      default:
        return [];
    }
  }
  const formatHourCal = (type,data) => {
    if(type=='cal'){
      let total = 0
      if(data){
        for (let index = 0; index < data.length; index++) {
          total+=data[index].exercise.exerciseKcal
        }
      }
      return total
    }
    if(type=='count'){
      return data&& data.length
    }
    if(type=='hour'){
      let total = 0
      if(data){
        for (let index = 0; index < data.length; index++) {
          total+=data[index].exercise.exerciseDuration
        }
      }
      return total/60>= 0.1 ? (total/60).toFixed(1):(total/60).toFixed(0)
    }
  }
  const filteredData = userInfo.latestTrainings ? filterDataByPeriod(userInfo.latestTrainings, activeToday) : [];
  
  const totalCalories = formatHourCal('cal', filteredData);
  const totalHours = formatHourCal('hour', filteredData);
  const totalTrainings = formatHourCal('count', filteredData);
  const onRefresh = async () => {
    setRefreshing(true);
    const userData = await getUser();
    if (userData) {
      setUserInfo(userData);
      const filteredData = filterDataByPeriod(userData.latestTrainings, activeToday);
      createLatestTrain(filteredData);
    }
    setRefreshing(false);
  };
  const [countTask, setCountTask] = useState(0)
  const getTodayTasks = () => {
    if(userInfo.userCalendar){
      let countst = 0
      for (const iterator of userInfo.userCalendar) {
        const exerDate = moment(iterator.calendarDate, "DD MMM").format('DD MMM');
        const currentDate = new Date();
        const nowDate = moment(currentDate).format('DD MMM');
        if(exerDate==nowDate ){
          if(iterator.completed == false) countst+=1
        }
      }
    setCountTask(countst)
    }
  }
  
  useEffect(() => {
    const fetchData = async () => {
      setRefreshing(true); 
      const userData = await getUser();
      if (userData) {
        setUserInfo(userData);
        const filteredData = filterDataByPeriod(userData.latestTrainings, activeToday);
        createLatestTrain(filteredData);
        getTodayTasks(); 
      }
      setRefreshing(false);
    };
    fetchData();
  }, []);
  
  useEffect(()=>{
    onRefresh()
    getTodayTasks(); 
  },[activeToday])
  useEffect(()=> {
    if(userInfo){
      getTodayTasks(); 
    }
  },[userInfo])
  
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <SafeAreaView >
        <ScrollView refreshControl={<RefreshControl tintColor={'#E0FE10'} refreshing={refreshing} onRefresh={onRefresh}/>} showsVerticalScrollIndicator={false}>
          <View style={styles.header_search}>
            {/* <HeaderText first="Statistics" second={<BellAlertIcon/>} /> */}
            <HeaderText first="Statistics" second={null} />
          </View>
 
          <View style={styles.divtasks}>
            <TouchableOpacity onPress={()=>{setActiveToday('Today'), Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}} style={activeToday==='Today'?{
              backgroundColor: '#FFFFFF',
              borderColor: '#272727',
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 15,
              paddingVertical: 10,
            }:{
              backgroundColor: '#1E1E1E',
              borderColor: '#272727',
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 15,
              paddingVertical: 10,}}>
              <Text style={activeToday==='Today'?{ color: '#1E1E1E', fontFamily: 'Light', fontSize: 14 }:{color: '#FFFFFF', fontFamily: 'Light', fontSize: 14}}>Today</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{setActiveToday('Weekly'),Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}} style={activeToday==='Weekly'?{
              backgroundColor: '#FFFFFF',
              borderColor: '#272727',
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 15,
              paddingVertical: 10,
            }:{
              backgroundColor: '#1E1E1E',
              borderColor: '#272727',
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 15,
              paddingVertical: 10,}}>
              <Text style={activeToday==='Weekly'?{ color: '#1E1E1E', fontFamily: 'Light', fontSize: 14 }:{color: '#FFFFFF', fontFamily: 'Light', fontSize: 14}}>Weekly</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{setActiveToday('Monthly'),Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}} style={activeToday==='Monthly'?{
              backgroundColor: '#FFFFFF',
              borderColor: '#272727',
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 15,
              paddingVertical: 10,
            }:{
              backgroundColor: '#1E1E1E',
              borderColor: '#272727',
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 15,
              paddingVertical: 10,}}>
              <Text style={activeToday==='Monthly'?{ color: '#1E1E1E', fontFamily: 'Light', fontSize: 14 }:{color: '#FFFFFF', fontFamily: 'Light', fontSize: 14}}>Monthly</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{setActiveToday('All time'), Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}} style={activeToday==='All time'?{
              backgroundColor: '#FFFFFF',
              borderColor: '#272727',
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 15,
              paddingVertical: 10,
            }:{
              backgroundColor: '#1E1E1E',
              borderColor: '#272727',
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 15,
              paddingVertical: 10,}}>
              <Text style={activeToday==='All time'?{ color: '#1E1E1E', fontFamily: 'Light', fontSize: 14 }:{color: '#FFFFFF', fontFamily: 'Light', fontSize: 14}}>All Time</Text>
            </TouchableOpacity>
          </View>
 
          <View style={styles.statDiv}>
            <View style={{backgroundColor: '#17181B',width: '32%', aspectRatio: 1/1, justifyContent:'center', borderRadius: 10,alignItems:'center', gap: 12}}>
              <CalBurnIcon />
              <View style={{alignItems:'center', gap: 5}}>
                <Text style={{
                  fontFamily: 'Bold',
                  fontSize: 20,
                  color: 'white',
                }}>
                  {totalCalories}
                </Text>
                <Text style={{
                  fontFamily: 'Light',
                  fontSize: 12,
                  color: 'rgba(255, 255, 255, 0.5)',
                }}>
                  CAL BURN
                </Text>
              </View>
            </View>

            <View style={{backgroundColor: '#17181B', width: '32%',aspectRatio: 1/1, justifyContent:'center', borderRadius: 10,alignItems:'center', gap: 12}}>
              <SpendTimIcon/>
              <View style={{alignItems:'center', gap: 5}}>
                <Text style={{
                  fontFamily: 'Bold',
                  fontSize: 20,
                  color: 'white',
                }}>
                  {totalHours}
                </Text>
                <Text style={{
                  fontFamily: 'Light',
                  fontSize: 12,
                  color: 'rgba(255, 255, 255, 0.5)',
                }}>
                  HOURS SPEND
                </Text>
              </View>
            </View>

            <View style={{backgroundColor: '#17181B',width: '32%', aspectRatio: 1/1,justifyContent:'center',borderRadius: 10,alignItems:'center', gap: 12}}>
              <TotalTrainIcon />
              <View style={{alignItems:'center', gap: 5}}>
                <Text style={{
                  fontFamily: 'Bold',
                  fontSize: 20,
                  color: 'white',
                }}>
                  {totalTrainings}
                </Text>
                <Text style={{
                  fontFamily: 'Light',
                  fontSize: 12,
                  color: 'rgba(255, 255, 255, 0.5)',
                }}>
                  TOTAL TRAINING
                </Text>
              </View>
            </View>
          </View>
 
          {/* <View style={styles.chartDiv}>
            <View style={{alignItems: 'center', width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={{
                fontFamily:'Bold',
                color: 'white',
                fontSize: 20,
              }}>
                CALORIES
              </Text>
              <View>
                <Text style={{
                  fontFamily:'Light',
                  color: 'white',
                  fontSize: 15,
                }}>
                  DAILY AVERAGE
                </Text>
                <Text style={{
                  fontFamily:'Bold',
                  color: 'white',
                  fontSize: 20,
                }}>
                  1.105 KCAL
                </Text>
              </View>
            </View>
            <View>
            <BarChart
              onPress={(item:any) => {
                Alert.alert('BarChart', JSON.stringify(item.frontColor))
              }}
              disablePress={false}
              hideYAxisText={true}
              barWidth={30}
              yAxisTextStyle={{color: 'transparent', fontFamily: 'Light', fontSize: 1}}
              xAxisLabelTextStyle={{color: 'white', fontFamily: 'Light', fontSize: 12}}
              color={'white'}
              barBorderRadius={6}
              isAnimated
              maxValue={1000}
              frontColor="#4F4F4F"
              data={barData} 
              hideRules
              initialSpacing={0}
              spacing={12}
              height={120}
              yAxisThickness={0}
              xAxisThickness={0}
            />

            </View>
          </View> */}
 
          <TouchableOpacity 
            onPress={()=>{Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),navigation.navigate("Planer") }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginTop: 7,
              width: Dimensions.get('window').width - 50,
              borderRadius: 10,
              padding: 15,
              backgroundColor: '#17181B'
            }}
          >
            <View style={{flexDirection:'row',alignItems:'center', gap:10}}>
              <StillDayIcon />
              <Text style={{
                fontFamily:'Light',
                fontSize: 14,
                color: 'white',
              }}>
                You have still {countTask} daily tasks
              </Text>
            </View>
            <JustArrow/>
            
          </TouchableOpacity>
 
          <View style={{
            display: 'flex',
            width: Dimensions.get('window').width - 50,
            flexDirection:'row',
            alignItems:'center',
            marginTop: 15,
            marginBottom: 15,
            justifyContent:'space-between',
          }}>
            <Text style={{
              fontFamily:'Regular',
              fontSize: 20,
              color: 'white',
            }}>
              Recent Activities
            </Text>
            <TouchableOpacity style={{padding: 15,paddingRight: 0}}>
              <Text style={{
              fontFamily:'Regular',
              fontSize: 12,
              color: 'transparent',
            }}>
              View All
            </Text>
            </TouchableOpacity>
          </View>
          <View style={{
            flexDirection: 'column',
            width: Dimensions.get('window').width - 50,
            gap: 10,
            marginBottom: 70,
          }}>
            {
              latTrain?.map((item,index)=> (
                <RecentActiv index={index} icon={item.exerciseImage} title={item.exerciseTitle} kcal={item.exerciseKcal} min={item.exerciseDuration} time={item.trainingDate}/>              
              ))
            }
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    width: Dimensions.get('window').width - 50,
  },
  statDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    width: Dimensions.get('window').width - 50,
  },
  chartDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 7,
    width: Dimensions.get('window').width - 50,
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#17181B'
  }
})