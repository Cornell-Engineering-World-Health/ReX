import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import Card from '../Card/Card.js';
import { COLOR, IMAGES } from '../Resources/constants';
import Modal from 'react-native-modal';
import ButtonWithImage from '../Button/ButtonWithImage';
import GestureRecognizer, {
  swipeDirections
} from 'react-native-swipe-gestures';

class Agenda extends Component {
  static propTypes = {
    onPressAgenda: PropTypes.func,
    agendaInfo: PropTypes.array,
    date: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      expandVisible: false
    };
  }

  _onDelete = () => {
    console.log('Deleted Item');
  };

  _keyExtractor = (item, index) => item.id;

  _renderAgenda() {
    if (this.props.agendaInfo) {
      return (
        <FlatList
          data={this.props.agendaInfo}
          keyExtractor={item => item.id}
          extraData={this.props}
          renderItem={({ item, index }) => {
            return (
              <Card
                medicineNote={item.medicineNote}
                image={item.image}
                title={item.title}
                cardData={item.cardData}
                timeStamp={item.timeStamp}
                note1={item.note1}
                note2={item.note2}
                backgroundColor={item.backgroundColor}
                swiperActive={true}
                buttonActive={!this.state.expandVisible}
                iconName={item.iconName}
                buttonsRight={[
                  {
                    text: 'Delete',
                    type: 'delete'
                  },
                  {
                    text: 'Edit',
                    type: 'edit'
                  }
                ]}
                buttonsLeft={item.buttonsLeft}
                onCloseSwipeout={this._onClose}
                onPress={this.props.onPressAgenda}
              />
            );
          }}
        />
      );
    } else {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, textAlign: 'center' }}>
            No Events Logged
          </Text>
        </View>
      );
    }
  }

  render() {
    let page = this._renderAgenda();
    let modalPage = page;
    let renderExpandButton = null;

    if (this.state.expandVisible) {
      page = null;
    }
    if (this.props.agendaInfo) {
      renderExpandButton = (
        <TouchableOpacity
          onPress={() => this.setState({ expandVisible: true })}
        >
          <Image source={IMAGES.expand} style={styles.expandStyle} />
        </TouchableOpacity>
      );
    }
    return (
      <View style={{ marginLeft: 5, flex: 1 }}>
        <GestureRecognizer
          onSwipeUp={() => this.setState({ expandVisible: true })}
        >
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Text style={styles.summaryText}>Summary</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.dateText}>{this.props.date}</Text>
              {renderExpandButton}
            </View>
          </View>
        </GestureRecognizer>
        <View style={{ flex: 1 }}>{page}</View>
        <Modal
          onBackdropPress={() => this.setState({ expandVisible: false })}
          isVisible={this.state.expandVisible}
          style={styles.modalStyle}
          backdropOpacity={0.8}
          animationOutTiming={600}
          animationInTiming={600}
        >
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Text style={styles.summaryText}>Summary</Text>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}
            >
              <Text style={styles.summaryText}>{this.props.date}</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>{modalPage}</View>
          <View style={{ height: 75 }}>
            <ButtonWithImage
              onPress={() => this.setState({ expandVisible: false })}
              width={50}
              height={50}
              imageSource={IMAGES.back}
              rounded={true}
              backgroundColor={'white'}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalStyle: {
    flex: 1
  },
  expandStyle: {
    width: 25,
    height: 25,
    resizeMode: 'cover'
  },
  summaryText: {
    fontSize: 25,
    fontWeight: '400',
    letterSpacing: 1.0,
    color: COLOR.summaryGray,
    marginLeft: 10
  },
  dateText: {
    fontSize: 15,
    fontWeight: '400',
    letterSpacing: 1.0,
    color: COLOR.cardNotes,
    marginRight: 3
  }
});

export default Agenda;
