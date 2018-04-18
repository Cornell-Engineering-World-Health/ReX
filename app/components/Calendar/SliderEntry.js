import React, { Component, PureComponent } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
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
        var first = new Date(today.getFullYear(), today.getMonth(), 1)
        var firstDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate()
        var numberOfPrevious = first.getDay()
        var numberOfAfter = 6 - last.getDay()
        var total = numberOfDays + numberOfPrevious + numberOfAfter
        if (total == 35){
            height = Dimensions.get('window').height * 0.50
        }
        else {
            height = Dimensions.get('window').height * 0.56
        }
        return(height)
        // if (first.getDay() != 0){
        //     var numberOfPrevious = firstDays - first.getDay()
        // }
    }

    render () {
        const { data } = this.props;
        return (
            <View style={styles.slideInnerContainer} height = {this.calendarHeight()}>
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
