import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function HeaderText({first,second}:any) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{first}</Text>
            <TouchableOpacity style={{padding: 10,}}>
                {second}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
    },
    text: {
        fontFamily: 'Regular',
        fontSize: 21,
        color: 'white',
    }
})