import { Dimensions, Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
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

SplashScreen.preventAutoHideAsync();


export default function Profile() {
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
  const urlAvatar = 'https://firebasestorage.googleapis.com/v0/b/i-gains.appspot.com/o/AvatarUser%2FScreenshot%202024-02-27%20at%2010.46.06.png?alt=media&token=79034def-3676-43a9-a734-820b58040afc'
  const progress = 0.27;

  const awards_user = [
    {
      name: 'Ghost',
      description: 'You missed for a week exercises!',
      img: <GhostIcon/>,
    },
    {
      name: 'Shiny Star',
      description: 'You’ve completed first goal!',
      img: <ShinyStartIcon/>,
    },
    {
      name: 'Sniper',
      description: 'You’ve completed all your target!',
      img: <SniperIcon/>,
    },
  ]
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
};

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <SafeAreaView >
        {/* HEADER */}
        <View style={styles.header_search}>
          <HeaderText first="Profile" second={<DotThreeIcon/>} />
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
          {/* NAME PHOTOS */}
          <View style={styles.divtasks}>
            {/* IMAGE AVATAR */}
            <View style={styles.divImage}>
              <Image style={styles.imageAvatar} source={{uri: urlAvatar }}/>
            </View>
            {/* NAME */}
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
                Dmytro Hula
              </Text>
              <Text style={{
                fontFamily: 'Light',
                fontSize: 12,
                color: 'rgba(255, 255, 255, 0.5)',
              }}>
                @huladmytro
              </Text>
            </View>
          </View>

          {/* BODY DATA */}
          <View style={styles.divtasks}>
            <View style={styles.bodyDiv}>
              <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3}}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
                  <Text style={{
                    fontFamily: 'Regular',
                    fontSize: 18,
                    color: 'white'
                  }}>
                    55
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
                    183
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
                    18
                  </Text>
                  <Text style={{
                    fontFamily: 'Light',
                    fontSize: 18,
                    color: 'white'
                  }}>
                    y.o
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
        
          {/* WEEKLY PROGRES */}
          <View style={styles.divtasks}>
            <Text style={{alignSelf: 'flex-start', fontFamily:'Regular', color: 'white', fontSize: 20}}>Weekly Progress</Text>
            <View style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <ProgressBar 
              progress={progress} 
              color={'#E0FE10'} 
              fillStyle={{borderRadius: 20}}
              style={{
                height: 15, 
                backgroundColor: '#17181B',
                borderRadius: 10, 
                width: Dimensions.get('window').width - 50
              }}/>
              <Text style={progress<=0.5?{fontFamily:'Regular',fontSize:12, position: 'absolute', color:'white'}:{fontFamily:'Regular',fontSize:12, position: 'absolute', color:'#17181B'}}>{progress*100}%</Text>
            </View>
          </View>

          {/* AWARDS */}
          <View style={styles.divtasks}>
            <Text style={{alignSelf: 'flex-start', marginTop: 10, fontFamily:'Regular', color: 'white', fontSize: 20}}>
              My Awards
            </Text>
            <View style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              {
                !awards_user?<Text style={{fontFamily: 'Light', color: 'white', fontSize: 16}}>You don't have any awards yet</Text>:awards_user.map((item,index)=>{
                  return (
                    <TouchableOpacity key={index} style={{backgroundColor: '#17181B', flexDirection: 'column', alignItems: 'center',gap: 9, borderRadius: 10, width: '31%', padding: 12,}}>
                      {item.img}
                      <Text style={{fontFamily: 'Regular', color: 'white', fontSize: 16}}>{item.name}</Text>
                      <Text style={{fontFamily: 'Regular',textAlign:'center', color: 'rgba(255,255,255,0.5)', fontSize: 12}}>{item.description}</Text>
                    </TouchableOpacity>
                  )
                })
              }

            </View>
          </View>

          {/* SETTING */}
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
              <TouchableOpacity style={{
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
                  Edit profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                width: '100%',
                borderBottomColor: '#17181B',
                borderBottomWidth: 1,
                padding: 13,
              }}>
                <Text style={{
                  fontFamily: 'Regular',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: 16
                }}>
                  Edit information your body
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                width: '100%',
                borderBottomColor: '#17181B',
                borderBottomWidth: 1,
                padding: 13,
              }}>
                <Text style={{
                  fontFamily: 'Regular',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: 16
                }}>
                  Edit size of your dick
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
  imageAvatar : {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  bodyDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    justifyContent: 'space-between',
  }
})