/*
***To use an image, import {IMAGES} from the '../Resources/constants' (make sure to
include curly braces) and then call the image with IMAGES._____ (Ex: IMAGES.afternoon)
*/
export const IMAGES = {
  afternoon: require('../Resources/Images/afternoon.png'),
  back: require('../Resources/Images/back.png'),
  backPain: require('../Resources/Images/backPain.png'),
  birthday: require('../Resources/Images/birthday.png'),
  brain: require('../Resources/Images/brain.png'),
  calendar: require('../Resources/Images/calendar.png'),
  checkmark: require('../Resources/Images/checkmark.png'),
  default: require('../Resources/Images/default.png'),
  elbowPain: require('../Resources/Images/elbowPain.png'),
  evening: require('../Resources/Images/evening.png'),
  footPain: require('../Resources/Images/footPain.png'),
  glasses: require('../Resources/Images/glasses.png'),
  headPain: require('../Resources/Images/headPain.png'),
  heartPain: require('../Resources/Images/heartPain.png'),
  homeIcon: require('../Resources/Images/homeIcon.png'),
  intensePain: require('../Resources/Images/intensePain.png'),
  kneePain: require('../Resources/Images/kneePain.png'),
  legPain: require('../Resources/Images/legPain.png'),
  medicine: require('../Resources/Images/medicine.png'),
  morning: require('../Resources/Images/morning.png'),
  neckPain: require('../Resources/Images/neckPain.png'),
  night: require('../Resources/Images/night.png'),
  pillBottle: require('../Resources/Images/pillBottle.png'),
  plusSign2: require('../Resources/Images/plusSign2.png'),
  profile: require('../Resources/Images/profile.png'),
  profilePic: require('../Resources/Images/profilePic.png'),
  purpleCircle: require('../Resources/Images/purpleCircle.png'),
  purpleGradient: require('../Resources/Images/purpleGradient.jpg'),
  purpleGradient2: require('../Resources/Images/purpleGradient2.jpg'),
  scale: require('../Resources/Images/scale.png'),
  settings: require('../Resources/Images/settings.png'),
  stomachPain: require('../Resources/Images/stomachPain.png'),
  expand: require('../Resources/Images/expand.png')
};
export const COLOR = {
  PrimaryGray: '#b8b8b8',
  blue: '#79ADDC',
  purple: '#ab87b8',
  cyan: '#7fdecb',
  red: '#E85D75',
  summaryGray: '#b8b8b8',
  cardContainer: '#ffffff',
  cardNotes: '#808080',
  cardTitle: '#373737',
  cardTimestamp: '#a9a9a9',
  medicineCardChecked: '#e6ffe6',
  medicineCardUnchecked: '#ffc2b3'
};
//TODO: UPDATE VALUES THAT USE THESE DEFAULTS:
const defaultColor = '#ffffff';

export default (constants = {
  MONTH: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  DAY: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ],

  PILL: {
    image: IMAGES.medicine,
    title: 'Pill',
    backgroundColor: '#E85D75',
    translucentColor: '#E85D7580'
  },
  HEADACHE: {
    image: IMAGES.brain,
    title: 'Headache',
    backgroundColor: '#7fdecb',
    translucentColor: '#7fdecb80'
  },
  BLURRED_VISION: {
    image: IMAGES.glasses,
    title: 'Blurred Vision',
    backgroundColor: '#ab87b8',
    translucentColor: '#ab87b880'
  },
  NECKPAIN: {
    image: IMAGES.neckPain,
    title: 'Neck Pain',
    backgroundColor: '#FFEE93',
    translucentColor: '#FFEE9380'
  },
  KNEEPAIN: {
    image: IMAGES.kneePain,
    title: 'Knee Pain',
    backgroundColor: '#79ADDC',
    translucentColor: '#79ADDC80'
  },
  LEGPAIN: {
    image: IMAGES.legPain,
    title: 'Leg Pain',
    backgroundColor: '#f0924c',
    translucentColor: '#f0924c80'
  },
  FOOTPAIN: {
    image: IMAGES.footPain,
    title: 'Foot Pain',
    backgroundColor: '#F7AEF8',
    translucentColor: '#F7AEF880'
  },
  BACKPAIN: {
    title: 'Back Pain',
    image: IMAGES.backPain,
    backgroundColor: defaultColor,
    translucentColor: defaultColor
  },
  ELBOWPAIN: {
    title: 'Elbow Pain',
    image: IMAGES.elbowPain,
    backgroundColor: defaultColor,
    translucentColor: defaultColor
  },
  HEARTPAIN: {
    title: 'Heart Pain',
    image: IMAGES.heartPain,
    backgroundColor: defaultColor,
    translucentColor: defaultColor
  },
  STOMACHPAIN: {
    title: 'Stomach Pain',
    image: IMAGES.stomachPain,
    backgroundColor: defaultColor,
    translucentColor: defaultColor
  },
  DEFAULT: {
    image: IMAGES.default,
    title: 'Default',
    backgroundColor: '#ffffff',
    translucentColor: '#ffffff80',
  },


});
let types = [
  constants.BLURRED_VISION,
  constants.PILL,
  constants.HEADACHE,
  constants.NECKPAIN,
  constants.KNEEPAIN,
  constants.LEGPAIN,
  constants.FOOTPAIN,
  constants.BACKPAIN,
  constants.ELBOWPAIN,
  constants.HEARTPAIN,
  constants.STOMACHPAIN
];

/**
Pass in a string that represents which pain you are having (Ex: Headache, Back Pain)
Returns default image if title is not found in stored image list.

Precondition: title is a string

Available titles are found in the constants variable of this file.
*/

export function getCardData(title) {
  for (var x = 0; x < types.length; x++) {
    if (title == types[x].title) {
      return types[x];
    }
  }
  return constants.DEFAULT;
}


export function getSource (title) {
  for (var x = 0; x < types.length; x++) {
    if (title == types[x].title) {
      return types[x].image;
    }
  }
  return DEFAULT.image;
}

export function getColor(type) {
  for (var x = 0; x < types.length; x++) {
    if (type == types[x].title) {
      return types[x].backgroundColor;
    }
  }
  return DEFAULT.backgroundColor;
}

export function getTranslucentColor(type) {
  for (var x = 0; x < types.length; x++) {
    if (type == types[x].title) {
      return types[x].translucentColor;
    }
  }
  return DEFAULT.translucentColor;
}
