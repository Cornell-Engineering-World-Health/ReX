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
import Profile from './EditProfile';
import Summary from './Summary';
import SummaryGraph from './SummaryGraph';
import {
  asyncSettingUpdate,
  pullSettingsFromDatabase
} from '../../databaseUtil/databaseUtil';
import { profile_icons, IMAGES, COLOR } from '../Resources/constants';

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
                  source={profile_icons[this.state.icon]}
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
            <SettingsList.Item
              icon={
                <Image
                  style={styles.imageStyle}
                  height={50}
                  resizeMode="contain"
                  source={IMAGES.view}
                />
              }
              title="View History"
              hasNavArrow={true}
              onPress={() => {
                this.props.navigator.push(SummaryGraphPage);
              }}
              titleInfoStyle={styles.titleInfoStyle}
            />
            <SettingsList.Header headerStyle={{ marginTop: 15 }} />
            <SettingsList.Item
              title="Contact"
              onPress={() => {
                sendMail(
                  ['navinr13@gmail.com'],
                  'Comments on Your App',
                  'Dear Engineering World Health Body, \n',
                  null,
                  null
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
  titleInfoStyle: {
    fontSize: 16,
    color: '#8e8e93'
  }
});
const ProfileRoute = {
  component: Profile
};
const SummaryPage = {
  component: Summary
};
const SummaryGraphPage = {
  component: SummaryGraph
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
