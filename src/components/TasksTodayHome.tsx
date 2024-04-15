import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ProgressCircle from 'react-native-progress-circle'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import DoneIcon from '../../assets/svg/DoneIcon';
import GymIcon from '../../assets/svg/SportIcon/GymIcon';
import RunningIcon from '../../assets/svg/SportIcon/RunningIcon';
import SwimmingIcon from '../../assets/svg/SportIcon/SwimmingIcon';
import SniperIcon from '../../assets/svg/SniperIcon';
import ShinyStartIcon from '../../assets/svg/ShinyStartIcon';
import GhostIcon from '../../assets/svg/GhostIcon';
import { useNavigation } from '@react-navigation/native';

interface Task {
    title: string;
    icon: any,
    present: number;
}

export default function TasksTodayHome() {
  
  const navigation = useNavigation<any>();
  let tasks: Task[] = [
      {
          title: "Shiny Star",
          icon: <ShinyStartIcon/>,
          present: 100,
      },
      {
          title: "Sniper",
          icon: <SniperIcon/>,
          present: 30,
      },
      {
          title: "Ghost",
          icon: <GhostIcon/>,
          present: 10,
      },
      {
          title: "First Sweat",
          icon: <ShinyStartIcon/>,
          present: 0,
      },
  ]
    return (
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} horizontal={true} style={styles.container}>
            {
                tasks.map((item, index) => {
                    return (
                        <TouchableOpacity onPress={()=>navigation.navigate('Profile')}
                        key={index} style={styles.taskG}>
                            {
                                item.present==100 ? (
                                  <AnimatedCircularProgress
                                  size={75}
                                  width={6}
                                  fill={item.present}
                                  rotation={0}
                                  tintColor="#E0FE10"
                                  duration={800}
                                  backgroundColor="#282728">
                                  {

                                    (fill) => (
                                      <DoneIcon/>
                                    )
                                  }
                                </AnimatedCircularProgress>
                                ) : (
                                  <AnimatedCircularProgress
                                    size={75}
                                    width={6}
                                    fill={item.present}
                                    rotation={0}
                                    tintColor="#E0FE10"
                                    backgroundColor="#282728">
                                    {
                                      (fill) => (
                                        <View >
                                          {item.icon}
                                        </View>
                                      )
                                    }
                                  </AnimatedCircularProgress>
                                )
                            }

                            <Text style={styles.innerText}>{item.title}</Text>
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
        display: 'flex',
        flexDirection: 'column',
        gap: 7,
        marginRight: 19,
        alignItems: 'center',
        borderRadius: 10,
    },
    innerTask: {
        width: 73,
        height: 73,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        borderColor: '#282728',
        borderWidth: 4,
        borderRadius: 10,
    },
    innerTaskDone: {
        width: 73,
        height: 73,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#17181B',
        borderColor: '#282728',
        borderWidth: 4,
        borderRadius: 10,
    },
    innerText: {
        fontFamily: 'Regular',
        fontSize: 15,
        color: 'white',
    }
})