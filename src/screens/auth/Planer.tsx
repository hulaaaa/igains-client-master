import * as Haptics from 'expo-haptics';
import { SwipeListView } from 'react-native-swipe-list-view';
import moment from 'moment';
import { Alert, Dimensions, Modal, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
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
  const onRefresh = () => {
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
  console.log(calendarData);
  
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
  const [listData, setListData] = useState([
      {
        timeStart: '10:00',
        titleSession: 'Cardio Session',
        setQ: 2,
        timeAll: 30,
        breakTime: 10
      },
      {
        timeStart: '13:45',
        titleSession: 'Swimming',
        setQ: 1,
        timeAll: 40,
        breakTime: 5
      },
      {
        timeStart: '17:38',
        titleSession: 'Running',
        setQ: 1,
        timeAll: 35,
        breakTime: 10
      },
      {
        timeStart: '20:08',
        titleSession: 'Yoga',
        setQ: 3,
        timeAll: 85,
        breakTime: 0
      },
    ]
  );
  const closeRow = (rowMap, rowKey) => {
      if (rowMap[rowKey]) {
          rowMap[rowKey].closeRow();
      }
  };
  const deleteRow = (rowMap, rowKey) => {
      closeRow(rowMap, rowKey);
      const newData = [...listData];
      const prevIndex = listData.findIndex(item => item.key === rowKey);
      newData.splice(prevIndex, 1);
      setListData(newData);
  };
  const onRowDidOpen = rowKey => {
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    console.log('This row opened', rowKey);
  };

  const renderItem = data => (
      <TouchableHighlight
          onPress={() => console.log('You touched me')}
          style={styles.rowFront}
      >
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15
          }}>
            {/* TEXT TIME DIV */}
            <View>
              <Text style={{
                color: '#FFFFFF',
                fontFamily: 'Light',
                fontSize: 15,
              }}>
                {data.item.timeStart}
              </Text>
              <Text style={{
                color: '#FFFFFF',
                fontFamily: 'Bold',
                fontSize: 15,
              }}>
                -
              </Text>
              <Text style={{
                color: '#FFFFFF',
                fontFamily: 'Light',
                fontSize: 15,
              }}>
                {
                  // data.item.timeStart.slice(0,2)
                  parseInt(data.item.timeStart.slice(3))+data.item.timeAll<60?
                  `${data.item.timeStart.slice(0,2)}:${parseInt(data.item.timeStart.slice(3))+data.item.timeAll}`:
                  `${parseInt(data.item.timeStart.slice(0,2))+parseInt((data.item.timeAll/60).toFixed(0))}:${parseInt(data.item.timeStart.slice(3))+data.item.timeAll-60}`
                    
                }
              </Text>
            </View>

            {/* Vertical Green Line */}
            <View style={{ height: '100%', width: 1, borderRadius:5, backgroundColor: '#E0FE10' }}></View>

            {/* ACTIVE DIV */}
            <View>
              <Text style={{
                color: '#FFFFFF',
                fontFamily: 'Bold',
                fontSize: 16,
              }}>
                {data.item.titleSession}
              </Text>
              <View>
                <Text style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontFamily: 'Regular',
                  fontSize: 14,
                }}>
                  {data.item.setQ} time - {data.item.timeAll<60?`${data.item.timeAll}min`: `${(data.item.timeAll/60).toFixed(0)}h ${data.item.timeAll%60}m`}
                </Text>
                <Text style={{
                  color: '#E0FE10',
                  fontFamily: 'Light',
                  fontSize: 12,
                }}>
                  Break: {data.item.breakTime} min
                </Text>
              </View>
            </View>
            </View>

            
      </TouchableHighlight>
  );

  const navigation = useNavigation();
  const modalVisible = useStore(state => state.visibleModal);
  const setModalVisible = useStore(state => state.voidVisibleModal);

  const modalVisibleDelete = useStore(state => state.visibleModalDelete);
  const setModalVisibleDelete = useStore(state => state.voidVisibleModalDelete);

  const modalVisibleEdit = useStore(state => state.visibleModalEdit);
  const setModalVisibleEdit = useStore(state => state.voidVisibleModalEdit);

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
        <Text style={{color: 'transparent'}}>Left</Text>
        {/* DONE BTN */}
        <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={() => closeRow(rowMap, data.item.key)}
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

        {/* DELETE BTN */}
        <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnRight]}
            onPress={()=>setModalVisibleDelete(!modalVisibleDelete)}
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

        {/* EDIT BTN */}
        <TouchableOpacity
            style={[styles.backRightBtn, styles.backDelBtnRight]}
            onPress={()=>setModalVisibleEdit(!modalVisibleEdit)}
        >
            <Svg width={17} height={18} fill="none">
              <Path
                fill="#fff"
                fillOpacity={0.5}
                fillRule="evenodd"
                d="M16.115.938a2.462 2.462 0 0 0-3.576 0L11.124 2.41 4.46 9.332a.885.885 0 0 0-.222.406l-.843 3.503a.899.899 0 0 0 .222.831c.21.218.513.305.8.23l3.371-.875a.836.836 0 0 0 .392-.23l6.614-6.872 1.464-1.522a2.7 2.7 0 0 0 0-3.714l-.144-.15ZM13.73 2.177a.82.82 0 0 1 1.192 0l.145.15a.9.9 0 0 1 0 1.238l-.857.89L12.9 3.04l.83-.863Zm-2.023 2.102 1.31 1.415-5.864 6.093-1.782.463.446-1.851 5.89-6.12ZM1.686 5.573c0-.484.377-.876.842-.876h4.214c.466 0 .843-.392.843-.875 0-.484-.377-.876-.843-.876H2.528C1.132 2.946 0 4.122 0 5.573v9.631c0 1.451 1.132 2.627 2.528 2.627h9.27c1.397 0 2.53-1.176 2.53-2.627v-4.378c0-.483-.378-.875-.844-.875-.465 0-.842.392-.842.875v4.378c0 .484-.378.876-.843.876h-9.27c-.466 0-.843-.392-.843-.875V5.572Z"
                clipRule="evenodd"
              />
            </Svg>
        </TouchableOpacity>
    </View>
);
  
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
          <AddNewExercise />
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
          {/* HEADER */}
          <View style={styles.header_search}>
            <HeaderText first="Calendar" second={null} />
          </View>

          {/* HEADER PLANER */}
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

          {/* SELECT DATE */}
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

          {/* LIST PLANER ACTIVE */}
          <ScrollView style={styles.listPlaner} refreshControl={<RefreshControl tintColor={'#E0FE10'} refreshing={refreshing}onRefresh={onRefresh}/>} showsVerticalScrollIndicator={false}>
            <SwipeListView
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-164}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={0}
                onRowDidOpen={onRowDidOpen}
            />
          </ScrollView>

          {/* ADD EXER BTN */}
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
    paddingVertical: 6,
    justifyContent: 'center',
    borderRadius: 12,
    marginBottom: 5,
    height: 80,
    width: Dimensions.get('window').width - 50,
  },
  rowBack: {
    width: Dimensions.get('window').width - 50,
    alignItems: 'center',
    // backgroundColor: '#DDD',
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
    width: 50,
  },
  backRightBtnLeft: {
    backgroundColor: '#1F3D18',
    borderRadius: 12,
    borderColor: '#38692D',
    borderWidth: 1,
    padding: 12,
    right: 55,
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
    right: 110,
  }
})