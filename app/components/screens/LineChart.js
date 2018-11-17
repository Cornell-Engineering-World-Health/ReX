
import {LineChart} from 'react-native-chart-kit'
import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native'
import {BarChart, Grid} from 'react-native-svg-charts'

const data = [1,2,3,4,5,13,2,3,4,5,1,1,2,2,23,1,7]
export default class Line extends React.Component{
    
    constructor(props){
        super(props)
    }
    render(){
        return <BarChart style = {{height: 200}} data = {data} svg = {{fill}} contentInset = {{top:30,bottom:30}} />
    }
}