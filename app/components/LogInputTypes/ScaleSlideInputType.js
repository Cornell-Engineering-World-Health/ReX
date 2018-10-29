import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import Slider from 'react-native-slider';
import { IMAGES, COLOR } from '../Resources/constants';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);

const SELECTED_COLOR = COLOR.blue;
const TITLE = 'How intense is your pain?';
const numericImageChoices = [
  IMAGES.zero,
  IMAGES.one,
  IMAGES.two,
  IMAGES.three,
  IMAGES.four,
  IMAGES.five,
  IMAGES.six,
  IMAGES.seven,
  IMAGES.eight,
  IMAGES.nine,
  IMAGES.ten
];
const imageChoices = [
  IMAGES.crying,
  IMAGES.crying,
  IMAGES.crying,
  IMAGES.crying
];
const intensityColors = []; //find 10 colors that show intensity
//INTENSITY PAGE
export default class ScaleSlideInputType extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title_text: props.title_text,
      value: props.value,
      max_val: props.max_val,
      scale_labels: props.scale_labels,
      input_style: props.input_style,
      title_text_style: props.title_text_style,
      selected: -1
    };
  }

  change(value) {
    console.log(value);
    this.setState(() => {
      return {
        value: parseFloat(value)
      };
    });
    this.props.valueChange(this.props.val_label, this.state.value);
  }

  _renderBodyImageType() {
    let body = this.props.scale_labels.map((option, i, arr) => {
      return (
        <TouchableOpacity
          key={i}
          onPress={() => {
            this.change(i);
            this.setState({ selected: i });
          }}
          style={[
            styles.button,
            {
              backgroundColor:
                this.state.selected == i ? SELECTED_COLOR : 'transparent'
            }
          ]}
        >
          <Image
            source={numericImageChoices[i]}
            style={[
              styles.imgStyle,
              {
                width: viewportWidth / (arr.length + 2),
                height: viewportWidth / (arr.length + 2)
              }
            ]}
          />
        </TouchableOpacity>
      );
    });

    return <View style={styles.body}>{body}</View>;
  }

  _renderBodyColorType() {}

  /**
   * Based on this.props.isSlider, will return a slider or a button scale input
   */
  _renderBody() {
    let scale;
    if (this.props.isSlider) {
      scale = null;
    } else {
      scale = this._renderBodyImageType();
    }

    return (
      <View>
        <View style={styles.label_view}>
          <Text style={styles.label_text}>{this.props.label_left}</Text>
          <Text style={styles.label_text}>{this.props.label_right}</Text>
        </View>
        {scale}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.questionText}>
            {this.props.question || TITLE}
          </Text>
        </View>
        {this._renderBody()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: 15
  },
  button: {
    padding: 0,
    borderRadius: 50
  },
  questionText: {
    fontSize: 40,
    fontWeight: '100',
    textAlign: 'center'
  },
  imgStyle: {
    resizeMode: 'contain'
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 40
  },
  label_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  label_text: {
    fontSize: 15
  }
});

/*
<View style={this.state.input_style}>
  <Text style={this.state.title_text_style}>{this.state.title_text}</Text>
  <Text style={styles.text}>{String(this.state.scale_labels[this.state.value])}</Text>
  <Slider
    step={1}
    maximumValue={this.state.max_val}
    onValueChange={this.change.bind(this)}
    value={this.state.value}
  />
</View>

<View style={styles.wrapper}>
  <View style={styles.header}>
    <Text style={styles.questionText}>{this.props.question || TITLE}</Text>
  </View>
  {this._renderBodyImageType()}
</View>

<View style={this.state.input_style}>
  <Text style={this.state.title_text_style}>{this.state.title_text}</Text>
  <Text style={styles.text}>{String(this.state.scale_labels[this.state.value])}</Text>
  <Slider
    step={1}
    maximumValue={this.state.max_val}
    onValueChange={this.change.bind(this)}
    value={this.state.value}
    onSlidingStart={() => {
      this.props.onStart();
    }}
    onSlidingComplete={() =>
      {
        this.props.valueChange(this.props.val_label, this.state.value);
        this.props.onComplete()
      }}
  />
</View>

*/
