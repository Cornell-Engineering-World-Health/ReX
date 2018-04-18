import React, { Component, PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles/SliderEntry.style';
import Calendar from './Calendar.js';

export default class SliderEntry extends PureComponent {

    static propTypes = {
        data: PropTypes.object.isRequired,
        onPressMonth: PropTypes.func,
        pickerHandler: PropTypes.func,
    };

    calendarHeight = () => {
        var today = this.props.data
        var numberOfDays = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate()
        var last = new Date(today.getFullYear(), today.getMonth(), numberOfDays)
        var first = new Date(this.today.getFullYear(), this.today.getMonth(), 1)
        var firstDays = new Date(this.today.getFullYear(), this.today.getMonth(), 0).getDate()
        console.log("number of days?")
        console.log(firstDays)
        // if (first.getDay() != 0){
        //     var numberOfPrevious = firstDays - first.getDay()
        // }
    }


    render () {
        console.log("wassup")
        const { data } = this.props;
        // {this.calendarHeight}
        return (
            <View style={styles.slideInnerContainer}>
                <View style={[styles.imageContainer]}>
                    <Calendar
                      ref={(ref) => { this.calendar = ref; }}
                      currMonth={ data }
                      onPressMonth={this.props.onPressMonth}
                      pickerHandler={this.props.pickerHandler}
                    />
                  <View style={[styles.radiusMask]} />
                </View>
            </View>
        );
    }
}
