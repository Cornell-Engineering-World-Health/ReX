import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  StatusBar,
  Image,
  FlatList,
  List
} from 'react-native';
import ButtonWithImage from '../Button/ButtonWithImage';
import CalendarScreen from '../screens/CalendarScreen';
import Moment from 'moment';
import Swipeout from 'react-native-swipeout';
import Card from '../Card/Card';
import testData from '../Resources/CardTestData';

class FlatListScreenTest extends React.Component {
  static propTypes = {
    route: PropTypes.shape({
      title: PropTypes.string
    }),
    navigator: PropTypes.object,
    currentDate: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      activeRowKey: null,
      data: testData
    };
  }
  _onOpen(id) {
    console.log(id);
  }
  _onClose() {
    console.log('close: ');
  }
  render() {
    // Buttons
    var deleteButton = [
      {
        text: 'Delete',
        type: 'delete'
      }
    ];
    return (
      <FlatList
        data={this.state.data}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => {
          console.log(index);
          return (
            <Card
              image={item.image}
              title={item.title}
              timeStamp={item.timeStamp}
              note1={item.note1}
              note2={item.note2}
              backgroundColor={item.backgroundColor}
              swiperActive={item.swiperActive}
              buttonActive={item.buttonActive}
              iconName={item.iconName}
              buttonsRight={deleteButton}
              buttonsLeft={item.buttonsLeft}
              onPress={item.onPress}
              onOpenSwipeout={
                (item.onPress = () => {
                  this._onOpen(item.id);
                })
              }
              onCloseSwipeout={this._onClose}
            />
          );
        }}
      />
    );
  }
}

export default FlatListScreenTest;
