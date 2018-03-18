import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  FlatList,
  StyleSheet
} from 'react-native';
import { itemWidth } from '../Calendar/styles/SliderEntry.style';
import { SliderEntry } from '../Calendar';
import Agenda from '../Agenda/Agenda';
import Moment from 'moment';
import constants, { COLOR } from '../Resources/constants';

const numOfCals = 500;

const flatlistData = [
  {
    date: new Date('March 9, 2018'),
    data: [
      {
        id: 16,
        medicineNote: 'Morning Medicine Complete',
        timeStamp: '9:00 AM'
      },
      {
        id: 3,
        cardData: constants.LEGPAIN,
        timeStamp: '6:00 AM',
        note1: 'auto-generation',
        note2: 'based on name'
      },
      {
        id: 17,
        medicineNote: 'Tylenol Missed',
        timeStamp: '3:00 PM',
        backgroundColor: COLOR.medicineCardUnchecked
      },
      {
        id: 4,
        cardData: constants.KNEEPAIN,
        timeStamp: '8:00 AM',
        note1: 'NOTE 1',
        note2: 'NOTE 2'
      },
      {
        id: 18,
        medicineNote: 'Evening Medicine Complete',
        timeStamp: '6:00 PM'
      },
      {
        id: 1,
        cardData: constants.HEADACHE,
        timeStamp: '6:00 PM',
        note1: 'High Severity',
        note2: 'manual input'
      },
      {
        id: 13,
        medicineNote: 'Night Medicine Complete',
        timeStamp: '11:00 PM'
      },
      {
        id: 2,
        cardData: constants.BLURRED_VISION,
        timeStamp: '10:00 PM',
        note1: 'Medium Severity',
        note2: 'Duration: 27 min'
      }
    ]
  },
  {
    date: new Date('March 17, 2018'),
    data: [
      {
        id: 19,
        medicineNote: 'Morning Medicine Complete',
        timeStamp: '9:00 AM'
      },
      {
        id: 20,
        medicineNote: 'Morning Medicine Missed',
        timeStamp: '9:00 AM',
        backgroundColor: COLOR.medicineCardUnchecked
      },
      {
        id: 21,
        medicineNote: 'Morning Medicine Complete',
        timeStamp: '9:00 AM'
      },
      {
        id: 22,
        medicineNote: 'Morning Medicine Complete',
        timeStamp: '9:00 AM'
      },
      {
        id: 23,
        medicineNote: 'Morning Medicine Missed',
        timeStamp: '9:00 AM',
        backgroundColor: COLOR.medicineCardUnchecked
      },
      {
        id: 24,
        medicineNote: 'Morning Medicine Complete',
        timeStamp: '9:00 AM'
      },
      {
        id: 25,
        medicineNote: 'Morning Medicine Complete',
        timeStamp: '9:00 AM'
      },
      {
        id: 26,
        medicineNote: 'Morning Medicine Missed',
        timeStamp: '9:00 AM',
        backgroundColor: COLOR.medicineCardUnchecked
      },
      {
        id: 27,
        medicineNote: 'Morning Medicine Complete',
        timeStamp: '9:00 AM'
      },
      {
        id: 28,
        medicineNote: 'Morning Medicine Complete',
        timeStamp: '9:00 AM'
      },
      {
        id: 29,
        medicineNote: 'Morning Medicine Missed',
        timeStamp: '9:00 AM',
        backgroundColor: COLOR.medicineCardUnchecked
      }
    ]
  },
  {
    date: new Date('March 10, 2018'),
    data: [
      {
        id: 14,
        medicineNote: 'Meth Missed',
        backgroundColor: COLOR.medicineCardUnchecked,
        timeStamp: '6:00 PM'
      },
      {
        id: 3,
        cardData: constants.LEGPAIN,
        timeStamp: '6:00 AM',
        note1: 'auto-generation',
        note2: 'based on name'
      },
      {
        id: 4,
        cardData: constants.KNEEPAIN,
        timeStamp: '8:00 AM',
        note1: 'NOTE 1',
        note2: 'NOTE 2'
      }
    ]
  },
  {
    date: new Date('March 15, 2018'),
    data: [
      {
        id: 5,
        cardData: constants.NECKPAIN,
        timeStamp: '2:00 AM',
        note1: 'NOTE 1',
        note2: 'NOTE 2'
      }
    ]
  },

  {
    date: new Date('April 1, 2018'),
    data: [
      {
        id: 6,
        cardData: constants.PILL,
        timeStamp: '2:00 AM',
        note1: 'NOTE 1',
        note2: 'NOTE 2'
      }
    ]
  },
  {
    date: new Date('April 2, 2018'),
    data: [
      {
        id: 7,
        cardData: constants.HEADACHE,
        timeStamp: '2:00 AM',
        note1: 'NOTE 1',
        note2: 'NOTE 2'
      }
    ]
  },
  {
    date: new Date('April 3, 2018'),
    data: [
      {
        id: 8,
        cardData: constants.BLURRED_VISION,
        timeStamp: '2:00 AM',
        note1: 'NOTE 1',
        note2: 'NOTE 2'
      }
    ]
  },
  {
    date: new Date('April 4, 2018'),
    data: [
      {
        id: 9,
        cardData: constants.NECKPAIN,
        timeStamp: '2:00 AM',
        note1: 'NOTE 1',
        note2: 'NOTE 2'
      }
    ]
  },
  {
    date: new Date('April 5, 2018'),
    data: [
      {
        id: 10,
        cardData: constants.KNEEPAIN,
        timeStamp: '2:00 AM',
        note1: 'NOTE 1',
        note2: 'NOTE 2'
      }
    ]
  },
  {
    date: new Date('April 6, 2018'),
    data: [
      {
        id: 11,
        cardData: constants.LEGPAIN,
        timeStamp: '2:00 AM',
        note1: 'NOTE 1',
        note2: 'NOTE 2'
      }
    ]
  },
  {
    date: new Date('April 7, 2018'),
    data: [
      {
        id: 11,
        cardData: constants.FOOTPAIN,
        timeStamp: '2:00 AM',
        note1: '',
        note2: ''
      }
    ]
  }
];

