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
    <TouchableOpacity
      style={styles.imageWrapper}
      onPress={() => {
        props.onSubmitEditing();
      }}
    >
      <Image style={styles.plusSignStyle} source={IMAGES.plusSignMinimal} />
    </TouchableOpacity>
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
            index % 2 == 0 ? COLOR.blue + '50' : COLOR.blue + '90',
          justifyContent: 'center'
        }}
      />
    );
  };

  _onSubmit() {
    if (this.state.addText != '') {
      data = this.state.symptoms;
      data.splice(data.length - 1, 0, this.state.addText);
      this.setState({ data: data, addText: '' });

      let formatSubmit = data.slice(0, data.length - 1).join(', ');
      this.props.valueChange(this.props.val_label, formatSubmit);
      console.log(formatSubmit, 'FORMAT_SUBMIT');
    }
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.questionText}>{'Any other symptoms?'}</Text>
        </View>
        <View style={{ flex: 0.8 }}>
          <FlatList
            data={this.state.symptoms}
            extraData={this.state}
            keyExtractor={(item, index) => index}
            renderItem={this._renderItem}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  itemWrapper: {
    margin: 1,
    alignItems: 'center',
    height: 50,
    backgroundColor: COLOR.blue,
    width: viewportWidth * 0.8,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  header: {
    flex: 0.2
  },
  questionText: {
    fontSize: 25,
    fontWeight: '100',
    textAlign: 'center'
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
