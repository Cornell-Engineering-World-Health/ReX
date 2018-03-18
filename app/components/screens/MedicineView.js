import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Button } from 'react-native';
import Circle from '../MedicineComponents/Circle.js';


class MedicineView extends React.Component {
  static propTypes = {
    onPress: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      pageID: MEDICINE_VIEW_HOME
    };
  }
 
  render() {
    let page = this._renderScreen();
    return <View style={{ flex: 1 }}>{page}</View>;
  }
}
export default MedicineView;
