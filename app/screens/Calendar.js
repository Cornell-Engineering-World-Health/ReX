import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions, FlatList, StyleSheet } from 'react-native';
import { itemWidth } from '../components/Calendar/styles/SliderEntry.style';
import { SliderEntry } from '../components/Calendar';
import Agenda from '../components/Agenda/Agenda';
import Moment from 'moment';
import {
  pullFromDataBase,
  pullAgendaFromDatabase,
  asyncDeleteEvent
} from '../databaseUtil/databaseUtil';
import constants, { COLOR } from '../resources/constants';
import Modal from 'react-native-modal';
import LogFormScreen from './LogFormScreen';

let t = new Date();
let numOfMonths = (t.getFullYear() - 1969) * 12;
const numOfCals = numOfMonths;
const VIEWABILITY_CONFIG = {
  viewAreaCoveragePercentThreshold: 90
};

class Calendar extends Component {
  constructor(props) {
    super(props);
    data = [];
    for (i = -numOfCals; i < numOfCals; i++) {
      data.push({ key: i });
    }
    this.state = {
      first: -numOfCals,
      last: numOfCals - 1,
      data: data,
      currentDate: new Date(),
      flatlistHeight: 0,
      isModalVisible: false,
      agendaData: []
    };
    this.mutexLock = 0;
    this.calendars = []; // references to all SLIDEENTRY components which contain calendar components. indexed by KEY
    this.currSymptomDisplay; //most recent sympotom type bar graphs shown.
    this.currKey; //current KEY that the calendar is displaying
    this.currIndex; //current INDEX that the calendar is displaying
    this.currCalendar; //current Calendar component being displayed
    this.previouslySelected; //index of day of selectedIndicator on calendar
  }

  componentDidMount() {
    this._updateAgendaByDatabase();
  }

  _updateAgendaByDatabase() {
    pullAgendaFromDatabase(flatlistData => {
      let tempData = null;
      let totalData = {};
      for (var i = 0; i < flatlistData.length; i++) {
        let itemDate = flatlistData[i].date;
        //store data in an object organized by date, for quick lookup time
        let key = this._generateDateKey(itemDate);
        totalData[key] = flatlistData[i].data;
      }
      this.setState({
        agendaData: totalData,
        currentAgenda: totalData[this._generateDateKey(this.state.currentDate)]
      });
    });
  }

  /*
Generates a key that is in the form MM-DD-YYYY

assumes date is a valid date object
*/
  _generateDateKey(date) {
    return Moment(date).format('MM-DD-YYYY');
  }

  /*
    Returns agenda based on passed in currentDate date
    Uses information stored in this.state.agendaData
  */
  _updateAgendaByState(currentDate) {
    return this.state.agendaData[this._generateDateKey(currentDate)];
  }

  _deleteItemFromAgenda(id) {
    index = -1;
    for (var i = 0; i < this.currentAgenda.data.length; i++) {
      if ((this.currentAgenda.data[i].id = id)) {
        index = i;
        break;
      }
    }

    if (index != -1) {
      this.currentAgenda.data.splice(i, 1);
      asyncDeleteEvent(id);
    }

    //TODO: force update might be needed
  }

  getItemLayout = (data, index) => ({
    length: itemWidth,
    offset: itemWidth * index,
    index
  });

  _onPressMonth = (ref, i, newDate) => {
    if (this.calendarRef && this.calendarRef != ref) {
      this.calendarRef._clearSelection();
    }
    this.calendarRef = ref;
    this.previouslySelected = i;

    let newAgenda = this._updateAgendaByState(newDate);

    this.setState({
      currentDate: newDate,
      currentAgenda: newAgenda
    });
  };

  _onPressAgenda = type => {
    this.currSymptomDisplay = type;
    this.calendarRef.updateVisualization(type);
  };

  _refreshCalendar = () => {
    //console.log(this.currSymptomDisplay);
    this.calendarRef.initVisualization(this.currSymptomDisplay);
  };

  _renderItem = ({ item }) => {
    return (
      /*<Text> {item.key} </Text>*/
      <SliderEntry
        ref={ref => {
          this.calendars[item.key] = ref;
        }}
        data={
          new Date(
            new Date().getFullYear(),
            new Date().getMonth() + item.key,
            0
          )
        }
        pickerHandler={this._pickerHandler.bind(this)}
        onPressMonth={this._onPressMonth}
      />
    );
  };

  _loadMore = (num, callback) => {
    if (!num) num = 20;
    console.log('loadingMore');
    newData = [];
    current = this.state.last;
    for (i = 1; i < num; i++) {
      newData.push({ key: i + current });
    }
    this.setState(
      {
        data: [...this.state.data, ...newData],
        last: current + num - 1
      },
      function() {
        if (callback) {
          callback();
        }
      }
    );
  };

