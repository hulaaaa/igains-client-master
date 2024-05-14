import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchBarIcon from '../../assets/svg/SearchBarIcon'
import { SelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';

export default function SearchBar() {
    const [selected, setSelected] = React.useState("");
    const [allEx, setAllEx] = React.useState([]);
    const [allExer, setAllExer] = React.useState([]);
    const navigation = useNavigation();


    const getAllExercises = async () => {
      try {
        const url = `http://192.168.0.214:8090/exercise/getall`;
        const response = await fetch(url);
        if (!response.ok) { throw new Error('Failed to fetch exercises')}
        const data = await response.json();
        setAllExer(data)
        const categoriesMap = [{}];
        data.forEach((item, index) => { categoriesMap[index] = item.exerciseTitle });
        setAllEx(categoriesMap);
      } catch (error) {
        console.error(error);
      }
    };
    const getCategory = (title) => {
      for (const iterator of allExer) {
        if(iterator.exerciseTitle == title){
          navigation.navigate('SelectWork', { category: iterator.exerciseCategory });
        }
      }
    }
    useEffect(()=>{
      getCategory(selected)
    },[selected])
    useEffect(()=>{
      getAllExercises()
    },[])
    return (
        <View >
             <SelectList
                setSelected={(val) => setSelected(val)} 
                fontFamily='Light'
                searchicon={ <View style={{marginRight: 5}}><SearchBarIcon /></View>}
                boxStyles={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: Dimensions.get('screen').width - 50,
                  justifyContent: 'flex-start',
                  backgroundColor: '#17181B',
                  paddingHorizontal: 13,
                  paddingVertical: 16,
                  borderRadius: 12,
                }}
                inputStyles={{
                  fontFamily: 'Light',
                  width: '100%',
                  fontSize: 14,
                  
                  color: 'rgba(255, 255, 255, 0.5)',
                }}
                dropdownTextStyles={{
                  fontFamily: 'Light',
                  width: '100%',
                  fontSize: 14,
                  color: 'rgba(255, 255, 255, 0.5)',
                }}
                placeholder={"Search your exercise"}
                searchPlaceholder={"Search your exercise"}
                data={allEx} 
                save="value"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'flex-start',
        backgroundColor: '#17181B',
        paddingHorizontal: 13,
        paddingVertical: 16,
        borderRadius: 12,
    },
    text: {
        fontFamily: 'Light',
        width: '100%',
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.5)',
    }
})