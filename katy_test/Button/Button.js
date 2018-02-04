import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Image, Text , StyleSheet} from 'react-native';


const Button = ({onPress}) => (
  <TouchableOpacity style={{width:125, height: 150, backgroundColor: 'skyblue', paddingVertical: 15}} onPress={onPress}>
    <View >
      <Image resizeMode="contain"  style={{width:125, height: 150}}  source={require('./headpain.png')} />
    </View>
  </TouchableOpacity>
);

Button.propTypes = {
  onPress: PropTypes.func,
};


export default Button;
