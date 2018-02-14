import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  StatusBar,
  Image,
  FlatList
} from 'react-native';
import ButtonWithImage from '../Button/ButtonWithImage';
import CalendarScreen from '../screens/CalendarScreen';
import Moment from 'moment';
import Swipeout from 'react-native-swipeout';
import Card from '../Card/Card';
import testData from '../Resources/CardTestData';

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
      dt_format: Moment(dt).format('DD-MM-YYYY')
    };
    this.props.currentDate = Moment(dt).format('DD-MM-YYYY');
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
  _handleCardPress = () => {
    console.log('button pressed. ');
  };
  _handleClose = () => {
    console.log('swiper closed. ');
  };
  _handleOpen = () => {
    console.log('swiper open. ');
  };
  _handleSwipePress = () => {
    console.log('swipeout component button pressed. ');
  };
  render() {
    // Buttons
    var buttonsR = [
      {
        text: 'New',
        type: 'primary',
        onPress: this._handleSwipePress
      },
      {
        text: 'Delete',
        type: 'delete',
        onPress: this._handleSwipePress
      }
    ];
    var buttonsL = [
      {
        text: 'Delete',
        type: 'delete',
        onPress: this._handleSwipePress
      },
      {
        text: 'What',
        type: 'primary',
        onPress: this._handleSwipePress
      }
    ];

    return (
      <ScrollView>
        <View style={{ backgroundColor: '#E7EDE9' }}>
          <Card
            image={require('../Resources/footPain.png')}
            title={'Foot pain'}
            timeStamp={'6:00 PM'}
            note1={'High Severity'}
            note2={'manual input'}
            backgroundColor={'#FF33FC'}
            buttonActive={true}
            onPress={this._handleCardPress}
          />
          <Card
            image={require('../Resources/glasses.png')}
            title={'Blurred Vision'}
            timeStamp={'10:00 PM'}
            note1={'Medium Severity'}
            note2={'Duration: 27 min'}
            swiperActive={true}
            buttonsRight={buttonsR}
            buttonsLeft={buttonsL}
            backgroundColor={'#18F150'}
            onCloseSwipeout={this._handleClose}
            onOpenSwipeout={this._handleOpen}
          />
          <Card
            iconName={'leg-pain'}
            title={'Leg Pain'}
            timeStamp={'6:00 AM'}
            note1={'auto-generation'}
            note2={'based on name'}
            buttonActive={true}
            swiperActive={true}
            buttonsRight={buttonsR}
            buttonsLeft={buttonsL}
          />
          <Card
            iconName={'knee-pain'}
            title={'Knee Pain'}
            timeStamp={'8:00 PM'}
            note1={'NOTE 1'}
            note2={'NOTE 2'}
          />
          <Card
            iconName={'neck-pain'}
            title={'Neck Pain'}
            timeStamp={'8:00 PM'}
            note1={'NOTE 1'}
            note2={'NOTE 2'}
          />
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
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Where does it hurt?</Text>
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
          <ButtonWithImage
            text={'Head Pain'}
            onPress={this._handlePress}
            imageSource={require('../Resources/headPain.png')}
            backgroundColor={'#7c0920'}
            color={'#ffffff'}
          />
        </View>
        <View style={styles.rowStyle}>
          <ButtonWithImage
            text={'Heart Pain'}
            onPress={this._handlePress}
            imageSource={require('../Resources/heartPain.png')}
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
          <ButtonWithImage
            text={'Leg Pain'}
            onPress={this._handlePress}
            imageSource={require('../Resources/legPain.png')}
            backgroundColor={'#7c0920'}
            color={'#ffffff'}
          />
        </View>
        <View style={styles.rowStyle}>
          <ButtonWithImage
            text={'Neck Pain'}
            onPress={this._handlePress}
            imageSource={require('../Resources/neckPain.png')}
            backgroundColor={'#7c0920'}
            color={'#ffffff'}
          />
          <ButtonWithImage
            text={'Belly Pain'}
            onPress={this._handlePress}
            imageSource={require('../Resources/stomachPain.png')}
            backgroundColor={'#b43649'}
            color={'#ffffff'}
          />
          <ButtonWithImage
            text={'Elbow Pain'}
            onPress={this._handlePress}
            imageSource={require('../Resources/elbowPain.png')}
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#E7EDE9'
  },
  rowStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
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
  swiperStyle: {
    padding: 25
  },
  swiperText: {
    fontSize: 25,
    color: '#ffffff'
  }
});
export default painForm;
