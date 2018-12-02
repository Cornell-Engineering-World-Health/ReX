import React from 'react';
import MenuBar from './components/MenuBar/MenuBar';
import {
  createTables,
  intializeDatabase,
  databaseFakeData
} from './databaseUtil/databaseUtil';

class main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      verified: false
    };

    createTables();
    intializeDatabase();
    databaseFakeData();
  }

  render() {
    return <MenuBar />;
  }
}

export default main;
