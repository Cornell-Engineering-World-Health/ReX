/*
***To use an image, import {IMAGES} from the /resources/constants' (make sure to
include curly braces) and then call the image with IMAGES._____ (Ex: IMAGES.afternoon)
*/
export const IMAGES = {
  backPain: require("./images/backPain.png"),
  birthday: require("./images/birthday.png"),
  brain: require("./images/brain.png"),
  calendar: require("./images/calendarScreen.png"),
  default: require("./images/default.png"),
  double_vision: require("./images/double_vision.png"),
  elbowPain: require("./images/elbowPain.png"),
  footPain: require("./images/footPain.png"),
  glasses: require("./images/glasses.png"),
  headPain: require("./images/headPain.png"),
  heartPain: require("./images/heartPain.png"),
  homeIcon: require("./images/homeScreen.png"),
  intensePain: require("./images/intensePain.png"),
  kneePain: require("./images/kneePain.png"),
  legPain: require("./images/legPain.png"),
  medicine: require("./images/medicine.png"),
  morning: require("./images/morning.png"),
  neckPain: require("./images/neckPain.png"),
  fatigue: require("./images/fatigue.png"),
  nausea: require("./images/nausea.png"),
  diarrhea: require("./images/diarrhea.png"),
  impaired_taste: require("./images/popsicle.png"),
  vomiting: require("./images/vomiting.png"),
  cognitive: require("./images/cognitive.png"),
  handpain: require("./images/hand.png"),
  night: require("./images/night.png"),
  pillBottle: require("./images/medicationScreen.png"),
  plusSign: require("./images/plusSign.png"),
  plusSignMinimal: require("./images/plusSignMinimal.png"),
  profile: require("./images/profile.png"),
  profilePic: require("./images/profilePic.png"),
  RingingInEars: require("./images/pulse.png"),
  scale: require("./images/scale.png"),
  settings: require("./images/settingsScreen.png"),
  stomachPain: require("./images/stomachPain.png"),
  expand: require("./images/expand.png"),
  morningColor: require("./images/morningC.png"),
  afternoonColor: require("./images/afternoonC.png"),
  eveningColor: require("./images/eveningC.png"),
  nightColor: require("./images/nightC.png"),
  morningColorW: require("./images/morningW.png"),
  afternoonColorW: require("./images/afternoonW.png"),
  eveningColorW: require("./images/eveningW.png"),
  nightColorW: require("./images/nightW.png"),
  about: require("./images/about.png"),
  addressBook: require("./images/address-book.png"),
  afternoonColor: require("./images/afternoonC.png"),
  eveningColor: require("./images/eveningColor.png"),
  faq: require("./images/faq.png"),
  iconWolf: require("./images/icons8-wolf-100.png"),
  iconZebra: require("./images/icons8-zebra-100.png"),
  iconShark: require("./images/icons8-shark-100.png"),
  iconJellyfish: require("./images/icons8-jellyfish-100.png"),
  iconOwl: require("./images/icons8-owl-100.png"),
  iconHamster: require("./images/icons8-hamster-100.png"),
  iconCow: require("./images/icons8-cow-100.png"),
  iconMask: require("./images/icons8-anonymous-mask-96.png"),
  iconDog: require("./images/icons8-dog-100.png"),
  iconHorse: require("./images/icons8-horse-100.png"),
  iconPanda: require("./images/icons8-panda-100.png"),
  iconPig: require("./images/icons8-pig-100.png"),
  iconStork: require("./images/icons8-stork-64.png"),
  iconTurtle: require("./images/icons8-turtle-100.png"),
  iconWhale: require("./images/icons8-whale-100.png"),
  view: require("./images/view.png"),
  hamburgerMenu: require("./images/icons8-menu-26.png"),
  body: require("./images/bodyLarge2.png"),
  close: require("./images/close.png"),
  close_white: require("./images/close-white.png"),
  checkmarkWhite: require("./images/checkmarkWhite.png"),
  headerBack: require("./images/header-back.png"),
  smalldot: require("./images/smalldot.png"),
  exportcsv: require("./images/exportcsv.png"),
  search: require("./images/search.png"),
  fiih: require("./images/fiih_logo.png"),
  intro_background: require("./images/intro_background.png"),
  chemical: require("./images/chemical.png"),
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
  black: "#404040",
  PrimaryGray: "#b8b8b8",
  blue: "#79ADDC",
  purple: "#ab87b8",
  cyan: "#7fdecb",
  red: "#E85D75",
  summaryGray: "#b8b8b8",
  cardContainer: "#ffffff",
  cardNotes: "#808080",
  cardTitle: "#373737",
  cardTimestamp: "#a9a9a9",
  medicineCardChecked: "#e6ffe6",
  medicineCardUnchecked: "#ffc2b3",
  lightGreen: "#9cff6880",
  green: "#9cff68",
  yellow: "#FFEE93"
};

