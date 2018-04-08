import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './styles/styles.js';
import * as Animatable from 'react-native-animatable';
import {pullFromDataBase, pullMedicineFromDatabase} from '../../databaseUtil/databaseUtil';
import constants from '../Resources/constants';
import {getColor, getTranslucentColor} from '../Resources/constants';

const { width } = Dimensions.get("window");




class Calendar extends PureComponent {
    static propTypes = {
      currMonth: PropTypes.object,
      onPressMonth: PropTypes.func
    };

    constructor(props){
        super(props)

        let backgroundColor = [];

        this.today = this.props.currMonth;
        this.numberOfDays = new Date(this.today.getFullYear(), this.today.getMonth()+1, 0).getDate();

        for (var i = 0; i < this.numberOfDays; i++){
            backgroundColor.push(0);
        }

        var dot1 = [];
        var dot2 = [];
        var dot3 = [];
        var baseBars = [];

        for (var i = 0; i < this.numberOfDays; i++){
            dot1[i] = styles.generic;
            dot2[i] = styles.generic;
            dot3[i] = styles.generic;
            baseBars[i] = styles.baseBar;
        }



        this.state = {
            currentDate: undefined,
            backgroundColor: backgroundColor,
            selected: -1,
            dot1: dot1,
            dot2: dot2,
            dot3: dot3,
            graphColor: 'rgba( 0, 0, 0, 0)',
            intensities: [0,0],
            baseBars: baseBars,
        }

        this.graphRefs = [];
        this._onDatePress = this._onDatePress.bind(this);
    }

    componentDidMount() {
      this.initVisualization();
    }

    initVisualization = () => {
      pullFromDataBase(this.props.currMonth, null, data => {
        let dot1 = this.state.dot1;
        let dot2 = this.state.dot2;
        let dot3 = this.state.dot3;
        let firstIntensities;
        let firstColor;
        let first = true;
        Object.keys(data).forEach(function(key) {
          if(first){
            first = false;
            firstColor = getTranslucentColor(key);
            firstIntensities = data[key].intensities;
          }
          //Set Dots
          data[key].intensities.map((val, j) => {
            let tempStyle;
            let backColor = getColor(key)
            tempStyle = [{backgroundColor: backColor}, styles.dot]

            if(val != undefined){
              if(dot1[j] == styles.generic){
                dot1[j] = tempStyle;
              } else if(dot2[j] == styles.generic){
                dot2[j] = tempStyle;
              } else if(dot3[j] == styles.generic){
                dot3[j] = tempStyle;
              }
            }

          });

        });

        this.setState({
          dot1: dot1,
          dot2: dot2,
          dot3: dot3,
          graphColor: firstColor,
          intensities: firstIntensities,
        });

      });

    }

    updateVisualization = (type) => {
      pullFromDataBase(this.props.currMonth, null, data => {
        Object.keys(data).forEach(function(key) {
          if(key == type){
            let color = getTranslucentColor(type);

            let last = this.graphRefs.length-1;
            console.log(this.graphRefs)
            while(last > -1  && this.graphRefs[last] == undefined){
              last--;
            }
            for(var j=0; j<this.graphRefs.length; j++){

              if(this.graphRefs[j]){
                this.graphRefs[j].transitionTo({bottom: -31.3}, 200, 'ease');
                if(j == last){
                  setTimeout(()=> {
                    this.setState({
                      graphColor: color,
                      intensities: data[key].intensities,
                    }, function(){
                      this.graphRefs.forEach(function(g) {
                        if(g){
                          g.transitionTo({bottom: 0}, 400, 'ease');
                        }
                      });
                    });
                  }, 200)
                }
              }
            }
            return;

          }
        })
      });
    }


    _onDatePress = (i) => {
        let backgroundColor = [];
        backgroundColor[i] = 1;

        let dot1 = this.state.dot1;
        let dot2 = this.state.dot2;
        let dot3 = this.state.dot3;
        let baseBars = this.state.baseBars;

        /**
        for (var j = 0; j < this.numberOfDays; j++){
          if (dot1[j] == styles.genericGray){
            dot1[j] = styles.generic
          }
          if (dot2[j] == styles.genericGray){
            dot2[j] = styles.generic
          }
          if (dot3[j] == styles.genericGray){
            dot3[j] = styles.generic
          }
          if(baseBars[j] == styles.baseBarSelected){
            baseBars[j] = styles.baseBar
          }
        }
        */
        this._clearSelection();

        if (dot1[i] == styles.generic){
          dot1[i] = styles.genericGray
        }
        if (dot2[i] == styles.generic){
          dot2[i] = styles.genericGray
        }
        if (dot3[i] == styles.generic){
          dot3[i] = styles.genericGray
        }
        if(baseBars[i] == styles.baseBar){
          baseBars[i] = styles.baseBarSelected
        }

        let currentDate = new Date(this.today.getFullYear(), this.today.getMonth(), i+1)

        this.setState({ selected: i });
        this.setState({ backgroundColor });
        this.setState({ dot1 })
        this.setState({ dot2 })
        this.setState({ dot3 })
        this.setState({ baseBars })
        this.setState({ currentDate}, function(){
          this.props.onPressMonth(this)
        })

    }

