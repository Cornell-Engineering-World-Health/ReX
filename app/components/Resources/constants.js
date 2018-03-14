export default (constants = {
  PILL: {
    image: require('../Resources/medicine.png'),
    title: 'Pill',
    backgroundColor: '#E85D75',
    translucentColor: '#E85D7580',
  },
  HEADACHE: {
    image: require('../Resources/brain.png'),
    title: 'Headache',
    backgroundColor: '#7fdecb',
    translucentColor: '#7fdecb80',
  },

  BLURRED_VISION: {
    image: require('../Resources/glasses.png'),
    title: 'Blurred Vision',
    backgroundColor: '#ab87b8',
    translucentColor: '#ab87b880',
  },
  NECKPAIN: {
    image: require('../Resources/neckPain.png'),
    title: 'Neck Pain',
    backgroundColor: '#FFEE93',
    translucentColor: '#FFEE9380',
  },
  KNEEPAIN: {
    image: require('../Resources/kneePain.png'),
    title: 'Knee Pain',
    backgroundColor: '#79ADDC',
    translucentColor: '#79ADDC80',
  },
  LEGPAIN: {
    image: require('../Resources/legPain.png'),
    title: 'Leg Pain',
    backgroundColor: '#f0924c',
    translucentColor: '#f0924c80',
  },
  FOOTPAIN: {
    image: require('../Resources/footPain.png'),
    title: 'Foot Pain',
    backgroundColor: '#F7AEF8',
    translucentColor: '#F7AEF880',
  },
  DEFAULT: {
    image: require('../Resources/default.png'),
    title: 'Default',
    backgroundColor: '#ffffff',
    translucentColor: '#ffffff80',
  },
  mainColor: '#ededed',
  secondaryColor: '#b8b8b8',
  blue: '#79ADDC',
  purple: '#ab87b8',
  cyan: '#7fdecb',
  red: '#E85D75',

});

export function getColor(type){
  switch(type){
    case constants.BLURRED_VISION.title:
      return constants.BLURRED_VISION.backgroundColor
      break;
    case constants.PILL.title:
      return constants.PILL.backgroundColor
      break;
    case constants.HEADACHE.title:
      return constants.HEADACHE.backgroundColor
      break;
    case constants.NECKPAIN.title:
      return constants.NECKPAIN.backgroundColor
      break;
    case constants.KNEEPAIN.title:
      return constants.KNEEPAIN.backgroundColor
      break;
    case constants.LEGPAIN.title:
      return constants.LEGPAIN.backgroundColor
      break;
    case constants.FOOTPAIN.title:
      return constants.FOOTPAIN.backgroundColor
      break;
    default:
      return constants.DEFAULT.backgroundColor
  }
}

export function getTranslucentColor(type){
  switch(type){
    case constants.BLURRED_VISION.title:
      return constants.BLURRED_VISION.translucentColor
      break;
    case constants.PILL.title:
      return constants.PILL.translucentColor
      break;
    case constants.HEADACHE.title:
      return constants.HEADACHE.translucentColor
      break;
    case constants.NECKPAIN.title:
      return constants.NECKPAIN.translucentColor
      break;
    case constants.KNEEPAIN.title:
      return constants.KNEEPAIN.translucentColor
      break;
    case constants.LEGPAIN.title:
      return constants.LEGPAIN.translucentColor
      break;
    case constants.FOOTPAIN.title:
      return constants.FOOTPAIN.translucentColor
      break;
    default:
      return constants.DEFAULT.translucentColor
  }
}

//export {constants, getColor, getTranslucentColor};
