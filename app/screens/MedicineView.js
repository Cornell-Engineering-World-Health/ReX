import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import DoseCard from '../components/Card/DoseCard';
import {pullMedicineFromDatabase} from '../databaseUtil/databaseUtil';
import Moment from 'moment';
import LogFormScreen from "../screens/LogFormScreen"
import { asyncCreateMedicineEvents } from '../databaseUtil/databaseUtil';
import DropdownAlert from 'react-native-dropdownalert';
import { COLOR, IMAGES} from '../resources/constants';
import MedicineAddForm from '../components/MedicineAddForm/MedicineAddForm.js';

class CoolerMedicineView extends React.Component {
  static propTypes = {
    onPress: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      passed_index: 0,
      toggle_add: false,
    };
  }

  asyncDatabasePull = () => {
    let that = this
    pullMedicineFromDatabase(new Date(), function(formattedData) {
      var medicineData= []
      Object.keys(formattedData).forEach(function(med) {
          var medObj = formattedData[med]
          var formattedTimes = medObj.time.map(t=> Moment().format("MMMM DD YYYY") + ' ' + t)
          medicineData.push({title: med, time:formattedTimes, timeVal:medObj.time, dosage:medObj.dosage, statuses: medObj.taken, takenTime: medObj.takenTime})
          console.log(medicineData)
      });
      that.setState ({
          data: medicineData
      })
    });
  }

  errorOnSubmit(){
    this.dropdown.close(); this.dropdown.alertWithType('custom', 'Form Incomplete',
    'Please add any missing information')
  }

  successOnSubmit(){
    this.dropdown_success.close(); this.dropdown_success.alertWithType('custom',
    'New Medicine Added!', '')
  }

  asyncDatabaseUpdate = (title, dosage, start, end, time, time_category) => {
    asyncCreateMedicineEvents(
      title,
      dosage,
      start,
      end,
      time,
      time_category
    );
    endNew = Moment(end)
    endNew.date(endNew.date() + 1)
    if (Moment().isBetween(start, endNew)) {
      medicineData = this.state.data
      for (var i = 0; i < medicineData.length; i++){
        if (medicineData[i].title == title){
          medicineData.splice(i, 1)
        }
      }
      var formattedTimes = time.map(t => Moment().format("MMMM DD YYYY") + ' ' + t)
      var taken = time.map(t => false)
      var takenTime = time.map(t => '')
      medicineData.push({title: title, time: formattedTimes, timeVal: time, dosage: dosage, statuses: taken, takenTime: takenTime})
      this.setState({
        toggle_add: false,
        data: medicineData
      })
    }
  }

  componentDidMount = () => {
  this.asyncDatabasePull()
}

  compareCards = (a,b) => {
    var passed_index = 0
    for (var i = 0; i < a.statuses.length; i++){
      if (a.statuses[i] == false){
        passed_index = i
        break
      }
    }
    var passed_index2 = 0
    for (var j = 0; j < b.statuses.length; j++){
      if (b.statuses[j] == false){
        passed_index2 = j
        break
      }
    }
    if (a.timeVal[passed_index] < b.timeVal[passed_index2]) {
      return -1
    }
    else {
      return 1
    }
  }

  _renderCard = ({item}) => {
    return (
      <View>
        <DoseCard
        title={item.title}
        time={item.time}
        takenTime={item.takenTime}
        dosage={item.dosage}
        passed={item.statuses}
        imageData = {this.updateData}
        buttonsRight={[
          {
            text: 'Edit',
            type: 'edit',
            onPress: () => {
              this.setState ({
                modalVisible: true
              })
            }
          }]}
        />
        </View>
    );
  }
  render() {
    const { navigate } = this.props.navigation
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    currentDate = new Date()
    currentMonths = monthNames[currentDate.getMonth()]
    currentYear = currentDate.getYear()
    currentDay = currentDate.getDay()
    return (
      <View style={styles.wrapper}>
          <View style={styles.header}>
              <Text style={styles.titleText} >
                Today
              </Text>
              <Text style={styles.separator} >
                |
              </Text>
              <Text style={styles.date} >
                {Moment().format('MMMM DD, YYYY')}
              </Text>
            <TouchableOpacity
              style = {{padding:15}}
              onPress = {() => {
                this.setState({
                  toggle_add: true
                })
              }}>
            <Image style = {{height:50, width:50, }}
              source ={require('../resources/images/plusSignMinimal.png')} >
            </Image>
            </TouchableOpacity>
          </View>
            <TouchableOpacity>
            </TouchableOpacity>
            <FlatList
              data={this.state.data.sort(this.compareCards)}
              extraData={this.state}
              renderItem={this._renderCard} 
              keyExtractor={(_, index) => index.toString()}
            />
         <Modal
         isVisible={this.state.toggle_add}
         style={styles.addFormWrapper}
         animationIn={'slideInRight'}
         animationOut={'slideOutRight'}
         backdropOpacity={1}
         >
         <MedicineAddForm
         exitModal={() => {
           this.setState({ toggle_add: false });
         }}
         asyncDatabaseUpdate={(title, dosage, start, end, time, time_category) => {
           this.asyncDatabaseUpdate(title, dosage, start, end, time, time_category)
         }}
         errorOnSubmit={() => {
           this.errorOnSubmit()
         }}
         successOnSubmit={() => {
           this.successOnSubmit()
         }}
         
         />
         </Modal>
         <DropdownAlert
          ref={ref => this.dropdown = ref}
          closeInterval={2000}
          imageSrc={IMAGES.close_white}
          containerStyle={{
            backgroundColor: COLOR.red,
          }}
        />
        <DropdownAlert
          ref={ref => this.dropdown_success = ref}
          closeInterval={2000}
          imageSrc={IMAGES.checkmarkWhite}
          containerStyle={{
            backgroundColor: COLOR.cyan,
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    padding:10,
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row' ,
    padding:15,
    paddingBottom:0,
    justifyContent:'space-between',
    alignItems:'center'
  },
  titleText: {
    fontSize: 25,
    fontWeight: '700',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#333333',
  },
  date: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: '#555555',
  },
  separator: {
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    color: '#555555',
    marginLeft:5,
    marginRight: 5,
  },
  addFormWrapper: {
    flex: 1,
    backgroundColor: 'white',
    margin: 0
  }
});

export default CoolerMedicineView;