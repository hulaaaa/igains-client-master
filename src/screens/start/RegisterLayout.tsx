import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TextInput, Button, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Splash_GainsText from '../../../assets/svg/Splash_GainsText';
import Splash_IconGains from '../../../assets/svg/Splash_IconGains';
import Icon_Gains from '../../../assets/svg/Icon_Gains';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as Haptics from 'expo-haptics';
import Arrow from '../../../assets/svg/Arrow';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GoogleAuthSvg from '../../../assets/svg/GoogleAuthSvg';
import FbAuthSvg from '../../../assets/svg/FbAuthSvg';
import InputIconName from '../../../assets/svg/InputIconName';
import InputIconMail from '../../../assets/svg/InputIconMail';
import InputIconPass from '../../../assets/svg/InputIconPass';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface IFormInput {
  userName: string;
  email: string;
  password: string;
}

export default function RegisterLayout({route}) {
  const { handleLogin } = route.params;

  const navigation = useNavigation();
  const [isLocked, setIsLocked] = useState(false);
  const [isFocused, setIsFocused] = useState({
    userName: false,
    email: false,
    password: false,
  });
  const [isFilled, setIsFilled] = useState({
    userName: false,
    email: false,
    password: false,
  });
  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });
  const retrieveToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        console.log(`its ok:${token}`);
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
  };
  const fnLogin = async(basicInfo)=> {
    const basicInfoLogin = {
      email: basicInfo.email,
      password: basicInfo.password,
    }
    AsyncStorage.setItem('email',basicInfoLogin.email); 
    
    fetch('http://192.168.0.214:8090/auth/signin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(basicInfoLogin)
    })
    .then(res => {
      if (!res.ok) {
        Toast.show({
          type: 'error',
          visibilityTime: 4000,
          text1: '404!',
          text2: 'This account does not exist. ⛔️'
        });
        AsyncStorage.removeItem('email'); 
        throw new Error('Network response was not ok');
      }
      return res.json(); 
    })
    .then(data => {
      const token = data.token; 
      AsyncStorage.setItem('token', token); 
      retrieveToken(); 
      Toast.show({
        type: 'success',
        visibilityTime: 4000,
        text1: 'Welcome back!',
        text2: 'Let\'s training! 🏋️'
      });
      handleLogin()
      navigation.navigate('ChangesInfo') 
    })
    .catch(err => {    
      AsyncStorage.removeItem('email'); 
      console.error('There was a problem with the request:', err)
    });
  }
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const basicInfo = {
      age: 0,
      gender: 0,
      height: 0,
      weight: 0,
      email: data.email,
      password: data.password,
      userName: data.userName
    }
    fetch('http://192.168.0.214:8090/auth/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(basicInfo)
    })
    .then(res => {
      if(res.status==200){
        fnLogin(basicInfo)
        Toast.show({
          type: 'success',
          visibilityTime: 4000,
          text1: `Welcome in our Family, ${data.userName}!`,
          text2: 'Let\'s training! 🏋️'
        });
      }else{
        Toast.show({
          type: 'error',
          visibilityTime: 4000,
          text1: '404!',
          text2: 'This account does not exist. ⛔️'
        })
      }
    })
    .catch(err=> console.log(err))
    
  };

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: '#06070A' }}>
      <View style={headerStyle.bg}>
        <SafeAreaView>
          <View style={headerStyle.mainCont}>
            <View style={headerStyle.header}>
              <View style={headerStyle.iconHeader}>
                <Icon_Gains />
                <Splash_GainsText width={80} height={31} />
              </View>
              <Text style={headerStyle.headerText}>Become a member!</Text>
            </View>

            <View style={inputsStyle.containerInput}>

              <Controller
                control={control}
                rules={{
                  minLength: 3,
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={{ gap: 8 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text style={inputsStyle.upperInputText}>Your name</Text>
                      {errors.userName && <Text style={inputsStyle.errorInput}>This is required.</Text>}
                    </View>
                    <View style={[inputsStyle.inputText, { borderColor: isFocused.userName ? '#E0FE10' : '#262626' }]}>
                      <TextInput
                        placeholder="Enter your name"
                        onBlur={() => {
                          setIsFocused({ ...isFocused, userName: false });
                          setIsFilled({ ...isFilled, userName: !!value });
                        }}
                        onFocus={() => setIsFocused({ ...isFocused, userName: true })}
                        placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                        onChangeText={onChange}
                        color={'#FFFFFF'}
                        style={{
                          width: '90%',
                          height: 50
                        }}
                        value={value}></TextInput>
                      <InputIconName color={isFilled.userName ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)'} />
                    </View>

                  </View>
                )}
                name="userName"
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
                      <Text style={inputsStyle.upperInputText}>E-mail address</Text>
                      {errors.email && <Text style={inputsStyle.errorInput}>This is required.</Text>}
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
                  minLength: 7,
                  required: true,
                  maxLength: 40,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={{ gap: 8 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text style={inputsStyle.upperInputText}>Password</Text>
                      {errors.password && <Text style={inputsStyle.errorInput}>This is required.</Text>}
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
                          !isLocked ? (<InputIconPass color={isFilled.password ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)'}  locked={false} />) : (<InputIconPass color={isFilled.password ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)'} locked={true} />)
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

            {/* Create acc */}
            <TouchableOpacity onPress={() => {
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
                  Create an account
                </Text>
                <Arrow color={'#FFFFFF'} />
              </View>
            </TouchableOpacity>
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
    marginVertical: 30,
    marginHorizontal: 40,
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
});