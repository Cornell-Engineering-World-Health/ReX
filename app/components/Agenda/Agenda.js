import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity
} from 'react-native';
import Card from '../Card/Card.js';
import { COLOR } from '../Resources/constants';

class Agenda extends Component {
  static propTypes = {
    onPressAgenda: PropTypes.func,
    agendaInfo: PropTypes.array,
    date: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  _onDelete = () => {
    console.log('Deleted Item');
  };

  _keyExtractor = (item, index) => item.id;

  _renderAgenda() {
    if (this.props.agendaInfo) {
      return (
        <FlatList
          data={this.props.agendaInfo}
          keyExtractor={item => item.id}
          extraData={this.props}
          renderItem={({ item, index }) => {
            return (
              <Card
                image={item.image}
                title={item.title}
                cardData={item.cardData}
                timeStamp={item.timeStamp}
                note1={item.note1}
                note2={item.note2}
                backgroundColor={item.backgroundColor}
                swiperActive={true}
                buttonActive={true}
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
                onPress={this.props.onPressAgenda}
              />
            );
          }}
        />
      );
    } else {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 50, textAlign: 'center' }}>
            Woo Hoo! Nothing happened today!
          </Text>
        </View>
      );
    }
  }

  render() {
    let page = this._renderAgenda();
    return (
      <View style={{ marginLeft: 10, flex: 1 }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Text style={summaryText}>Summary</Text>
          <Text style={styles.dateText}>{this.props.date}</Text>
        </View>
        <View style={{ flex: 1 }}>{page}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  summaryHead: {
    marginTop: 0,
    marginLeft: 23,
    display: 'flex'
  },
  summaryText: {
    fontSize: 25,
    fontWeight: '400',
    letterSpacing: 1.0,
    color: COLOR.summaryGray,
    marginLeft: 10
  },
  dateText: {
    fontSize: 15,
    fontWeight: '400',
    letterSpacing: 1.0,
    color: COLOR.cardNotes,
    marginRight: 10
  }
});

const { summaryText, summaryHead, eventCard, cardElements } = styles;

export default Agenda;
