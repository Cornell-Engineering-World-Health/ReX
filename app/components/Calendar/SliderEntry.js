import React, { Component, PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles/SliderEntry.style';
import Calendar from './Calendar.js';

export default class SliderEntry extends PureComponent {

    static propTypes = {
        data: PropTypes.object.isRequired,
        onPressMonth: PropTypes.func
    };


    render () {
        const { data } = this.props;
        return (
            <View style={styles.slideInnerContainer}>
                <View style={[styles.imageContainer]}>
                    <Calendar
                      currMonth={ data }
                      onPressMonth={this.props.onPressMonth}
                    />
                  <View style={[styles.radiusMask]} />
                </View>
            </View>
        );
    }
}
