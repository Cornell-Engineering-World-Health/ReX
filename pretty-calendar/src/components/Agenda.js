import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';

class Agenda extends Component {
    
    constructor(props){
        super(props)
    }
    
    render() {
        return (
            <View>
                <View style = {summaryHead}>
                    <Text style = {summary}>
                        Summary
                    </Text>
                </View>
                <Card containerStyle = {eventCard}>
                    <View style = {cardElements}>
                        <View style = {eventSquare} />
                        <Text>Headache</Text>
                    </View>
                </Card>
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