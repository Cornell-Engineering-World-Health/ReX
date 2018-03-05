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

const flatlistData = [
  {
    title: ' Headache',
    timeStamp: '8:00 PM',
    note1: 'Ben is amazing',
    note2: 'Can i get an A? <3',
    iconName: 'knee-pain',
    id: '1'
  },

  {
    title: ' Headache',
    timeStamp: '8:00 PM',
    note1: 'Ben is amazing',
    note2: 'Can i get an A? <3',
    iconName: 'headache',
    id: '2'
  },

  {
    title: ' Headache',
    timeStamp: '8:00 PM',
    note1: 'Ben is amazing',
    note2: 'Can i get an A? <3',
    iconName: 'headache',
    id: '3'
  },

  {
    title: ' Headache',
    timeStamp: '8:00 PM',
    note1: 'Ben is amazing',
    note2: 'Can i get an A? <3',
    iconName: 'headache',
    id: '4'
  }
];

class Agenda extends Component {
  constructor(props) {
    super(props);
  }

  _onDelete = () => {
    console.log('Deleted Item');
  };

  _keyExtractor = (item, index) => item.id;

  render() {
    return (
      <View style={{ marginLeft: 10, flex: 1 }}>
        <View>
          <Text style={summaryText}>Summary</Text>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={flatlistData}
            keyExtractor={item => item.id}
            extraData={this.props}
            renderItem={({ item, index }) => {
              return (
                <Card
                  image={item.image}
                  title={item.title}
                  timeStamp={item.timeStamp}
                  note1={item.note1}
                  note2={item.note2}
                  backgroundColor={item.backgroundColor}
                  swiperActive={true}
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
