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
import Moment from 'moment';
import Swipeout from 'react-native-swipeout';
import Card from '../Card/Card';
import HeadacheForm from '../screens/HeadacheForm';
import BackPainForm from '../screens/BackPainForm';
import { IMAGES } from '../Resources/constants';

const MAIN_FORM = 'mainform';
const HEADACHE_FORM = 'headform';
const BACKPAIN_FORM = 'backform';

class painForm extends React.Component {
  static propTypes = {
    currentDate: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    const dt = Date.now();
    this.state = {
      date: Moment(dt).format('MMM Do, h:mm:ss a'),
      dt_format: Moment(dt).format('DD-MM-YYYY'),
      pageID: MAIN_FORM
    };
    this.props.currentDate = Moment(dt).format('DD-MM-YYYY');
  }

  _handlePress = a => {};

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
  _renderScreen() {
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
    switch (this.state.pageID) {
      case BACKPAIN_FORM:
        return (
          <BackPainForm
            onPress={() =>
              this.setState({
                pageID: MAIN_FORM
              })
            }
          />
        );
        break;
      case MAIN_FORM:
        return (
          <ScrollView>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
              <Text style={styles.headerText}> When did this pain start? </Text>
            </View>
            <View style={styles.header}>
              <Text style={styles.headerText}>Where does it hurt?</Text>
            </View>
            <View style={styles.rowStyle}>
              <ButtonWithImage
                text={'Back Pain'}
                onPress={this._handlePress}
                imageSource={IMAGES.backPain}
                backgroundColor={'#7c0920'}
                color={'#ffffff'}
                onPress={() =>
                  this.setState({
                    pageID: BACKPAIN_FORM
                  })
                }
              />
              <ButtonWithImage
                text={'Foot Pain'}
                onPress={this._handlePress}
                imageSource={IMAGES.footPain}
                backgroundColor={'#b43649'}
                color={'#ffffff'}
              />
              <ButtonWithImage
                text={'Head Pain'}
                onPress={this._handlePress}
                imageSource={IMAGES.headPain}
                backgroundColor={'#7c0920'}
                color={'#ffffff'}
                onPress={() =>
                  this.setState({
                    pageID: HEADACHE_FORM
                  })
                }
              />
            </View>
            <View style={styles.rowStyle}>
              <ButtonWithImage
                text={'Heart Pain'}
                onPress={this._handlePress}
                imageSource={IMAGES.heartPain}
                backgroundColor={'#b43649'}
                color={'#ffffff'}
              />
              <ButtonWithImage
                text={'Knee Pain'}
                onPress={this._handlePress}
                imageSource={IMAGES.kneePain}
                backgroundColor={'#7c0920'}
                color={'#ffffff'}
              />
              <ButtonWithImage
                text={'Leg Pain'}
                onPress={this._handlePress}
                imageSource={IMAGES.legPain}
                backgroundColor={'#7c0920'}
                color={'#ffffff'}
              />
            </View>
            <View style={styles.rowStyle}>
              <ButtonWithImage
                text={'Neck Pain'}
                onPress={this._handlePress}
                imageSource={IMAGES.neckPain}
                backgroundColor={'#7c0920'}
                color={'#ffffff'}
              />
              <ButtonWithImage
                text={'Belly Pain'}
                onPress={this._handlePress}
                imageSource={IMAGES.stomachPain}
                backgroundColor={'#b43649'}
                color={'#ffffff'}
              />
              <ButtonWithImage
                text={'Elbow Pain'}
                onPress={this._handlePress}
                imageSource={IMAGES.elbowPain}
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
                imageSource={IMAGES.intensePain}
                backgroundColor={'#7ce9ba'}
                color={'#000000'}
              />
            </View>
          </ScrollView>
        );
        break;

      case HEADACHE_FORM:
        return (
          <HeadacheForm
            onPress={() =>
              this.setState({
                pageID: MAIN_FORM
              })
            }
          />
        );
        break;
    }
  }

  render() {
    let page = this._renderScreen();

    return <View style={{ flex: 1 }}>{page}</View>;
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
