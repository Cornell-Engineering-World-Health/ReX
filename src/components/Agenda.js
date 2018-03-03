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
                title = " Blurred Vision"
                timeStamp = "6:00 PM"
                note1 = "aaaaaaaaa"
                note2 = "aaaaaaaaa"
                backgroundColor = "#ab87b8"
                iconName = "blurred-vision"
                />
            <Card
                title = " Headache"
                timeStamp = "8:00 PM"
                note1 = "aaaaaaaaa"
                note2 = "aaaaaaaaa"
                backgroundColor = "#6dd3bf"
                iconName = "headache"
                />
            <Card
                title = " Pill"
                timeStamp = "10:00 PM"
                note2 = "aaaaaaaaa"
                note1 = "aaaaaaaaa"
                backgroundColor = "#c3496b"
                iconName = "pill"
                />

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
            renderItem = {this._renderItem}
            getItemLayout = {this._getItemLayout}
            />

            </View>
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
