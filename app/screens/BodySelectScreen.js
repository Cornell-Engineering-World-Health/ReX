import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from 'react-native';
import LogFormScreen from './LogFormScreen';
import Database from '../Database';
import { BODY_PARTS, COLOR, IMAGES } from '../resources/constants';
import { pullSettingsFromDatabase } from '../databaseUtil/databaseUtil';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const opacity = '30';
export default class BodySelectScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lineYPos: [0, 0, 0, 0]
    };
    this.labels = [];
  }

  componentWillMount() {
    setTimeout(() => {
      this.measureAndSet(this, 0, []);
    });
  }

  // calculates the top positioning of lines, param index and incomplete lineTop array
  measureAndSet(thisRef, idx, lineYPos) {
    if (!lineYPos) {
      lineYPos = thisRef.state.lineYPos;
    }
    thisRef.labels[idx].measure((a, yPos, c, height, e) => {
      lineYPos[idx] = yPos + height / 2;
      if (idx == 3) {
        thisRef.setState({ lineYPos });
      } else {
        thisRef.measureAndSet(thisRef, ++idx, lineYPos);
      }
    });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View
          style={[
            styles.labelLine,
            {
              width: width * (0.033333 + 1 / 6 + 1 / 8),
              top: this.state.lineYPos[0]
            }
          ]}
        />
        <View
          style={[
            styles.labelLine,
            {
              width: width * (0.033333 + 1 / 6 + 1 / 8),
              top: this.state.lineYPos[1]
            }
          ]}
        />
        <View
          style={[
            styles.labelLine,
            { width: width * (0.033333 + 1 / 12), top: this.state.lineYPos[2] }
          ]}
        />
        <View
          style={[
            styles.labelLine,
            {
              width: width * (0.033333 + 1 / 6 + 1 / 16),
              top: this.state.lineYPos[3]
            }
          ]}
        />
        <ImageBackground
          resizeMode={'stretch'}
          style={{ flex: 1, flexDirection: 'row' }}
          source={IMAGES.body}
        >
          <View style={styles.emptyVertical} />
          <View style={styles.bodyVertical}>
            <View style={[styles.vertical, { width: width * 1 / 6 }]}>
              <View style={styles.empty_top} />
              <TouchableOpacity
                onPress={() => {
                  navigate('Choose', {
                    bodyLabel: BODY_PARTS.ARMS
                  });
                }}
                style={[styles.arm_left, {}]}
              />
              <View style={styles.empty_bottom} />
            </View>
            <View style={styles.vertical}>
              <TouchableOpacity
                onPress={() => {
                  navigate('Choose', {
                    bodyLabel: BODY_PARTS.HEAD
                  });
                }}
                style={[styles.head, {}]}
              />
              <TouchableOpacity
                onPress={() => {
                  navigate('Choose', {
                    bodyLabel: BODY_PARTS.TORSO
                  });
                }}
                style={[styles.torso, {}]}
              />
              <TouchableOpacity
                onPress={() => {
                  navigate('Choose', {
                    bodyLabel: BODY_PARTS.LEGS
                  });
                }}
                style={[styles.legs, {}]}
              />
            </View>
            <View style={[styles.vertical, { width: width * 1 / 6 }]}>
              <View style={styles.empty_top} />
              <TouchableOpacity
                onPress={() => {
                  navigate('Choose', {
                    bodyLabel: BODY_PARTS.ARMS
                  });
                }}
                style={[styles.arm_right, {}]}
              />
              <View style={[styles.empty_bottom, {}]} />
            </View>
          </View>
          <View style={styles.labelContainer}>
            <View
              style={{
                width: width * 0.35,
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start'
              }}
            >
              <View
                ref={l => {
                  this.labels[0] = l;
                }}
                style={[styles.label, { marginTop: height / 50 }]}
              >
                <Text style={styles.labelText}>Face / Head</Text>
              </View>
              <View
                ref={l => {
                  this.labels[1] = l;
                }}
                style={[styles.label, { marginTop: height / 25 }]}
              >
                <Text style={styles.labelText}>Torso</Text>
              </View>
              <View
                ref={l => {
                  this.labels[2] = l;
                }}
                style={[styles.label, { marginTop: height / 15 }]}
              >
                <Text style={styles.labelText}>Arms</Text>
              </View>
              <View
                ref={l => {
                  this.labels[3] = l;
                }}
                style={[styles.label, { marginTop: height / 5 }]}
              >
                <Text style={styles.labelText}>Legs</Text>
              </View>
              <TouchableOpacity
                style={styles.wholeBodyButton}
                onPress={() => {
                  navigate('Choose', {
                    bodyLabel: BODY_PARTS.BODY
                  });
                }}
              >
                <Text>Whole Body</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
/**
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          resizeMode={'contain'}
          style={{flex: 1, flexDirection: 'row'}}
          source={IMAGES.body}
        >
          <View style={[styles.vertical, {width: width/5}]}>
            <View
              style={styles.empty_top}
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
              style={styles.empty_bottom}
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
          <View style={[styles.vertical, {width: width/5}]}>
            <View
              style={styles.empty_top}
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
              style={[styles.empty_bottom, {}]}
            />
          </View>
          <View style={styles.emptyVertical}/>
        </ImageBackground>
      </View>
    );
    */
/**
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
*/
const styles = StyleSheet.create({
  bodyVertical: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: width * 0.65
  },
  labelContainer: {
    width: width * 0.383333,
    alignItems: 'flex-end'
  },
  label: {
    margin: 10,
    marginLeft: 0,
    padding: 10
  },
  labelText: {
    textAlign: 'left'
  },
  labelLine: {
    backgroundColor: '#000000',
    flex: 1,
    position: 'absolute',
    height: 1,
    right: width * 0.35
  },
  emptyVertical: {
    width: width * 1 / 30
  },
  vertical: {
    flexDirection: 'column'
    // justifyContent: 'center'
  },
  legs: {
    width: width / 4,
    height: height / 3
  },
  torso: {
    width: width / 4,
    flex: 1
  },
  head: {
    width: width / 4,
    height: height / 8
  },
  arm_left: {
    flex: 1
  },
  arm_right: {
    flex: 1
  },
  empty_bottom: {
    height: height / 3
  },
  empty_top: {
    height: height / 8
  },
  wholeBodyButton: {
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#bf5252',
    padding: 10,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: '#bf5252'
  }
});
