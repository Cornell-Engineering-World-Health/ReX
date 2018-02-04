import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Image, StyleSheet} from 'react-native';


const Button = ({ text, onPress, image }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View >
      <Image resizeMode="contain" style={styles.icon} source={require('./dizzy.png')} />
    </View>
  </TouchableOpacity>
);

Button.propTypes = {
  onPress: PropTypes.func,
};


const styles = StyleSheet.create({
container: {
    alignItems: 'center',
  },
icon: {
    backgroundColor :'skyblue',
  },

  });