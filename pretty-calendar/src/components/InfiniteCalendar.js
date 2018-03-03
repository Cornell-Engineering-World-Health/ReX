import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions, ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import SliderEntry from './SliderEntry';

class InfiniteCalendar extends Component {

  constructor(props) {
    super(props);

    data = []
<<<<<<< HEAD
    for (i = 1; i < 5; i++){
=======
    for (i = -500; i < 500; i++){
>>>>>>> 2d8ae3e3979b3c26ce255c9e3f5d99db5bcf2936
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

<<<<<<< HEAD
=======


>>>>>>> 2d8ae3e3979b3c26ce255c9e3f5d99db5bcf2936

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


export default InfiniteCalendar;
