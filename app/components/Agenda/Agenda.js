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
            Woo Hoo! Nothing happend today!
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
  summary: {
    display: 'flex',
    fontSize: 23,
    fontWeight: '400',
    color: '#b0b0b0'
  },
  eventCard: {
    //marginTop:10,
    //paddingTop:15,
    //paddingBottom:15,
    //marginLeft:30,
    //marginRight:30,
    borderRadius: 10,
    borderWidth: 1,
    padding: 0,
    //borderColor: '#fff',
    shadowColor: '#b0b0b0',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1
  },
  cardElements: {
    display: 'flex',
    flexDirection: 'row'
  },
  eventSquare: {
    width: 80,
    height: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7FDECB',
    backgroundColor: '#7FDECB'
  },
  summaryText: {
    fontSize: 25,
    fontWeight: '400',
    letterSpacing: 1.0,
    color: '#b8b8b8',
    marginLeft: 10
  },
  dateText: {
    fontSize: 15,
    fontWeight: '400',
    letterSpacing: 1.0,
    color: '#b8b8b8',
    marginRight: 10
  }
});

const {
  summaryText,
  summaryHead,
  summary,
  eventCard,
  cardElements,
  eventSquare
} = styles;

export default Agenda;
