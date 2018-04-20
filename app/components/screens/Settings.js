import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  List,
  Alert,
  TextInput,
  TouchableOpacity,
  Picker,
  NavigatorIOS
} from 'react-native';
import { sendMail } from '../Mail/MailController';
import { TextField } from 'react-native-material-textfield';
import SettingsList from 'react-native-settings-list';
import moment from 'moment';
import { StackNavigator } from 'react-navigation';
import Profile from './EditProfile.js';
import {
  asyncSettingUpdate,
  pullSettingsFromDatabase
} from '../../databaseUtil/databaseUtil';
import { IMAGES, COLOR } from '../Resources/constants';

const prof_icons = [
  IMAGES.iconWolf,
  IMAGES.iconZebra,
  IMAGES.iconJellyfish,
  IMAGES.iconOwl,
  IMAGES.iconHamster
];

class Settings extends Component {
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
      height: 'Select',
      icon: 0,
      email: 'navin@gmail.com',
      choosingAvatar: false,
      touchID: false,
      quickLog: false
    };
  }

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
    let header = this._renderHeader();
    return (
      <View style={styles.container}>
        <View
          style={{
            borderBottomWidth: 1,
            backgroundColor: '#f7f7f8',
            borderColor: '#c8c7cc'
          }}
        >
          <Text
            style={{
              alignSelf: 'flex-start',
              marginTop: 50,
              marginLeft: 20,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 35
            }}
          >
            Settings
          </Text>
        </View>
        <View style={styles.container}>
          <SettingsList borderColor="#c8c7cc" defaultItemSize={50}>
            <SettingsList.Header headerStyle={{ marginTop: 15 }} />
            <SettingsList.Item
              icon={
                <Image
                  style={styles.imageStyle}
                  height={100}
                  width={100}
                  resizeMode="cover"
                  source={prof_icons[this.state.icon]}
                />
              }
              hasNavArrow={false}
              title={this.state.name}
              titleInfo={'Edit' + '\n' + 'Profile'}
              titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
              onPress={() => {
                this.props.navigator.push(ProfileRoute);
              }}
            />

            <SettingsList.Header headerStyle={{ marginTop: 15 }} />
            <SettingsList.Item
              icon={
                <Image
                  style={styles.imageStyle}
                  height={50}
                  resizeMode="contain"
                  source={IMAGES.quickLog}
                />
              }
              title="Quick Log"
              hasSwitch={true}
              hasNavArrow={false}
              switchState={this.state.quickLog}
              switchOnValueChange={() => {
                this.setState({ quickLog: !this.state.quickLog });
              }}
              titleInfoStyle={styles.titleInfoStyle}
            />
            <SettingsList.Item
              icon={
                <Image
                  style={styles.imageStyle}
                  height={50}
                  resizeMode="contain"
                  source={IMAGES.security}
                />
              }
              title="Use Touch ID"
              hasSwitch={true}
              hasNavArrow={false}
              switchState={this.state.touchID}
              switchOnValueChange={() => {
                this.setState({ touchID: !this.state.touchID });
              }}
              titleInfoStyle={styles.titleInfoStyle}
            />
            <SettingsList.Header headerStyle={{ marginTop: 15 }} />
            <SettingsList.Item
              title="Contact"
              onPress={() => {
                sendMail(
                  ['ewhcornell@gmail.com'],
                  'Comments on Your App',
                  'Dear Engineering World Health Body, \n',
                  null,
                  null //no attachments + callback
                );
              }}
              icon={
                <Image
                  style={styles.imageStyle}
                  height={60}
                  resizeMode="contain"
                  source={IMAGES.addressBook}
                />
              }
            />
            <SettingsList.Item
              icon={
                <Image
                  style={styles.imageStyle}
                  height={60}
                  resizeMode="contain"
                  source={IMAGES.faq}
                />
              }
              title="Quick Log"
              title="FAQ"
              onPress={() =>
                Alert.alert('Question: Is this app awesome?\n Answer: yes ')
              }
            />
          </SettingsList>
        </View>
      </View>
    );
  }
  onValueChange(value) {
    this.setState({ switchValue: value });
  }
}

const styles = StyleSheet.create({
  profileHeader: {
    marginTop: 25,
    backgroundColor: '#ffffff',
    alignItems: 'center'
  },
  profileHeaderSubText: {
    fontSize: 15,
    color: '#71d7fc'
  },
  profileBody: {
    padding: 25
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
const ProfileRoute = {
  component: Profile
};
export default class settingsList extends React.Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Settings
        }}
        style={{ flex: 1, marginTop: 20 }}
        navigationBarHidden={true}
      />
    );
  }
}
// export default StackNavigator(
//   {
//     Home: {
//       screen: Settings,
//       navigationOptions: {
//         header: null
//       }
//     },
//     Profile: { screen: Profile }
//   },
//   {
//     initialRouteName: 'Profile'
//   }
// );
