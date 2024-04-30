import {  Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TrainingCourse({ allEx = {}, navigation }) {
  const [categories, setCategories] = useState({});
  useEffect(() => {
    setCategories(allEx);
  }, [allEx]);

  return (
    <ScrollView pagingEnabled={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} horizontal={true} style={styles.container}>
      {Object.keys(categories).map((category, index) => (
        <TouchableOpacity key={index} style={styles.taskG} onPress={async() => {
          navigation.navigate('SelectWork', { category: category });
        }}>
          <View style={styles.innerTask}>
            <Image style={styles.images} source={{uri:categories[category]}} />
            <Text style={styles.innerText}>{category}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 120,
  },
  innerTask: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#17181B',
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 15,
    padding: 8,
    gap: 7,
    width: 100,
  },
  innerText: {
    fontFamily: 'Regular',
    fontSize: 13,
    color: 'white',
  },
  images : {
    width: '100%',
    height: '66%',
    borderRadius: 5,
  }
})