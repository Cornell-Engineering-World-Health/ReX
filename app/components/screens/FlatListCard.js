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
import ButtonSelector from '../MenuBar/ButtonSelector';
import Moment from 'moment';
import Card from '../Card/Card';

import Modal from 'react-native-modal';
import GestureRecognizer from 'react-native-swipe-gestures';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: 'black'
  }
});
class FlatListCard extends React.Component {
  static propTypes = {
    data: PropTypes.array
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: this.props.data
    };
  }
  _onDelete(id) {
    for (let i = 0; i < this.props.data.length; i++) {
      if (this.props.data[i].id == id) {
        this.props.data.splice(i, 1);
      }
    }
  }
  render() {
    // Buttons

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'blue'} barStyle={'light-content'} />
        <FlatList
          data={this.props.data}
          keyExtractor={item => item.id}
          extraData={this.props}
          renderItem={({ item, index }) => {
            return (
              <Card
                cardData={item.cardData}
                image={item.image}
                title={item.title}
                timeStamp={item.timeStamp}
                note1={item.note1}
                note2={item.note2}
                backgroundColor={item.backgroundColor}
                swiperActive={item.swiperActive}
                buttonActive={item.buttonActive}
                iconName={item.iconName}
                buttonsRight={[
                  {
                    onPress: (item.onPress = () => {
                      this._onDelete(item.id);
                    }),

                    text: 'Delete',
                    type: 'delete'
                  }
                ]}
                buttonsLeft={item.buttonsLeft}
                onCloseSwipeout={this._onClose}
              />
            );
          }}
        />
      </View>
    );
  }
}

export default FlatListCard;
