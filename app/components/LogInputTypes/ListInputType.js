import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  FlatList,
  Image,
  TextInput
} from 'react-native';
import { COLOR, IMAGES } from '../Resources/constants.js';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);

const ListItem = props => (
  <TouchableOpacity style={[styles.itemWrapper, props.style]}>
    <Text style={styles.itemTextStyle}>{props.text}</Text>
  </TouchableOpacity>
);
const AddItem = props => (
  <View style={[styles.itemWrapper, props.style]}>
    <TextInput
      style={styles.textInputStyle}
      onChangeText={text => {
        props.onChangeText(text);
      }}
      value={props.value}
      placeholder={'Add More'}
      onSubmitEditing={() => {
        props.onSubmitEditing();
      }}
    />
    <View style={styles.imageWrapper}>
      <Image style={styles.plusSignStyle} source={IMAGES.plusSignMinimal} />
    </View>
  </View>
);

export default class Duration extends React.Component {
  static propTypes = {
    buttonTitles: PropTypes.array, // array of strings
    valueChange: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      symptoms: ['LAST_ELEMENT'],
      addText: ''
    };
  }

  handleChange(val) {
    this.props.valueChange(this.props.val_label, val);
  }

  _keyExtractor = (item, index) => item.index;

  _renderItem = ({ item, index }) => {
    if (index == this.state.symptoms.length - 1) {
      return (
        <AddItem
          style={styles.addItemWrapper}
          onChangeText={text => {
            this.setState({ addText: text });
          }}
          value={this.state.addText}
          onSubmitEditing={() => {
            this._onSubmit();
          }}
        />
      );
    }
    return (
      <ListItem
        text={item}
        style={{
          backgroundColor:
            index % 2 == 0 ? COLOR.green + '50' : COLOR.green + '90',
          justifyContent: 'center'
        }}
      />
    );
  };

  _onSubmit() {
    data = this.state.symptoms;
    data.push(this.state.addText);

    this.setState({ data });
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <FlatList
          data={this.state.symptoms}
          extraData={this.state}
          keyExtractor={(item, index) => index}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  itemWrapper: {
    margin: 1,
    alignItems: 'center',
    height: 50,
    backgroundColor: COLOR.green,
    width: viewportWidth * 0.8,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  addItemWrapper: {
    justifyContent: 'space-between'
  },
  itemTextStyle: {
    textAlign: 'center',
    fontWeight: '100',
    fontSize: 20
  },
  wrapper: {
    flex: 1,
    position: 'relative'
  },
  imageStyle: {
    height: 25,
    width: 25
  },
  textInputStyle: {
    height: 50,
    borderColor: 'gray',
    flex: 0.8,
    fontSize: 15,
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#ffffff50'
  },
  imageWrapper: {
    flex: 0.3,
    alignItems: 'center'
  }
});
