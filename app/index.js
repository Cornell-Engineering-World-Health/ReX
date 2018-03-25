import React from 'react'
import PainForm from './components/screens/PainForm'
import FlatListCard from './components/screens/FlatListCard'
import MenuBar from './components/MenuBar/MenuBar'
import { StackNavigator } from 'react-navigation'
import { View, NavigatorIOS, StatusBar } from 'react-native'
import Database from './Database'
import {createTables,intializeDatabase} from '../../databaseUtil/databaseUtil';

class main extends React.Component {
  constructor (props) {
    super(props)
    createTables()
    intializeDatabase()
  }

  componentDidMount () {

  }
  render () {
    return <MenuBar />
  }
}



export default main
