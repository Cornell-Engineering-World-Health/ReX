import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

/**
ListViewer is a horizontal scrollview of items of a list.
*/
const ListViewer = ({ list, backgroundColor }) => {
  let contents = list.map((v, i) => {
    return (
      <View style={[styles.item, { backgroundColor: backgroundColor }]} key={i}>
        <Text style={styles.itemText}>{v}</Text>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <ScrollView horizontal>{contents}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30
  },
  bar: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'flex-start'
  },
  item: {
    padding: 5,
    height: 30,
    borderRadius: 10,
    marginRight: 5,
    marginLeft: 5
  },
  itemText: {
    color: 'white',
    fontSize: 16
  }
});

ListViewer.propTypes = {
  list: PropTypes.array,
  color: PropTypes.string
};

export default ListViewer;