    _clearSelection = () => {
      if(this.state.selected != -1){

        let dot1 = this.state.dot1;
        let dot2 = this.state.dot2;
        let dot3 = this.state.dot3;
        let baseBars = this.state.baseBars;
        let backgroundColor = this.state.backgroundColor;

        backgroundColor[this.state.selected] = 0;

        if (dot1[this.state.selected] == styles.genericGray){
          dot1[this.state.selected] = styles.generic
        }
        if (dot2[this.state.selected] == styles.genericGray){
          dot2[this.state.selected] = styles.generic
        }
        if (dot3[this.state.selected] == styles.genericGray){
          dot3[this.state.selected] = styles.generic
        }
        if(baseBars[this.state.selected] == styles.baseBar){
          baseBars[this.state.selected] = styles.baseBarSelected
        }

        baseBars[this.state.selected] = styles.baseBar


        this.setState({
          backgroundColor: backgroundColor,
          dot1: dot1,
          dot2: dot2,
          dot3: dot3,
          baseBars: baseBars,
          selected: -1
        })
      }
    }

    _onTitlePress = () => {
      console.log('title Press')
        pullMedicineFromDatabase(new Date('2018-04-17'), function(formattedData){

        });

    }

    _onHeadachePress = () => {
      let circles  = this.state.dot1;
      circles[this.state.selected] = styles.headache;

      this.setState({ dot1: circles });
    }

    _onBlurredPress = () => {
      let circles = this.state.dot2;
      circles[this.state.selected] = styles.blurred;

      this.setState({ dot2: circles });
    }

    _onPillPress = () => {
      let circles = this.state.dot3;
      circles[this.state.selected] = styles.pill;

      this.setState({ dot3: circles });
    }

    dateStyle = function(i) {
        return {
            margin: 2,
            width: Dimensions.get('window').width / 7 -9,
            justifyContent: 'center',
            alignItems: 'center',
            height: 43,
            backgroundColor: this.state.backgroundColor[i],
        }
    }

    renderWeek() {
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        return days.map((day) => {
                if (day == 'SUN'){
                    return <Text key={day} style= {styles.weekAlt}>{day}</Text>
                }
                else{
                    return <Text key={day} style= {styles.week}>{day}</Text>
                }
            }
            );
        };

    renderMonth() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[this.today.getMonth()];
    }

    renderYear() {
        return this.today.getFullYear();
    }

    renderDates() {
        const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
        var last = new Date(this.today.getFullYear(), this.today.getMonth(), this.numberOfDays);

        var dateGrid = days.slice(0, this.numberOfDays);



        return dateGrid.map((day, i) => {
            let dateStyle = this.state.backgroundColor[i] ? styles.altItem : styles.item
            let textStyle = this.state.backgroundColor[i] ? styles.altDate : styles.date
            var barHolder = [];
            let h = 0;
            if(this.state.intensities){
              h = 3.13*(this.state.intensities[i] || 0);
            }

            return(
                <TouchableOpacity style = {dateStyle} key = {i} onPress={() => this._onDatePress(i)}>
                  <View style={styles.textBox}>
                    <Text style={textStyle}>
                        {day}
                    </Text>
                  </View>
                  <View style={styles.dayBox}>
                      <Animatable.View
                        ref={(b) => {this.graphRefs[i] = b;}}
                        duration={400}
                        animation="slideInUp"
                        style={[{backgroundColor: this.state.graphColor, height: h}, styles.bar]}
                      />
                      <View style={this.state.baseBars[i]} >
                        <View style = {styles.circles}>
                            <View style = {this.state.dot1[i]} />
                            <View style = {this.state.dot2[i]} />
                            <View style = {this.state.dot3[i]} />
                        </View>
                      </View>
                  </View>
              </TouchableOpacity>
            );
        });

    }

    renderPreviousDates() {
        const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
        var first = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
        var firstDays = new Date(this.today.getFullYear(), this.today.getMonth(), 0).getDate();


        if (first.getDay() != 0){
            var previousGrid = days.slice(firstDays - first.getDay(), firstDays);
        }
        if(previousGrid){
            return previousGrid.map((day, i) => {
                return(
                    <View style = {styles.item}  key={i}>
                      <View style={styles.textBox}>
                        <Text style={styles.dateGray}>
                            {day}
                        </Text>
                      </View>
                      <View style={styles.dayBox}>
                          <View style={this.state.baseBar} />
                      </View>
                    </View>

                )
            })
        }
    }

    renderNextDates() {
        const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
        var last = new Date(this.today.getFullYear(), this.today.getMonth(), this.numberOfDays);

        if (last.getDay() != 6){
            var nextGrid = days.slice(0, 6 - last.getDay());
        }
        if(nextGrid){
            return nextGrid.map((day, i) => {
                return(
                    <View style = {styles.item} key={i}>
                      <View style={styles.textBox}>
                        <Text style={styles.dateGray}>
                            {day}
                        </Text>
                      </View>
                      <View style={styles.dayBox}>
                          <View style={this.state.baseBar} />
                      </View>
                    </View>
                )
            })
      }
    }

    _renderItem ({item, index}) {
      return (
          <View style={styles.slide}>
              <Text style={styles.title}>{ item.title }</Text>
          </View>
      );
    }

    render() {

        return (
            <View style = {{flex: 1}}>
            <View style= {styles.head}>
            <TouchableOpacity onPress = {() => this._onTitlePress()}>
                <View style= {styles.header}>
                    <Text style= {styles.month}> { this.renderMonth() }</Text>
                    <Text style= {styles.year}> {this.renderYear() }</Text>
                </View>
            </TouchableOpacity>

                <View style= {styles.header2}>
                    { this.renderWeek() }
                </View>
            </View>

                <View style = {styles.tiles}>
                    { this.renderPreviousDates() }
                    { this.renderDates() }
                    { this.renderNextDates() }
                </View>

            </View>
        );
    }
}



export default Calendar;
