import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import  Card  from './Card.js';

class Agenda extends Component {

    constructor(props){
        super(props)
    }

    getItemLayout = (data, index) => (
        {length: 200, offset: 200 * index, index}
    )

    _onDelete = () => {
        console.log("hi")
    }


    _renderItem = ({item}) => (
        <View>
            <Card
<<<<<<< HEAD
                title = " Blurred Vision"
                timeStamp = "6:00 PM"
                note1 = "aaaaaaaaaaaaaaaaaaaa"
                note2 = "aaaaaaaaaaaaaaaaaaaa"
                backgroundColor = "#ab87b8"
                iconName = "blurred-vision"
                />
            <Card
                title = " Headache"
                timeStamp = "8:00 PM"
                note1 = "aaaaaaaaaaaaaaaaaaaa"
                note2 = "aaaaaaaaaaaaaaaaaaaa"
                backgroundColor = "#6dd3bf"
                iconName = "headache"
                />
            <Card
                title = " Pill"
                timeStamp = "10:00 PM"
                note2 = "aaaaaaaaaaaaaaaaaaaa"
                note1 = "aaaaaaaaaaaaaaaaaaaa"
                backgroundColor = "#c3496b"
                iconName = "pill"
                />

=======
                title = {item.title}
                timeStamp = {item.timeStamp}
                note1 = {item.note1}
                note2 = {item.note2}
                backgroundColor = {item.backgroundColor}
                iconName = {item.iconName}
                swiperActive = {true}
                buttonsRight = {[
                    {
                    onPress: (item.onPress = () => {
                        this._onDelete();
                    }),
                    text: 'Delete',
                    type: 'delete'
                }
                ]}
                />
>>>>>>> 2d8ae3e3979b3c26ce255c9e3f5d99db5bcf2936
        </View>
    );

