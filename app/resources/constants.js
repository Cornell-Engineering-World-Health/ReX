/*
***To use an image, import {IMAGES} from the '../Resources/constants' (make sure to
include curly braces) and then call the image with IMAGES._____ (Ex: IMAGES.afternoon)
*/
export const IMAGES = {
  backPain: require('./images/backPain.png'),
  birthday: require('./images/birthday.png'),
  brain: require('./images/brain.png'),
  calendar: require('./images/calendarScreen.png'),
  default: require('./images/default.png'),
  elbowPain: require('./images/elbowPain.png'),
  footPain: require('./images/footPain.png'),
  glasses: require('./images/glasses.png'),
  headPain: require('./images/headPain.png'),
  heartPain: require('./images/heartPain.png'),
  homeIcon: require('./images/homeScreen.png'),
  intensePain: require('./images/intensePain.png'),
  kneePain: require('./images/kneePain.png'),
  legPain: require('./images/legPain.png'),
  medicine: require('./images/medicine.png'),
  morning: require('./images/morning.png'),
  neckPain: require('./images/neckPain.png'),
  night: require('./images/night.png'),
  pillBottle: require('./images/medicationScreen.png'),
  plusSign: require('./images/plusSign.png'),
  plusSignMinimal: require('./images/plusSignMinimal.png'),
  profile: require('./images/profile.png'),
  profilePic: require('./images/profilePic.png'),
  scale: require('./images/scale.png'),
  settings: require('./images/settingsScreen.png'),
  stomachPain: require('./images/stomachPain.png'),
  expand: require('./images/expand.png'),
  morningColor: require('./images/morningC.png'),
  afternoonColor: require('./images/afternoonC.png'),
  eveningColor: require('./images/eveningC.png'),
  nightColor: require('./images/nightC.png'),
  morningColorW: require('./images/morningW.png'),
  afternoonColorW: require('./images/afternoonW.png'),
  eveningColorW: require('./images/eveningW.png'),
  nightColorW: require('./images/nightW.png'),
  about: require('./images/about.png'),
  addressBook: require('./images/address-book.png'),
  afternoonColor: require('./images/afternoonC.png'),
  eveningColor: require('./images/eveningColor.png'),
  faq: require('./images/faq.png'),
  iconWolf: require('./images/icons8-wolf-100.png'),
  iconZebra: require('./images/icons8-zebra-100.png'),
  iconShark: require('./images/icons8-shark-100.png'),
  iconJellyfish: require('./images/icons8-jellyfish-100.png'),
  iconOwl: require('./images/icons8-owl-100.png'),
  iconHamster: require('./images/icons8-hamster-100.png'),
  iconCow: require('./images/icons8-cow-100.png'),
  iconMask: require('./images/icons8-anonymous-mask-96.png'),
  iconDog: require('./images/icons8-dog-100.png'),
  iconHorse: require('./images/icons8-horse-100.png'),
  iconPanda: require('./images/icons8-panda-100.png'),
  iconPig: require('./images/icons8-pig-100.png'),
  iconStork: require('./images/icons8-stork-64.png'),
  iconTurtle: require('./images/icons8-turtle-100.png'),
  iconWhale: require('./images/icons8-whale-100.png'),
  view: require('./images/view.png'),
  hamburgerMenu: require('./images/icons8-menu-26.png'),
  body: require('./images/bodyLarge.png'),
  close: require('./images/close.png'),
  close_white: require('./images/close-white.png'),
  zero: require('./images/0.png'),
  one: require('./images/1.png'),
  two: require('./images/2.png'),
  three: require('./images/3.png'),
  four: require('./images/4.png'),
  five: require('./images/5.png'),
  six: require('./images/6.png'),
  seven: require('./images/7.png'),
  eight: require('./images/8.png'),
  nine: require('./images/9.png'),
  ten: require('./images/10.png'),
  checkmarkWhite: require('./images/checkmarkWhite.png'),
  headerBack: require('./images/header-back.png'),
  smalldot: require('./images/smalldot.png'),
  exportcsv: require('./images/exportcsv.png')
};
export const profile_icons = [
  IMAGES.iconWolf,
  IMAGES.iconZebra,
  IMAGES.iconJellyfish,
  IMAGES.iconOwl,
  IMAGES.iconHamster,
  IMAGES.iconCow,
  IMAGES.iconMask,
  IMAGES.iconDog,
  IMAGES.iconHorse,
  IMAGES.iconPanda,
  IMAGES.iconPig,
  IMAGES.iconTurtle
];

export const COLOR = {
  black: '#404040',
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
  medicineCardUnchecked: '#ffc2b3',
  lightGreen: '#9cff6880',
  green: '#9cff68'
};

export const BODY_PARTS = {
  ARMS: 'ARMS',
  LEGS: 'LEGS',
  TORSO: 'TORSO',
  HEAD: 'HEAD',
  BODY: 'BODY'
};

// TODO: UPDATE VALUES THAT USE THESE DEFAULTS:
const defaultColor = '#ffffff';

/**
When adding a new sypmtom, you MUST add it to the constant below called "symptoms"
*/
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
  SHORTENED_MONTH: [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC'
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
  DIZZINESS: {
    image: IMAGES.intensePain,
    title: 'Dizziness',
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

/*
allows for iteration access to all of the symptoms
*/
export const symptoms = [
  constants.BACKPAIN,
  constants.BLURRED_VISION,
  constants.DIZZINESS,
  constants.ELBOWPAIN,
  constants.FOOTPAIN,
  constants.HEADACHE,
  constants.HEARTPAIN,
  constants.KNEEPAIN,
  constants.LEGPAIN,
  constants.NECKPAIN,
  constants.STOMACHPAIN
];

/**
Pass in a string that represents which pain you are having (Ex: Headache, Back Pain)
Returns default image if title is not found in stored image list.

Precondition: title is a string

Available titles are found in the constants variable of this file.
*/

export function getCardData(title) {
  for (var x = 0; x < symptoms.length; x++) {
    if (title == symptoms[x].title) {
      return symptoms[x];
    }
  }
  return constants.DEFAULT;
}

export function getSource(title) {
  for (var x = 0; x < symptoms.length; x++) {
    if (title == symptoms[x].title) {
      return symptoms[x].image;
    }
  }
  return constants.DEFAULT.image;
}

export function getColor(type) {
  for (var x = 0; x < symptoms.length; x++) {
    if (type == symptoms[x].title) {
      return symptoms[x].backgroundColor;
    }
  }
  return constants.DEFAULT.backgroundColor;
}

export function getTranslucentColor(type) {
  for (var x = 0; x < symptoms.length; x++) {
    if (type == symptoms[x].title) {
      return symptoms[x].translucentColor;
    }
  }
  return constants.DEFAULT.translucentColor;
}

export const durationTitles = [
  '< 1 Hour',
  'Between 1 - 3 hours',
  'Between 3-5 hours',
  '> 5 hours',
  'More Specific'
];
