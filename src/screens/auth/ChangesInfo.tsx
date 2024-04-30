import DateTimePicker from '@react-native-community/datetimepicker';
import { RulerPicker } from 'react-native-ruler-picker';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions, TextInput, SafeAreaView } from 'react-native'
import React, { useCallback, useState } from 'react'
import * as Haptics from 'expo-haptics';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChangesInfo() {
  const navigation = useNavigation()
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);

  async function putchInfo() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const token = await AsyncStorage.getItem('token');
    const email = await AsyncStorage.getItem('email');
    const url = `http://192.168.0.214:8090/api/users/change`;

    const birthdayYear = selectedDate.getFullYear();
    const birthdayMonth = selectedDate.getMonth() + 1;
    const birthdayDay = selectedDate.getDate();

    if (
      currentYear < birthdayYear ||
      (currentYear === birthdayYear && currentMonth < birthdayMonth) ||
      (currentYear === birthdayYear && currentMonth === birthdayMonth && currentDay < birthdayDay)
    ) {
      console.error('Неправильна дата народження');
      return;
    }

    let age = currentYear - birthdayYear;
    if (currentMonth < birthdayMonth || (currentMonth === birthdayMonth && currentDay < birthdayDay)) {
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

    fetch(url, requestOptions)
      .then(response => {
        return response.text();
      })
      .catch(err => console.log(err))
      .finally(() => {navigation.navigate('Home')});
  }
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
              <View style={{width: "100%",gap: 10}}>
                <Text style={{
                  fontFamily: 'Regular',
                  color: '#FFFFFF',
                  fontSize: 16,
                }}>Set your birthdate</Text>
                <View style={{flexDirection:'row-reverse',justifyContent:'space-between',alignItems:'center'}}>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => setSelectedDate(selectedDate)}
                  />
                  <Text style={{fontFamily: 'Bold', color: '#FFFFFF', fontSize: 17,}}>Age: {calculateAge(selectedDate)}</Text>
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

const calculateAge = (birthdate) => {
  const currentDate = new Date();
  const birthdateYear = birthdate.getFullYear();
  const birthdateMonth = birthdate.getMonth() + 1;
  const birthdateDay = birthdate.getDate();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  let age = currentYear - birthdateYear;
  if (
    currentMonth < birthdateMonth ||
    (currentMonth === birthdateMonth && currentDay < birthdateDay)
  ) {
    age--;
  }
  return age;
};
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