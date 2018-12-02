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
<<<<<<< HEAD
import { COLOR, IMAGES } from '../../resources/constants.js';

const ITEM_HEIGHT = 55;
=======
import { COLOR, IMAGES } from '../Resources/constants.js';

>>>>>>> nocirclesadface
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);

<<<<<<< HEAD
/*
Props:
text:     to render
onDelete: function to delete current from list


*/
=======
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

>>>>>>> nocirclesadface
export default class Duration extends React.Component {
  static propTypes = {
    buttonTitles: PropTypes.array, // array of strings
    valueChange: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      symptoms: ['LAST_ELEMENT'],
<<<<<<< HEAD
      addText: '',
      overlayOpenIndex: -1
=======
      addText: ''
>>>>>>> nocirclesadface
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
<<<<<<< HEAD
            this._list.scrollToIndex({
              index: this.state.symptoms.length - 1,
              animated: true,
              viewPosition: 1
            });
=======
>>>>>>> nocirclesadface
          }}
        />
      );
    }
    return (
      <ListItem
<<<<<<< HEAD
        isOverlayOpen={this.state.overlayOpenIndex == index}
        setOverlay={isOpen => {
          this._setOverlayStatus(isOpen ? index : -1);
        }}
        onDelete={() => {
          this._deleteItem(index);
        }}
=======
>>>>>>> nocirclesadface
        text={item}
        style={{
          backgroundColor:
            index % 2 == 0 ? COLOR.blue + '50' : COLOR.blue + '90',
          justifyContent: 'center'
        }}
      />
    );
  };

<<<<<<< HEAD
  _setOverlayStatus(index) {
    this.setState({ overlayOpenIndex: index });
  }

  /*
Called when person clicks enter every time they type another entry
*/
=======
>>>>>>> nocirclesadface
  _onSubmit() {
    if (this.state.addText != '') {
      data = this.state.symptoms;
      data.splice(data.length - 1, 0, this.state.addText);
      this.setState({ data: data, addText: '' });

<<<<<<< HEAD
      let formatSubmit = this._formatSubmit();
      this.props.valueChange(this.props.val_label, formatSubmit);
    }
  }

  /**
Format the state array into a string for storing in the database
*/
  _formatSubmit() {
    data = this.state.symptoms;
    return data.slice(0, data.length - 1).join(', ');
  }

  /*
Delete the item in the list at the given index

If index is an invalid number, function does nothing.
*/
  _deleteItem(index) {
    data = this.state.symptoms;

    if (index < 0 || index > data.length) {
      return;
    }
    data.splice(index, 1);

    this.setState({ data: data, overlayOpenIndex: -1 });

    let formatSubmit = this._formatSubmit();
    this.props.valueChange(this.props.val_label, formatSubmit);
  }

=======
      let formatSubmit = data.slice(0, data.length - 1).join(', ');
      this.props.valueChange(this.props.val_label, formatSubmit);
      console.log(formatSubmit, 'FORMAT_SUBMIT');
    }
  }

>>>>>>> nocirclesadface
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.questionText}>{'Any other symptoms?'}</Text>
        </View>
<<<<<<< HEAD
        <View style={{ flex: 0.8, alignItems: 'center' }}>
          <FlatList
            ref={flatlist => {
              this._list = flatlist;
            }}
            getItemLayout={(data, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index
            })}
=======
        <View style={{ flex: 0.8 }}>
          <FlatList
>>>>>>> nocirclesadface
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
<<<<<<< HEAD

class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let overlay = (
      <View style={overlayStyles.overlay}>
        <TouchableOpacity
          onPress={this.props.onDelete}
          style={overlayStyles.buttonWrapper}
        >
          <Text style={overlayStyles.overlayText}>{'Delete'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={overlayStyles.buttonWrapper}
          onPress={() => this.props.setOverlay(false)}
        >
          <Text style={overlayStyles.overlayText}>{'Cancel'}</Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <TouchableOpacity
        disabled={this.props.isOverlayOpen}
        style={[styles.itemWrapper, this.props.style]}
        onPress={() => {
          this.props.setOverlay(true);
        }}
      >
        <Text style={styles.itemTextStyle}>{this.props.text}</Text>
        {this.props.isOverlayOpen ? overlay : null}
      </TouchableOpacity>
    );
  }
}

const AddItem = props => {
  return (
    <View style={[styles.itemWrapper, props.style]}>
      <TextInput
        maxLength={35}
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
};

=======
>>>>>>> nocirclesadface
const styles = StyleSheet.create({
  itemWrapper: {
    margin: 1,
    alignItems: 'center',
<<<<<<< HEAD
    height: ITEM_HEIGHT,
    backgroundColor: COLOR.blue,
    width: viewportWidth * 0.8,
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 1,
    position: 'relative',
    flex: 1
=======
    height: 50,
    backgroundColor: COLOR.blue,
    width: viewportWidth * 0.8,
    flexDirection: 'row',
    justifyContent: 'center'
>>>>>>> nocirclesadface
  },
  header: {
    flex: 0.2
  },
  questionText: {
    fontSize: 25,
    fontWeight: '100',
    textAlign: 'center'
  },
<<<<<<< HEAD
  itemTextStyle: {
    textAlign: 'center',
    fontWeight: '100',
    fontSize: 18
  },
  wrapper: {
    flex: 1,
    alignItems: 'stretch'
=======
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
>>>>>>> nocirclesadface
  },
  imageStyle: {
    height: 25,
    width: 25
  },
  textInputStyle: {
<<<<<<< HEAD
    height: ITEM_HEIGHT,
=======
    height: 50,
>>>>>>> nocirclesadface
    borderColor: 'gray',
    flex: 0.8,
    fontSize: 15,
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#ffffff50'
  },
  imageWrapper: {
<<<<<<< HEAD
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
=======
    flex: 0.3,
    alignItems: 'center'
  }
});
>>>>>>> nocirclesadface
