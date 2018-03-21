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
  TouchableOpacity
} from 'react-native';
import SettingsList from 'react-native-settings-list';
import Modal from 'react-native-modal';
import { IMAGES } from '../Resources/constants';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      switchValue: false,
      birthday: 'select',
      isDateTimePickerVisible: false,
      text: 'Enter Name',
      isModalVisible: false
    };
  }
  toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    var bgColor = '#DCE3F4';
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
              alignSelf: 'center',
              marginTop: 30,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 16
            }}
          >
            Settings
          </Text>
        </View>
        <View style={styles.container}>
          <SettingsList borderColor="#c8c7cc" defaultItemSize={50}>
            <SettingsList.Header headerStyle={{ marginTop: 15 }} />
            <View
              flexDirection="row"
              height={50}
              backgroundColor="white"
              paddingLeft={10}
              paddingTop={10}
              paddingBottom={10}
            >
              <TextInput
                paddingLeft={10}
                style={{ height: 50 }}
                placeholder="Text Input Custom Setting"
                // onChangeText={(text) => this.setState({text})}
              />
            </View>
            <SettingsList.Item
              icon={
                <Image
                  style={styles.imageStyle}
                  height={60}
                  resizeMode="contain"
                  source={IMAGES.profile}
                />
              }
              hasNavArrow={false}
              title={this.state.text}
              titleInfo="Edit"
              onPress={this.toggleModal}
            />
            <Modal
              isVisible={this.state.isModalVisible}
              backdropColor="#FFFFFF"
              transparent={false}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text style={styles.text}>Enter Name </Text>
                <TextInput
                  style={{ height: 50 }}
                  placeholder="Text Input Custom Setting"
                  onChangeText={text => this.setState({ text })}
                  value={this.state.text}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.toggleModal}
                >
                  <Text style={styles.text}>Submit</Text>
                </TouchableOpacity>
              </View>
            </Modal>

            <SettingsList.Item
              icon={
                <Image style={styles.imageStyle} source={IMAGES.birthday} />
              }
              title="Birthday"
              titleInfo={this.state.birthday}
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() => Alert.alert('Option List')}
            />

            <SettingsList.Item
              title="Toggle"
              hasSwitch={true}
              hasNavArrow={false}
              switchState={this.state.switchValue}
              switchOnValueChange={this.onValueChange}
              titleInfoStyle={styles.titleInfoStyle}
            />
            <SettingsList.Item
              title="Settings A"
              onPress={() => Alert.alert('Settings A')}
            />
            <SettingsList.Item
              title="Settings B"
              titleInfo={this.state.birthday}
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() => Alert.alert('Settings B')}
            />
            <SettingsList.Header headerStyle={{ marginTop: 15 }} />
            <SettingsList.Item
              title="Option A"
              onPress={() => Alert.alert('Option A')}
            />
            <SettingsList.Item
              title="Option B"
              onPress={() => Alert.alert('Option B')}
            />
            <SettingsList.Item
              title="Option C"
              onPress={() => Alert.alert('Option C')}
            />
            <SettingsList.Header headerStyle={{ marginTop: 15 }} />
            <SettingsList.Item
              title="Option A"
              onPress={() => Alert.alert('Option A')}
            />
            <SettingsList.Item
              title="Option B"
              onPress={() => Alert.alert('Option B')}
            />
            <SettingsList.Item
              title="Option C"
              onPress={() => Alert.alert('Option C')}
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
  profile: {
    height: 50,
    width: 500,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  imageStyle: {
    marginLeft: 15,
    alignSelf: 'center',
    height: 30,
    width: 30
  },
  titleInfoStyle: {
    fontSize: 16,
    color: '#8e8e93'
  },
  text: {
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 100,
    borderRadius: 30,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3'
  }
});
