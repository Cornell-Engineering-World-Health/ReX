import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Picker,
  StyleSheet,
  Switch,
  FlatList,
  TextInput,
  TouchableHighlight
} from 'react-native';
import { LinearGradient } from 'expo';
import NavigationHeader from '../components/NavigationHeader/NavigationHeader';
import Modal from 'react-native-modal';
import { COLOR } from '../resources/constants.js';
const fakeData = [
  { name: 'Tylenol', dosage: 123, status: true },
  { name: 'Drugs', dosage: 124, status: true },
  { name: 'Vivi', dosage: 128, status: true }
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
      selectedMedicineIndex: -1,
      change: false,
      currentdosage: 0,
     
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

  _handleToggle2() {
    data = this.state.medicine;
    data[this.state.selectedMedicineIndex].status = !data[this.state.selectedMedicineIndex].status;

    this.setState({ medicine: data });
  }

  _ModalchangeDosage= (amount) => {
    this.setState({ currentdosage: amount });
    this.state.change = true;
  }

  _ModalsubmitDosage = () => {
    if (this.state.change){
    data = this.state.medicine;
    data[this.state.selectedMedicineIndex].dosage = this.state.currentdosage;
    this.setState({ medicine: data });
    
    }
    this.setState({ modalOpen: false });
    this.setState({ change: false });

  }

  _Modaldelete = () =>{
    this.setState({ modalOpen: false });
    data = this.state.medicine;
    data.splice(this.state.selectedMedicineIndex, 1)
    this.setState({ medicine: data });
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
          index = {this.state.selectedMedicineIndex}
          isOpen={this.state.modalOpen}
          onDelete ={() =>this._Modaldelete()}
          exitModal={() => this.setState({ modalOpen: false })}
          modalsubmit={()=>this._ModalsubmitDosage()}
          valuechange= {(text)=>this._ModalchangeDosage(text)}
          onSwitch={() => {
            this._handleToggle2(); 
          }}
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
  const changedvalue = (text) => props.valuechange(parseInt(text, 10));
  const toggle=(index) => props.onSwitch(index)
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
        <View style={styles.modalBody}>

         <View style = {styles.modaldosagecontainer}>
        <Text style={styles.modalDosage}>
            Dosage:
          </Text>    
          <View style ={styles.textinputwrapper}>
         <TextInput
        style={styles.dosageinput}
        textAlign="center"
        placeholder =  {props.data ? props.data.dosage.toString() : null}
       // value = {props.data ? props.data.dosage.toString() : null}

       onChangeText={(text) => changedvalue(text)}></TextInput>
      </View>
        </View>

        <View style = {styles.modalnotificationcontainer}>
        <Text style={styles.modalnotification}>
            NotificationStatus:
         </Text>             
          <View style={styles.ModalcardSwitch}>
          <Switch value={props.data? props.data.status : null} onValueChange={props.onSwitch} />
        </View>
        </View>
       
        </View>
          
        
        <View style={styles.footer}>
          <View style={styles.modalDeleteButtonWrapper}>
            <TouchableOpacity
              onPress={props.onDelete}
              style={styles.modalDeleteButton}
            >
              <Text style={styles.modalDeleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalSubmitButtonWrapper}>
            <TouchableOpacity
              onPress={props.modalsubmit}
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
    backgroundColor: 'red',
    padding: 20,
    flex: 1,
    borderRadius: 10,
  },
  modalSubmitButton: {
    backgroundColor: 'blue',
    padding: 20,
    flex: 1,
    borderRadius: 10,
  },
  modalDeleteButtonWrapper: {
    
    padding: 5,
    borderRadius: 10,
    flex: 1
  },
  modalSubmitButtonWrapper: {
   
    padding: 5,
    borderRadius: 10,
    flex: 1
  },
  modalHeader: {
    flex: 0.2
  },
  footer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  modalBody: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'space-between'

  },
  modaldosagecontainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dosageinput:{
    flex:1,
    borderColor: 'gray', 
    borderWidth: 1
},
modalnotificationcontainer:{
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between'
},
modalDosage:{
  flex:1,
  textAlign: 'center',
  fontSize: 20,
  fontWeight: '200'

},
modalnotification:{
  textAlign: 'center',
  fontSize: 20,
  fontWeight: '200'
},
textinputwrapper:{
  flex:1.5,
  textAlign: 'center',
  fontSize: 20,
  fontWeight: '200',
  paddingBottom:40
}
});
