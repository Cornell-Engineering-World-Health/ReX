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
import Modal from "react-native-modal";
import moment from 'moment';

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
          require('../Resources/icons8-jellyfish-100.png'),
          require('../Resources/icons8-owl-100.png'),
          require('../Resources/icons8-shark-100.png'),
          require('../Resources/icons8-hamster-100.png'),
          require('../Resources/icons8-zebra-100.png'),
          require('../Resources/icons8-wolf-100.png'),
        ]
    return (
    <View style={styles.container}>
      <View style={{borderBottomWidth:1, backgroundColor:'#f7f7f8',borderColor:'#c8c7cc'}}>
        <Text style={{alignSelf:'center',marginTop:30,marginBottom:10,fontWeight:'bold',fontSize:16}}>Settings</Text>
      </View>
      <View style={styles.container}>
        <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
          <SettingsList.Header headerStyle={{marginTop:15}}/>
          <SettingsList.Item 
            icon={<Image style={styles.imageStyle} height={60} resizeMode='contain' source={prof_icons[this.state.icon]}/>}
            hasNavArrow={false}
            title= {this.state.name}
            titleInfo='Edit'
            onPress = {this.toggleModal}
          />
          <Modal isVisible={this.state.isModalVisible_birthday} style={styles.modal}>
             <View style={styles.contain}>
             <DatePickerIOS
                style={{height: 44}} itemStyle={{height: 44}}
                mode='date'
                date={this.state.birthday}
                onDateChange={this.setDate}
                  /> 
             </View>
             <View style={{flex : 1, alignItems: 'center', justifyContent: 'center' }}>
             <TouchableOpacity style={styles.button} onPress={this.toggleModal_birthday} >
                  <Text style ={styles.text}>Submit</Text >
             </TouchableOpacity>
             </View>
          </Modal>

          <Modal isVisible={this.state.isModalVisible_height} style={styles.modal}>
             <View style={styles.contain} flexDirection = 'row' >
             <Picker
             style = {styles.picker}
             selectedValue={this.state.height_feet}
             onValueChange={(itemValue) => this.setState({height_feet: itemValue})}
             >
              <Picker.Item label = "4 feet" value = "4"/>
              <Picker.Item label = "5 feet" value = "5"/>
              <Picker.Item label = "6 feet" value = "6"/>
              <Picker.Item label = "7 feet" value = "7"/>
             </Picker>
             <Picker
             style = {styles.picker}
             selectedValue={this.state.height_inches}
             onValueChange={(itemValue) => this.setState({height_inches: itemValue})}
             >
              <Picker.Item label = "1 inch" vlue = "1"/>
              <Picker.Item label = "2 inches" value = "2"/>
              <Picker.Item label = "3 inches" value = "3"/>
              <Picker.Item label = "4 inches" value = "4"/>
              <Picker.Item label = "5 inches" value = "5"/>
              <Picker.Item label = "6 inches" value = "6"/>
              <Picker.Item label = "7 inches" value = "7"/>
              <Picker.Item label = "8 inches" value = "8"/>
              <Picker.Item label = "9 inches" value = "9"/>
              <Picker.Item label = "10 inches" value = "10"/>
              <Picker.Item label = "11 inches" value = "11"/>
             </Picker>
             </View>
             <View style={{flex : 1, alignItems: 'center', justifyContent: 'center' }}>
             <TouchableOpacity style={styles.button} onPress={this.toggleModal_height} >
                  <Text style ={styles.text}>Submit</Text >
             </TouchableOpacity>
             </View>
          </Modal>

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
              placeholder= "Enter Name"
              onChangeText={(name) => this.setState({name})}
            />
            <TouchableOpacity style={styles.button} onPress={this.toggleModal} alignItems='center'>
              <Text style ={styles.text}>Submit</Text >
            </TouchableOpacity>
            </View>
            <Modal isVisible= {this.state.isModalVisible_avatar} style={styles.modal}>
              <View style={{ flex: 1 , alignItems: 'center', justifyContent: 'center'  }}>
                <View flexDirection='row'> 
                <TouchableOpacity onPress = { () => this.handle_icon_press(1)}>
                  <Image style= {styles.avatar} source={prof_icons[1]}/>
                </TouchableOpacity>
                <TouchableOpacity onPress = { () => this.handle_icon_press(0)}>
                  <Image style= {styles.avatar} source={prof_icons[0]}/> 
                </TouchableOpacity>
                </View>
                <View flexDirection = 'row'>
                <TouchableOpacity onPress = { () => this.handle_icon_press(2)}>
                  <Image style= {styles.avatar} source={prof_icons[2]}/>
                </TouchableOpacity>
                <TouchableOpacity onPress = { () => this.handle_icon_press(3)}>
                  <Image style= {styles.avatar} source={prof_icons[3]}/> 
                </TouchableOpacity>
                </View>
                <View flexDirection = 'row'>
                <TouchableOpacity onPress = { () => this.handle_icon_press(4)}>
                  <Image style= {styles.avatar} source={prof_icons[4]}/>
                </TouchableOpacity>
                <TouchableOpacity onPress = { () => this.handle_icon_press(5)}>
                  <Image style= {styles.avatar} source={prof_icons[5]}/> 
                </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </Modal>

          <SettingsList.Item
            title='Birthday'
            hasNavArrow = {false}
            onPress = {this.toggleModal_birthday}
            switchState={this.state.switchValue}
            titleInfo = { moment(this.state.birthday).format("MMM D, YYYY")}
            switchOnValueChange={this.onValueChange}
            titleInfoStyle={styles.titleInfoStyle}
          />
          <SettingsList.Item
            title='Height'
            onPress = {this.toggleModal_height}
            hasNavArrow = {false}
            titleInfo = {this.state.height}
            switchState={this.state.switchValue}
            switchOnValueChange={this.onValueChange}
            titleInfoStyle={styles.titleInfoStyle}
          />
          <SettingsList.Item
            title='Weight'
            hasNavArrow = {false}
            onPress = {this.toggleModal_weight}
            titleInfo = {this.state.weight}
            switchState={this.state.switchValue}
            switchOnValueChange={this.onValueChange}
            titleInfoStyle={styles.titleInfoStyle}
          />
          <SettingsList.Header headerStyle={{marginTop:15}}/>
          <SettingsList.Item
            icon={<Image style={styles.imageStyle} height={60} resizeMode='contain' source={require('../Resources/health.png')}/>}
            title='Quick Log'
            hasSwitch = {true}
            hasNavArrow = {false}
            switchState={this.state.switchValue}
            switchOnValueChange={this.onValueChange}
            titleInfoStyle={styles.titleInfoStyle}
          />
          <SettingsList.Header headerStyle={{marginTop:15}}/>
          <SettingsList.Item
            title='Contact'
            onPress={() => Alert.alert('Option C')}
            icon={<Image style={styles.imageStyle} height={60} resizeMode='contain' source={require('../Resources/address-book.png')}/>}
          />
           <SettingsList.Item
            icon={<Image style={styles.imageStyle} height={60} resizeMode='contain' source={require('../Resources/quicklog.png')}/>}
            title='Quick Log'
            title='FAQ'
            onPress={() => Alert.alert('Short FAQ section?')}
          />
        </SettingsList>
      
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
      margin:5,
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
  
