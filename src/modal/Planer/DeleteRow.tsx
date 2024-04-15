
import { StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import React, { useState } from 'react'
import * as Haptics from 'expo-haptics';

import { useStore } from '../../services/ZustandModalPassword';

export default function DeleteRow() {
  const modalVisible = useStore(state => state.visibleModal);
  const setModalVisible = useStore(state => state.voidVisibleModal);

  const modalVisibleDelete = useStore(state => state.visibleModalDelete);
  const setModalVisibleDelete = useStore(state => state.voidVisibleModalDelete);
  const displayModal = async () => {
    setModalVisibleDelete()
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }
  
  return (
    <View style={headerStyle.centeredView}>
      <View style={headerStyle.modalView}>
      
        <View style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 40,
        }}>
          <Text style={{
            display: 'flex',
            textAlign: 'center',
            fontFamily: 'Bold',
            color: '#FFFFFF',
            fontSize: 20,
          }}>Do you want delete?</Text>
          <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 40,
          }}>
            <TouchableOpacity onPress={displayModal} style={{
              width: '48%',
              borderRadius: 12,
              borderColor: '#262626',
              borderWidth: 1,
              backgroundColor: '#27292E',
              padding: 20
            }}>
              <Text style={{
                textAlign: 'center',
                fontFamily: 'Bold',
                color: '#8B8B8D',
                fontSize: 18,
              }}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={displayModal} style={{
              width: '48%',
              borderRadius: 12,
              borderColor: '#DF3525',
              borderWidth: 1,
              backgroundColor: '#470F0E',
              padding: 20
            }}>
              <Text style={{
                textAlign: 'center',
                fontFamily: 'Bold',
                color: '#DF3525',
                fontSize: 18,
              }}>Yes, Delete</Text>
            </TouchableOpacity>
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