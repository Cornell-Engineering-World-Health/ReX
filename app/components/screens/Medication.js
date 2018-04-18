import React from 'react'
import MedicationView from './MedicineView'
import LogFormScreen from './LogFormScreen'
import { StackNavigator } from 'react-navigation'

const Medication = StackNavigator({
  Medications: { screen: MedicationView,
    navigationOptions: {
      title: 'Medications',
      header: { visible: false }
    }
  },
  AddNewForm: { screen: LogFormScreen,
    navigationOptions: {
      title: 'Add New Medication'
    }
  }
})

export default Medication
