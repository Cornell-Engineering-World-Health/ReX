import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import dateStyles from './styles';

const { width } = Dimensions.get("window");

//TEMP VAR
const intensities = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 10, 0, 10, 0, 0, 0, 6, 1, 1, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0];
const symptom =     [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
const color = 'rgba(116, 56, 138, .4)';

class Calendar extends Component {
    static propTypes = {
      currMonth: PropTypes.object,
    };

    constructor(props){
        super(props)

        let backgroundColor = [];

        var today = this.props.currMonth;
        var numberOfDays = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();

        for (var i = 0; i < numberOfDays; i++){
            backgroundColor.push(0);
        }



        var purple = [];
        var green = [];
        var red = [];


        for (var i = 0; i < numberOfDays; i++){
          if(symptom[i] == 1){
            purple[i] = headache;
          } else{
            purple[i] = generic;
          }
            green[i] = generic;
            red[i] = generic;
        }

        this.state = {
            backgroundColor: backgroundColor,
            selected: 0,
            purple: purple,
            green: green,
            red: red,
        }

        this._onDatePress = this._onDatePress.bind(this);
    }

    _onDatePress = (i) => {
        let backgroundColor = [];
        backgroundColor[i] = 1;

        this.setState({ selected: i });
        this.setState({ backgroundColor });

        let purple = this.state.purple;
        let green = this.state.green;
        let red = this.state.red;

        var today = this.props.currMonth;
        var numberOfDays = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();

        for (var j = 0; j < numberOfDays; j++){
          if (purple[j] == genericGray){
            purple[j] = generic
          }
          if (green[j] == genericGray){
            green[j] = generic
          }
          if (red[j] == genericGray){
            red[j] = generic
          }
        }

        if (purple[i] == generic){
          purple[i] = genericGray
        }
        if (green[i] == generic){
          green[i] = genericGray
        }
        if (red[i] == generic){
          red[i] = genericGray
        }



        this.setState({ purple })
        this.setState({ green })
        this.setState({ red })

    }

    _onTitlePress = () => {


    }

    _onHeadachePress = () => {
      let circles  = this.state.purple;
      circles[this.state.selected] = headache;

      this.setState({ purple: circles });
    }

    _onBlurredPress = () => {
      let circles = this.state.green;
      circles[this.state.selected] = blurred;

      this.setState({ green: circles });
    }

    _onPillPress = () => {
      let circles = this.state.red;
      circles[this.state.selected] = pill;

      this.setState({ red: circles });
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
        var today = this.props.currMonth;
        var numberOfDays = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();
        var last = new Date(today.getFullYear(), today.getMonth(), numberOfDays);

        var dateGrid = days.slice(0, numberOfDays);



        return dateGrid.map((day, i) => {
            let dateStyle = this.state.backgroundColor[i] ? altItem : item
            let textStyle = this.state.backgroundColor[i] ? altDate : date
            var barHolder = [];
            for(let j = 0; j < intensities[i]; j++){
              barHolder.push(
                <View key={j} style={[{backgroundColor: color}, dateStyles.bar]} />
              );
            }



            return(
                <TouchableOpacity style = {dateStyle} key = {i} onPress={() => this._onDatePress(i)}>
                  <View style={dateStyles.textBox}>
                    <Text style={textStyle}>
                        {day}
                    </Text>
                  </View>
                  <View style={dateStyles.dayBox}>
                      {barHolder}
                      <View style = {dateStyles.circles}>
                          <View style = {this.state.purple[i]} />
                          <View style = {this.state.green[i]} />
                          <View style = {this.state.red[i]} />
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
        var today = this.props.currMonth;
        var numberOfDays = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();
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
                            <View style = {this.state.purple[i]} />
                            <View style = {this.state.green[i]} />
                            <View style = {this.state.red[i]} />
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
         backgroundColor: "#ab87b8",
     },
     blurred: {
        width: 4,
        height: 4,
        borderRadius: 2,
        marginLeft: 2,
        backgroundColor: "#6dd3bf",
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