  calendarHeight = currMonth => {
    //console.log(currMonth);
    var today = currMonth;
    var numberOfDays = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).getDate();
    var firstDays = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();
    var first = new Date(today.getFullYear(), today.getMonth(), 1);
    var last = new Date(today.getFullYear(), today.getMonth(), numberOfDays);
    var numberOfPrevious = first.getDay();
    var numberOfAfter = 6 - last.getDay();
    var total = numberOfDays + numberOfPrevious + numberOfAfter;
    //console.log(numberOfDays, numberOfPrevious, numberOfAfter);
    if (total == 35) {
      this.setState({
        flatlistHeight: Dimensions.get('window').height * 0.5
      });
    } else {
      this.setState({
        flatlistHeight: Dimensions.get('window').height * 0.56
      });
    }
    // if (first.getDay() != 0){
    //     var numberOfPrevious = firstDays - first.getDay()
    // }
  };

  _onViewableChange = ({ viewableItems, changed }) => {
    if (viewableItems.length > 0) {
      let newKey = viewableItems[0].key;
      /**
      if(this.currKey && newKey > this.currKey){//swipe to next
      } else if(this.currKey && newKey < this.currKey){//swipe to prev
      }
      */
      if (this.currSymptomDisplay) {
        this.calendars[newKey].calendar.updateVisualization(
          this.currSymptomDisplay
        );
      }

      this.currKey = newKey;
      this.currIndex = viewableItems[0].index;
      this.currCalendar = this.calendars[newKey];
      this.currCalendar.calendar._onDatePress(this.previouslySelected); //keep presistent day selection across months
      this.calendarHeight(this.currCalendar.props.data);
    }
    if (viewableItems.length > 0 && this.mutexLock == 0) {
      if (viewableItems[viewableItems.length - 1].index == 0) {
        this._loadPrev();
      }
    }
  };

  _loadPrev = () => {
    this.mutexLock = 1;
    newData = [];
    current = this.state.first;
    for (i = 1; i < 20; i++) {
      newData.unshift({ key: current - i });
    }
    this.setState({
      data: [...newData, ...this.state.data],
      first: current - 19
    });
    this._enableScroll(this.flatListRef);
    this.flatListRef.scrollToIndex({ animated: false, index: 19 });
  };

  _startScroll() {
    //console.log('START')
  }
  _disableScroll() {
    //console.log('END')
    this.flatListRef.getScrollResponder().setNativeProps({
      scrollEnabled: false
    });
    let thisRef = this;
    setTimeout(function() {
      thisRef._enableScroll(thisRef.flatListRef);
    }, 200);
  }

  _enableScroll(list) {
    if (list) {
      list.getScrollResponder().setNativeProps({
        scrollEnabled: true
      });
    }
  }

  _scrollFinished() {
    if (this.mutexLock) {
      this.flatListRef.scrollToOffset({ offset: itemWidth * 19 + 1 });
    }
    this.mutexLock = 0;
  }

  _pickerHandler(month, year) {
    let thisMonth = this.currCalendar.calendar.props.currMonth.getMonth() + 1;
    let thisYear = this.currCalendar.calendar.props.currMonth.getFullYear();

    let newIdx = this.currIndex + (year - thisYear) * 12 + (month - thisMonth);
    try {
      this.flatListRef.scrollToIndex({ animated: false, index: newIdx });
    } catch (err) {
      if (err.name == 'Invariant Violation') {
        thisRef = this;
        this._loadMore(newIdx - this.state.last, function() {
          thisRef.flatListRef.scrollToIndex({ animated: false, index: newIdx });
        });
      }
    }
  }

  toggleModal = (timestamp, logtype) => {
    //console.log('hereeee');
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      modalTimestamp: timestamp,
      modalLogType: logtype
    });
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
        <View style={{}}>
          <FlatList
            height={this.state.flatlistHeight}
            style={itemStyle}
            ref={ref => {
              this.flatListRef = ref;
            }}
            data={this.state.data}
            extraData={this.state}
            renderItem={this._renderItem}
            onEndReached={this._loadMore}
            onEndReachedThreshold={50}
            onViewableItemsChanged={this._onViewableChange}
            horizontal={true}
            removeClippedSubviews={false}
            getItemLayout={this.getItemLayout}
            decelerationRate={0}
            snapToInterval={itemWidth}
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={numOfCals + 1}
            initialNumToRender={3}
            maxToRenderPerBatch={5}
            windowSize={5}
            viewabilityConfig={VIEWABILITY_CONFIG}
            onScrollBeginDrag={() => {
              this._startScroll();
            }}
            onScrollEndDrag={() => {
              this._disableScroll();
            }}
            onMomentumScrollEnd={() => {
              this._scrollFinished();
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Agenda
            agendaInfo={this.state.currentAgenda}
            onPressAgenda={this._onPressAgenda}
            refreshCalendar={this._refreshCalendar}
            date={this.state.currentDate.toLocaleDateString()}
            toggleModal={this.toggleModal}
          />
        </View>
        <Modal isVisible={this.state.isModalVisible} style={styles.modal}>
          <LogFormScreen
            log_type={this.state.modalLogType}
            on_finish={this.toggleModal}
            timestamp={this.state.modalTimestamp}
          />
        </Modal>
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
