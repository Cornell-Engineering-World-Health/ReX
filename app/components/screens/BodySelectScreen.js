import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Header,
  ScrollView,
  TouchableOpacity,
  Picker,
  Button,
  ImageBackground,
  Dimensions,
} from 'react-native';
import LogFormScreen from './LogFormScreen';
import { StackNavigator } from 'react-navigation';
import Database from '../../Database';
import { BODY_PARTS, COLOR, IMAGES } from '../Resources/constants';
import ButtonWithImage from '../Button/ButtonWithImage';
import {pullSettingsFromDatabase} from '../../databaseUtil/databaseUtil';
const height =  Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const opacity = '30';
export default class BodySelectScreen extends React.Component {
  constructor(props) {
    super(props);

  }



  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={{flex: 1}}>
        <ImageBackground
          resizeMode={'contain'}
          style={{flex: 1, flexDirection: 'row'}}
          source={IMAGES.body}
        >
          <View style={styles.emptyVertical}/>
          <View style={[styles.vertical, {alignItems: 'flex-end'}]}>
            <View
              style={styles.head}
            />
            <TouchableOpacity
              onPress={() => {
                navigate('Choose', {
                  bodyLabel: BODY_PARTS.ARMS
                })
              }}
              style={[styles.arm_left, {width: width/5}]}
            />
            <View
              style={styles.legs}
            />
          </View>
          <View style={styles.vertical}>
            <TouchableOpacity
              onPress={() => {
                navigate('Choose', {
                  bodyLabel: BODY_PARTS.HEAD
                })
              }}
              style={[styles.head, {}]}
            />
            <TouchableOpacity
              onPress={() => {
                navigate('Choose', {
                  bodyLabel: BODY_PARTS.TORSO
                })
              }}
              style={[styles.torso, {}]}
            />
            <TouchableOpacity
              onPress={() => {
                navigate('Choose', {
                  bodyLabel: BODY_PARTS.LEGS
                })
              }}
              style={[styles.legs, {}]}
            />
          </View>
          <View style={[styles.vertical, {alignItems: 'flex-start'}]}>
            <View
              style={styles.head}
            />
            <TouchableOpacity
              onPress={() => {
                navigate('Choose', {
                  bodyLabel: BODY_PARTS.ARMS
                })
              }}
              style={[styles.arm_right, { width: width / 5,}]}
            />
            <View
              style={[styles.legs, {}]}
            >
              <View
                style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
              >
                <TouchableOpacity
                  style={styles.wholeBodyButton}
                  onPress={() => {
                    navigate('Choose', {
                      bodyLabel: BODY_PARTS.BODY
                    })
                  }}
                >
                  <Text>Whole Body</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.emptyVertical}/>
        </ImageBackground>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  emptyVertical: {
    width: width / 8,
  },
  vertical: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  legs: {
    width: width /4,
    height: height/3,
  },
  torso: {
    width: width /4,
    flex: 1,
  },
  head: {
    width: width /4,
    height: height/8,
  },
  arm_left: {
    flex: 1,
  },
  arm_right: {
    flex: 1,
  },
  wholeBodyButton:{
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#bf5252',
    padding: 10,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: '#bf5252'
  }
});
