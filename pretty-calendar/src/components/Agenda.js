import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import  Card  from './Card.js';

class Agenda extends Component {
    
    constructor(props){
        super(props)
    }

    _renderItem = ({item}) => (
        <View>
            <Card
                title = " Blurred Vision"
                timeStamp = "6:00 PM"
                note1 = "Don'ta toucha"
                note2 = "My spaghetti!"
                backgroundColor = "#ab87b8"
                iconName = "blurred-vision"
                />
            <Card
                title = " Headache"
                timeStamp = "8:00 PM"
                note1 = "Mamma Mia"
                note2 = "My head is in pain!"
                backgroundColor = "#6dd3bf"
                iconName = "headache"
                />
            <Card
                title = " Pill"
                timeStamp = "10:00 PM"
                note1 = "Lots of Drugs"
                note2 = "Good for the soul"
                backgroundColor = "#c3496b"
                iconName = "pill"
                />
        </View>
    );
    
    render() {
        return (
            <View style = {{flex: 1}}>
            <FlatList
            data = {[{key: 'a'}]}
            renderItem = {this._renderItem}

            />
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    summaryHead: {
        marginTop: 240,
        marginLeft: 23,
        display: "flex",
    },
    summary: {
        display: "flex",
        fontSize: 23,
        fontWeight: '400',
        color: '#b0b0b0',
    },
    eventCard: {
        //marginTop:10,
        //paddingTop:15,
        //paddingBottom:15,
        //marginLeft:30,
        //marginRight:30,
        borderRadius:10,
        borderWidth: 1,
        padding: 0,
        //borderColor: '#fff',
        shadowColor: '#b0b0b0',
        shadowOffset: { width: 2, height: 3},
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 1,
    },
    cardElements: {
        display: "flex",
        flexDirection: "row",
    },
    eventSquare: {
        width: 80,
        height: 80,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#7FDECB',
        backgroundColor: '#7FDECB',
    }
});

const { summaryHead, summary, eventCard, cardElements, eventSquare } = styles;

export default Agenda;