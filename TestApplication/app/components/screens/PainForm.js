import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  StatusBar,
  Image
} from 'react-native';
import ButtonWithImage from '../Button/ButtonWithImage';
import CalendarScreen from '../screens/CalendarScreen';
import Moment from 'moment';
import ToggleSwitch from 'toggle-switch-react-native';
import Swiper from 'react-native-swiper';
import DatePicker from 'react-native-datepicker';
import Swipeout from 'react-native-swipeout';

class painForm extends React.Component {
  static propTypes = {
    route: PropTypes.shape({
      title: PropTypes.string
    }),
    navigator: PropTypes.object,
    currentDate: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    const dt = Date.now();
    this.state = {
      date: Moment(dt).format('MMM Do, h:mm:ss a'),
      dt_format: Moment(dt).format('DD-MM-YYYY'),
      sliderValue: 0
    };
    this.props.currentDate = Moment(dt).format('DD-MM-YYYY');
    this._handlePress = this._handlePress.bind(this);
  }

  _handlePress = a => {
    this.props.navigator.push({
      component: CalendarScreen,
      title: 'Calendar'
    });
  };

  _handleDatePress = () => {
    var dt = Date.now();
    var date = Moment(dt).format('MMM Do, h:mm:ss a');
    this.setState({ date });
  };