export const BODY_PARTS = {
  ARMS: "ARMS",
  LEGS: "LEGS",
  TORSO: "TORSO",
  HEAD: "HEAD",
  BODY: "BODY",
  ALL: "ALL"
};

export const SYMPTOM_IDS = {
  "Headache": 1,
  "Dizziness": 2,
  "Blurred Vision": 3,
  "Knee Pain": 5,
  "Back Pain": 6,
  "Double Vision": 7,
  "Ringing in Ears": 8,
  "Neck Pain": 9,
  "Stomach Pain": 10,
  "Foot Pain": 11,
  "Elbow Pain": 12,
  "Hand Pain": 13,
  "Nausea": 14,
  "Fatigue": 15,
  "Cognitive Slowing": 16,
  "Impaired Taste": 17,
  "Diarrhea": 18,
  "Vomiting": 19,
  "Heart Pain": 20,
}

const SYMPTOM_COLOR = {
  blue: "#79ADDC",
  purple: "#ab87b8",
  cyan: "#7fdecb",
  red: "#E85D75",
  pink: "#FFCCF9",
  green: "#AFF8DB",
  lime: "#E7FFAC",
  yellow: "#FFF5BA",
  orange: "#FFCBC1",
  redorange: "#FFABAB",
  hotpink: "#FF9CEE",
  lightblue: "#AFCBFF",
  lightpink: "#FBE4FF",
  lightpurple: "#ECD4FF",
  lightbluegreen: "#C4FAF8",
  chestnut: "#E7B5A5",
  purple2: "#B28DFF",
  brown: "#b29a86",
  gold: "#E8BF8B",
  orange2: "#FFB646"
};

// TODO: UPDATE VALUES THAT USE THESE DEFAULTS:
const defaultColor = "#ffffff";

