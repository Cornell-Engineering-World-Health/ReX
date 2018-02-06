import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get("window");


class Calendar extends Component {

    constructor(props){
        super(props)
        this.state = {
            backgroundColor: [],
        }
        this._onDatePress = this._onDatePress.bind(this);
    }

    _onDatePress = (i, numberOfDays) => {
        console.log("You clicked on sumting u bish");
        let backgroundColor = [];

        for (var i = 0; i < numberOfDays; i++){
            backgroundColor.push('white');
        }
        
        backgroundColor[i] = '#ffff00';

        //this.setState({ backgroundColor });
    }
    
    renderWeek() {
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        return days.map((day) => {
            return(
                <Text key={day} style= {week}>{day}</Text>
            );
        });
    }
    
    renderMonth() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var today = new Date();
        return months[today.getMonth()];
    }

    renderYear() {
        var today = new Date();
        return today.getFullYear();
    }

    renderDates() {
        const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
        var today = new Date();
        var numberOfDays = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();
        var last = new Date(today.getFullYear(), today.getMonth(), numberOfDays);

        var backgroundColor = []
        

        //this.setState({ backgroundColor});
        
        var dateGrid = days.slice(0, numberOfDays);

        return dateGrid.map((day, i) => {
            return(
                    <View style = {[item, {backgroundColor: this.state.backgroundColor[i]}]} key={i}>
                        <TouchableOpacity>
                            <Text style={date}> 
                                {day} 
                            </Text>
                        </TouchableOpacity>
                    </View>
            );
        });
        
    }

    renderPreviousDates() {
        const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
        var today = new Date();
        var first = new Date(today.getFullYear(), today.getMonth(), 1);
        var firstDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();

        if (first.getDay() != 0){
            var previousGrid = days.slice(firstDays - first.getDay(), firstDays);
        }
            return previousGrid.map((day, i) => {
                return(
                    <View style = {item}  key={i}>
                        <TouchableOpacity>
                            <Text style={dateGray}> 
                                {day} 
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            })
    }

    renderNextDates() {
        const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
        var today = new Date();
        var numberOfDays = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();
        var last = new Date(today.getFullYear(), today.getMonth(), numberOfDays);

        if (last.getDay() != 6){
            var nextGrid = days.slice(0, 6 - last.getDay());
        }
            return nextGrid.map((day, i) => {
                return(
                    <View style = {item} key={i}>
                        <TouchableOpacity>
                            <Text style={dateGray}>
                                {day} 
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            })

    }

    render() {
        this.renderDates();
        return (
            <View>
            <View style= {head}>
                <View style= {header}>
                    <Text style= {month}> { this.renderMonth() }</Text>
                    <Text style= {year}> {this.renderYear() }</Text>
                </View>
                <View style= {header2}>
                    { this.renderWeek() }
                </View>
            </View>
            <View>
                <View style = {tiles}>
                    { this.renderPreviousDates() }
                    { this.renderDates() }
                    { this.renderNextDates() }
                </View>
            </View>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    head: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
    },
    header: {
        display: "flex",
        flexDirection: "row",
        marginTop: 15,
        marginLeft: 17,
        
    },
    header2: {
        display: "flex",
        flexDirection: "row",
        marginTop: 10,

    },
    date: {
        fontWeight: '500',
        fontSize: 20,
    },
    dateGray: {
        fontWeight: '500',
        fontSize: 20,
        color: '#b8b8b8',
    },
    week: {
        fontWeight: "bold",
        fontSize: 15,
        color: '#b8b8b8',
        marginLeft: 23,
    },
    month: {
        fontWeight: "bold",
        fontSize: 25,
        color: '#373737',
    },
    year: {
        fontSize: 25,
        color: '#b0b0b0',
        fontWeight: '300',
    },
    tiles: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 2,
        marginLeft: 10,
     },
    item: {
        
       margin: 2,
       width: Dimensions.get('window').width / 7 -9,
       justifyContent: 'center',
       alignItems: 'center',
       height: 43,
     },
     altItem: {
         backgroundColor: 'yellow',
     }
});

const { head, header, header2, date, dateGray, week, month, year, tiles, item, altItem } = styles;

export default Calendar;