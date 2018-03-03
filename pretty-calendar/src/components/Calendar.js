import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import dateStyles from './styles';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get("window");
var today;
var numberOfDays;

class Calendar extends Component {
    static propTypes = {
      currMonth: PropTypes.object,
    };

    constructor(props){
        super(props)

        let backgroundColor = [];

        today = this.props.currMonth;
        numberOfDays = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();

        for (var i = 0; i < numberOfDays; i++){
            backgroundColor.push(0);
        }

        var dot1 = [];
        var dot2 = [];
        var dot3 = [];
        var baseBars = [];

        for (var i = 0; i < numberOfDays; i++){
            dot1[i] = generic;
            dot2[i] = generic;
            dot3[i] = generic;
            baseBars[i] = dateStyles.baseBar;
        }



        this.state = {
            backgroundColor: backgroundColor,
            selected: 0,
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

    pullFromDataBase = () => {
      return [{
        name: 'blurred',
        symptom: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        intensities: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 10, 0, 10, 0, 0, 0, 6, 1, 1, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: 'pill',
        symptom: [0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0],
        intensities: [0, 1, 2, 3, 4, 0, 6, 0, 0, 9, 10, 9, 10, 1, 10, 0, 0, 0, 0, 0, 1, 0, 2, 2, 0, 9, 0, 0, 0, 0, 0],
      },
      {
        name: 'headache',
        symptom:      [1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0],
        intensities:  [2, 0, 0, 0, 4, 3, 6, 0, 4, 0, 0, 0, 0, 1, 0, 0, 10, 10, 0, 2, 0, 3, 0, 9, 0, 0, 0, 9, 6, 8, 0],
      }
    ];
    }

    //TODO PULL FROM DB, DATA FORMAT:[{graphColor, symptom, intensities},{},{}]
    initVisualization = () => {
      let monthData = this.pullFromDataBase();


      let dot1 = this.state.dot1;
      let dot2 = this.state.dot2;
      let dot3 = this.state.dot3;

      for(var i = 0; i < monthData.length; i++){
        monthData[i].symptom.map((val, j) => {
          let tempStyle;
          switch(monthData[i].name){
            case 'blurred':
              tempStyle = blurred;
              break;
            case 'pill':
              tempStyle = pill;
              break;
            case 'headache':
              tempStyle = headache;
              break;
            default:
              tempStyle = generic;
          }

          if(val == 1){
            if(this.state.dot1[j] == generic){
              dot1[j] = tempStyle;
            } else if(this.state.dot2[j] == generic){
              dot2[j] = tempStyle;
            } else if(this.state.dot3[j] == generic){
              dot3[j] = tempStyle;
            }
          }
        });
      }

      var color = this.getGraphColor(monthData[0].name);
      this.setState({
        dot1: dot1,
        dot2: dot2,
        dot3: dot3,
        graphColor: color,
        intensities: monthData[0].intensities,
      });
    }

    //TODO: pull from global stylesheet
    getGraphColor = (type) => {
      switch(type){
        case 'headache':
          return "#6dd3bf50";
        case 'blurred':
          return "#ab87b850";
        case 'pill':
          return "#c3496b50";
        default:
          return "#FFFFFF00";
      }
    }

    updateVisualization = (type) => {
      let monthData = this.pullFromDataBase();
      for(var i = 0; i < monthData.length; i++){
        if(monthData[i].name == type){
          let color = this.getGraphColor(type);

          this.setState({
            graphColor: color,
            intensities: monthData[i].intensities,
          }, function(){
            this.graphRefs.forEach(function(g) {
              if(g){
                g.slideInUp(500);
              }
            });
          });
          return;
        }
      }
    }


    /** DOWN THEN UP
    updateVisualization = (type) => {
      let monthData = this.pullFromDataBase();
      for(var i = 0; i < monthData.length; i++){
        if(monthData[i].name == type){
          let color = this.getGraphColor(type);

          let last = this.graphRefs.length-1;
          while(last > -1  && this.graphRefs[last] == undefined){
            last--;
          }

          for(var j=0; j<this.graphRefs.length; j++){
            if(j == last){
              this.graphRefs[j].slideOutDown(500).then(
                () => {
                  console.log('fall done')
                  this.setState({
                    graphColor: color,
                    intensities: monthData[i].intensities,
                  }, function(){
                    console.log('state done')
                    this.graphRefs.forEach(function(g) {
                      if(g){
                        g.slideInUp(500);
                      }
                    });
                  });
                }
              );
            }
            else if(this.graphRefs[j]){
              this.graphRefs[j].slideOutDown(500);

            }
          }
          return;
        }
      }
    }
    */

    _onDatePress = (i) => {
        let backgroundColor = [];
        backgroundColor[i] = 1;

        this.setState({ selected: i });
        this.setState({ backgroundColor });

        let dot1 = this.state.dot1;
        let dot2 = this.state.dot2;
        let dot3 = this.state.dot3;
        let baseBars = this.state.baseBars;

        for (var j = 0; j < numberOfDays; j++){
          if (dot1[j] == genericGray){
            dot1[j] = generic
          }
          if (dot2[j] == genericGray){
            dot2[j] = generic
          }
          if (dot3[j] == genericGray){
            dot3[j] = generic
          }
          if(baseBars[j] == dateStyles.baseBarSelected){
            baseBars[j] = dateStyles.baseBar
          }
        }

        if (dot1[i] == generic){
          dot1[i] = genericGray
        }
        if (dot2[i] == generic){
          dot2[i] = genericGray
        }
        if (dot3[i] == generic){
          dot3[i] = genericGray
        }
        if(baseBars[i] == dateStyles.baseBar){
          baseBars[i] = dateStyles.baseBarSelected
        }

        this.setState({ dot1 })
        this.setState({ dot2 })
        this.setState({ dot3 })
        this.setState({ baseBars })

    }

    _onTitlePress = () => {
      var r = Math.floor(Math.random() * 3);
      if(r == 1){
        this.updateVisualization('headache');
      } else if (r == 2){
        this.updateVisualization('pill');
      } else {
        this.updateVisualization('blurred');
      }

    }

    _onHeadachePress = () => {
      let circles  = this.state.dot1;
      circles[this.state.selected] = headache;

      this.setState({ dot1: circles });
    }

    _onBlurredPress = () => {
      let circles = this.state.dot2;
      circles[this.state.selected] = blurred;

      this.setState({ dot2: circles });
    }

    _onPillPress = () => {
      let circles = this.state.dot3;
      circles[this.state.selected] = pill;

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
            return(
                <Text key={day} style= {week}>{day}</Text>
            );
        });
    }

