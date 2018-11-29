import React from 'react';
import PropTypes from 'prop-types';
import ButtonWithImage from '../Button/ButtonWithImage';

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
    let background = this.props.defaultBackgroundColor;
    let icon = this.props.imageSource;
    if (this.props.selected) {
      //insert code to do something on selected, probably change the styles
    }
    return (
      <ButtonWithImage
        {...this.props}
        imageSource={icon}
        backgroundColor={background}
      />
    );
  }
}

export default ButtonSelector;
