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
import {pullFromDataBase,pullAgendaFromDatabase,asyncDeleteEvent} from '../../databaseUtil/databaseUtil';
import constants, { COLOR } from '../Resources/constants';

let t = new Date();
let numOfMonths = (t.getFullYear() - 1969)*12;
const numOfCals = numOfMonths;
const VIEWABILITY_CONFIG = {
    viewAreaCoveragePercentThreshold: 80,
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
      last: numOfCals-1,
      data: data,
      currentDate: new Date()
    };
    this.mutexLock = 0
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

  _deleteItemFromAgenda(id){
      index = -1
      for(var i=0; i < this.currentAgenda.data.length; i++){
          if(this.currentAgenda.data[i].id = id){
              index = i;
              break
          }
      }

      if(index != -1){
          this.currentAgenda.data.splice(i, 1);
          asyncDeleteEvent(id)
      }

      //TODO: force update might be needed

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
    if (viewableItems.length > 0 && this.mutexLock == 0){
      if (viewableItems[viewableItems.length - 1].index == 0){
        this.mutexLock = 1
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
        this.flatListRef.scrollToIndex({animated:false, index:19})
      }
    }

  };

  _startScroll(){
    console.log('START')
  }
  _disableScroll() {

      console.log('END')
    this.flatListRef.getScrollResponder().setNativeProps({
      scrollEnabled: false
    })
    let thisRef = this;
    setTimeout(function(){  thisRef._enableScroll(thisRef.flatListRef) }, 300);
  }

  _enableScroll(list) {
    list.getScrollResponder().setNativeProps({
      scrollEnabled: true
    })
  }

  _scrollFinished(){
    if(this.mutexLock){
      this.flatListRef.scrollToOffset({offset: itemWidth*19+1})
    }
    this.mutexLock = 0;

  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
        <View style={{  }}>
          <FlatList
            style={itemStyle}
            ref={(ref) => { this.flatListRef = ref; }}
            data={this.state.data}
            renderItem={this._renderItem}
            onEndReached={this._loadMore}
            onEndReachedThreshold={50}
            onViewableItemsChanged={this._loadPrev}
            horizontal={true}
            removeClippedSubviews={false}
            getItemLayout={this.getItemLayout}
            decelerationRate={0}
            snapToInterval={itemWidth}
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={numOfCals + 1}
            initialNumToRender={5}
            maxToRenderPerBatch= {5}
            windowSize={5}
            viewabilityConfig={VIEWABILITY_CONFIG}
            onScrollBeginDrag={() => {this._startScroll()}}
            onScrollEndDrag={() => {this._disableScroll()}}
            onMomentumScrollEnd={() => {this._scrollFinished()}}
          />
        </View>
        <View style={{ height: 500 }}>
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
