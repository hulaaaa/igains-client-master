import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

interface Task {
  title: string;
  image: any;
  isNew: boolean;
}

export default function TrainingCourse() {
  let tasks: Task[] = [
    {
      title: "Full Strenght Legs and dick",
      image: {uri: "https://firebasestorage.googleapis.com/v0/b/i-gains.appspot.com/o/Image%20Home%20Screen%2F1.png?alt=media&token=3dacd2f4-6fb4-4bcb-9879-f3c823f0c03c"},
      isNew: true,
    },
    {
      title: "Full Strenght Tits and boobs",
      image: {uri: "https://firebasestorage.googleapis.com/v0/b/i-gains.appspot.com/o/Image%20Home%20Screen%2F2.png?alt=media&token=d38205e5-b3b1-4cec-8e44-76c80054c4d9"},
      isNew: false,
    },
    {
      title: "Full Strenght Legs and dick",
      image: {uri: "https://firebasestorage.googleapis.com/v0/b/i-gains.appspot.com/o/Image%20Home%20Screen%2F1.png?alt=media&token=3dacd2f4-6fb4-4bcb-9879-f3c823f0c03c"},
      isNew: false,
    },
    {
      title: "Gym",
      image: {uri: "https://firebasestorage.googleapis.com/v0/b/i-gains.appspot.com/o/Image%20Home%20Screen%2F2.png?alt=media&token=d38205e5-b3b1-4cec-8e44-76c80054c4d9"},
      isNew: false,
    },
    {
      title: "Stretching",
      image: {uri: "https://firebasestorage.googleapis.com/v0/b/i-gains.appspot.com/o/Image%20Home%20Screen%2F1.png?alt=media&token=3dacd2f4-6fb4-4bcb-9879-f3c823f0c03c"},
      isNew: true,
    },
  ]
  const navigation = useNavigation<any>();

  return (
    <ScrollView pagingEnabled={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} horizontal={true} style={styles.container}>
      {
        tasks.map((item, index) => {
          return (
            <TouchableOpacity key={index} style={styles.taskG} onPress={()=>navigation.navigate('SelectWork')} >
              {
                item.isNew ? (
                  <View style={styles.innerTaskDone}>
                      <Image style={styles.images} source={item.image}  />
                  </View>
                ) : (
                  <View style={styles.innerTask}>
                    <Image style={styles.images} source={item.image} />
                  </View>
                )
              }
              <Text numberOfLines={2} style={styles.innerText}>{item.title}</Text>
            </TouchableOpacity>
          )
        })
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 'auto',
  },
  taskG: {
    width: 103,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    backgroundColor: '#17181B',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 15,
    padding: 10,
  },
  innerTask: {
    width: '90%',
    aspectRatio: 1/1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerTaskDone: {
    width: '90%',
    aspectRatio: 1/1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerText: {
    fontFamily: 'Regular',
    fontSize: 13,
    color: 'white',
  },
  images : {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  }
})