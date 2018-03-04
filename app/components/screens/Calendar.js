import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions, ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import { itemWidth } from '../Calendar/styles/SliderEntry.style';
import {SliderEntry} from '../Calendar';

class Calendar extends Component {

  constructor(props) {
    super(props);
    data = []
    for (i = -500; i < 500; i++){
      data.push({key: i})
    }
    this.state = {
      last: 499,
      data: data
    }
  }
  getItemLayout = (data, index) => (
    {length: itemWidth, offset: itemWidth * index, index}

  )

  _renderItem = ({item}) => (
    /*<Text> {item.key} </Text>*/
    <SliderEntry data = {new Date((new Date()).getFullYear(), (new Date()).getMonth()+ item.key, 0)} />
  );

  _loadMore = () => {
    newData = []
    current = this.state.last
    for (i = 1; i < 20; i++){
      newData.push({key: i + current})
    }
    this.setState( { data: [...this.state.data, ...newData], last: current + 19} )
  };


  render() {
    return (
      <FlatList
        style = { itemStyle }
        data = {this.state.data}
        renderItem={this._renderItem}
        onEndReached = {this._loadMore}
        onEndReachedThreshold = {50}
        horizontal = {true}
        removeClippedSubviews = {true}
        getItemLayout = {this.getItemLayout}
        decelerationRate = {0}
        snapToInterval = {itemWidth}
        snapToAlignment = "center"
        showsHorizontalScrollIndicator = {false}
        initialScrollIndex = {500}
      />
    );
  };
}

const styles = StyleSheet.create({
  itemStyle: {
    display: "flex",
    marginTop: 30
  },
});

const { itemStyle } = styles;


export default Calendar;
