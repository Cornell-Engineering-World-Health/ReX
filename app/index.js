import React from 'react';
import PainForm from './components/screens/PainForm';
import FlatListCard from './components/screens/FlatListCard';
import MenuBar from './components/MenuBar/MenuBar';
import { StackNavigator } from 'react-navigation';
import { View, NavigatorIOS, StatusBar } from 'react-native';
import Circle from './components/MedicineComponents/Circle';
import Settings from './components/screens/Settings';
import CoolerMedicineView from './components/screens/CoolerMedicineView'

class main extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return <CoolerMedicineView />;
  }
}

export default main;
