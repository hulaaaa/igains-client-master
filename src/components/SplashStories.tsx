import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import * as Haptics from 'expo-haptics';


export default function SplashStories() {
    const welcomeStories: string[] = [
        "Create Body of Your Dream%Choose from our library or create your personal trainings plans",
        "Suck Your own Dick%And improve your sucking skills, do it everywhere",
        "Fuck My Mother Everyday%Then you can try with pretty boy and any girl from your class",
    ]
    const width = Dimensions.get('window').width - 50;
    const [changedIndex, setChangedIndex] = useState(0)

    return (
        <View style={styles.storiesDiv}>
            <Carousel
                data={welcomeStories}
                layout={'default'}
                loop={true}
                sliderWidth={width}
                sliderHeight={100}
                autoplay={false}
                onSnapToItem={(index) => {
                    setChangedIndex(index)
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                }}
                itemWidth={width}
                itemHeight={100}
                renderItem={({ item, index }) => (
                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 20,
                    }}>
                        {
                            item.split('%').map((el, index) => {
                                return index == 0 ? (
                                    <Text key={index} style={{
                                        fontFamily: 'Bold',
                                        fontSize: 38,
                                        color: '#FFFFFF',
                                        textAlign: 'center',
                                    }}>
                                        {el}
                                    </Text>
                                ) : (
                                    <Text key={index} style={{
                                        fontFamily: 'Light',
                                        fontSize: 18,
                                        color: '#FFFFFF',
                                        textAlign: 'center',
                                    }}>
                                        {el}
                                    </Text>
                                )
                            })
                        }
                    </View>
                )}
            />
            <Pagination
                activeDotIndex={changedIndex}
                dotsLength={welcomeStories.length}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.7}
                animatedFriction={2}
                animatedDuration={100}
                dotStyle={{
                    width: 28,
                    height: 7,
                    borderRadius: 20,
                    marginHorizontal: -6,
                    backgroundColor: '#E0FE10'
                }}
                inactiveDotStyle={{
                    width: 23,
                    height: 11,
                    borderRadius: 20,
                    backgroundColor: 'rgba(255, 255, 255, 0.5)'
                }}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    storiesDiv: {
        display: 'flex',
        height: 225,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 0,
        margin: 0,
    },

})


