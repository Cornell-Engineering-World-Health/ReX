import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  TextInput
} from 'react-native';
import { COLOR, IMAGES } from '../../resources/constants.js';

const ITEM_HEIGHT = 55;

export default class AddItem extends React.Component {
    static propTypes = {
        valueChange: PropTypes.func
      };

    constructor(props) {
      super(props);

      this.state = {
        addText: '',
      };
    }

    onAddSubmit() {
        if (this.state.addText != '') {
        //   data = this.state.symptoms;
        //   console.log("this the data")
        //   console.log(data)
        //   data.splice(data.length - 1, 0, this.state.addText);
          this.props.valueChange(this.state.addText);
          this.setState({ addText: '' });    
        }
      }
  
    render() {
      return (
        <View style={[styles.itemWrapper]}>
      <TextInput
        maxLength={35}
        style={styles.textInputStyle}
        onChangeText={text => {
          this.setState({addText: text})
        }}
        value={0}
        placeholder={'Add More'}
        onSubmitEditing={() => {
          this.onAddSubmit()
        }}
      />
      <TouchableOpacity
        style={styles.imageWrapper}
        onPress={() => {
          this.onAddSubmit()
        }}
      >
        <Image style={styles.plusSignStyle} source={IMAGES.plusSignMinimal} />
      </TouchableOpacity>
    </View>
      );
    }
  }

  const styles = StyleSheet.create({
    itemWrapper: {
      margin: 1,
      alignItems: 'center',
      height: ITEM_HEIGHT,
      backgroundColor: COLOR.blue,
      flexDirection: 'row',
      justifyContent: 'center',
      zIndex: 1,
      position: 'relative',
      flex: 1
    },
    header: {
      flex: 0.2
    },
    questionText: {
      fontSize: 25,
      fontWeight: '100',
      textAlign: 'center'
    },
    itemTextStyle: {
      textAlign: 'center',
      fontWeight: '100',
      fontSize: 18
    },
    wrapper: {
      flex: 1,
      alignItems: 'stretch'
    },
    imageStyle: {
      height: 25,
      width: 25
    },
    textInputStyle: {
      height: ITEM_HEIGHT,
      borderColor: 'gray',
      flex: 0.8,
      fontSize: 15,
      paddingLeft: 15,
      paddingTop: 5,
      paddingBottom: 5,
      backgroundColor: '#ffffff50'
    },
    imageWrapper: {
      flex: 0.2,
      alignItems: 'center'
    }
  });
  
  const overlayStyles = {
    overlay: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: '#00000099',
      zIndex: 2,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center'
    },
    overlayText: {
      textAlign: 'center',
      fontSize: 25,
      fontWeight: '200',
      color: '#fff'
    },
    buttonWrapper: {
      flex: 1,
      height: ITEM_HEIGHT,
      justifyContent: 'center',
      backgroundColor: '#00000075'
    }
  };