import { TimerPicker } from "react-native-timer-picker";
import { RulerPicker } from 'react-native-ruler-picker';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions, TextInput, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import * as Haptics from 'expo-haptics';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import CloseSvg from '../../../assets/svg/CloseSvg';
import InputIconMail from '../../../assets/svg/InputIconMail';
import InputIconPass from '../../../assets/svg/InputIconPass';
import Arrow from '../../../assets/svg/Arrow';
import { useStore } from '../../services/ZustandModalPassword';
import { SelectList } from 'react-native-dropdown-select-list'
import { Path, Svg } from 'react-native-svg';
import { duration, max } from "moment";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IFormInput {
  email: string;
  password: string;
  repassword: string;
}

export default function ChangesInfo() {
  const [startTimeD, setStartTimeD] = React.useState(0)
  const [startTimeM, setStartTimeM] = React.useState(0)
  const [startTimeY, setStartTimeY] = React.useState(0)

  const [height, setHeight] = React.useState(0)
  const [weight, setWeight] = React.useState(0)

  async function putchInfo(){
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; 
    const currentDay = currentDate.getDate();
    const token = await AsyncStorage.getItem('token')
    const email = await AsyncStorage.getItem('email')
    const url = `http://192.168.0.214:8090/api/users/change`;
    let age = currentYear - startTimeY;
    if (currentMonth < startTimeM || (currentMonth === startTimeM && currentDay < startTimeD)) {
        age--;
    }
    
    const dataBody = {
      email: email,
      age: Number(age),
      height: Number(height),
      weight: Number(weight)
    };
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataBody)
    };
    console.log(JSON.stringify(dataBody),token);
    
    fetch(url, requestOptions)
      .then(response => {
          console.log("Response:", response);
          return response.text();
      })
        .then(data => console.log(data))
        .catch(err=>console.log(err))
        .finally(()=>{navigation.navigate('Profile')})
  }
  const navigation = useNavigation()
  
  
  return (
    <View style={headerStyle.bg}>
      <SafeAreaView>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'justify-between',
          marginTop:25,
          marginBottom: 35
        }}>
          <Text style={{
            display: 'flex',
            flex: 1,
            textAlign: 'center',
            fontFamily: 'Bold',
            color: '#FFFFFF',
            fontSize: 20,
          }}>Your information</Text>
          
        </View>
        <View style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}>
          <View style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
          }}>

            <View style={{flexDirection:'row',alignItems:'center',width: Dimensions.get('window').width - 50, justifyContent:'space-between'}}>
              <View style={{width: "30%",gap: 8}}>
                <Text style={{
                  fontFamily: 'Regular',
                  color: '#FFFFFF',
                  fontSize: 16,
                }}>Set your birthdate</Text>
                <View style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  borderColor: '#262626',
                  borderWidth: 1,
                  borderRadius: 12,
                  backgroundColor: '#06070A',
                }}>
                <TimerPicker
                    padWithNItems={1}
                    onDurationChange={(duration) => setStartTimeD(duration.minutes)}
                    minuteLabel=""
                    hideSeconds
                    hideHours
                    styles={{
                        pickerItem: {
                            fontSize: 16,
                        },
                        text: {
                          fontFamily: 'Bold',
                          color: '#FFFFFF',
                          fontSize: 15
                        },
                        pickerContainer: {
                          backgroundColor: 'transparent',
                          width: '50%',
                          height: 150,
                        },
                        pickerLabel: {
                            fontSize: 14,
                            right: -15,
                        },
                        pickerLabelContainer: {
                            width: 25,
                        },
                        pickerItemContainer: {
                            width: 50,
                        },
                    }}
                />
                  <Text style={{
                    fontFamily: 'Light',
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 12,
                  }}>DAY</Text>
                </View>
                
              </View>
              
              <View style={{width: "30%",gap: 8}}>
                <Text style={{
                  fontFamily: 'Regular',
                  color: 'transparent',
                  fontSize: 15,
                }}>Set your birthdate</Text>
                <View style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  borderColor: '#262626',
                  borderWidth: 1,
                  borderRadius: 12,
                  backgroundColor: '#06070A',
                }}>
                <TimerPicker
                    padWithNItems={1}
                    onDurationChange={(duration) => setStartTimeM(duration.hours)}
                    hourLabel=""
                    hideSeconds
                    hideMinutes
                    styles={{
                        pickerItem: {
                            fontSize: 16,
                        },
                        text: {
                          fontFamily: 'Bold',
                          color: '#FFFFFF',
                          fontSize: 15
                        },
                        pickerContainer: {
                          backgroundColor: 'transparent',
                          width: '50%',
                          height: 150,
                        },
                        pickerLabel: {
                            fontSize: 14,
                            right: -15,
                        },
                        pickerLabelContainer: {
                            width: 25,
                        },
                        pickerItemContainer: {
                            width: 50,
                        },
                    }}
                />
                  <Text style={{
                    fontFamily: 'Light',
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 12,
                  }}>MON</Text>
                </View>
                
              </View>
              <View style={{width: "30%",gap: 8}}>
                <Text style={{
                  fontFamily: 'Regular',
                  color: 'transparent',
                  fontSize: 15,
                }}>Set your birthdate</Text>
                <View style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  borderColor: '#262626',
                  borderWidth: 1,
                  borderRadius: 12,
                  backgroundColor: '#06070A',
                }}>
                <TimerPicker
                    padWithNItems={1}
                    onDurationChange={(duration) => setStartTimeY(duration.hours)}
                    hourLabel=""
                    hideSeconds
                    hideMinutes
                    styles={{
                        pickerItem: {
                            fontSize: 16,
                        },
                        text: {
                          fontFamily: 'Bold',
                          color: '#FFFFFF',
                          fontSize: 15
                        },
                        pickerContainer: {
                          backgroundColor: 'transparent',
                          width: '50%',
                          height: 150,
                        },
                        pickerLabel: {
                            fontSize: 14,
                            right: -15,
                        },
                        pickerLabelContainer: {
                            width: 25,
                        },
                        pickerItemContainer: {
                            width: 50,
                        },
                    }}
                />
                  <Text style={{
                    fontFamily: 'Light',
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 12,
                  }}>YEAR</Text>
                </View>
                
              </View>
              
            </View>

            <View style={{gap: 15}}>
              <Text style={{
                fontFamily: 'Regular',
                color: '#FFFFFF',
                fontSize: 15,
              }}>Set your height</Text>
              <RulerPicker
                min={0}
                width={Dimensions.get('window').width - 50}
                longStepHeight={40}
                gapBetweenSteps={15}
                indicatorHeight={10}
                shortStepColor={'white'}
                valueTextStyle={{
                  fontFamily: 'Regular',
                  fontSize: 20,
                  color: '#E0FE10'
                }}
                unitTextStyle={{
                  fontFamily: 'Regular',
                  fontSize: 20,
                  color: '#E0FE10'
                }}
                indicatorColor={'#E0FE10'}
                height={70}
                max={200}
                min={150}
                step={1}
                fractionDigits={0}
                initialValue={150}
                onValueChange={(number) => setHeight(number)}
                onValueChangeEnd={(number) => setHeight(number)}
                unit="cm"
              />

            </View>

            <View style={{gap: 15}}>
              <Text style={{
                fontFamily: 'Regular',
                color: '#FFFFFF',
                fontSize: 15,
              }}>Set your weight</Text>
              <RulerPicker
                min={0}
                width={Dimensions.get('window').width - 50}
                longStepHeight={40}
                gapBetweenSteps={15}
                indicatorHeight={10}
                shortStepColor={'white'}
                valueTextStyle={{
                  fontFamily: 'Regular',
                  fontSize: 20,
                  color: '#E0FE10'
                }}
                unitTextStyle={{
                  fontFamily: 'Regular',
                  fontSize: 20,
                  color: '#E0FE10'
                }}
                indicatorColor={'#E0FE10'}
                height={70}
                max={130}
                min={40}
                step={1}
                fractionDigits={0}
                initialValue={40}
                onValueChange={(number) => setWeight(number)}
                onValueChangeEnd={(number) => setWeight(number)}
                unit="kg"
              />

            </View>
            
            <View style={{marginTop: 50}}>
              <TouchableOpacity onPress={() => {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
                putchInfo()
              }}>
                <View style={{
                  width: Dimensions.get('window').width - 50,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  paddingVertical: 20,
                  backgroundColor: '#E0FE10',
                  borderRadius: 15,
                }}>
                  <Text style={{
                    fontFamily: 'Bold',
                    fontSize: 17,
                    color: '#17181B',
                    textAlign: 'center',
                  }}>
                    Save changes
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
        
      </View>
  )
}

