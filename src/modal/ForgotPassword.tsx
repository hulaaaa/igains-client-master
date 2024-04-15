import { StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import React, { useState } from 'react'
import * as Haptics from 'expo-haptics';
import CloseSvg from '../../assets/svg/CloseSvg';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import InputIconMail from '../../assets/svg/InputIconMail';
import InputIconPass from '../../assets/svg/InputIconPass';
import Arrow from '../../assets/svg/Arrow';
import { useStore } from '../services/ZustandModalPassword';
import Toast from 'react-native-toast-message';
interface IFormInput {
  email: string;
  password: string;
  repassword: string;
}
export default function ForgotPassword() {
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
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if(data.email !== "admin@wsb.pl" ){
      if (data.password == data.repassword) {
        setValidRepeat(true);
        console.log(`Reset password: ${JSON.stringify(data)}`);
        Toast.show({
          type: 'success',
          visibilityTime: 4000,
          text1: 'Check your inbox!',
          text2: 'We are send link to your inbox. 📨'
        });
        setTimeout(() => {
          setModalVisible()
        }, 700)
      } else {
        setValidRepeat(false);
      }
    }else{
      Toast.show({
        type: 'error',
        visibilityTime: 4000,
        text1: '404!',
        text2: 'This account does not exist. ⛔️'
      });
    }
  };

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
          }}>Forgot  Password</Text>
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
            <Controller
              control={control}
              rules={{
                minLength: 8,
                required: true,
                maxLength: 40,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ gap: 8, }}>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={inputsStyle.upperInputText}>E-mail address</Text>
                    {errors.email && <Text style={inputsStyle.errorInput}>Enter valid e-mail</Text>}
                  </View>
                  <View style={[inputsStyle.inputText, { borderColor: isFocused.email ? '#E0FE10' : '#262626' }]}>
                    <TextInput
                      placeholder="Enter your e-mail"
                      onBlur={() => {
                        setIsFocused({ ...isFocused, email: false });
                        setIsFilled({ ...isFilled, email: !!value });
                      }}
                      onFocus={() => setIsFocused({ ...isFocused, email: true })}
                      placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                      color={'#FFFFFF'}
                      style={{
                        width: '90%',
                        height: 50
                      }}
                      onChangeText={onChange}
                      value={value}
                    />
                    <InputIconMail color={isFilled.email ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)'} />
                  </View>
                </View>
              )}
              name="email"
            />
            <View style={{ gap: 7 }}>
              <Controller
                control={control}
                rules={{
                  minLength: 8,
                  required: true,
                  maxLength: 40,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={{ gap: 8 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text style={inputsStyle.upperInputText}>Password</Text>
                      {errors.password && <Text style={inputsStyle.errorInput}>Enter valid password</Text>}
                    </View>
                    <View style={[inputsStyle.inputText, { borderColor: isFocused.password ? '#E0FE10' : '#262626' }]}>
                      <TextInput
                        placeholder="Enter your password"
                        color={'#FFFFFF'}
                        placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                        onBlur={() => {
                          setIsFocused({ ...isFocused, password: false });
                          setIsFilled({ ...isFilled, password: !!value });
                        }}
                        onFocus={() => setIsFocused({ ...isFocused, password: true })}
                        onChangeText={onChange}
                        value={value}
                        style={{
                          width: '90%',
                          height: 50
                        }}

                        secureTextEntry={!isLocked}
                      />
                      <TouchableOpacity onPress={() => {
                        setIsLocked(!isLocked)
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                      }}>
                        {
                          !isLocked ? (<InputIconPass color={isFilled.password ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)'} locked={false} />) : (<InputIconPass color={isFilled.password ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)'} locked={true} />)
                        }
                      </TouchableOpacity>

                    </View>
                  </View>
                )}
                name="password"
              />

              <Controller
                control={control}
                rules={{
                  minLength: 8,
                  required: true,
                  maxLength: 40,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={{ gap: 8 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      {!validRepeat && <Text style={inputsStyle.errorInput}>Repeat your password </Text>}
                    </View>
                    <View style={[inputsStyle.inputText, { borderColor: isFocused.repassword ? '#E0FE10' : '#262626' }]}>
                      <TextInput
                        placeholder="Repeat your password"
                        color={'#FFFFFF'}
                        placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                        onBlur={() => {
                          setIsFocused({ ...isFocused, repassword: false });
                          setIsFilled({ ...isFilled, repassword: !!value });
                        }}
                        onFocus={() => setIsFocused({ ...isFocused, repassword: true })}
                        onChangeText={onChange}
                        value={value}
                        style={{
                          width: '90%',
                          height: 50
                        }}

                        secureTextEntry={!isLocked}
                      />
                      <TouchableOpacity onPress={() => {
                        setIsLocked(!isLocked)
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                      }}>
                        {
                          !isLocked ? (<InputIconPass color={isFilled.repassword ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)'} locked={false} />) : (<InputIconPass color={isFilled.repassword ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)'} locked={true} />)
                        }
                      </TouchableOpacity>

                    </View>
                  </View>
                )}
                name="repassword"
              />

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
                    Reset Password
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