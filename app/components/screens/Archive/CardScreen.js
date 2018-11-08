import React from 'react';
import Card from '../Card/Card';
import constants, { IMAGES } from '../Resources/constants';
export default class CardScreen extends React.Component {
  render() {
    return (
      <Card
        title={'Dizziness'}
        timeStamp={'8:41 PM'}
        note1={'Intensity: 5'}
        note2={'Duration: forever'}
        image={IMAGES.backPain}
        cardData={constants.PILL}
      />
    );
  }
}
