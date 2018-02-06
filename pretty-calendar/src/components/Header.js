import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
    return (
        <View style={headerContainer}>
            <Text style={header}>A calendar look at you.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        display: "flex",
        marginTop: 55,
        marginLeft: 23,
    },
    header: {
        fontSize: 20,
        color: '#b0b0b0',
        fontWeight: '500',
        letterSpacing: 1,
    }
})

const { headerContainer, header } = styles;

export default Header;