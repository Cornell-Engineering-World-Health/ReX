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
import { IMAGES, COLOR } from '../Resources/constants';

const AVATAR_ID = 'avatarID';
const BIRTHDAY_ID = 'birthdayID';
const HEIGHT_ID = 'heightID';
const WEIGHT_ID = 'weightID';
const EDIT_ID = 'editID';

const prof_icons = [
  IMAGES.iconWolf,
  IMAGES.iconZebra,
  IMAGES.iconJellyfish,
  IMAGES.iconOwl,
  IMAGES.iconHamster
];
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
        icon: data.icon
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
              source={prof_icons[this.state.icon]}
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
        <View style={{ height: 150, alignItems: 'center' }}>
          <View style={styles.profileHeader}>
            <FlatList
              horizontal={true}
              data={prof_icons}
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
                      source={prof_icons[item.index]}
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
        <Modal isVisible={this.state.modalID == HEIGHT_ID} style={styles.modal}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row'
            }}
          >
            <Picker
              style={styles.picker}
              selectedValue={this.state.height_feet}
              onValueChange={itemValue => {
                asyncSettingUpdate('height_feet', itemValue);
                this.setState({ height_feet: itemValue });
              }}
            >
              <Picker.Item label="4 feet" value="4" />
              <Picker.Item label="5 feet" value="5" />
              <Picker.Item label="6 feet" value="6" />
              <Picker.Item label="7 feet" value="7" />
            </Picker>
            <Picker
              style={styles.picker}
              selectedValue={this.state.height_inches}
              onValueChange={itemValue => {
                asyncSettingUpdate('height_inches', itemValue);
                this.setState({ height_inches: itemValue });
              }}
            >
              <Picker.Item label="1 inch" value="1" />
              <Picker.Item label="2 inches" value="2" />
              <Picker.Item label="3 inches" value="3" />
              <Picker.Item label="4 inches" value="4" />
              <Picker.Item label="5 inches" value="5" />
              <Picker.Item label="6 inches" value="6" />
              <Picker.Item label="7 inches" value="7" />
              <Picker.Item label="8 inches" value="8" />
              <Picker.Item label="9 inches" value="9" />
              <Picker.Item label="10 inches" value="10" />
              <Picker.Item label="11 inches" value="11" />
            </Picker>
          </View>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.setState({ modalID: '' });
              }}
            >
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal isVisible={this.state.modalID == WEIGHT_ID} style={styles.modal}>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <TextInput
              keyboardType="numeric"
              textAlign="center"
              style={{ height: 50, fontSize: 20 }}
              placeholder="Enter Weight in lbs"
              onChangeText={weight => {
                asyncSettingUpdate('weight', weight);
                this.setState({ weight: weight + ' lbs' });
              }}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.setState({ modalID: '' });
              }}
              alignItems="center"
            >
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          isVisible={this.state.modalID == BIRTHDAY_ID}
          style={styles.modal}
        >
          <View style={styles.contain}>
            <DatePickerIOS
              style={{ height: 44 }}
              itemStyle={{ height: 44 }}
              mode="date"
              date={this.state.birthday}
              onDateChange={this.setDate}
            />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.setState({ modalID: '' });
              }}
            >
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
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
    backgroundColor: '#EFEFF4',
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
  titleInfoStyle: {
    fontSize: 16,
    color: '#8e8e93'
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20
  },
  contain: {
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black'
  },
  button: {
    width: 200,
    borderRadius: 10,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aedfe1'
  },
  profileContainerStyles: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  submit_text: {
    color: 'white',
    fontSize: 25
  },
  submit_button: {
    alignItems: 'center',
    backgroundColor: '#bf5252',
    padding: 15,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#bf5252'
  }
});