  _handleSliderChange = sliderValue => {
    this.setState({ sliderValue });
  };
  render() {
    // Buttons
    var buttonsRight = [
      {
        text: 'New',
        type: 'primary'
      },
      {
        text: 'Delete',
        type: 'delete'
      }
    ];
    var buttonsLeft = [
      {
        text: 'Delete',
        type: 'delete'
      },
      {
        text: 'What',
        type: 'primary'
      }
    ];
    const bubbleStyle = { margin: 10 };

    return (
      <ScrollView>
        <View style={styles.row}>
          <Swipeout
            backgroundColor={'#E106A5'}
            autoClose={true}
            left={buttonsLeft}
            right={buttonsRight}
          >
            <View style={styles.swiperStyle}>
              <Text style={styles.swiperText}>
                {' '}
                You are starting a new log hi{' '}
              </Text>
            </View>
          </Swipeout>
        </View>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <Text style={styles.headerText}> When did this pain start? </Text>
        </View>
        <View style={styles.startedQuestionView}>
          <View style={styles.rowStyle}>
            <ButtonWithImage
              text={'Started now \n' + this.state.date + ''}
              onPress={this._handleDatePress}
              imageSource={require('../Resources/nowClock.png')}
              backgroundColor={'#8129c7'}
              color={'#ffffff'}
            />
            <ButtonWithImage
              text={'Started Before\n'}
              onPress={this._handlePress}
              imageSource={require('../Resources/beforeClock.png')}
              backgroundColor={'#9966a1'}
              color={'#ffffff'}
            />
          </View>
        </View>
        <View style={styles.datePicker}>
          <Image source={require('../Resources/calendarIcon.png')} />
          <DatePicker
            date={this.state.dt_format}
            mode="date"
            placeholder="Select Date"
            format="MM-DD-YYYY"
            minDate="1900-01-01"
            maxDate={this.props.dt_format}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            onDateChange={date => {
              this.setState({ dt_format: date });
            }}
          />
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Where does it hurt?</Text>
        </View>
        <View style={styles.rowStyle}>
          <ButtonWithImage
            text={'Head pain'}
            onPress={this._handlePress}
            imageSource={require('../Resources/headPain.png')}
            backgroundColor={'#7c0920'}
            color={'#ffffff'}
          />
          <ButtonWithImage
            text={'Heart Pain'}
            onPress={this._handlePress}
            imageSource={require('../Resources/heartPain.png')}
            backgroundColor={'#b43649'}
            color={'#ffffff'}
          />
        </View>
        <View style={styles.rowStyle}>
          <ButtonWithImage
            text={'Leg Pain'}
            onPress={this._handlePress}
            imageSource={require('../Resources/legPain.png')}
            backgroundColor={'#b43649'}
            color={'#ffffff'}
          />
          <ButtonWithImage
            text={'Knee Pain'}
            onPress={this._handlePress}
            imageSource={require('../Resources/kneePain.png')}
            backgroundColor={'#7c0920'}
            color={'#ffffff'}
          />
        </View>
        <View style={styles.rowStyle}>
          <ButtonWithImage
            text={'Back Pain'}
            onPress={this._handlePress}
            imageSource={require('../Resources/backPain.png')}
            backgroundColor={'#7c0920'}
            color={'#ffffff'}
          />
          <ButtonWithImage
            text={'Foot Pain'}
            onPress={this._handlePress}
            imageSource={require('../Resources/footPain.png')}
            backgroundColor={'#b43649'}
            color={'#ffffff'}
          />
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>How intense is your pain?</Text>
        </View>
        <View style={styles.rowStyle}>
          <ButtonWithImage
            text={'Intense Pain'}
            onPress={this._handlePress}
            imageSource={require('../Resources/intensePain.png')}
            backgroundColor={'#7ce9ba'}
            color={'#000000'}
          />

          <ButtonWithImage
            text={'Cornell Pain'}
            onPress={this._handlePress}
            imageSource={require('../Resources/happy.png')}
            backgroundColor={'#fcdc4d'}
            color={'#000000'}
          />
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Your pain on a scale from 1-10</Text>
          <Text style={styles.painText}>
            {this.state.sliderValue.toFixed(0)}
          </Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={{ paddingRight: 45 }}> 0 </Text>
          <Slider
            value={this.state.sliderValue}
            onValueChange={this._handleSliderChange}
            minValue={0}
            maxValue={10}
          />
          <Text style={{ paddingLeft: 25 }}> 10 </Text>
        </View>
        <View style={styles.toggleView}>
          <Text style={styles.toggleLabel}> Quick log </Text>
          <ToggleSwitch
            isOn={false}
            onColor="#17E106"
            offColor="gray"
            label=""
            labelStyle={{
              color: 'black',
              fontWeight: '500',
              fontSize: 25
            }}
            size="large"
            onToggle={isOn => console.log('changed to : ', isOn)}
          />
        </View>
        <View style={styles.toggleView}>
          <Text style={styles.toggleLabel}> Receive Notifcations </Text>
          <ToggleSwitch
            isOn={false}
            onColor="#17E106"
            offColor="gray"
            label=""
            labelStyle={{
              color: 'black',
              fontWeight: '500',
              fontSize: 25
            }}
            size="large"
            onToggle={isOn => console.log('changed to : ', isOn)}
          />
        </View>
        <View style={styles.toggleView}>
          <Text style={styles.toggleLabel}> Crying </Text>
          <ToggleSwitch
            isOn={true}
            onColor="#17E106"
            offColor="gray"
            label=""
            labelStyle={{
              color: 'black',
              fontWeight: '500',
              fontSize: 25
            }}
            size="large"
            onToggle={isOn => console.log('changed to : ', isOn)}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  rowStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 15
  },
  header: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#000000'
  },
  headerText: {
    fontSize: 25,
    color: '#ffffff'
  },
  startedQuestionView: {
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#2f0505'
  },
  toggleView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#CACACA'
  },
  toggleLabel: {
    fontSize: 25,
    color: '#000000'
  },
  //---
  wrapper: {
    height: 300
  },
  slideHead: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#06E1E1',
    flexDirection: 'row'
  },
  slideBack: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#06E1E1'
  },
  datePicker: {
    flex: 1,
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  swiperStyle: {
    padding: 25
  },
  swiperText: {
    fontSize: 25,
    color: '#ffffff'
  },
  badgeStyle: {
    width: 50,
    height: 50
  },
  painText: {
    fontSize: 75,
    color: '#00ffff'
  }
  //---
});
/*
/*
<View style={styles.rowStyle}>
  <Swiper style={styles.wrapper} showsButtons={true}>
    <View style={styles.slideHead}>
      <ButtonWithImage
        text={'Head pain'}
        imageSource={require('../Resources/headPain.png')}
        backgroundColor={'#6DEECD'}
        color={'#000000'}
      />
      <ButtonWithImage
        text={'Back Pain'}
        imageSource={require('../Resources/backPain.png')}
        backgroundColor={'#36E9BB'}
        color={'#000000'}
      />
    </View>
    <View style={styles.slideHead}>
      <ButtonWithImage
        text={'Foot pain'}
        onPress={this._handlePress}
        imageSource={require('../Resources/footPain.png')}
        backgroundColor={'#6DEECD'}
        color={'#000000'}
      />
      <ButtonWithImage
        text={'Heart Pain'}
        onPress={this._handlePress}
        imageSource={require('../Resources/heartPain.png')}
        backgroundColor={'#36E9BB'}
        color={'#000000'}
      />
    </View>
  </Swiper>
</View>
<View style={styles.rowStyle}>
  <Text style={styles.headerText} />
  <Badge value={123} style={{ marginRight: 15 }} />
</View>
<View style={styles.rowStyle}>
  <Bubble style={bubbleStyle}>Im Speaking!!!</Bubble>
  <Bubble style={bubbleStyle} arrowPosition="top" color="#ff9c00">
    Stop speaking.
  </Bubble>
</View>
<View style={styles.rowStyle}>
  <Button kind={'rounded'} type={'danger'}>
    Button 1
  </Button>
  <Button kind={'rounded'} type={'danger'}>
    Button 1
  </Button>
</View>
<View style={styles.rowStyle}>
  <Button kind={'squared'} type={'danger'}>
    Button 3
  </Button>
  <Button kind={'squared'} type={'danger'}>
    Button 4
  </Button>
</View>
<View style={styles.rowStyle}>
  <Card
    footerContent="Headache"
    image="../Resources/heartPain.png"
    style={{ margin: 15, width: 280 }}
  />
</View>
15:31:07: Warning: Accessing PropTypes via the main React package is deprecated, and will be removed in  React v16.0. Use the latest available v15.* prop-types package from npm instead. For info on usage, compatibility, migration and more, see https://fb.me/prop-types-docs
- node_modules/nachos-ui/node_modules/react/lib/lowPriorityWarning.js:38:19 in printWarning
- node_modules/nachos-ui/node_modules/react/lib/lowPriorityWarning.js:57:25 in lowPriorityWarning
- node_modules/nachos-ui/node_modules/react/lib/React.js:98:27 in get
- node_modules/nachos-ui/lib/Badge.js:63:13 in <unknown>
- node_modules/metro/src/lib/polyfills/require.js:213:12 in loadModuleImplementation
- node_modules/nachos-ui/lib/index.js:2:6 in <unknown>
- node_modules/metro/src/lib/polyfills/require.js:213:12 in loadModuleImplementation
* app/components/screens/PainForm.js:18:0 in <unknown>
- node_modules/metro/src/lib/polyfills/require.js:213:12 in loadModuleImplementation
* app/index.js:2:0 in <unknown>
- node_modules/metro/src/lib/polyfills/require.js:213:12 in loadModuleImplementation
* App.js:1:0 in <unknown>
- node_modules/metro/src/lib/polyfills/require.js:213:12 in loadModuleImplementation
- node_modules/react-native-scripts/build/bin/crna-entry.js:7:11 in <unknown>
- node_modules/metro/src/lib/polyfills/require.js:213:12 in loadModuleImplementation
- node_modules/metro/src/lib/polyfills/require.js:140:45 in guardedLoadModule
* null:null in global code

*/
export default painForm;
