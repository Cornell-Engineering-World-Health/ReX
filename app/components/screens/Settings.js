import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,View,Text,
  StatusBar,
  Image,
  FlatList,
  List,
  Alert,
  TextInput,
  TouchableOpacity,
  DatePickerIOS,
  Picker,
} from 'react-native';
import SettingsList from 'react-native-settings-list';
import Modal from 'react-native-modal';
import { IMAGES } from '../Resources/constants';

export default class Settings extends Component{
    constructor (props){
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {
            switchValue: false,
            birthday:  new Date(),
            name: 'Select Edit',
            isModalVisible: false,
            weight : 'Select',
            height_feet: '5',
            height_inches : '8',
            height : 'Select',
            isModalVisible_birthday : false,
            isModalVisible_height : false,
            isModalVisible_weight : false,
            isModalVisible_avatar : false,
            icon :0,

        };
        this.setDate = this.setDate.bind(this);
    }
    setDate(newDate) {
      this.setState({birthday: newDate })
    }
    handle_icon_press = (index) =>
    this.setState({icon : index, isModalVisible_avatar: !this.state.isModalVisible_avatar});

    

    toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });
    toggleModal_birthday = () =>
    this.setState({ isModalVisible_birthday: !this.state.isModalVisible_birthday });
    toggleModal_avatar = () =>
    this.setState({ isModalVisible_avatar: !this.state.isModalVisible_avatar});
    toggleModal_height = () =>
    this.setState({ isModalVisible_height: !this.state.isModalVisible_height,
       height : this.state.height_feet + "\' "+ this.state.height_inches + "\" "});

    toggleModal_weight = () =>
    this.setState({ isModalVisible_weight: !this.state.isModalVisible_weight});
    
    render(){
        var bgColor = '#DCE3F4';
        var prof_icons = [
          require('../Resources/icons8-wolf-100.png'),
          require('../Resources/icons8-zebra-100.png'),
          require('../Resources/icons8-shark-100.png'),
          require('../Resources/icons8-jellyfish-100.png'),
          require('../Resources/icons8-owl-100.png'),
          require('../Resources/icons8-hamster-100.png'),
        ]
    return (
    <View style={styles.container}>
      <View style={{borderBottomWidth:1, backgroundColor:'#f7f7f8',borderColor:'#c8c7cc'}}>
        <Text style={{alignSelf:'center',marginTop:30,marginBottom:10,fontWeight:'bold',fontSize:16}}>Settings</Text>
      </View>
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

          <Modal isVisible={this.state.isModalVisible_weight} style={styles.modal}>
          <View style={{ flex: 1 , alignItems: 'center', justifyContent: 'center' }}>
            <TextInput
              textAlign= 'center'
              style={{height: 50, fontSize : 20}}
              placeholder="Enter Weight in lbs"
              onChangeText={(weight) => this.setState({weight: weight + " lbs"})}
            />
            <TouchableOpacity style={styles.button} onPress={this.toggleModal_weight} alignItems='center'>
              <Text style ={styles.text}>Submit</Text >
            </TouchableOpacity>
          </View>
          </Modal>

          <Modal isVisible={this.state.isModalVisible} style = {styles.modal}>
            <View style={{ flex: 1 , alignItems: 'center', justifyContent: 'center' }}>
            <Image source={prof_icons[this.state.icon]}/>
            <TouchableOpacity onPress = {this.toggleModal_avatar}>
              <Text style = {styles.placeholder}>Edit Avatar</Text>
            </TouchableOpacity>
            <TextInput
              textAlign = 'center'
              style={{height: 50, fontSize: 20}} 
              placeholder="Enter Name"
              onChangeText={(name) => this.setState({name})}
            />
            <TouchableOpacity style={styles.button} onPress={this.toggleModal} alignItems='center'>
              <Text style ={styles.text}>Submit</Text >
            </TouchableOpacity>
            </View>
            <Modal isVisible= {this.state.isModalVisible_avatar} style={styles.modal}>
              <View style={{ flex: 1 , alignItems: 'center', justifyContent: 'center' }}>
                <View flexDirection='row'> 
                <TouchableOpacity onPress = {() => this.handle_icon_press(1)}>
                  <Image style= {styles.avatar} source={prof_icons[1]}/>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => this.handle_icon_press(0)}>
                  <Image style= {styles.avatar} source={prof_icons[0]}/> 
                </TouchableOpacity>
                </View>
                <View flexDirection='row'> 
                <TouchableOpacity onPress = {() => this.handle_icon_press(2)}>
                  <Image style= {styles.avatar} source={prof_icons[2]}/>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => this.handle_icon_press(3)}>
                  <Image style= {styles.avatar} source={prof_icons[3]}/> 
                </TouchableOpacity>
                </View>
                <View flexDirection='row'> 
                <TouchableOpacity onPress = {() => this.handle_icon_press(4)}>
                  <Image style= {styles.avatar} source={prof_icons[4]}/>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => this.handle_icon_press(5)}>
                  <Image style= {styles.avatar} source={prof_icons[5]}/> 
                </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </Modal>
          </SettingsList>
    </View>
    </View>
    </View>
  );
}
onValueChange(value){
  this.setState({switchValue: value});
}
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#EFEFF4',
        flex:1
    },
    avatar:{
      height: 100,
      width: 100,
      margin: 7.
    },
    imageStyle:{
      marginLeft:5,
      marginTop: 5,
      marginBottom: 5,
      alignSelf:'center',
      height:55,
      width:55
    },
    placeholder:{
      color: '#bbbbbb',
    },
    picker: {
      width: 100,
    },
    titleInfoStyle:{
      fontSize:16,
      color: '#8e8e93'
    },
    modal:{
      flex:1,
      justifyContent: 'center',
      backgroundColor: 'white',
      borderRadius: 20,
    },
    contain: {
      flex: 1,
      justifyContent: 'center'
    },
    text:{
        fontWeight : 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
    },
    button:{
        width: 200,
        borderRadius: 10,
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#aedfe1'
    }
  });
  
