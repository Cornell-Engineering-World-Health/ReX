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
import {pullFromDataBase,pullAgendaFromDatabase} from '../../databaseUtil/databaseUtil';
import constants, { COLOR } from '../Resources/constants';

const numOfCals = 20;

class Calendar extends Component {
  constructor(props) {
    super(props);
    data = [];
    for (i = -numOfCals; i < numOfCals; i++) {
      data.push({ key: i });
    }
    this.state = {
      first: -numOfCals,
      last: numOfCals,
      data: data,
      currentDate: new Date()
    };

    this._updateAgenda();
  }

  _updateAgenda() {
    pullAgendaFromDatabase(flatlistData =>{
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
    })
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

  _loadPrev = ({viewableItems, changed}) => {
    console.log(viewableItems.length)
    if (viewableItems.length > 0){
      if (viewableItems[viewableItems.length - 1].index == 0){
        newData = [];
        current = this.state.first;
        for (i = 1; i < 20; i++) {
          newData.unshift({ key: current - i });
        }
        this.setState({
          data: [...newData, ...this.state.data],
          first: current - 19
        });
        console.log("it worked")
        console.log(this.state.data)
        this.flatListRef.scrollToIndex({animated:true, index:20})
      }
    }

  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            style={itemStyle}
            ref={(ref) => { this.flatListRef = ref; }}
            data={this.state.data}
            renderItem={this._renderItem}
            onEndReached={this._loadMore}
            onEndReachedThreshold={50}
            onViewableItemsChanged={this._loadPrev}
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
