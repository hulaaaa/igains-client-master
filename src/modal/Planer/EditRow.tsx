import { TimerPicker } from "react-native-timer-picker";
import { RulerPicker } from 'react-native-ruler-picker';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions, TextInput } from 'react-native'
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
import { duration } from "moment";

interface IFormInput {
  email: string;
  password: string;
  repassword: string;
}
export default function EditRow() {
  const modalVisible = useStore(state => state.visibleModal);
  const setModalVisible = useStore(state => state.voidVisibleModal);
  const displayModal = async () => {
    setModalVisible()
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }
  const [isLocked, setIsLocked] = useState(false);
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
    repassword: false,
  });
  const [isFilled, setIsFilled] = useState({
    email: false,
    password: false,
    repassword: false,
  });
  const [validRepeat, setValidRepeat] = useState(true);
  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    defaultValues: {
      email: "",
      password: "",
      repassword: "",
    },
  });
  const [selected, setSelected] = React.useState("");
  const [breakTime, setBreakTime] = React.useState(0);
  const [numOfSet, setNumOfSet] = React.useState(0);
  const [startTime, setStartTime] = React.useState(0)
  const onSubmit: SubmitHandler<IFormInput> = () => {
    if(selected!==""){
        console.log(`Reset password: ${selected} ${breakTime}`);
        Toast.show({
          type: 'success',
          visibilityTime: 4000,
          text1: `Add ${selected} to your plan!`,
          text2: `Let\'s train! ${breakTime} ${numOfSet} ${startTime} 🏋️‍♂️`
        });
        setTimeout(() => {
          setModalVisible()
        }, 700)
    }else{
      Toast.show({
        type: 'error',
        visibilityTime: 4000,
        text1: '404!',
        text2: 'Do it again⛔️'
      });
    }
  };
  
  
  const data = [
      {key:'1', value:'Running'},
      {key:'2', value:'Yoga'},
      {key:'3', value:'Swimming'},
      {key:'4', value:'Gym'},
  ]
  const minBreakTime = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

  return (
    <View style={headerStyle.centeredView}>
      <View style={headerStyle.modalView}>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'justify-between',
        }}>
          <Text style={{
            display: 'flex',
            flex: 1,
            textAlign: 'center',
            fontFamily: 'Bold',
            color: '#FFFFFF',
            fontSize: 20,
          }}>Edit Planned Activity</Text>
          <TouchableOpacity style={{ padding: 10 }} onPress={setModalVisible}>
            <CloseSvg />
          </TouchableOpacity>
        </View>
        <View style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 40,
        }}>
          <View style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 15,
          }}>
            <View style={{gap: 8}}>
              <Text style={{
                fontFamily: 'Regular',
                color: '#FFFFFF',
                fontSize: 15,
              }}>Select activities</Text>
              <SelectList 
                setSelected={(val) => setSelected(val)} 
                data={data} 
                search={false}
                searchicon={false}
                arrowicon={
                <Svg width={11} height={9} fill="none">
                  <Path
                    fill="#E0FE10"
                    d="M6.366 8.5a1 1 0 0 1-1.732 0L.737 1.75a1 1 0 0 1 .866-1.5h7.794a1 1 0 0 1 .866 1.5L6.366 8.5Z"
                  />
                </Svg>}
                fontFamily='Regular'
                dropdownStyles={{
                  height:150
                }}
                boxStyles={{borderRadius:12, borderColor:'#E0FE10',borderWidth:1,alignItems:'center', backgroundColor:'#06070A', width: Dimensions.get('window').width - 110,padding: 15, }}
                inputStyles={{color:'#FFFFFF', fontFamily:'Regular', fontSize: 15,}}
                dropdownTextStyles={{color:'#FFFFFF', fontFamily:'Regular', fontSize: 15,}}
                dropdownShown={false}
                placeholder='Select activity'
                searchPlaceholder='Select activity'
                save="value"
              />
            </View>

            <View style={{gap: 15}}>
              <Text style={{
                fontFamily: 'Regular',
                color: '#FFFFFF',
                fontSize: 15,
              }}>Set the break time</Text>
              <RulerPicker
                min={0}
                width={Dimensions.get('window').width - 110}
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
                max={15}
                step={1}
                fractionDigits={0}
                initialValue={0}
                onValueChange={(number) => setBreakTime(number)}
                onValueChangeEnd={(number) => setBreakTime(number)}
                unit="min"
              />

            </View>

            <View style={{flexDirection:'row', marginTop: 10,alignItems:'center',width: Dimensions.get('window').width - 110, justifyContent:'space-between'}}>
              <View style={{width: "59%",gap: 8}}>
                <Text style={{
                  fontFamily: 'Regular',
                  color: '#FFFFFF',
                  fontSize: 15,
                }}>Set the start time</Text>
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
                    onDurationChange={(duration) => setStartTime(duration)}
                    minuteLabel="m"
                    hourLabel="h"
                    hideSeconds
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
                          width: '60%',
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
                  }}>Feb 29{'\n'}Thu</Text>
                </View>
                
              </View>
              <View style={{width: "40%",gap: 8}}>
                <Text style={{
                  fontFamily: 'Regular',
                  color: '#FFFFFF',
                  fontSize: 15,
                }}>Set num of set</Text>
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
                    onDurationChange={(duration) => setNumOfSet(duration.hours)}
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
                          width: '60%',
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
                  }}>SET</Text>
                </View>
                
              </View>
              
              
            </View>
            
            <View style={{marginTop: 20}}>
              <TouchableOpacity onPress={() => {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                handleSubmit(onSubmit)();
              }}>
                <View style={{
                  width: Dimensions.get('window').width - 110,
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
                    Edit the Plan 
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
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