const headerStyle = StyleSheet.create({
  bg: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#06070A',
  },
  mainCont: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 30,
    marginHorizontal: 40,
  },
  mainCont75: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 30,
    marginHorizontal: 40,
    opacity: 0.15
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: 25,
    alignItems: 'center',
  },
  iconHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'Bold',
    fontSize: 32,
    color: '#FFFFFF'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: Dimensions.get('window').width - 50,
    padding: 25,
    borderRadius: 12,
    backgroundColor: '#1E1E1E',
    borderColor: '#262626',
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
  }
});

const inputsStyle = StyleSheet.create({
  containerInput: {
    marginVertical: 35,
    gap: 20,
  },
  inputText: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    backgroundColor: '#06070A',
    borderRadius: 12,
    borderColor: '#262626',
    borderWidth: 1,
    color: '#FFFFFF',
  },
  upperInputText: {
    fontFamily: 'Regular',
    fontSize: 15,
    color: '#FFFFFF',
  },
  errorInput: {
    fontFamily: 'Regular',
    fontSize: 13,
    color: '#FF0000',
  },
  forgotpass: {
    fontFamily: 'Regular',
    fontSize: 13,
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  text: {
    marginHorizontal: 10,
    fontFamily: 'Regular',
    fontSize: 15,
    color: 'rgba(255,255,255,0.5)',
  },
});