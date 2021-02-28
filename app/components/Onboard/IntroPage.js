import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground
} from 'react-native';

import { IMAGES, COLOR } from '../../resources/constants';

class IntroPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={IMAGES.intro_background}
      >
        <View style={styles.inner_container}>
          <Image source={IMAGES.fiih} style={styles.logo} />
          <Text style={styles.header}>{"Rex"}</Text>
          <Text style={styles.subheader}>
            {"Track and monitor symptoms and medications!"}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => {
            this.props.navigation.navigate('Info', {})
          }}
        >
          <Text style={styles.startButtonText}>{"Let's get started"}</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Dimensions.get('window').height / 4,
    paddingBottom: 120,
    padding: 40,
    backgroundColor: '#21242a'
  },
  inner_container: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  logo: {
    marginBottom: 5,
    width: 100,
    height: 100
  },
  header: {
    fontSize: 40,
    fontFamily: 'HelveticaNeue',
    letterSpacing: 4,
    color: '#A0A0A0'
  },
  subheader: {
    marginTop: 20,
    fontSize: 20,
    letterSpacing: 2,
    fontFamily: 'HelveticaNeue-Thin',
    color: '#707070',
    textAlign: 'center'
  },
  startButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#707070',
    borderRadius: 30
  },
  startButtonText: {
    fontSize: 20,
    letterSpacing: 2,
    fontFamily: 'HelveticaNeue',
    color: '#707070'
  }
});


export default IntroPage;
