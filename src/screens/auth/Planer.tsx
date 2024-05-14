import * as Haptics from 'expo-haptics';
import { SwipeListView } from 'react-native-swipe-list-view';
import moment from 'moment';
import { Alert, Dimensions, Modal, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Tabs from '../../components/Tabs'
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Animated from 'react-native-reanimated';
import HeaderText from '../../components/HeaderText';
import { StatusBar } from 'expo-status-bar';
import GymIcon from '../../../assets/svg/SportIcon/GymIcon';
import { Path, Svg } from 'react-native-svg';
import AddNewExercise from '../../modal/Planer/AddNewExercise';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../../services/ZustandModalPassword';
import DeleteRow from '../../modal/Planer/DeleteRow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { ListItem } from '@rneui/themed';
import { Button, Icon } from '@rneui/base';


SplashScreen.preventAutoHideAsync();

export default function Planer() {
  const [fontsLoaded, fontError] = useFonts({
    'Regular': require('../../../assets/fonts/regular.otf'),
    'RegularItalic': require('../../../assets/fonts/regular-italic.otf'),
    'Light': require('../../../assets/fonts/light.otf'),
    'LightItalic': require('../../../assets/fonts/light-italic.otf'),
    'Bold': require('../../../assets/fonts/bold.otf'),
    'BoldItalic': require('../../../assets/fonts/bold-italic.otf'),
  });
  const [refreshing, setRefreshing] = useState(false);
  
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  const [user,setUser] = useState([{}]);

  const getUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const email = await AsyncStorage.getItem('email');
      const url = `http://192.168.0.214:8090/api/users/get/${email}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      const modifiedUserExer = data.userCalendar.map((item) => {
        const { exercise, ...rest } = item;
        return {
          ...rest,
          exerciseCategory: exercise.exerciseCategory,
          exerciseDuration: exercise.exerciseDuration,
          exerciseImage: exercise.exerciseImage,
          isCompleted: exercise.isCompleted,
          exerciseKcal: exercise.exerciseKcal,
          exerciseSelected: exercise.exerciseSelected,
          exerciseTitle: exercise.exerciseTitle,
          idEx: exercise.id,
          exerciseId: rest.id,
        };
      });
      setUser(modifiedUserExer);
      console.log(modifiedUserExer);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  
  const onRefresh = () => {
    getUser();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  };
  
  let calendarData = []
  let calendarDataMonth = []
  const [activeDay, setActiveDay] = useState(moment().format('DD'));
  const [selectI, setSelectI] = useState(0)
  let repeatLoop = 0
  for(let i = 0; i <= 2; i++){
    const fourMonth = moment().add(i, 'month').calendar({sameDay: 'YYYY-MM',nextDay: 'YYYY-MM',nextWeek: 'YYYY-MM',lastDay: 'YYYY-MM',lastWeek: 'YYYY-MM',sameElse: 'YYYY-MM'})
    const countDay = moment(fourMonth, "YYYY-MM").daysInMonth();
    repeatLoop=countDay+repeatLoop
  }
  for(let k = 0; k <= repeatLoop; k++){
      calendarData.push({
        date: moment().add(k, 'day').calendar({
          sameDay: 'DD',
          nextDay: 'DD',
          nextWeek: 'DD',
          lastDay: 'DD',
          lastWeek: 'DD',
          sameElse: 'DD'
        }),
        month: moment().add(k, 'day').calendar({
          sameDay: 'MMMM',
          nextDay: 'MMMM',
          nextWeek: 'MMMM',
          lastDay: 'MMMM',
          lastWeek: 'MMMM',
          sameElse: 'MMMM'
        }),
        day: moment().add(k, 'day').calendar({
          sameDay: 'ddd',
          nextDay: 'ddd',
          nextWeek: 'ddd',
          lastDay: 'ddd',
          lastWeek: 'ddd',
          sameElse: 'ddd'
        }),
      })
  }
  
  for(let j = 0; j < 3; j++){
    calendarDataMonth.push({
      month: moment().add(j, 'month').calendar({
        sameDay: 'MMMM',
        nextDay: 'MMMM',
        nextWeek: 'MMMM',
        lastDay: 'MMMM',
        lastWeek: 'MMMM',
        sameElse: 'MMMM'
      })
    })
  }
  const [selectedMonth, setSelectedMonth] = useState(calendarDataMonth[selectI].month)
  
  
  const closeRow = (rowMap, rowKey) => {
      if (rowMap[rowKey]) {
          rowMap[rowKey].closeRow();
      }
  };
  const deleteRow = (rowMap, rowKey) => {
      closeRow(rowMap, rowKey);
  };
  const onRowDidOpen = (rowKey) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  };

  // const renderItem = (data, index) => (
  //   <View>
  //     {data.item.calendarDate === `${activeDay} ${selectedMonth}` && (
  //       <View key={data.item.id} style={styles.rowFront}>
  //         <View
  //           style={{
  //             display: 'flex',
  //             flexDirection: 'row',
  //             alignItems: 'center',
  //             gap: 15,
  //           }}
  //         >
  //           <View>
  //             <Text
  //               style={{
  //                 color: '#FFFFFF',
  //                 fontFamily: 'Light',
  //                 fontSize: 15,
  //               }}
  //             >
  //               {moment(data.item.startTime, 'hm').format('HH:mm')}
  //             </Text>
  //             <Text
  //               style={{
  //                 color: '#FFFFFF',
  //                 fontFamily: 'Bold',
  //                 fontSize: 15,
  //               }}
  //             >
  //               -
  //             </Text>
  //             <Text
  //               style={{
  //                 color: '#FFFFFF',
  //                 fontFamily: 'Light',
  //                 fontSize: 15,
  //               }}
  //             >
  //               {moment(data.item.startTime, 'HH:mm')
  //                 .clone()
  //                 .add(
  //                   data.item.exerciseDuration * data.item.setQuantity +
  //                     data.item.breakDuration * (data.item.setQuantity - 1),
  //                   'minutes'
  //                 )
  //                 .format('HH:mm')}
  //             </Text>
  //           </View>
  
  //           <View
  //             style={{
  //               height: '100%',
  //               width: 1,
  //               borderRadius: 5,
  //               backgroundColor: data.item.completed === false ? '#E0FE10' : '#E03326',
  //             }}
  //           ></View>
  
  //           <View>
  //             <Text
  //               style={{
  //                 color: '#FFFFFF',
  //                 fontFamily: 'Bold',
  //                 fontSize: 16,
  //               }}
  //             >
  //               {data.item.exerciseTitle}
  //             </Text>
  //             <View>
  //               <Text
  //                 style={{
  //                   color: 'rgba(255,255,255,0.5)',
  //                   fontFamily: 'Regular',
  //                   fontSize: 14,
  //                 }}
  //               >
  //                 {data.item.setQuantity} time - {data.item.exerciseDuration} min
  //               </Text>
  //               <Text
  //                 style={{
  //                   color: '#E0FE10',
  //                   fontFamily: 'Light',
  //                   fontSize: 12,
  //                 }}
  //               >
  //                 Break: {data.item.breakDuration} min
  //               </Text>
  //             </View>
  //           </View>
  
  //           {data.item.completed === true && (
  //             <Text
  //               style={{
  //                 color: '#FFFFFF',
  //                 fontFamily: 'Light',
  //                 fontSize: 15,
  //               }}
  //             >
  //               Completed
  //             </Text>
  //           )}
  //         </View>
  //       </View>
  //     )}
  //   </View>
  // );
  

  const navigation = useNavigation();
  const modalVisible = useStore(state => state.visibleModal);
  const setModalVisible = useStore(state => state.voidVisibleModal);

  const modalVisibleDelete = useStore(state => state.visibleModalDelete);
  const setModalVisibleDelete = useStore(state => state.voidVisibleModalDelete);

  const modalVisibleEdit = useStore(state => state.visibleModalEdit);
  const setModalVisibleEdit = useStore(state => state.voidVisibleModalEdit);
  
  const updateCalendar = async (info) => {
    console.log(info);
    try {
      const token = await AsyncStorage.getItem('token');
      const email = await AsyncStorage.getItem('email');
      const dataBody = {
        calendarId: info.id,
        isCompleted: true,
      };
      const url = `http://192.168.0.214:8090/calendar/complete`;
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBody)
      };
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }else{
        Toast.show({
          type: 'success',
          visibilityTime: 4000,
          text1: 'Successful deleted your goal!',
          text2: 'Keep going!'
        });
      }
    } catch (error) {
      console.error('Error updating calendar:', error);
    }
  };
  const setOpenRow = useStore(state => state.voidOpenedRow);

  
  
  useEffect(()=>{
    getUser()
    onRefresh()
  },[])

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {
      !modalVisibleDelete?(
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={setModalVisible}
        >
          <AddNewExercise activeDay={activeDay} selectedMonth={selectedMonth} />
        </Modal>
      ):
        (<Modal
          animationType="fade"
          transparent={true}
          visible={modalVisibleDelete}
          onRequestClose={setModalVisibleDelete}
        >
          <DeleteRow />
        </Modal>)
      }
      <SafeAreaView>
        <View style={!modalVisible&&!modalVisibleDelete&&!modalVisibleEdit ?{ opacity: 1}:{ opacity: 0.15}}>
          <View style={styles.header_search}>
            <HeaderText first="Calendar" second={null} />
          </View>
 
          <View style={styles.headerPlaner}>
            <View 
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'space-between',
              width: Dimensions.get('window').width - 50,
            }}>
              {
                selectedMonth!=calendarDataMonth[0].month?(
                  <TouchableOpacity onPress={()=>{
                    if (selectI > 0) {
                      setSelectI(prev=>prev-1)
                      setActiveDay('')
                      setSelectedMonth(calendarDataMonth[selectI - 1].month)
                    }
                  }} style={{padding: 10,}}>
                    <Svg width={10} height={16} fill="none">
                      <Path
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8.5 1 1 8.5 8.5 16"
                      />
                    </Svg>
                  </TouchableOpacity>
                ):(
                  <TouchableOpacity style={{padding: 10,}}>
                    <Svg width={10} height={16} fill="none">
                      <Path
                        stroke="transparent"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8.5 1 1 8.5 8.5 16"
                      />
                    </Svg>
                  </TouchableOpacity>
                )
              }
              <Text style={{
                color: '#FFFFFF',
                fontFamily: 'Light',
                fontSize: 18,
                padding: 10,
              }}>
                {selectedMonth} 
              </Text>
              {
                selectedMonth!=calendarDataMonth[2].month?(
                  <TouchableOpacity onPress={()=>{
                    if (selectI < calendarDataMonth.length - 1) {
                      setActiveDay('')
                      setSelectI(prev=>prev+1)
                      setSelectedMonth(calendarDataMonth[selectI + 1].month)
                    }
                  }} style={{padding: 10,}}>
                    <Svg width={10} height={16} fill="none">
                      <Path
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M1.5 16 9 8.5 1.5 1"
                      />
                    </Svg>
                  </TouchableOpacity>
                ):(
                  <TouchableOpacity style={{padding: 10,}}>
                    <Svg width={10} height={16} fill="none">
                      <Path
                        stroke="transparent"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M1.5 16 9 8.5 1.5 1"
                      />
                    </Svg>
                  </TouchableOpacity>
                )
              }
              
            </View>
          </View>
 
            <View style={styles.selectDate}>
              <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ width: Dimensions.get('window').width - 50,}}>
                {
                  calendarData.filter(item=>item.month==selectedMonth).map((item, index) => (
                    <TouchableOpacity onPress={()=>{
                      setActiveDay(item.date)
                    }} key={index}>
                      <View style={activeDay!=item.date?{marginRight: 4, paddingHorizontal:15, paddingVertical:9, borderRadius: 12, backgroundColor:'#17181B',gap:5, alignItems: 'center',justifyContent:'center'}:{marginRight: 4, paddingHorizontal:15, paddingVertical:9, borderRadius: 12, backgroundColor:'#E0FE10',gap:5, alignItems: 'center',justifyContent:'center'}}>
                        <Text style={activeDay!=item.date?{
                          color: '#FFFFFF',
                          fontFamily: 'Light',
                          fontSize: 12,
                        }:{
                          color: '#17181B',
                          fontFamily: 'Light',
                          fontSize: 12,
                        }}>
                          {item.day}
                        </Text>
                        <Text style={activeDay!=item.date?{
                          color: '#FFFFFF',
                          fontFamily: 'Light',
                          fontSize: 12,
                        }:{
                          color: '#17181B',
                          fontFamily: 'Light',
                          fontSize: 15,
                        }}>
                          {item.date}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))
                }
                
                
              </ScrollView>
            </View>
 
          <ScrollView style={styles.listPlaner} refreshControl={<RefreshControl tintColor={'#E0FE10'} refreshing={refreshing} onRefresh={onRefresh}/>} showsVerticalScrollIndicator={false}>
            {/* <SwipeListView
                data={user}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-164}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={0}
                onRowDidOpen={onRowDidOpen}
            /> */}
            {

              user.filter(data => data.calendarDate === `${activeDay} ${selectedMonth}`).map((data,index)=> (
                
                <ListItem.Swipeable key={index} containerStyle={styles.rowFront}
                  leftContent={(reset) => 
                    data.completed==false&&(
                    <TouchableOpacity
                      style={[styles.backRightBtn, styles.backRightBtnLeft]}
                      onPress={() => {
                        setOpenRow(data)
                        updateCalendar(data)
                      }}
                  >
                      <Svg width={16} height={13} fill="none">
                      <Path
                        stroke="#64C747"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 7.527 4 4.21 9.5-10"
                      />
                    </Svg>
                    </TouchableOpacity>
                  )
                }
                  rightContent={(reset) => data.completed==false&&(
                    <TouchableOpacity
                      style={[styles.backRightBtn, styles.backRightBtnRight]}
                      onPress={() => {
                        setOpenRow(data);
                        setModalVisibleDelete(!modalVisibleDelete);
                      }}
                    >
                      <Svg width={19} height={20} fill="none">
                        <Path
                          stroke="#DF3525"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M1.326 5.817c5.28-2.479 11.067-2.479 16.348 0"
                        />
                        <Path
                          stroke="#DF3525"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M5.868 3.958c0-.74.383-1.45 1.064-1.972.681-.523 1.606-.817 2.569-.817.963 0 1.888.294 2.569.817.681.523 1.064 1.232 1.064 1.972M9.5 10.465v4.648M15.857 7.676l-.609 7.437a4.165 4.165 0 0 1-1.276 2.623 3.984 3.984 0 0 1-2.656 1.095H7.683a3.984 3.984 0 0 1-2.656-1.095 4.164 4.164 0 0 1-1.277-2.623l-.608-7.437"
                        />
                      </Svg>
                    </TouchableOpacity>
                  )}
                >
              <ListItem.Content>
                {/* <ListItem.Title>Hello Swiper</ListItem.Title> */}
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 15,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontFamily: 'Light',
                        fontSize: 15,
                      }}
                    >
                      {moment(data.startTime, 'hm').format('HH:mm')}
                    </Text>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontFamily: 'Bold',
                        fontSize: 15,
                      }}
                    >
                      -
                    </Text>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontFamily: 'Light',
                        fontSize: 15,
                      }}
                    >
                      {moment(data.startTime, 'HH:mm')
                        .clone()
                        .add(
                          data.exerciseDuration * data.setQuantity +
                            data.breakDuration * (data.setQuantity - 1),
                          'minutes'
                        )
                        .format('HH:mm')}
                    </Text>
                  </View>
        
                  <View
                    style={{
                      height: '100%',
                      width: 1,
                      borderRadius: 5,
                      backgroundColor: data.completed === false ? '#E0FE10' : '#E03326',
                    }}
                  ></View>
        
                  <View>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontFamily: 'Bold',
                        fontSize: 16,
                      }}
                    >
                      {data.exerciseTitle}
                    </Text>
                    <View>
                      <Text
                        style={{
                          color: 'rgba(255,255,255,0.5)',
                          fontFamily: 'Regular',
                          fontSize: 14,
                        }}
                      >
                        {data.setQuantity} time - {data.exerciseDuration} min
                      </Text>
                      <Text
                        style={{
                          color: '#E0FE10',
                          fontFamily: 'Light',
                          fontSize: 12,
                        }}
                      >
                        Break: {data.breakDuration} min
                      </Text>
                    </View>
                  </View>
                  {/* textDecorationLine: 'line-through' */}
                  {/* data.completed === true */}
                </View>
              </ListItem.Content>
            </ListItem.Swipeable>
              ))
            }
            
          </ScrollView>
 
          <TouchableOpacity onPress={()=>{setModalVisible(!modalVisible)}} style={{top: 620,position: 'absolute'}}>
            <View style={styles.botBtn}>
              <Text style={{
                color: '#17181B',
                fontFamily: 'Regular',
                fontSize: 17,
              }}>
                Add New Exercise
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Tabs/>
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
  botBtn: {
    width: Dimensions.get('window').width - 50,
    borderRadius: 12,
    backgroundColor: '#E0FE10',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerPlaner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 25,
    width: Dimensions.get('window').width - 50,
    marginTop: 25,
  },
  selectDate: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    width: Dimensions.get('window').width - 50,
  },
  listPlaner: {
    marginTop: 25,
    flex: 1,
    marginBottom: 150,
    width: Dimensions.get('window').width - 50,
  },

  backTextWhite: {
    color: 'white',
  },
  rowFront: {
    backgroundColor: '#17181B',
    alignItems: 'flex-start',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 9,
    marginBottom: 5,
    justifyContent: 'center',
    borderRadius: 12,
    
    width: Dimensions.get('window').width - 50,
  },
  rowBack: {
    width: Dimensions.get('window').width - 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 80,
    
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 110,
    marginBottom: 5,
  },
  backRightBtnLeft: {
    backgroundColor: '#1F3D18',
    borderRadius: 12,
    borderColor: '#38692D',
    borderWidth: 1,
    padding: 12,
    right: 20,
  },
  backRightBtnRight: {
    backgroundColor: '#470F0E',
    borderRadius: 12,
    borderColor: '#7B2722',
    borderWidth: 1,
    padding: 12,
    right: 0,
  },
  backDelBtnRight: {
    backgroundColor: '#17181B',
    borderRadius: 10,
    borderColor: '#27292E',
    borderWidth: 1,
    padding: 12,
    right: 60,
  }
})