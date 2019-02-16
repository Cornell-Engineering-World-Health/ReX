import React from "react";
import PropTypes from "prop-types";
import ButtonWithImage from "../Button/ButtonWithImage";

class ButtonSelector extends React.Component {
  static propTypes = {
    defaultBackgroundColor: PropTypes.string,
    selectedBackgroundColor: PropTypes.string,
    selected: PropTypes.bool
  };

  constructor(props) {
    super(props);
  }

  render() {
    let icon = this.props.imageSource;
    let imageStyle = {};
    if (this.props.selected) {
      imageStyle.tintColor = this.props.selectedBackgroundColor;
    } else {
      imageStyle.tintColor = this.props.defaultBackgroundColor;
    }
    return (
      <ButtonWithImage
        {...this.props}
        imageStyle={imageStyle}
        imageSource={icon}
      />
    );
  }
}

export default ButtonSelector;
