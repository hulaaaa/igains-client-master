import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import SearchBarIcon from '../../assets/svg/SearchBarIcon'

export default function SearchBar() {
    const [searchValue, setSearchValue] = useState('');
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', gap: 15 }}>
                <SearchBarIcon />
                <TextInput 
                    style={styles.text} 
                    onChangeText={setSearchValue}
                    value={searchValue}
                    placeholder="Search your exercise" 
                    placeholderTextColor="rgba(255, 255, 255, 0.5)" 
                />
            </View>
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