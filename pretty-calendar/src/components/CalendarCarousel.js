import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions, ActivityIndicator} from 'react-native';
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import styles, { colors } from '../styles/index.style';
import SliderEntry from './SliderEntry';

class CalendarCarousel extends Component {
  constructor(props){
    super(props)
    this.state = {
      index: 3,
      centerMonth: new Date(),
      months: [new Date((new Date()).getFullYear(), (new Date()).getMonth()-19, 0), new Date((new Date()).getFullYear(), (new Date()).getMonth()-18, 0), new Date((new Date()).getFullYear(), (new Date()).getMonth()-17, 0), new Date((new Date()).getFullYear(), (new Date()).getMonth()-16, 0), new Date((new Date()).getFullYear(), (new Date()).getMonth()-15, 0), new Date((new Date()).getFullYear(), (new Date()).getMonth()-14, 0), new Date((new Date()).getFullYear(), (new Date()).getMonth()-13, 0), new Date((new Date()).getFullYear(), (new Date()).getMonth()-12, 0), new Date((new Date()).getFullYear(), (new Date()).getMonth()-11, 0), new Date((new Date()).getFullYear(), (new Date()).getMonth()-10, 0), new Date((new Date()).getFullYear(), (new Date()).getMonth()-9, 0), new Date((new Date()).getFullYear(), (new Date()).getMonth()-8, 0), new Date((new Date()).getFullYear(), (new Date()).getMonth()-7, 0), new Date((new Date()).getFullYear(), (new Date()).getMonth()-6, 0), new Date((new Date()).getFullYear(), (new Date()).getMonth()-5, 0), new Date((new Date()).getFullYear(), (new Date()).getMonth()-4, 0), new Date((new Date()).getFullYear(), (new Date()).getMonth()-3, 0), new Date((new Date()).getFullYear(), (new Date()).getMonth()-2, 0), new Date((new Date()).getFullYear(), (new Date()).getMonth()-1, 0), new Date((new Date()).getFullYear(), (new Date()).getMonth(), 0), new Date(), new Date((new Date()).getFullYear(), (new Date()).getMonth()+2, 0), new Date((new Date()).getFullYear(), (new Date()).getMonth()+3, 0), new Date((new Date()).getFullYear(), (new Date()).getMonth()+4, 0) ]
    }

    //this._renderItem = this._renderItem.bind(this);

  }
  _renderItem ({item, index}) {
      console.log("we at the end baby")
      return <SliderEntry data={item} />;
  }

  _renderLoading (event) {
    if (this._carousel.currentIndex == 0){
      console.log("its working")
      return <ActivityIndicator size="small" color="#0000ff"/>;

    }
  }

  slide = (index) => {
    console.log(this.state.months)
    switch(index){
      case 2:
        this.setState({ months: [new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()-3, 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()-2, 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()-1, 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth(), 0) , new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()+1, 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()+2, 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()+3, 0)]});
        this.setState({ centerMonth: new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth(), 0) });
        break;
      case 4:
        this.setState({ months: [new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()-1, 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth(), 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()+1, 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()+2, 0) , new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()+3, 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()+4, 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()+5, 0) ]});
        this.setState({ centerMonth: new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()+2, 0) });
        break;
      default:
    }
    this._carousel.snapToItem(3, animated = false);
   
    }





/**
    console.log(index)
    switch(index){
      case 2:
        this.setState({ months: [new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()-3, 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()-2, 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()-1, 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth(), 0) , new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()+1, 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()+2, 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()+3, 0)]});
        this.setState({ centerMonth: new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth(), 0) });
        break;
      case 4:
        this.setState({ months: [new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()-1, 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth(), 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()+1, 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()+2, 0) , new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()+3, 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()+4, 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()+5, 0) ]});
        this.setState({ centerMonth: new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()+2, 0) });
        break;
      default:
    }
    this._carousel.snapToItem(3, animated = false);

     if(index < this.state.index){
      var months = this.state.months;
      var first = this.state.months[0];
      var backMonth = first;
      backMonth.setMonth(backMonth.getMonth() - 1);
      months.unshift(backMonth);

      //this.setState({ centerMonth: new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth(), 0) });
      //this.setState({ index });
      this.setState({ months });
      console.log(months)
    */
  

  render() {



    return (
      <View style={styles.exampleContainer}>
      <Carousel
        ref={(c) => {this._carousel = c;}}
        data={this.state.months}
        renderItem={this._renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        inactiveSlideScale={0.95}
        inactiveSlideOpacity={1}
        enableMomentum={true}
        activeSlideAlignment={'center'}
        firstItem={20}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContentContainer}
        shouldOptimizeUpdates={true}
        onScroll={(event) => this._renderLoading()}
        
        activeAnimationType={'spring'}
        activeAnimationOptions={{
            friction: 4,
            tension: 40
        }}
        
        onSnapToItem={(index) => this.slide(index)}
      />
      </View>
      );

    };

}

export default CalendarCarousel;
