import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, Modal, Alert, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Splash_GainsText from '../../../assets/svg/Splash_GainsText';
import Icon_Gains from '../../../assets/svg/Icon_Gains';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as Haptics from 'expo-haptics';
import Arrow from '../../../assets/svg/Arrow';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GoogleAuthSvg from '../../../assets/svg/GoogleAuthSvg';
import FbAuthSvg from '../../../assets/svg/FbAuthSvg';
import InputIconMail from '../../../assets/svg/InputIconMail';
import InputIconPass from '../../../assets/svg/InputIconPass';
import CloseSvg from '../../../assets/svg/CloseSvg';
import ForgotPassword from '../../modal/ForgotPassword';
import { useStore } from '../../services/ZustandModalPassword';
import Toast from 'react-native-toast-message';
interface IFormInput {
  email: string;
  password: string;
}

export default function LoginLayout() {
  const navigation = useNavigation();
  const modalVisible = useStore(state => state.visibleModal);
  const setModalVisible = useStore(state => state.voidVisibleModal);

  const [isLocked, setIsLocked] = useState(false);
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });
  const [isFilled, setIsFilled] = useState({
    email: false,
    password: false,
  });
  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if(data) {
      console.log(`Login profile: ${data}`);
      Toast.show({
        type: 'success',
        visibilityTime: 4000,
        text1: 'Welcome back!',
        text2: 'Let\'s training! 🏋️'
      });
    } 
    if(data.email == 'huladm@wsb'){
      Toast.show({
        type: 'error',
        visibilityTime: 4000,
        text1: '404!',
        text2: 'This account does not exist. ⛔️'
      });
    }
  };

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: '#06070A' }}>
      <View style={headerStyle.bg}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={setModalVisible}
        >
          <ForgotPassword />
        </Modal>
        <SafeAreaView>
          <View style={!modalVisible ? headerStyle.mainCont : headerStyle.mainCont75} >
            <View style={headerStyle.header}>
              <View style={headerStyle.iconHeader}>
                <Icon_Gains />
                <Splash_GainsText width={80} height={31} />
              </View>
              <Text style={headerStyle.headerText}>Welcome back!</Text>
            </View>

            <View style={inputsStyle.containerInput}>
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
                      {
                        errors.password ? <Text style={inputsStyle.errorInput}>Enter valid password</Text> : <TouchableOpacity onPress={() => { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); setModalVisible(!modalVisible) }}><Text style={inputsStyle.forgotpass}>Forgot password?</Text></TouchableOpacity>
                      }
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
            </View>

            <View style={inputsStyle.lineContainer}>
              <View style={inputsStyle.line} />
              <Text style={inputsStyle.text}>or</Text>
              <View style={inputsStyle.line} />
            </View>

            <View style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
              marginBottom: 30,
            }}>
              <TouchableOpacity>
                <GoogleAuthSvg />
              </TouchableOpacity>
              <TouchableOpacity>
                <FbAuthSvg />
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                onPress={() => {
                  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                  handleSubmit(onSubmit)();
                }}>
                <View style={{
                  width: Dimensions.get('window').width - 80,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  paddingVertical: 20,
                  backgroundColor: '#1E1E1E',
                  borderRadius: 15,
                }}>
                  <Text style={{
                    fontFamily: 'Bold',
                    fontSize: 17,
                    color: '#FFFFFF',
                    textAlign: 'center',
                  }}>
                    Log in
                  </Text>
                  <Arrow color={'#FFFFFF'} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
        <StatusBar style="light" />
      </View>
    </KeyboardAwareScrollView>
  );
}

const inputsStyle = StyleSheet.create({
  containerInput: {
    marginVertical: 35,
    gap: 20,
  },
  inputText: {
    width: Dimensions.get('window').width - 80,
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
    fontSize: 17,
    color: '#FFFFFF',
  },
  errorInput: {
    fontFamily: 'Regular',
    fontSize: 14,
    color: '#FF0000',
  },
  forgotpass: {
    fontFamily: 'Regular',
    fontSize: 12,
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
    gap: 30,
    alignItems: 'center',
  }
});