/**
When adding a new sypmtom, you MUST add it to the constant below called "symptoms"
*/
export default (constants = {
  MONTH: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  SHORTENED_MONTH: [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
  ],
  DAY: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],

  PILL: {
    image: IMAGES.medicine,
    title: "Pill",
    backgroundColor: "#E85D75",
    translucentColor: "#E85D7580"
  },

  HEADACHE: {
    image: IMAGES.brain,
    title: "Headache",
    backgroundColor: SYMPTOM_COLOR.cyan,
    translucentColor: SYMPTOM_COLOR.cyan + "80"
  },
  DIZZINESS: {
    image: IMAGES.intensePain,
    title: "Dizziness",
    backgroundColor: SYMPTOM_COLOR.blue,
    translucentColor: SYMPTOM_COLOR.blue + "80"
  },
  BLURRED_VISION: {
    image: IMAGES.glasses,
    title: "Blurred Vision",
    backgroundColor: SYMPTOM_COLOR.purple,
    translucentColor: SYMPTOM_COLOR.purple + "80"
  },
  DOUBLE_VISION: {
    image: IMAGES.double_vision,
    title: "Double Vision",
    backgroundColor: SYMPTOM_COLOR.red,
    translucentColor: SYMPTOM_COLOR.red + "80"
  },
  HAND_PAIN: {
    image: IMAGES.handpain,
    title: "Hand Pain",
    backgroundColor: SYMPTOM_COLOR.pink,
    translucentColor: SYMPTOM_COLOR.pink + "80"
  },
  NECKPAIN: {
    image: IMAGES.neckPain,
    title: "Neck Pain",
    backgroundColor: SYMPTOM_COLOR.green,
    translucentColor: SYMPTOM_COLOR.green + "80"
  },
  KNEEPAIN: {
    image: IMAGES.kneePain,
    title: "Knee Pain",
    backgroundColor: SYMPTOM_COLOR.lime,
    translucentColor: SYMPTOM_COLOR.lime + "80"
  },
  IMPAIRED_TASTE: {
    image: IMAGES.impaired_taste,
    title: "Impaired Taste",
    backgroundColor: "#FFEE93",
    translucentColor: "#FFEE9380"
  },
  COGNITIVE_SLOWING: {
    image: IMAGES.cognitive,
    title: "Cognitive Slowing",
    backgroundColor: SYMPTOM_COLOR.orange,
    translucentColor: SYMPTOM_COLOR.orange + "80"
  },
  VOMITING: {
    image: IMAGES.vomiting,
    title: "Vomiting",
    backgroundColor: SYMPTOM_COLOR.redorange,
    translucentColor: SYMPTOM_COLOR.redorange + "80"
  },
  DIARRHEA: {
    image: IMAGES.diarrhea,
    title: "Diarrhea",
    backgroundColor: SYMPTOM_COLOR.hotpink,
    translucentColor: SYMPTOM_COLOR.hotpink + "80"
  },
  NAUSEA: {
    image: IMAGES.nausea,
    title: "Nausea",
    backgroundColor: SYMPTOM_COLOR.lightblue,
    translucentColor: SYMPTOM_COLOR.lightblue + "80"
  },
  FATIGUE: {
    image: IMAGES.fatigue,
    title: "Fatigue",
    backgroundColor: SYMPTOM_COLOR.lightpink,
    translucentColor: SYMPTOM_COLOR.lightpink + "80"
  },
  LEGPAIN: {
    image: IMAGES.legPain,
    title: "Leg Pain",
    backgroundColor: SYMPTOM_COLOR.lightpurple,
    translucentColor: SYMPTOM_COLOR.lightpurple + "80"
  },
  FOOTPAIN: {
    image: IMAGES.footPain,
    title: "Foot Pain",
    backgroundColor: SYMPTOM_COLOR.lightbluegreen,
    translucentColor: SYMPTOM_COLOR.lightbluegreen + "80"
  },
  BACKPAIN: {
    title: "Back Pain",
    image: IMAGES.backPain,
    backgroundColor: SYMPTOM_COLOR.chestnut,
    translucentColor: SYMPTOM_COLOR.chestnut + "80"
  },
  RINGING_IN_EARS: {
    image: IMAGES.RingingInEars,
    title: "Ringing in Ears",
    backgroundColor: "#79ADDC",
    translucentColor: "#79ADDC80"
  },
  ELBOWPAIN: {
    title: "Elbow Pain",
    image: IMAGES.elbowPain,
    backgroundColor: SYMPTOM_COLOR.brown,
    translucentColor: SYMPTOM_COLOR.brown + "80"
  },
  HEARTPAIN: {
    title: "Heart Pain",
    image: IMAGES.heartPain,
    backgroundColor: SYMPTOM_COLOR.gold,
    translucentColor: SYMPTOM_COLOR.gold + "80"
  },
  STOMACHPAIN: {
    title: "Stomach Pain",
    image: IMAGES.stomachPain,
    backgroundColor: SYMPTOM_COLOR.orange2,
    translucentColor: SYMPTOM_COLOR.orange2 + "80"
  },
  DEFAULT: {
    image: IMAGES.default,
    title: "Default",
    backgroundColor: "#ffffff",
    translucentColor: "#ffffff80"
  }
});

/*
allows for iteration access to all of the symptoms
*/
export const symptoms = [
  constants.BACKPAIN,
  constants.BLURRED_VISION,
  constants.DOUBLE_VISION,
  constants.HAND_PAIN,
  constants.DIZZINESS,
  constants.FATIGUE,
  constants.DIARRHEA,
  constants.VOMITING,
  constants.COGNITIVE_SLOWING,
  constants.IMPAIRED_TASTE,
  constants.NAUSEA,
  constants.ELBOWPAIN,
  constants.FOOTPAIN,
  constants.HEADACHE,
  constants.HEARTPAIN,
  constants.KNEEPAIN,
  constants.LEGPAIN,
  constants.NECKPAIN,
  constants.STOMACHPAIN,
  constants.RINGING_IN_EARS
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
  "< 1 Hour",
  "Between 1 - 3 hours",
  "Between 3-5 hours",
  "> 5 hours",
  "More Specific"
];

export const SYMPTOM_FIELDS = ["Duration", "Intensity", "Other"];
