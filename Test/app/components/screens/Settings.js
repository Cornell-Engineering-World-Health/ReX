import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 40 }}> Settings </Text>
      </View>
    );
  }
}
export default Settings;