class Calendar extends Component {
  constructor(props) {
    super(props);
    data = [];
    for (i = -numOfCals; i < numOfCals; i++) {
      data.push({ key: i });
    }
    this.state = {
      last: 499,
      data: data,
      currentDate: new Date()
    };

    this._updateAgenda();
  }

  _updateAgenda() {
    let tempData = null;

    for (var i = 0; i < flatlistData.length; i++) {
      if (Moment(this.state.currentDate).isSame(flatlistData[i].date, 'day')) {
        tempData = flatlistData[i].data;
        break;
      }
    }
    this.setState({
      currentAgenda: tempData
    });
  }

  getItemLayout = (data, index) => ({
    length: itemWidth,
    offset: itemWidth * index,
    index
  });

  _onPressMonth = ref => {
    if (this.calendarRef && this.calendarRef != ref) {
      this.calendarRef._clearSelection();
    }
    this.calendarRef = ref;
    this.setState(
      {
        currentDate: ref.state.currentDate
      },
      this._updateAgenda
    );
  };

  _onPressAgenda = type => {
    this.calendarRef.updateVisualization(type);
  };

  _renderItem = ({ item }) => (
    /*<Text> {item.key} </Text>*/
    <SliderEntry
      data={
        new Date(new Date().getFullYear(), new Date().getMonth() + item.key, 0)
      }
      onPressMonth={this._onPressMonth}
    />
  );

  _loadMore = () => {
    newData = [];
    current = this.state.last;
    for (i = 1; i < 20; i++) {
      newData.push({ key: i + current });
    }
    this.setState({
      data: [...this.state.data, ...newData],
      last: current + 19
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            style={itemStyle}
            data={this.state.data}
            renderItem={this._renderItem}
            onEndReached={this._loadMore}
            onEndReachedThreshold={50}
            horizontal={true}
            removeClippedSubviews={true}
            getItemLayout={this.getItemLayout}
            decelerationRate={0}
            snapToInterval={itemWidth}
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={numOfCals + 1}
          />
        </View>
        <View style={{ flex: 0.75 }}>
          <Agenda
            agendaInfo={this.state.currentAgenda}
            onPressAgenda={this._onPressAgenda}
            date={this.state.currentDate.toLocaleDateString()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemStyle: {
    display: 'flex',
    marginTop: 30
  }
});

const { itemStyle } = styles;

export default Calendar;