    render() {
        return (
            <View style = {{marginLeft: 10}}>
            <View>
                <Text style = {summaryText}>Summary</Text>
            </View>
            <View style = {{height: 300}}>
            <FlatList
<<<<<<< HEAD
            data = {[{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}, {key: 'e'}, {key: 'f'}, {key: 'g'}, {key: 'h'}, {key: 'i'}]}
=======
            data = {[
                {
                    "title": " Headache",
                    "timeStamp": "8:00 PM",
                    "note1": "Ben is amazing",
                    "note2": "Can i get an A? <3",
                    "backgroundColor": "#6dd3bf",
                    "iconName": "headache",
                },
                
                {
                    "title": " Headache",
                    "timeStamp": "8:00 PM",
                    "note1": "Ben is amazing",
                    "note2": "Can i get an A? <3",
                    "backgroundColor": "#6dd3bf",
                    "iconName": "headache",
                },
                
                {
                    "title": " Headache",
                    "timeStamp": "8:00 PM",
                    "note1": "Ben is amazing",
                    "note2": "Can i get an A? <3",
                    "backgroundColor": "#6dd3bf",
                    "iconName": "headache",
                },
                
                {
                    "title": " Headache",
                    "timeStamp": "8:00 PM",
                    "note1": "Ben is amazing",
                    "note2": "Can i get an A? <3",
                    "backgroundColor": "#6dd3bf",
                    "iconName": "headache",
                },
                
                {
                    "title": " Headache",
                    "timeStamp": "8:00 PM",
                    "note1": "Ben is amazing",
                    "note2": "Can i get an A? <3",
                    "backgroundColor": "#6dd3bf",
                    "iconName": "headache",
                },
                
                {
                    "title": " Headache",
                    "timeStamp": "8:00 PM",
                    "note1": "Ben is amazing",
                    "note2": "Can i get an A? <3",
                    "backgroundColor": "#6dd3bf",
                    "iconName": "headache",
                },
                
                {
                    "title": " Headache",
                    "timeStamp": "8:00 PM",
                    "note1": "Ben is amazing",
                    "note2": "Can i get an A? <3",
                    "backgroundColor": "#6dd3bf",
                    "iconName": "headache",
                },
                
                {
                    "title": " Headache",
                    "timeStamp": "8:00 PM",
                    "note1": "Ben is amazing",
                    "note2": "Can i get an A? <3",
                    "backgroundColor": "#6dd3bf",
                    "iconName": "headache",
                },
                
                {
                    "title": " Headache",
                    "timeStamp": "8:00 PM",
                    "note1": "Ben is amazing",
                    "note2": "Can i get an A? <3",
                    "backgroundColor": "#6dd3bf",
                    "iconName": "headache",
                },
                
                {
                    "title": " Headache",
                    "timeStamp": "8:00 PM",
                    "note1": "Ben is amazing",
                    "note2": "Can i get an A? <3",
                    "backgroundColor": "#6dd3bf",
                    "iconName": "headache",
                },
                
                {
                    "title": " Headache",
                    "timeStamp": "8:00 PM",
                    "note1": "Ben is amazing",
                    "note2": "Can i get an A? <3",
                    "backgroundColor": "#6dd3bf",
                    "iconName": "headache",
                },
                
                {
                    "title": " Headache",
                    "timeStamp": "8:00 PM",
                    "note1": "Ben is amazing",
                    "note2": "Can i get an A? <3",
                    "backgroundColor": "#6dd3bf",
                    "iconName": "headache",
                },
                
                {
                    "title": " Headache",
                    "timeStamp": "8:00 PM",
                    "note1": "Ben is amazing",
                    "note2": "Can i get an A? <3",
                    "backgroundColor": "#6dd3bf",
                    "iconName": "headache",
                },
                
                {
                    "title": " Headache",
                    "timeStamp": "8:00 PM",
                    "note1": "Ben is amazing",
                    "note2": "Can i get an A? <3",
                    "backgroundColor": "#6dd3bf",
                    "iconName": "headache",
                },
                
                {
                    "title": " Headache",
                    "timeStamp": "8:00 PM",
                    "note1": "Ben is amazing",
                    "note2": "Can i get an A? <3",
                    "backgroundColor": "#6dd3bf",
                    "iconName": "headache",
                },
                
                {
                    "title": " Headache",
                    "timeStamp": "8:00 PM",
                    "note1": "Ben is amazing",
                    "note2": "Can i get an A? <3",
                    "backgroundColor": "#6dd3bf",
                    "iconName": "headache",
                },
                
                {
                    "title": " Headache",
                    "timeStamp": "8:00 PM",
                    "note1": "Ben is amazing",
                    "note2": "Can i get an A? <3",
                    "backgroundColor": "#6dd3bf",
                    "iconName": "headache",
                },
                
                {
                    "title": " Headache",
                    "timeStamp": "8:00 PM",
                    "note1": "Ben is amazing",
                    "note2": "Can i get an A? <3",
                    "backgroundColor": "#6dd3bf",
                    "iconName": "headache",
                },
                
                {
                    "title": " Headache",
                    "timeStamp": "8:00 PM",
                    "note1": "Ben is amazing",
                    "note2": "Can i get an A? <3",
                    "backgroundColor": "#6dd3bf",
                    "iconName": "headache",
                },
                
                {
                    "title": " Headache",
                    "timeStamp": "8:00 PM",
                    "note1": "Ben is amazing",
                    "note2": "Can i get an A? <3",
                    "backgroundColor": "#6dd3bf",
                    "iconName": "headache",
                },
            ]}
>>>>>>> 2d8ae3e3979b3c26ce255c9e3f5d99db5bcf2936
            renderItem = {this._renderItem}
            getItemLayout = {this._getItemLayout}
            />
<<<<<<< HEAD

=======
            </View>
            </View>
>>>>>>> 2d8ae3e3979b3c26ce255c9e3f5d99db5bcf2936
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
    },
    summaryText: {
        fontSize: 25,
        fontWeight: "400",
        letterSpacing: 1.0,
        color: '#b8b8b8',
        marginLeft: 10,

    }
});

const { summaryText, summaryHead, summary, eventCard, cardElements, eventSquare } = styles;

export default Agenda;
