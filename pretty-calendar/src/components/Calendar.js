import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { prevMonth, nextMonth } from '../actions/calendar';
import {connect} from 'react-redux';
import { Swiper } from 'react-native-swiper';

const { width } = Dimensions.get("window");

class Calendar extends Component {
    static propTypes = {
      dispatch: PropTypes.func,
      currMonth: PropTypes.object,
    };

    constructor(props){
        super(props)

        let backgroundColor = [];

        var today = this.props.currMonth;
        var numberOfDays = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();

        for (var i = 0; i < numberOfDays; i++){
            backgroundColor.push(0);
        }

        let circles = new Array(numberOfDays);

        for (var i = 0; i < numberOfDays; i++){
            circles[i] = [generic, generic, generic];
        }

        this.state = {
            backgroundColor: backgroundColor,
            selected: 0,
            circles: circles,
        }
        this._onDatePress = this._onDatePress.bind(this);
    }

    _onDatePress = (i) => {

        let backgroundColor = [];
        backgroundColor[i] = 1;

        let circles = this.state.circles;
        for (var x = 0; x < 3; x++){
            if (circles[i][x] == generic){
                circles[i][x] = genericGray;
            }
            if (circles[this.state.selected][x] == genericGray){
                circles[this.state.selected][x] = generic;
            }
        }

        this.setState({ selected: i });

        this.setState({ circles });

        this.setState({ backgroundColor });
        
        //this.props.dispatch(prevMonth());
    }

    _onTitlePress = () => {

        this.props.dispatch(nextMonth());
    }

    _onHeadachePress = () => {
        
        let circles = this.state.circles;
        circles[this.state.selected][0] = headache;

        this.setState({ circles });
    }

    _onBlurredPress = () => {
        
        let circles = this.state.circles;
        circles[this.state.selected][1] = blurred;

        this.setState({ circles });
    }

    _onPillPress = () => {

        let circles = this.state.circles;
        circles[this.state.selected][2] = pill;

        this.setState({ circles });
    }

    dateStyle = function(i) {
        return {
            margin: 2,
            width: Dimensions.get('window').width / 7 -9,
            justifyContent: 'center',
            alignItems: 'center',
            height: 43,
            backgroundColor: this.state.backgroundColor[i],
        }
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
        var today = this.props.currMonth;
        return months[today.getMonth()];
    }

    renderYear() {
        var today = this.props.currMonth;
        return today.getFullYear();
    }

    renderDates() {
        const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
        var today = this.props.currMonth;
        var numberOfDays = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();
        var last = new Date(today.getFullYear(), today.getMonth(), numberOfDays);

        var dateGrid = days.slice(0, numberOfDays);

        return dateGrid.map((day, i) => {
            let dateStyle = this.state.backgroundColor[i] ? altItem : item
            let textStyle = this.state.backgroundColor[i] ? altDate : date
            return(
                <TouchableOpacity style = {dateStyle} key = {i} onPress={() => this._onDatePress(i)}>
                    <View>
                            <Text style={textStyle}>
                                {day}
                            </Text>
                            <View style = {circles}>
                                <View style = {this.state.circles[i][0]} />
                                <View style = {this.state.circles[i][1]} />
                                <View style = {this.state.circles[i][2]} />
                            </View>
                    </View>
                    </TouchableOpacity>

            );
        });

    }

    renderPreviousDates() {
        const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
        var today = this.props.currMonth;
        var first = new Date(today.getFullYear(), today.getMonth(), 1);
        var firstDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();


        if (first.getDay() != 0){
            var previousGrid = days.slice(firstDays - first.getDay(), firstDays);
        }
        if(previousGrid){
            return previousGrid.map((day, i) => {
                return(
                    <View style = {item}  key={i}>
                        <Text style={dateGray}>
                                {day}
                        </Text>
                    </View>
                )
            })
        }
    }

    renderNextDates() {
        const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
        var today = this.props.currMonth;
        var numberOfDays = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();
        var last = new Date(today.getFullYear(), today.getMonth(), numberOfDays);

        if (last.getDay() != 6){
            var nextGrid = days.slice(0, 6 - last.getDay());
        }
        if(nextGrid){
            return nextGrid.map((day, i) => {
                return(
                    <View style = {item} key={i}>
                        <Text style={dateGray}>
                                {day}
                        </Text>
                    </View>
                )
            })
      }
    }

    render() {
        return (
            <View>
            <View style= {head}>
            <TouchableOpacity onPress = {() => this._onTitlePress()}>
                <View style= {header}>
                    <Text style= {month}> { this.renderMonth() }</Text>
                    <Text style= {year}> {this.renderYear() }</Text>
                </View>
            </TouchableOpacity>

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
            <View style = {buttons}>
                <Button title = "Headache" onPress = {() => this._onHeadachePress()} backgroundColor = "#ab87b8" />
                <Button title = "Blurred Vision" onPress = {() => this._onBlurredPress()} backgroundColor = "#6dd3bf" />
                <Button title = "Took a Pill" onPress = {() => this._onPillPress()} backgroundColor = "#c3496b" />
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
    altDate: {
        fontWeight: '500',
        fontSize: 20,
        color: '#ffffff',
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
        margin: 2,
        width: Dimensions.get('window').width / 7 -9,
        justifyContent: 'center',
        alignItems: 'center',
        height: 43,
        backgroundColor: '#727272',
     },
     circles: {
        display: "flex",
        flexDirection: "row",
        marginTop: 4,
        marginLeft: 1,
     },
     generic: {
        width: 4,
        height: 4,
        borderRadius: 2,
        marginLeft: 2,
        backgroundColor: "#ffffff",
     },
     genericGray: {
        width: 4,
        height: 4,
        borderRadius: 2,
        marginLeft: 2,
        backgroundColor: "#727272",
     },
     headache: {
         width: 4,
         height: 4,
         borderRadius: 2,
         marginLeft: 2,
         backgroundColor: "#ab87b8",
     },
     blurred: {
        width: 4,
        height: 4,
        borderRadius: 2,
        marginLeft: 2,
        backgroundColor: "#6dd3bf",
     },
     pill: {
        width: 4,
        height: 4,
        borderRadius: 2,
        marginLeft: 2,
        backgroundColor: "#c3496b",
     },
     buttons: {
         display: "flex",
         flexDirection: "column",
         marginTop: 250,
     }
});

const { head, header, header2, date, altDate, dateGray, week, month, year, tiles, item, altItem, circles, generic, genericGray, headache, blurred, pill, buttons } = styles;

const mapStateToProps = (state) => {
  return{
    currMonth: state.calendar.currMonth,
  };
};
export default connect(mapStateToProps)(Calendar);
