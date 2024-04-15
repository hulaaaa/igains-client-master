import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pressable, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Tabs_Home from '../../assets/svg/Tabs_Home';
import Tabs_Profile from '../../assets/svg/Tabs_Profile';
import { useCallback, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Tabs_Calendar from '../../assets/svg/Tabs_Calendar';
import Tabs_Stats from '../../assets/svg/Tabs_Stats';


SplashScreen.preventAutoHideAsync();


export default function Tabs() {
    let currentRoute = useRoute().name;
    
    const navigation = useNavigation();
    const [fontsLoaded, fontError] = useFonts({
        'Regular': require('../../assets/fonts/regular.otf'),
        'RegularItalic': require('../../assets/fonts/regular-italic.otf'),
        'Light': require('../../assets/fonts/light.otf'),
        'LightItalic': require('../../assets/fonts/light-italic.otf'),
        'Bold': require('../../assets/fonts/bold.otf'),
        'BoldItalic': require('../../assets/fonts/bold-italic.otf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }
    
    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <TouchableOpacity style={styles.tabsBtn} onPress={() => { navigation.navigate("Home") }}>                
                { currentRoute === "Home" ? (
                    <>
                        <Tabs_Home color="#E0FE10"/>
                        <Text style={styles.btnTextSelect}>Home</Text>
                    </>
                ) : (
                    <>
                        <Tabs_Home color="rgba(255, 255, 255, 0.5)"/>
                        <Text style={styles.btnTextNo}>Home</Text>
                    </>
                    )
                }
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabsBtn} onPress={() => { navigation.navigate("Stat") }}>                
                { currentRoute === "Stat" ? (
                    <>
                        <Tabs_Stats color="#E0FE10"/>
                        <Text style={styles.btnTextSelect}>Statistics</Text>
                    </>
                ) : (
                    <>
                        <Tabs_Stats color="rgba(255, 255, 255, 0.5)"/>
                        <Text style={styles.btnTextNo}>Statistics</Text>
                    </>
                    )
                }
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.tabsBtn} onPress={() => { navigation.navigate("Planer") }}>                
                { currentRoute === "Planer" ? (
                    <>
                        <Tabs_Calendar color="#E0FE10"/>
                        <Text style={styles.btnTextSelect}>Planer</Text>
                    </>
                ) : (
                    <>
                        <Tabs_Calendar color="rgba(255, 255, 255, 0.5)"/>
                        <Text style={styles.btnTextNo}>Planer</Text>
                    </>
                    )
                }
            </TouchableOpacity>


            <TouchableOpacity style={styles.tabsBtn} onPress={() => { navigation.navigate("Profile") }}>                
                { currentRoute === "Profile" ? (
                    <>
                        <Tabs_Profile color="#E0FE10"/>
                        <Text style={styles.btnTextSelect}>Profile</Text>
                    </>
                ) : (
                    <>
                        <Tabs_Profile color="rgba(255, 255, 255, 0.5)"/>
                        <Text style={styles.btnTextNo}>Profile</Text>
                    </>
                    )
                }
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 0,
        width: '100%',
        justifyContent: 'space-around',
        left: 0,
        padding: 30,
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    tabsBtn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 5,
        alignItems: 'center',
    },
    btnTextNo: {
        fontFamily: 'Light',
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.5)',
    },
    btnTextSelect: {
        fontFamily: 'Light',
        fontSize: 12,
        color: '#E0FE10',
    },
})
