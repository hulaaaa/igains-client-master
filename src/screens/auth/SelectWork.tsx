import { Alert, Dimensions, Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Path, Svg } from 'react-native-svg';
SplashScreen.preventAutoHideAsync();
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../../services/ZustandModalPassword';
import { Workout } from '../../services/ZustandModalPassword'; 

export default function SelectWork() {
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
  const navigation = useNavigation<any>();
  const workout = [
    {
      id: 0,
      title: "Running",
      image: { uri: "https://firebasestorage.googleapis.com/v0/b/i-gains.appspot.com/o/Image%20Home%20Screen%2F1.png?alt=media&token=3dacd2f4-6fb4-4bcb-9879-f3c823f0c03c" },
      min: 15,
      kcal: 70,
      select: false,
    },
    {
      id: 1,
      title: "Swimming",
      image: { uri: "https://firebasestorage.googleapis.com/v0/b/i-gains.appspot.com/o/Image%20Home%20Screen%2F2.png?alt=media&token=d38205e5-b3b1-4cec-8e44-76c80054c4d9" },
      min: 120,
      kcal: 450,
      select: false,
    },
    {
      id: 2,
      title: "Boxing",
      image: { uri: "https://firebasestorage.googleapis.com/v0/b/i-gains.appspot.com/o/Image%20Home%20Screen%2F1.png?alt=media&token=3dacd2f4-6fb4-4bcb-9879-f3c823f0c03c" },
      min: 10,
      kcal: 80,
      select: false,
    },
    {
      id: 3,
      title: "Stretching",
      image: { uri: "https://firebasestorage.googleapis.com/v0/b/i-gains.appspot.com/o/Image%20Home%20Screen%2F2.png?alt=media&token=d38205e5-b3b1-4cec-8e44-76c80054c4d9" },
      min: 30,
      kcal: 150,
      select: false,
    }
  ];
  const [workoutItem, setWorkout] = useState(workout);

  const voidSelectWorkout = useStore((state) => state.voidSelectWorkout);

  const toggleSelect = useCallback((id:number) => {
    setWorkout((prevWorkouts) =>
      prevWorkouts.map((workout) =>
        workout.id === id ? { ...workout, select: !workout.select } : workout
      )
    );
  }, []);

  const handleStartWorkout = () => {
    const selectedWorkouts = workoutItem.filter(workout => workout.select);
    voidSelectWorkout(selectedWorkouts);
    navigation.navigate('Workout');
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <SafeAreaView>
        <ScrollView refreshControl={
          <RefreshControl
            tintColor={'#E0FE10'}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        } showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity style={{padding: 5}} onPress={()=>navigation.navigate('Home')}>
              <Svg
                width={10}
                height={17}
                viewBox="0 0 10 17"
                fill="none"
              >
                <Path
                  d="M8.5 1L1 8.5L8.5 16"
                  stroke="#fff"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
            <View>
              <Text style={{
                color: '#FFFFFF',
                fontSize: 21,
                fontFamily: 'Regular',
              
              }}>Full Strenght Legs and Arms </Text>
            </View>
            <View>
              <Svg
                width={10}
                height={17}
                viewBox="0 0 10 17"
                fill="none"
              >
                <Path
                  d="M8.5 1L1 8.5L8.5 16"
                  stroke="none"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
          </View>
          <View style={styles.main}>
            <Text style={{
              color: '#FFFFFF',
              fontSize: 16,
              fontFamily: 'Light',
            }}>
              Select exercise for your workout
            </Text>
            <View style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
              alignItems: 'center',
              width: Dimensions.get('window').width - 50,
            }}>
              {
                workoutItem?.map((item, index) => (
                  <View key={index} style={{
                    backgroundColor: '#17181B',
                    width: '100%',
                    borderRadius: 12,
                    padding: 7,
                    paddingLeft: 20,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    {/* SELECT BOX */}
                    <View style={{flexDirection: 'row', height: '100%',width:'70%', alignItems: 'center', gap: 20}}>
                      <View>
                        {
                          item.select ? (
                            <TouchableOpacity 
                            onPress={() => toggleSelect(item.id)}
                            style={{
                              width: 35,
                              height: 35,
                              borderRadius: 7,
                              backgroundColor: '#1F3D18',
                              borderColor: '#38692D',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderWidth: 1,
                            }}>
                              <Svg
                                width={12}
                                height={10}
                                viewBox="0 0 12 10"
                                fill="none"
                              >
                                <Path
                                  d="M1 5.2885L3.96296 8.40741L11 1"
                                  stroke="#64C747"
                                  strokeWidth={1.5}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </Svg>
                            </TouchableOpacity>
                          ):(
                            <TouchableOpacity 
                            onPress={() => toggleSelect(item.id)}                       
                            style={{
                              width: 35,
                              height: 35,
                              borderRadius: 7,
                              backgroundColor: '#17181B',
                              borderColor: '#27292E',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderWidth: 1,
                            }}/>
                          )
                        }
                      </View>
                      <View style={{
                        width:1,
                        height: '100%',
                        backgroundColor: '#E0FE10',
                        borderRadius: 5,
                      }}/>
                      <View style={{
                        display: 'flex', 
                        flexDirection: 'column',
                        gap: 5, 
                        alignItems: 'flex-start'
                      }}>
                        <Text style={{
                          color: '#FFFFFF', 
                          fontSize: 15, 
                          fontFamily: 'Bold',
                        }}>
                          {item.title}
                        </Text>
                        <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                          <Svg
                            width={10}
                            height={11}
                            viewBox="0 0 10 11"
                            fill="none"
                          >
                            <Path
                              d="M8.89869 3.2753L9.53027 2.65024C9.58131 2.60574 9.62207 2.55165 9.64995 2.49139C9.67784 2.43113 9.69223 2.36603 9.69223 2.30021C9.69223 2.23439 9.67784 2.16928 9.64995 2.10903C9.62207 2.04877 9.58131 1.99468 9.53027 1.95018C9.48413 1.9011 9.42723 1.86224 9.36358 1.83632C9.29993 1.8104 9.23106 1.79806 9.16185 1.80016C9.02302 1.80204 8.8906 1.85596 8.79342 1.95018L8.13553 2.55023C7.38785 1.97935 6.48385 1.62365 5.53027 1.52514V1.00009H6.05658C6.19617 1.00009 6.33004 0.947407 6.42875 0.85363C6.52745 0.759854 6.5829 0.632665 6.5829 0.500045C6.5829 0.367425 6.52745 0.240236 6.42875 0.14646C6.33004 0.0526831 6.19617 0 6.05658 0H3.95132C3.81174 0 3.67787 0.0526831 3.57916 0.14646C3.48046 0.240236 3.42501 0.367425 3.42501 0.500045C3.42501 0.632665 3.48046 0.759854 3.57916 0.85363C3.67787 0.947407 3.81174 1.00009 3.95132 1.00009H4.47764V1.52514C3.37271 1.63541 2.33791 2.09219 1.53661 2.82335C0.735298 3.55451 0.213126 4.5184 0.0525238 5.56287C-0.108078 6.60734 0.102039 7.67287 0.649703 8.59127C1.19737 9.50966 2.05138 10.2286 3.07693 10.6346C4.10247 11.0406 5.24113 11.1105 6.31314 10.8332C7.38514 10.556 8.32944 9.94749 8.99695 9.10369C9.66445 8.2599 10.0172 7.22891 9.99936 6.17349C9.98157 5.11807 9.5943 4.09835 8.89869 3.2753ZM8.95132 6.25056H5.00395V2.50023C6.05086 2.50023 7.05489 2.89535 7.79516 3.59867C8.53544 4.302 8.95132 5.25591 8.95132 6.25056Z"
                              fill="#4086F5"
                            />
                          </Svg>
                          <Text style={{
                            color: 'rgba(255,255,255,0.5)', 
                            fontSize: 12, 
                            fontFamily: 'Light'
                          }}>
                              {item.min} min
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                          <Svg
                            width={9}
                            height={15}
                            viewBox="0 0 9 15"
                            fill="none"
                          >
                            <Path
                              d="M8.97316 9.46761C8.90789 8.79406 8.71405 8.09058 8.41254 7.43342 8.139 6.83491 7.78004 6.26241 7.3465 5.73322 7.22469 5.58374 7.10093 5.44058 7.03701 5.37457L6.88979 5.21366C6.85385 5.17245 6.82363 5.13937 6.7937 5.11005L6.74964 5.06538C6.70152 5.01696 6.65189 4.96673 6.61069 4.91651 6.60753 4.91245 6.60407 4.90854 6.60046 4.90463 6.58046 4.88267 6.55896 4.86072 6.5349 4.8362 6.50362 4.80447 6.46813 4.76913 6.43655 4.72943 6.43249 4.72447 6.42828 4.71966 6.42407 4.7147 6.1997 4.46807 6.01097 4.24386 5.84736 4.02972 5.65577 3.77753 5.52043 3.56895 5.40795 3.3515 5.27772 3.10383 5.18027 2.82818 5.11862 2.53013 5.06012 2.26019 5.02598 1.95041 5.01681 1.6083 5.00778 1.30453 5.02628 1.01264 5.04538.769174 5.05922.607064 5.07485.463602 5.09019.336831 5.10207.238032 5.06433.139683 4.98929.0742676 4.9141.00870184 4.81154-.0155094 4.71545.00990488 4.57198.0473495 4.42491.096975 4.27934.157127 3.97362.281792 3.67286.45518 3.38503.673081 3.01796.951736 2.69629 1.29596 2.42922 1.69552 2.10139 2.1838 1.86935 2.7581 1.75852 3.35436 1.63205 4.01047 1.64604 4.75079 1.79762 5.43773 1.94153 6.10271 2.22019 6.78182 2.60456 7.40364 2.80772 7.72741 3.00247 7.9981 3.19525 8.22532 3.2527 8.29675 3.4109 8.48142 3.41255 8.48352L3.47571 8.55586C3.51992 8.60593 3.5515 8.64368 3.58369 8.68218 3.61346 8.71752 3.63797 8.74684 3.66534 8.77601L3.67 8.78083C3.97076 9.14053 4.1828 9.4046 4.35784 9.63829 4.55123 9.89544 4.72131 10.1448 4.87756 10.4001 5.04403 10.6729 5.16298 10.9114 5.2517 11.1498 5.35185 11.4209 5.41772 11.7147 5.44825 12.0244 5.47637 12.2969 5.47652 12.6024 5.449 12.9567 5.42133 13.2781 5.37125 13.571 5.33185 13.7856 5.30238 13.9324 5.27351 14.0679 5.24719 14.1849 5.22493 14.284 5.25396 14.3877 5.32479 14.4605 5.38208 14.5196 5.45998 14.5517 5.54073 14.5517 5.55983 14.5517 5.57908 14.5499 5.59818 14.5462 5.73938 14.5186 5.87533 14.4825 6.00992 14.4368 6.32421 14.3345 6.6343 14.1858 6.93054 13.9959 7.31492 13.7528 7.66169 13.4413 7.9614 13.0706 8.32472 12.6212 8.60849 12.0818 8.78188 11.5111 8.97632 10.8762 9.04263 10.1691 8.97316 9.46761zM3.07672 11.3095C2.95145 11.0355 2.78754 10.7738 2.59039 10.5333 2.54076 10.4724 2.48076 10.4025 2.45144 10.3721L2.38211 10.2963C2.36407 10.276 2.35098 10.2619 2.33715 10.2479L2.3182 10.2288C2.29625 10.2069 2.27429 10.1845 2.25564 10.1622 2.25233 10.1583 2.24888 10.1542 2.24527 10.1505L2.21925 10.1234C2.20406 10.1078 2.18917 10.0926 2.17639 10.0766 2.17308 10.0726 2.16963 10.0685 2.16602 10.0646 2.06692 9.95588 1.98165 9.85467 1.90661 9.75678 1.84315 9.67271 1.76961 9.5703 1.70465 9.44519 1.64525 9.3321 1.60104 9.20669 1.57262 9.06999 1.54615 8.94713 1.53066 8.80577 1.52645 8.64983 1.52269 8.52035 1.52991 8.39794 1.53577 8.31719 1.54344 8.21057 1.49382 8.10771 1.40539 8.04741 1.31697 7.9871 1.20328 7.97838 1.10659 8.02425.995307 8.07733.885981 8.1441.781316 8.2232.613793 8.35057.467022 8.50757.345515 8.68953.241151 8.84487.103252 9.10262.0393408 9.44594-.0185555 9.7461-.01239 10.0845.0567848 10.3975.122501 10.7015.249723 11.0117.425818 11.2967.518602 11.4442.607326 11.5677.692742 11.6684.717856 11.6995.772294 11.7625.796505 11.7907L.796053 11.7911.822821 11.8215C.844025 11.8454.858912 11.8632.873499 11.8809.886131 11.8964.896959 11.9092.907034 11.9197L.911696 11.9247C1.00448 12.0355 1.12403 12.1803 1.22614 12.3167 1.31486 12.4344 1.39231 12.5481 1.46314 12.6644 1.53878 12.788 1.59307 12.8967 1.63352 13.0056 1.67924 13.1295 1.70946 13.2641 1.72345 13.4064 1.73623 13.5304 1.73623 13.67 1.7239 13.8297 1.71578 13.9246 1.70239 14.0247 1.68345 14.1358 1.66495 14.2434 1.7063 14.3525 1.79127 14.421 1.84556 14.4644 1.91232 14.4871 1.97985 14.4871 2.01789 14.4871 2.05639 14.4799 2.09278 14.4652 2.19745 14.4226 2.30106 14.3685 2.3988 14.3058 2.5743 14.1952 2.73295 14.0527 2.87055 13.8828 3.03627 13.6779 3.16574 13.4316 3.24499 13.1712 3.33267 12.885 3.36364 12.5534 3.33267 12.2379 3.30259 11.9304 3.21417 11.6093 3.07672 11.3095z"
                              fill="#E89D3C"
                            />
                          </Svg>
                          <Text style={{
                            color: 'rgba(255,255,255,0.5)', 
                            fontSize: 12, 
                            fontFamily:'Light'
                            }}>
                              {item.kcal} kcal
                          </Text>
                        </View>
                      </View>
                    </View>
                  
                    {/* IMAGE */}
                    <Image style={{width: '30%', height: 80, borderRadius:12}} source={item.image} />
                  </View>
                ))
              }
            </View>
          </View>
          
        </ScrollView>
        <TouchableOpacity 
          onPress={handleStartWorkout}
          style={styles.btnGo}>
            <Text style={{
              color: '#17181B',
              fontSize: 16,
              fontFamily: 'Regular',
              textAlign: 'center',
            }}>
              Start Workout
            </Text>
        </TouchableOpacity>
      </SafeAreaView>
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
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    width: Dimensions.get('window').width - 50,
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginTop: 25
  },
  btnGo: {
    position: 'absolute',
    bottom: 50,
    width: Dimensions.get('window').width - 50,
    padding: 15,
    backgroundColor: '#E0FE10',
    borderRadius: 12,
  }
})