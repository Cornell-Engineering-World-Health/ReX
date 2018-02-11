import React from 'react';
import PropTypes from 'prop-types';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { StyleSheet, View, StatusBar } from 'react-native';
import ButtonWithImage from '../Button/ButtonWithImage';

const vacation = { key: 'vacation', color: 'red', selectedColor: 'blue' };
const massage = { key: 'massage', color: 'blue', selectedColor: 'blue' };
const workout = { key: 'workout', color: 'green' };

const styles = {
  calendarTheme: {
    backgroundColor: '#ffffff',
    calendarBackground: '#ffffff',
    textSectionTitleColor: '#ff0027',
    dayTextColor: '#000000',
    textDayFontSize: 25,
    textMonthFontSize: 35,
    textDayHeaderFontSize: 16,
    monthTextColor: '#e9b744'
  },
  calendarStyle: {
    borderWidth: 1,
    borderColor: 'gray'
  },
  container: {
    justifyContent: 'space-between'
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
};

class main extends React.Component {
  static propTypes = {
    route: PropTypes.shape({
      title: PropTypes.string
    }),
    navigator: PropTypes.object
  };

  _handlePress = () => {
    this.props.navigator.pop();
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <ButtonWithImage
            onPress={this._handlePress}
            imageSource={require('../Resources/back.png')}
          />
        </View>
        <CalendarList
          markedDates={{
            '2018-01-16': { marked: true },
            '2018-01-17': { marked: true },
            '2018-01-18': { marked: true, dots: [vacation, massage, workout] },
            '2018-01-31': {
              selected: true,
              marked: true,
              dots: [vacation, workout]
            }
          }}
          markingType={'multi-dot'}
          theme={styles.calendarTheme}
          style={styles.calendarStyle}
        />
      </View>
    );
  }
}

export default main;
