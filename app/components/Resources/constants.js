export const IMAGES = {
  afternoon: require('../Resources/afternoon.png'),
  back: require('../Resources/back.png'),
  backPain: require('../Resources/backPain.png'),
  birthday: require('../Resources/birthday.png'),
  brain: require('../Resources/brain.png'),
  calendar: require('../Resources/calendar.png'),
  checkmark: require('../Resources/checkmark.png'),
  default: require('../Resources/default.png'),
  elbowPain: require('../Resources/elbowPain.png'),
  evening: require('../Resources/evening.png'),
  footPain: require('../Resources/footPain.png'),
  glasses: require('../Resources/glasses.png'),
  headPain: require('../Resources/headPain.png'),
  heartPain: require('../Resources/heartPain.png'),
  homeIcon: require('../Resources/homeIcon.png'),
  intensePain: require('../Resources/intensePain.png'),
  kneePain: require('../Resources/kneePain.png'),
  legPain: require('../Resources/legPain.png'),
  medicine: require('../Resources/medicine.png'),
  morning: require('../Resources/morning.png'),
  neckPain: require('../Resources/neckPain.png'),
  night: require('../Resources/night.png'),
  pillBottle: require('../Resources/pillBottle.png'),
  plusSign2: require('../Resources/plusSign2.png'),
  profile: require('../Resources/profile.png'),
  profilePic: require('../Resources/profilePic.png'),
  purpleCircle: require('../Resources/purpleCircle.png'),
  purpleGradient: require('../Resources/purpleGradient.jpg'),
  purpleGradient2: require('../Resources/purpleGradient2.jpg'),
  scale: require('../Resources/scale.png'),
  settings: require('../Resources/settings.png'),
  stomachPain: require('../Resources/stomachPain.png')
};
export const COLOR = {
  summaryGray: '#b8b8b8',
  cardContainer: '#ffffff',
  cardNotes: '#808080',
  cardTitle: '#373737',
  cardTimestamp: '#a9a9a9',
  medicineCardChecked: '#e6ffe6',
  medicineCardUnchecked: '#ffcccc'
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
    translucentColor: '#ffffff80'
  }
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
export function getSource(title) {
  for (var x = 0; x < types.length; x++) {
    if (type == types[x].title) {
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

//export {constants, getColor, getTranslucentColor};
