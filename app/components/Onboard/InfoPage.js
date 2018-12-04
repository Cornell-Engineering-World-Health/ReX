import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ImageBackground
} from 'react-native';
import Profile from '../../screens/EditProfile';
import { IMAGES, COLOR } from '../../resources/constants';
import {
  asyncSettingUpdate,
} from '../../databaseUtil/databaseUtil';

const SETTINGS_FIELDS = [
  'birthday',
  'name',
  'weight',
  'height_feet',
  'height_inches',
  'icon',
  'email',
]
const EMAIL_RE = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

class IntroPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      birthday: undefined,
      name: '',
      weight: '',
      height_feet: '',
      height_inches: '',
      height: '',
      icon: 0,
      email: '',
    };

  }

  settingsUpdate(setting, value) {
    switch (setting) {
      case 'birthday':
        this.setState({ birthday: value });
        break;
      case 'name':
        this.setState({ name: value });
        break;
      case 'weight':
        this.setState({ weight: value});
        break;
      case 'height_feet':
        this.setState({
          height_feet: value,
          height: value + ' ft ' + this.state.height_inches + ' in'
        });
        break;
      case 'height_inches':
        this.setState({
          height_inches: value,
          height: this.state.height_feet + ' ft ' + value + ' in'
        });
        break;
      case 'icon':
        this.setState({ icon: value });
        break;
      case 'email':
        this.setState({ email: value });
        break;
    }
  }

  checkValidity(){
    let isValid = true
    let reason = ''

    SETTINGS_FIELDS.forEach((setting) => {

      if(setting == 'email' && !EMAIL_RE.test(this.state[setting])){
        isValid = false
        reason = setting;
      } else if (((typeof this.state[setting]) == 'string' && this.state[setting] == '')
      || this.state[setting] == undefined ){
        isValid = false
        reason = setting
        console.log(this.state[setting], setting)
      }
    })
    return [isValid, reason]
  }

  render(){
    return (
      <ImageBackground
        style={styles.container}
        source={IMAGES.intro_background}
      >
        <View style={styles.headerView}>
          <View style={{paddingTop: 11}}>
            <Text style={styles.header}>{"Welcome"}</Text>
          </View>
          <Image source={IMAGES.fiih} style={styles.logo} />
        </View>
        <View style={styles.profileWrapper}>
          <Profile
            settingsUpdate={(setting, value) => {
              console.log('entered settings update');
              this.settingsUpdate(setting, value);

              asyncSettingUpdate(setting, value);
            }}
            birthday={this.state.birthday}
            icon={this.state.icon}
            name={this.state.name}
            height_feet={this.state.height_feet}
            height_inches={this.state.height_inches}
            height={this.state.height}
            weight={this.state.weight}
            baseColor={'#A0A0A0'}
            textColor={'#A0A0A0'}
          />
        </View>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => {
            let check = this.checkValidity()
            if(check[0] == true){
              SETTINGS_FIELDS.forEach((setting) => {
                asyncSettingUpdate(setting, this.state[setting]);
              })
              this.props.screenProps.successOnSubmit();
            } else {
              if(check[1] == 'email') this.props.screenProps.emailErrorOnSubmit();
              else this.props.screenProps.errorOnSubmit();
            }
          }}
        >
          <Text style={styles.startButtonText}>{"Confirm"}</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 30,
    paddingBottom: 30,
    padding: 20,
    backgroundColor: '#21242a'
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  logo: {
    width: 70,
    height: 70
  },
  header: {
    fontSize: 40,
    fontFamily: 'HelveticaNeue-Thin',
    letterSpacing: 3,
    color: '#A0A0A0'
  },
  startButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#707070',
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center'
  },
  startButtonText: {
    fontSize: 20,
    letterSpacing: 2,
    fontFamily: 'HelveticaNeue',
    color: '#707070'
  },
  profileWrapper: {
    flex: 1,
    borderRadius: 10
  },
});


export default IntroPage;
