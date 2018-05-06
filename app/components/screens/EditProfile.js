import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  List,
  Alert,
  TextInput,
  TouchableOpacity,
  DatePickerIOS,
  Picker,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import SettingsList from 'react-native-settings-list';
import Modal from 'react-native-modal';
import moment from 'moment';
import {
  asyncSettingUpdate,
  pullSettingsFromDatabase
} from '../../databaseUtil/databaseUtil';
import { profile_icons, IMAGES, COLOR } from '../Resources/constants';

const AVATAR_ID = 'avatarID';
const BIRTHDAY_ID = 'birthdayID';
const HEIGHT_ID = 'heightID';
const WEIGHT_ID = 'weightID';
const EDIT_ID = 'editID';

export default class Profile extends Component {
  static propTypes = {
    navigator: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      switchValue: false,
      birthday: new Date(),
      name: 'Navin',
      weight: '',
      height_feet: '5',
      height_inches: '8',
      height: '',
      modalID: '',
      icon: 0,
      email: 'navin@gmail.com',
      choosingAvatar: false
    };
    this.setDate = this.setDate.bind(this);

    pullSettingsFromDatabase(data => {
      this.setState({
        birthday: new Date(data.birthday),
        weight: data.weight,
        name: data.name,
        height_feet: data.height_feet,
        height_inches: data.height_inches,
        height: data.height_feet + "' " + data.height_inches + '" ',
        icon: data.icon,
      });
    });
  }

  setDate(newDate) {
    asyncSettingUpdate('birthday', newDate);
    this.setState({ birthday: newDate });
  }
  handle_icon_press = index => {
    asyncSettingUpdate('icon', index.toString());
  };

  _renderHeader() {
    if (!this.state.choosingAvatar) {
      return (
        <View style={styles.profileHeader}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ choosingAvatar: true });
            }}
          >
            <Image
              style={styles.profileImageStyle}
              source={profile_icons[this.state.icon]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({ choosingAvatar: true });
            }}
          >
            <Text style={styles.profileHeaderSubText}>Change Avatar</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View
          style={{
            height: 150,
            alignItems: 'center'
          }}
        >
          <View style={styles.profileHeader}>
            <FlatList
              horizontal={true}
              data={profile_icons}
              keyExtractor={item => {
                item.index;
              }}
              renderItem={item => {
                var ind = item.index;
                return (
                  <TouchableOpacity
                    key={item.index}
                    onPress={() => {
                      this.handle_icon_press(ind);
                      this.setState({
                        choosingAvatar: false,
                        icon: ind
                      });
                    }}
                  >
                    <Image
                      style={styles.profileImageStyle}
                      source={profile_icons[item.index]}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <Text style={styles.profileHeaderSubText}>Pick your Avatar!</Text>
        </View>
      );
    }
  }

  render() {
    var bgColor = '#DCE3F4';

    let header = this._renderHeader();
    return (
      <View style={styles.container}>
        <View style={styles.modal}>
          <ScrollView>
            {header}
            <View style={styles.profileBody}>
              <TextField
                label={'Name'}
                value={this.state.name}
                onChangeText={name => {
                  asyncSettingUpdate('name', name);
                  this.setState({ name });
                }}
              />
              <TextField
                label={'Email'}
                value={this.state.email}
                onChangeText={email => {
                  this.setState({ email: email });
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalID: BIRTHDAY_ID });
                }}
              >
                <TextField
                  editable={false}
                  pointerEvents={'none'}
                  label={'Birthday'}
                  value={this.state.birthday.toLocaleDateString()}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalID: HEIGHT_ID });
                }}
              >
                <TextField
                  editable={false}
                  pointerEvents={'none'}
                  label={'Height'}
                  value={
                    this.state.height_feet +
                    ' ft ' +
                    this.state.height_inches +
                    ' in'
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalID: WEIGHT_ID });
                }}
              >
                <TextField
                  editable={false}
                  pointerEvents={'none'}
                  label={'Weight'}
                  value={this.state.weight}
                />
              </TouchableOpacity>
              <View style={{ padding: 20, alignItems: 'center' }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.props.navigator.pop()}
                >
                  <Text style={styles.text}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
        <Modal
          isVisible={this.state.modalID == HEIGHT_ID}
          animationInTiming={500}
          animationOutTiming={500}
          onBackdropPress={() => {
            this.setState({ modalID: '' });
          }}
          onSwipe={() => {
            this.setState({ modalID: '' });
          }}
          swipDirection={'down'}
          style={styles.modal}
        >
          <View style={styles.modalWrapper}>
            <TouchableOpacity
              style={styles.modalSubmitButton}
              onPress={() => {
                this.setState({ modalID: '' });
              }}
            >
              <Text style={styles.text}>Enter Your Height</Text>
            </TouchableOpacity>
            <View style={styles.pickerWrapper}>
              <Picker
                style={styles.picker}
                selectedValue={this.state.height_feet}
                onValueChange={itemValue => {
                  asyncSettingUpdate('height_feet', itemValue);
                  this.setState({ height_feet: itemValue });
                }}
              >
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
              </Picker>
              <Text style={styles.pickerLabel}> feet</Text>
              <View style={{ marginLeft: 40 }} />
              <Picker
                style={styles.picker}
                selectedValue={this.state.height_inches}
                onValueChange={itemValue => {
                  asyncSettingUpdate('height_inches', itemValue);
                  this.setState({ height_inches: itemValue });
                }}
              >
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="11" value="11" />
              </Picker>
              <Text style={styles.pickerLabel}>in</Text>
            </View>
          </View>
        </Modal>

        <Modal
          isVisible={this.state.modalID == WEIGHT_ID}
          onBackdropPress={() => {
            this.setState({ modalID: '' });
          }}
          onSwipe={() => {
            this.setState({ modalID: '' });
          }}
          swipDirection={'down'}
          animationInTiming={500}
          animationOutTiming={500}
          style={{
            justifyContent: 'flex-end',
            margin: 0
          }}
          style={styles.modal}
        >
          <KeyboardAvoidingView
            behavior={'padding'}
            style={styles.modalWrapper}
          >
            <TouchableOpacity
              style={styles.modalSubmitButton}
              onPress={() => {
                this.setState({ modalID: '' });
              }}
              alignItems="center"
            >
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
            <TextInput
              keyboardType="numeric"
              textAlign="center"
              style={{ height: 75, fontSize: 35 }}
              placeholder="Enter Weight in lbs"
              onChangeText={weight => {
                asyncSettingUpdate('weight', weight);
                this.setState({ weight: weight + ' lbs' });
              }}
            />
          </KeyboardAvoidingView>
        </Modal>
        <Modal
          isVisible={this.state.modalID == BIRTHDAY_ID}
          animationInTiming={500}
          animationOutTiming={500}
          onBackdropPress={() => {
            this.setState({ modalID: '' });
          }}
          onSwipe={() => {
            this.setState({ modalID: '' });
          }}
          swipDirection={'down'}
          style={styles.modal}
        >
          <View
            style={{
              flex: 0.35,
              backgroundColor: '#ffffff'
            }}
          >
            <TouchableOpacity
              style={styles.modalSubmitButton}
              onPress={() => {
                this.setState({ modalID: '' });
              }}
              alignItems="center"
            >
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
            <DatePickerIOS
              style={{ height: 44 }}
              itemStyle={{ height: 44 }}
              mode="date"
              date={this.state.birthday}
              onDateChange={this.setDate}
            />
          </View>
        </Modal>
      </View>
    );
  }
  onValueChange(value) {
    this.setState({ switchValue: value });
  }
}

const styles = StyleSheet.create({
  pickerLabel: {
    fontSize: 23
  },
  profileHeader: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center'
  },
  profileHeaderSubText: {
    fontSize: 15,
    color: '#71d7fc'
  },
  profileBody: {
    marginLeft: 25,
    marginRight: 25
  },
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  avatar: {
    height: 100,
    width: 100,
    margin: 7
  },
  imageStyle: {
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5,
    alignSelf: 'center',
    height: 55,
    width: 55
  },
  placeholder: {
    color: '#bbbbbb'
  },
  picker: {
    width: 100
  },
  pickerWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  titleInfoStyle: {
    fontSize: 16,
    color: '#8e8e93'
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalWrapper: {
    flex: 0.35,
    backgroundColor: '#ffffff',
    alignItems: 'center'
  },
  contain: {
    flex: 1,
    justifyContent: 'center'
  },
  modalSubmitButton: {
    width: Dimensions.get('window').width,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aedfe1'
  },
  text: {
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontSize: 15
  },
  button: {
    width: 200,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aedfe1'
  },
  profileContainerStyles: {
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
