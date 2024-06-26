import { Dimensions, Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Tabs from '../../components/Tabs'
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ProgressBar } from 'react-native-paper';
import HeaderText from '../../components/HeaderText';
import { StatusBar } from 'expo-status-bar';
import DotThreeIcon from '../../../assets/svg/DotThreeIcon';
import GhostIcon from '../../../assets/svg/GhostIcon';
import SniperIcon from '../../../assets/svg/SniperIcon';
import ShinyStartIcon from '../../../assets/svg/ShinyStartIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Circle, Path, Svg } from 'react-native-svg';
import moment from 'moment';


SplashScreen.preventAutoHideAsync();


export default function Profile({route}) {
  const navigation = useNavigation()
  const { handleLogout } = route.params;
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

  const [test,setTest] = useState({})
  const [progress,setProgress] = useState(0)

  async function updateData() {
    const token = await AsyncStorage.getItem('token');
    const email = await AsyncStorage.getItem('email');
    const url = `http://192.168.0.214:8090/api/users/get/${email}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTest(data);
        getWeeklyProgress(data);
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
  }

  const getWeeklyProgress = (data) => {
    if (data.userCalendar && data.userCalendar.length > 0) {
      let allGoal = 0;
      let completedGoal = 0;
      for (const iterator of data.userCalendar) {
        const currentDate = new Date();
        const nowDate = moment(currentDate).format('DD MMM');
        const exerDate = moment(iterator.calendarDate, "DD MMM").format('DD MMM');
        if (nowDate == exerDate) {
          allGoal += 1;
          if (iterator.completed) {
            completedGoal += 1;
          }
        }
      }
      const weeklyProgress = completedGoal / allGoal * 100;
      if (weeklyProgress >= 0 && weeklyProgress <= 100) {
        setProgress(weeklyProgress.toFixed(0));
      } else {
        setProgress(0);
      }
    } else {
      setProgress(0);
    }
  }
  
  
  let awards_user = [ 
    {
      name: 'First Sweat',
      description: 'You completed 5 exercises!',
      img: <ShinyStartIcon/>,
      achieved: test.latestTrainings && test.latestTrainings.length >= 5
    },
    { 
      name: 'Initial Time',
      description: 'You reached First Hour',
      img: <SniperIcon/>,
      achieved: test.totalMinutes && test.totalMinutes >= 60
    },
    {
      name: 'Punctuality',
      description: 'You completed first Goal!',
      img: <GhostIcon/>,
      achieved: test.userCalendar && test.userCalendar.some(item => item.completed)
    },
    {
      name: 'In love on Training',
      description: 'You added 10 favorites!',
      img: (
        <Svg xmlns="http://www.w3.org/2000/svg" width={30} height={28} fill="none">
          <Path
            fill="#E03326"
            d="M2.722 2.428A8.787 8.787 0 0 0 2.573 15L15 27.427 27.427 15A8.787 8.787 0 0 0 15 2.573a8.787 8.787 0 0 0-12.278-.145Z"
          />
        </Svg>
      ),
      achieved: test.favorites && test.favorites.length >= 10
    }
  ]
  
  useEffect(() => {
    updateData();
  }, []);
  
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      updateData();
      setRefreshing(false);
    }, 800);
  };

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <SafeAreaView > 
        <View style={styles.header_search}>          
          <HeaderText first="Profile" second={null} />
          {/* <HeaderText first="Profile" second={<DotThreeIcon/>} /> */}
        </View>
        <ScrollView 
        refreshControl={
          <RefreshControl
            tintColor={'#E0FE10'}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        } 
        showsVerticalScrollIndicator={false}> 
          <View style={styles.divtasks}> 
            <View style={styles.divImage}>
              <Svg xmlns="http://www.w3.org/2000/svg" fill="none">
                <Circle cx={42.5} cy={42.5} r={42.15} stroke="#fff" strokeWidth={0.7} />
                <Path
                  fill="#E0FE10"
                  d="M42.5 47.639c-12.169 0-18.5 7.194-18.5 11.305V61h37v-2.056c0-4.11-6.331-11.305-18.5-11.305ZM42.5 44.556c5.677 0 10.278-4.602 10.278-10.278S48.177 24 42.5 24c-5.676 0-10.277 4.602-10.277 10.278S36.824 44.556 42.5 44.556Z"
                />
              </Svg>
            </View> 
            <View style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
            }}>
              <Text style={{
                fontFamily: 'Regular',
                fontSize: 20,
                color: 'white'
              }}>
                  {test && test.userName}
              </Text>
              <Text style={{
                fontFamily: 'Light',
                fontSize: 12,
                color: 'rgba(255, 255, 255, 0.5)',
              }}>
                 {test && test.email}
              </Text>
            </View>
          </View>
 
          <View style={styles.divtasks}>
            <View style={styles.bodyDiv}>
              <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3}}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
                  <Text style={{
                    fontFamily: 'Regular',
                    fontSize: 18,
                    color: 'white'
                  }}>
                    {test.weight}
                  </Text>
                  <Text style={{
                    fontFamily: 'Light',
                    fontSize: 18,
                    color: 'white'
                  }}>
                    kg
                  </Text>
                </View>
                <Text style={{
                  fontFamily: 'Light',
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.5)'
                }}>
                  Weight
                </Text>

              </View>
              <View style={{width: 2, height: 30, backgroundColor: '#15181B'}}/>

              <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3}}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
                  <Text style={{
                    fontFamily: 'Regular',
                    fontSize: 18,
                    color: 'white'
                  }}>
                     {test.height}
                  </Text>
                  <Text style={{
                    fontFamily: 'Light',
                    fontSize: 18,
                    color: 'white'
                  }}>
                    cm
                  </Text>
                </View>
                <Text style={{
                  fontFamily: 'Light',
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.5)'
                }}>
                  Height
                </Text>

              </View>
              <View style={{width: 2, height: 30, backgroundColor: '#15181B'}}/>

              <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3}}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
                  <Text style={{
                    fontFamily: 'Regular',
                    fontSize: 18,
                    color: 'white'
                  }}>
                    {test.age}
                  </Text>
                  <Text style={{
                    fontFamily: 'Light',
                    fontSize: 18,
                    color: 'white'
                  }}>
                    y.o.
                  </Text>
                </View>
                <Text style={{
                  fontFamily: 'Light',
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.5)'
                }}>
                  Age
                </Text>

              </View>
            </View>
            <View style={{width: '100%', marginTop: 10, height: 2, backgroundColor: '#15181B'}}/>
          </View>
         
          <View style={styles.divtasks}>
            <Text style={{alignSelf: 'flex-start', fontFamily:'Regular', color: 'white', fontSize: 20}}>Weekly Progress</Text>
            <View style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <ProgressBar 
              progress={progress/100} 
              color={'#E0FE10'} 
              fillStyle={{borderRadius: 20}}
              style={{
                height: 15, 
                backgroundColor: '#17181B',
                borderRadius: 10, 
                width: Dimensions.get('window').width - 50
              }}/>
              <Text style={progress/100<=0.5?{fontFamily:'Regular',fontSize:12, position: 'absolute', color:'white'}:{fontFamily:'Regular',fontSize:12, position: 'absolute', color:'#17181B'}}>{progress}%</Text>
            </View>
          </View>
 
          <View style={styles.divtasks}>
            <Text style={{ alignSelf: 'flex-start', fontFamily: 'Regular', color: 'white', fontSize: 20 }}>
              My Awards
            </Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row'
            }}>
              {awards_user && awards_user.length > 0 && awards_user.map((item, index) => (
                <View key={index} style={{ backgroundColor: item.achieved ? '#17181B' : '#A11010', marginRight: 10, flexDirection: 'column', alignItems: 'center', gap: 9, borderRadius: 10, width: 107, padding: 12, }}>
                  {item.img}
                  <Text style={{ fontFamily: 'Regular', color: 'white', fontSize: 16 }}>{item.name}</Text>
                  <Text style={{ fontFamily: 'Regular', textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{item.description}</Text>
                  {!item.achieved && <Text style={{ fontFamily: 'Regular', color: 'white', fontSize: 12 }}>Not achieved yet</Text>}
                </View>
              ))}
            </ScrollView>

          </View>


 
          <View style={styles.divtasks}>
            <Text style={{alignSelf: 'flex-start', marginTop: 10, fontFamily:'Regular', color: 'white', fontSize: 20}}>
            Settings
            </Text>
            <View style={{
              width: '100%',
              marginBottom: 70,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <TouchableOpacity onPress={()=>{navigation.navigate('ChangesInfo')}} style={{
                width: '100%',
                borderBottomColor: '#17181B',
                borderBottomWidth: 1,
                padding: 13,
                borderTopColor: '#17181B',
                borderTopWidth: 1
              }}>
                <Text style={{
                  fontFamily: 'Regular',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: 16
                }}>
                  Edit information your body
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout} style={{
                width: '100%',
                borderBottomColor: '#17181B',
                borderBottomWidth: 1,
                padding: 13,
                borderTopColor: '#17181B',
                borderTopWidth: 1
              }}>
                <Text style={{
                  fontFamily: 'Regular',
                  color: '#E03326',
                  fontSize: 16
                }}>
                  Logout from profile
                </Text>
              </TouchableOpacity>
            </View>
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
    flexDirection: 'column',
    alignItems: 'center',
    gap: 15,
    marginTop: 20,
    width: Dimensions.get('window').width - 50,
  },
  divImage: {
    width: '30%',
    aspectRatio: 1/1,
  },
  bodyDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    justifyContent: 'space-between',
  }
})
