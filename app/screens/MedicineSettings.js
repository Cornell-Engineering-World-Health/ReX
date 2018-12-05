import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Picker,
  StyleSheet,
  Switch,
  FlatList
} from 'react-native';
import { LinearGradient } from 'expo';
import NavigationHeader from '../components/NavigationHeader/NavigationHeader';
import Modal from 'react-native-modal';
import { COLOR } from '../resources/constants.js';
const fakeData = [
  { name: 'Tylenol', dosage: 123, status: true },
  { name: 'Drugs', dosage: 123, status: true },
  { name: 'Vivi', dosage: 123, status: true }
];

/*
Allows users to edit medicine
*/
export default class MedicineSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      medicine: fakeData,
      modalOpen: false,
      selectedMedicineIndex: -1
    };
  }

  _keyExtractor = (item, index) => index;

  _handleToggle(index) {
    data = this.state.medicine;
    data[index].status = !data[index].status;

    this.setState({ medicine: data }, () => {
      console.log(this.state.medicine);
    });
  }

  _renderCard({ item, index }) {
    return (
      <Card
        title={item.name}
        status={item.status}
        onSwitch={() => {
          this._handleToggle(index);
        }}
        key={index}
        onPress={() =>
          this.setState({ modalOpen: true, selectedMedicineIndex: index })
        }
      />
    );
  }

  render() {
    return (
      <LinearGradient
        colors={[COLOR.purple + '80', 'white']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }}
        style={styles.container}
      >
        <View style={styles.header}>
          <NavigationHeader
            title={'Medicine Settings'}
            onPressBack={() => this.props.navigator.pop()}
          />
        </View>
        <View style={styles.body}>
          <Text style={styles.notificationText}>Allow Notifications</Text>
          <FlatList
            data={this.state.medicine}
            extraData={this.state}
            renderItem={data => this._renderCard(data)}
            keyExtractor={this._keyExtractor}
          />
        </View>
        <ModalCard
          data={this.state.medicine[this.state.selectedMedicineIndex]}
          isOpen={this.state.modalOpen}
          exitModal={() => this.setState({ modalOpen: false })}
        />
      </LinearGradient>
    );
  }
}
/*
Creates a card that has a toggle button and cardTitle

Props:
title --> string
status --> boolean
onPress --> function
*/
const Card = props => {
  return (
    <View style={[styles.cardWrapper]}>
      <View style={[styles.cardContainer, styles.darkShadow]}>
        <TouchableOpacity onPress={props.onPress} style={styles.cardButton}>
          <Text style={styles.cardTitle}>{props.title}</Text>
        </TouchableOpacity>
        <View style={styles.cardSwitch}>
          <Switch value={props.status} onValueChange={props.onSwitch} />
        </View>
      </View>
    </View>
  );
};
/*
Props
isOpen --> function
title --> String
onDelete --> function
*/
const ModalCard = props => {
  return (
    <Modal
      isVisible={props.isOpen}
      style={styles.modal}
      onBackdropPress={() => {
        props.exitModal();
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderText}>
            {props.data ? props.data.name : null}
          </Text>
        </View>
        <View style={styles.modalBody} />
        <View style={styles.footer}>
          <View style={styles.modalDeleteButtonWrapper}>
            <TouchableOpacity
              onPress={props.onDelete}
              style={styles.modalDeleteButton}
            >
              <Text style={styles.modalDeleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalDeleteButtonWrapper}>
            <TouchableOpacity
              onPress={props.onSubmit}
              style={styles.modalSubmitButton}
            >
              <Text style={styles.modalDeleteText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  body: {
    flex: 1
  },
  lightShadow: {
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#808080',
    shadowOpacity: 0.2
  },
  darkShadow: {
    shadowOffset: { width: 3, height: 3 },
    shadowColor: '#808080',
    shadowOpacity: 0.2
  },
  header: {
    flex: 0.25,

    justifyContent: 'center'
  },
  headerText: {
    fontSize: 40,
    fontWeight: '200'
  },
  cardWrapper: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 5
  },
  cardContainer: {
    backgroundColor: '#f9f9f9',
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    alignItems: 'center'
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '200',
    padding: 10
  },
  notificationText: {
    textAlign: 'right',
    paddingRight: 10,
    paddingTop: 10
  },
  cardButton: {
    flex: 1,
    backgroundColor: '#f9f9f9'
  },
  modal: {
    flex: 1,
    justifyContent: 'center'
  },
  modalContainer: {
    flex: 0.5,
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10
  },
  modalHeaderText: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: '200'
  },
  modalDeleteButton: {
    padding: 10,
    flex: 1
  },
  modalDeleteButtonWrapper: {
    backgroundColor: 'red',
    padding: 3,
    borderRadius: 10,
    flex: 1
  },
  modalHeader: {
    flex: 0.2
  },
  footer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
