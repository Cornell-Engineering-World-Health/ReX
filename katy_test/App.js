import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from './Button'
import { Slider } from 'react-native-elements'

export default class App extends React.Component {
  handleSymptomPress = () => {
    console.log('press symptom');
  };

  render() {
    return (
      <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <Button
            onPress={this.handleSymptomPress}
          />
           <Button
            onPress={this.handleSymptomPress}
          />
          <Button
            onPress={this.handleSymptomPress}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Button
            onPress={this.handleSymptomPress}
          />
           <Button
            onPress={this.handleSymptomPress}
          />
          <Button
            onPress={this.handleSymptomPress}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Button
            onPress={this.handleSymptomPress}
          />
           <Button
            onPress={this.handleSymptomPress}
          />
          <Button
            onPress={this.handleSymptomPress}
          />
        </View>
        <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
        <Slider
          value={0}
          animateTransitions = {true}
          minimumTrackTintColor = '#ff0000'
          maximumTrackTintColor = '#50c700'
          thumbTouchSize= {{width: 40, height: 40}}
          thumbTintColor = '#d3d3d3'
          onValueChange={(value) => this.setState({value})} />
        <Text>       Value: working on displaying          </Text>
        </View>

        </View>
        

      
    );
  }
}

const styles = StyleSheet.create({
});
