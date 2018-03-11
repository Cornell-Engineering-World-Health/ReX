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
import {SliderEntry} from '../Calendar';
import Agenda from '../Agenda/Agenda';

const numOfCals = 500;

class Calendar extends Component {
  constructor(props) {
    super(props);
    data = []
    for (i = -numOfCals; i < numOfCals; i++){
      data.push({key: i})
    }
    this.state = {
      last: numOfCals-1,
      data: data,
      currentDate: new Date(),
    }

    this.calendarRef;
  }

  getItemLayout = (data, index) => ({
    length: itemWidth,
    offset: itemWidth * index,
    index
  });


  _onPressMonth = (ref) => {
    if(this.calendarRef && this.calendarRef != ref){
      this.calendarRef._clearSelection()
    }
    this.calendarRef = ref
    this.setState({
      currentDate: ref.state.currentDate,
    }, function(){
      console.log(this.state.currentDate)
    })

  }

  _onPressAgenda = (type) => {
    this.calendarRef.updateVisualization(type)
  }

  _renderItem = ({item}) => (
    /*<Text> {item.key} </Text>*/
    <SliderEntry
      data = {new Date((new Date()).getFullYear(), (new Date()).getMonth()+ item.key, 0)}
      onPressMonth = {this._onPressMonth}
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
            initialScrollIndex={numOfCals+1}
          />
        </View>
        <View style={{ flex: 0.75 }}>
          <Agenda
            onPressAgenda={this._onPressAgenda}
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
