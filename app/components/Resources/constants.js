export default (constants = {
  COLOR: {
    summaryGray: '#b8b8b8',
    cardContainer: '#ffffff',
    cardNotes: '#808080',
    cardTitle: '#373737',
    cardTimestamp: '#a9a9a9',
    medicineCardChecked: '#e6ffe6',
    medicineCardUnchecked: '#ffcccc'
  },
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
    image: require('../Resources/medicine.png'),
    title: 'Pill',
    backgroundColor: '#E85D75',
    translucentColor: '#E85D7580'
  },
  HEADACHE: {
    image: require('../Resources/brain.png'),
    title: 'Headache',
    backgroundColor: '#7fdecb',
    translucentColor: '#7fdecb80'
  },

  BLURRED_VISION: {
    image: require('../Resources/glasses.png'),
    title: 'Blurred Vision',
    backgroundColor: '#ab87b8',
    translucentColor: '#ab87b880'
  },

  NECKPAIN: {
    image: require('../Resources/neckPain.png'),
    title: 'Neck Pain',
    backgroundColor: '#FFEE93',
    translucentColor: '#FFEE9380'
  },
  KNEEPAIN: {
    image: require('../Resources/kneePain.png'),
    title: 'Knee Pain',
    backgroundColor: '#79ADDC',
    translucentColor: '#79ADDC80'
  },
  LEGPAIN: {
    image: require('../Resources/legPain.png'),
    title: 'Leg Pain',
    backgroundColor: '#f0924c',
    translucentColor: '#f0924c80'
  },
  FOOTPAIN: {
    image: require('../Resources/footPain.png'),
    title: 'Foot Pain',
    backgroundColor: '#F7AEF8',
    translucentColor: '#F7AEF880'
  },
  DEFAULT: {
    image: require('../Resources/default.png'),
    title: 'Default',
    backgroundColor: '#ffffff',
    translucentColor: '#ffffff80'
  },
  PAIN_IMAGES: [
    {
      title: 'BackPain',
      source: require('../Resources/backPain.png')
    },
    {
      title: 'Headache',
      source: require('../Resources/headPain.png')
    },
    {
      title: 'ElbowPain',
      source: require('../Resources/elbowPain.png')
    },
    {
      title: 'FootPain',
      source: require('../Resources/footPain.png')
    },
    {
      title: 'HeartPain',
      source: require('../Resources/heartPain.png')
    },
    {
      title: 'KneePain',
      source: require('../Resources/kneePain.png')
    },
    {
      title: 'LegPain',
      source: require('../Resources/legPain.png')
    },
    {
      title: 'StomachPain',
      source: require('../Resources/stomachPain.png')
    }
  ],
  IMAGES: {
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
    medicine: require('../Resources/medicine.png')
    //TODO: FINISH ADDING IMAGE CONSTANTS
  }
});
let types = [
  constants.BLURRED_VISION,
  constants.PILL,
  constants.HEADACHE,
  constants.NECKPAIN,
  constants.KNEEPAIN,
  constants.LEGPAIN,
  constants.FOOTPAIN
];
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
