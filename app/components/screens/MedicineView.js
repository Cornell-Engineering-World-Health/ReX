import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Button } from 'react-native';
const HEADACHE_FORM = 'headache';
const BACKPAIN_FORM = 'backpain';
const MEDICINE_VIEW_HOME = 'homeview';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'orange',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

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
  _renderScreen() {
    switch (this.state.pageID) {
      case MEDICINE_VIEW_HOME:
        return (
          <View style={styles.container}>
            <Text style={{ fontSize: 40 }}> Medicine View </Text>
            <Button
              color={'white'}
              title={'Headache Form'}
              onPress={() =>
                this.setState({
                  pageID: HEADACHE_FORM
                })
              }
            />
            <Button
              color={'white'}
              title={'Backpain Form'}
              onPress={() =>
                this.setState({
                  pageID: BACKPAIN_FORM
                })
              }
            />
          </View>
        );
        break;
      case HEADACHE_FORM:
        return (
          <HeadacheForm
            onPress={() =>
              this.setState({
                pageID: MEDICINE_VIEW_HOME
              })
            }
          />
        );
      case BACKPAIN_FORM:
        return (
          <BackPainForm
            onPress={() =>
              this.setState({
                pageID: MEDICINE_VIEW_HOME
              })
            }
          />
        );
    }
  }
  render() {
    let page = this._renderScreen();
    return <View style={{ flex: 1 }}>{page}</View>;
  }
}
export default MedicineView;