    renderMonth() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var today = this.props.currMonth;
        return months[today.getMonth()];
    }

    renderYear() {
        var today = this.props.currMonth;
        return today.getFullYear();
    }

    renderDates() {
        const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
        var last = new Date(today.getFullYear(), today.getMonth(), numberOfDays);

        var dateGrid = days.slice(0, numberOfDays);



        return dateGrid.map((day, i) => {
            let dateStyle = this.state.backgroundColor[i] ? altItem : item
            let textStyle = this.state.backgroundColor[i] ? altDate : date
            var barHolder = [];
            let h = 0;
            if(this.state.intensities){
              h = 3.13*this.state.intensities[i];
            }

            return(
                <TouchableOpacity style = {dateStyle} key = {i} onPress={() => this._onDatePress(i)}>
                  <View style={dateStyles.textBox}>
                    <Text style={textStyle}>
                        {day}
                    </Text>
                  </View>
                  <View style={dateStyles.dayBox}>
                      <Animatable.View
                        ref={(b) => {this.graphRefs[i] = b;}}
                        duration={500}
                        animation="slideInUp"
                        style={[{backgroundColor: this.state.graphColor, height: h}, dateStyles.bar]}
                      />
                      <View style={this.state.baseBars[i]} >
                        <View style = {dateStyles.circles}>
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
        var today = this.props.currMonth;
        var first = new Date(today.getFullYear(), today.getMonth(), 1);
        var firstDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();


        if (first.getDay() != 0){
            var previousGrid = days.slice(firstDays - first.getDay(), firstDays);
        }
        if(previousGrid){
            return previousGrid.map((day, i) => {
                return(
                    <View style = {item}  key={i}>
                        <Text style={dateGray}>
                                {day}
                        </Text>
                    </View>
                )
            })
        }
    }

    renderNextDates() {
        const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
        var last = new Date(today.getFullYear(), today.getMonth(), numberOfDays);

        if (last.getDay() != 6){
            var nextGrid = days.slice(0, 6 - last.getDay());
        }
        if(nextGrid){
            return nextGrid.map((day, i) => {
                return(
                    <View style = {item} key={i}>
                        <Text style={dateGray}>
                                {day}
                        </Text>
                        <View style = {dateStyles.circles}>
                            <View style = {this.state.dot1[i]} />
                            <View style = {this.state.dot2[i]} />
                            <View style = {this.state.dot3[i]} />
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
            <View>
            <View style= {head}>
            <TouchableOpacity onPress = {() => this._onTitlePress()}>
                <View style= {header}>
                    <Text style= {month}> { this.renderMonth() }</Text>
                    <Text style= {year}> {this.renderYear() }</Text>
                </View>
            </TouchableOpacity>

                <View style= {header2}>
                    { this.renderWeek() }
                </View>
            </View>

                <View style = {tiles}>
                    { this.renderPreviousDates() }
                    { this.renderDates() }
                    { this.renderNextDates() }
                </View>

            <View style = {buttons}>
                <Button title = "Headache" onPress = {() => this._onHeadachePress()} backgroundColor = "#ab87b8" />
                <Button title = "Blurred Vision" onPress = {() => this._onBlurredPress()} backgroundColor = "#6dd3bf" />
                <Button title = "Took a Pill" onPress = {() => this._onPillPress()} backgroundColor = "#c3496b" />
            </View>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    head: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
    },
    header: {
        display: "flex",
        flexDirection: "row",
        marginTop: 15,
        marginLeft: 17,

    },
    header2: {
        display: "flex",
        flexDirection: "row",
        marginTop: 10,

    },
    date: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 20,
    },
    altDate: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 20,
        color: '#ffffff',
    },
    dateGray: {
        fontWeight: '500',
        fontSize: 20,
        color: '#b8b8b8',
    },
    week: {
        fontWeight: "bold",
        fontSize: 15,
        color: '#b8b8b8',
        marginLeft: 23,
    },
    month: {
        fontWeight: "bold",
        fontSize: 25,
        color: '#373737',
    },
    year: {
        fontSize: 25,
        color: '#b0b0b0',
        fontWeight: '300',
    },
    tiles: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 2,
        marginLeft: 10,
     },
    item: {
       margin: 2,
       width: Dimensions.get('window').width / 7 -9,
       justifyContent: 'center',
       alignItems: 'center',
       height: 43,
     },
     altItem: {
        margin: 2,
        width: Dimensions.get('window').width / 7 -9,
        justifyContent: 'center',
        alignItems: 'center',
        height: 43,
        backgroundColor: '#727272',
     },
     generic: {
        width: 4,
        height: 4,
        borderRadius: 2,
        marginLeft: 2,
        backgroundColor: "#ffffff",
     },
     genericGray: {
        width: 4,
        height: 4,
        borderRadius: 2,
        marginLeft: 2,
        backgroundColor: "#727272",
     },
     headache: {
         width: 4,
         height: 4,
         borderRadius: 2,
         marginLeft: 2,
         backgroundColor: "#6dd3bf",
     },
     blurred: {
        width: 4,
        height: 4,
        borderRadius: 2,
        marginLeft: 2,
        backgroundColor: "#ab87b8",
     },
     pill: {
        width: 4,
        height: 4,
        borderRadius: 2,
        marginLeft: 2,
        backgroundColor: "#c3496b",
     },
     buttons: {
         display: "flex",
         flexDirection: "column",
         marginTop: 250,
     }
});

const { head, header, header2, date, altDate, dateGray, week, month, year, tiles, item, altItem, generic, genericGray, headache, blurred, pill, buttons } = styles;


export default Calendar;
