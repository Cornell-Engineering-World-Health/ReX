import React from 'react';
<<<<<<< HEAD
import PropTypes from 'prop-types';
=======
>>>>>>> nocirclesadface
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
<<<<<<< HEAD
import { IMAGES, COLOR } from '../../resources/constants';
=======
import Slider from 'react-native-slider';
import { IMAGES, COLOR } from '../Resources/constants';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);
>>>>>>> nocirclesadface

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
<<<<<<< HEAD
/* each element is of the form [<color>, <numberTitle>, Summary>]
https://paindoctor.com/pain-scales/ (Color scheme from #11)
*/
const numericMetaInfo = [
  ['rgb(140, 234, 255)', 'No Pain'],
  ['rgb(105, 183, 140)', 'Minimal'],
  ['rgb(122, 208, 105)', 'Mild'],
  ['rgb(155, 232, 77)', 'Uncomfortable'],
  ['rgb(195, 237, 71)', 'Moderate'],
  ['rgb(240, 196, 46)', 'Distracting'],
  ['rgb(233, 161, 38)', 'Distressing'],
  ['rgb(226, 114, 38)', 'Unmanageable'],
  ['rgb(221, 63, 31)', 'Intense'],
  ['rgb(187, 1, 1)', 'Severe'],
  ['rgb(125, 1, 1)', 'Unable to Move']
]; //find 10 colors that show intensity
//INTENSITY PAGE
export default class ScaleSlideInputType extends React.Component {
  static propTypes = {
    val_label: PropTypes.string,
    valueChange: PropTypes.func,
    label_left: PropTypes.string,
    label_right: PropTypes.string,
    question: PropTypes.string,
    scale_labels: PropTypes.array, //looks like dead code, check
    value: PropTypes.number
  };

=======
const imageChoices = [
  IMAGES.crying,
  IMAGES.crying,
  IMAGES.crying,
  IMAGES.crying
];
const intensityColors = []; //find 10 colors that show intensity
//INTENSITY PAGE
export default class ScaleSlideInputType extends React.Component {
>>>>>>> nocirclesadface
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
<<<<<<< HEAD
      viewportWidth: 1,
      viewportHeight: 1,
      selected: 0
    };
  }

  /*
  Take in a native event (part of the object passed in from onLayout)

  Sets global variables viewportWidth and viewportHeight according to the size
  of the screen
  */
  _setGlobalHeightAndWidth(nativeEvent) {
    this.setState({ viewportHeight: nativeEvent.layout.height });
    this.setState({ viewportWidth: nativeEvent.layout.width }, () => {});
  }

  change(value) {
=======
      max_val: props.max_val,
      scale_labels: props.scale_labels,
      input_style: props.input_style,
      title_text_style: props.title_text_style,
      selected: -1
    };
  }

  change(value) {
    console.log(value);
>>>>>>> nocirclesadface
    this.setState(() => {
      return {
        value: parseFloat(value)
      };
    });
    this.props.valueChange(this.props.val_label, this.state.value);
  }

  _renderBodyImageType() {
<<<<<<< HEAD
    let body = null;
    if (this.props.isIntensitySlider) {
      body = this.props.scale_labels.map((option, i, arr) => {
        let width = this.state.viewportWidth / arr.length;

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
                borderRadius: 0,
                backgroundColor: numericMetaInfo[i],
                height: width,
                width: width
              }
            ]}
          >
            <Text style={[styles.buttonText]}>{i}</Text>
          </TouchableOpacity>
        );
      });
    } else {
      body = this.props.scale_labels.map((option, i, arr) => {
        let width = this.state.viewportWidth / arr.length;

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
                  width: width,
                  height: width
                }
              ]}
            />
          </TouchableOpacity>
        );
      });
    }
    return <View style={styles.body}>{body}</View>;
  }

=======
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

>>>>>>> nocirclesadface
  /**
   * Based on this.props.isSlider, will return a slider or a button scale input
   */
  _renderBody() {
<<<<<<< HEAD
    let scale = this._renderBodyImageType();

    return (
      <View
        onLayout={({ nativeEvent }) => {
          this._setGlobalHeightAndWidth(nativeEvent);
        }}
      >
=======
    let scale;
    if (this.props.isSlider) {
      scale = null;
    } else {
      scale = this._renderBodyImageType();
    }

    return (
      <View>
>>>>>>> nocirclesadface
        <View style={styles.label_view}>
          <Text style={styles.label_text}>{this.props.label_left}</Text>
          <Text style={styles.label_text}>{this.props.label_right}</Text>
        </View>
        {scale}
      </View>
    );
<<<<<<< HEAD
  }

  _renderFooterLabel() {
    if (this.props.isIntensitySlider) {
      return (
        <View
          style={[
            styles.intensityLabelContainer,
            {
              width: this.state.viewportWidth,
              backgroundColor: numericMetaInfo[this.state.selected][0]
            }
          ]}
        >
          <Text style={styles.intensityLabel}>
            {numericMetaInfo[this.state.selected][1]}
          </Text>
        </View>
      );
    }
=======
>>>>>>> nocirclesadface
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.questionText}>
            {this.props.question || TITLE}
          </Text>
        </View>
<<<<<<< HEAD
        <View style={[styles.bottomHalf]}>
          {this._renderBody()}
          {this._renderFooterLabel()}
        </View>
        {/*Render the intensity labels underneath if necessary*/}
=======
        {this._renderBody()}
>>>>>>> nocirclesadface
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
<<<<<<< HEAD
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
  button: {
    padding: 0,
    borderRadius: 50,
    justifyContent: 'center'
  },
  bottomHalf: {
    alignItems: 'stretch'
=======
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: 15
  },
  button: {
    padding: 0,
    borderRadius: 50
>>>>>>> nocirclesadface
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
<<<<<<< HEAD
    alignItems: 'stretch'
=======
    paddingBottom: 40
>>>>>>> nocirclesadface
  },
  label_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  label_text: {
<<<<<<< HEAD
    fontSize: 18,
    fontWeight: '100'
  },
  buttonText: {
    fontSize: 15,
    textAlign: 'center'
  },
  intensityLabelContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  intensityLabel: {
    fontSize: 25,
    fontWeight: '200',
    color: 'white'
  }
});
=======
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
>>>>>>> nocirclesadface
