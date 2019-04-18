import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image
} from "react-native";
import { LinearGradient } from "expo";
import { BODY_PARTS, COLOR, IMAGES } from "../resources/constants";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default class BodySelectScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lineYPos: [0, 0, 0, 0]
    };
    this.labels = [];
  }

  componentWillMount() {
    setTimeout(() => {
      this.measureAndSet(this, 0, []);
    });
  }

  // calculates the top positioning of lines, param index and incomplete lineTop array
  measureAndSet(thisRef, idx, lineYPos) {
    if (!lineYPos) {
      lineYPos = thisRef.state.lineYPos;
    }
    thisRef.labels[idx].measure((a, yPos, c, height, e) => {
      lineYPos[idx] = yPos + height / 2 + 30;
      if (idx == 3) {
        thisRef.setState({ lineYPos });
      } else {
        thisRef.measureAndSet(thisRef, ++idx, lineYPos);
      }
    });
  }

  /**
   * Renders arrows between various parts on the body touchable and associated text
   * Parts: Face/Head, Torso, Arms, Legs
   */
  renderHorizontalLines() {
    return (
      <View>
        <View
          style={[
            styles.labelLine,
            {
              width: width * (0.033333 + 1 / 6 + 1 / 8),
              top: this.state.lineYPos[0]
            }
          ]}
        />
        <View
          style={[
            styles.labelLine,
            {
              width: width * (0.033333 + 1 / 6 + 1 / 8),
              top: this.state.lineYPos[1]
            }
          ]}
        />
        <View
          style={[
            styles.labelLine,
            { width: width * (0.033333 + 1 / 12), top: this.state.lineYPos[2] }
          ]}
        />
        <View
          style={[
            styles.labelLine,
            {
              width: width * (0.033333 + 1 / 6 + 1 / 16),
              top: this.state.lineYPos[3]
            }
          ]}
        />
      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    let h_lines = this.renderHorizontalLines();
    return (
      <View style={{ flex: 1, paddingTop: 40, backgroundColor: "white" }}>
        {h_lines}
        <LinearGradient
          colors={COLOR.gradient}
          style={[
            {
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: height * 0.75
            },
            styles.darkShadow
          ]}
          start={[0, 1]}
          end={[1, 0]}
        />
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {"Where do you feel discomfort?"}
          </Text>
        </View>
        <ImageBackground
          resizeMode={"stretch"}
          style={{
            marginTop: 5,
            flex: 1,
            flexDirection: "row",
            tintColor: "red"
          }}
          source={IMAGES.body}
        >
          <View style={styles.emptyVertical} />
          <View style={styles.bodyVertical}>
            <View style={[styles.vertical, { width: (width * 1) / 6 }]}>
              <View style={styles.empty_top} />
              <TouchableOpacity
                onPress={() => {
                  navigate("Choose", {
                    bodyLabel: BODY_PARTS.ARMS
                  });
                }}
                style={[styles.arm_left, {}]}
              />
              <View style={styles.empty_bottom} />
            </View>
            <View style={styles.vertical}>
              <TouchableOpacity
                onPress={() => {
                  navigate("Choose", {
                    bodyLabel: BODY_PARTS.HEAD
                  });
                }}
                style={[styles.head, {}]}
              />
              <TouchableOpacity
                onPress={() => {
                  navigate("Choose", {
                    bodyLabel: BODY_PARTS.TORSO
                  });
                }}
                style={[styles.torso, {}]}
              />
              <TouchableOpacity
                onPress={() => {
                  navigate("Choose", {
                    bodyLabel: BODY_PARTS.LEGS
                  });
                }}
                style={[styles.legs, {}]}
              />
            </View>
            <View style={[styles.vertical, { width: (width * 1) / 6 }]}>
              <View style={styles.empty_top} />
              <TouchableOpacity
                onPress={() => {
                  navigate("Choose", {
                    bodyLabel: BODY_PARTS.ARMS
                  });
                }}
                style={[styles.arm_right, {}]}
              />
              <View style={[styles.empty_bottom, {}]} />
            </View>
          </View>
          <View style={styles.labelContainer}>
            <View
              style={{
                width: width * 0.35,
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-start"
              }}
            >
              <View
                ref={l => {
                  this.labels[0] = l;
                }}
                style={[styles.label, { marginTop: height / 16 }]}
              >
                <Text style={styles.labelText}>Face / Head</Text>
              </View>
              <View
                ref={l => {
                  this.labels[1] = l;
                }}
                style={[
                  styles.label,
                  { marginTop: (height * (13 / 24) - 75) / 4 }
                ]}
              >
                <Text style={styles.labelText}>Torso</Text>
              </View>
              <View
                ref={l => {
                  this.labels[2] = l;
                }}
                style={[
                  styles.label,
                  { marginTop: (height * (13 / 24) - 75) / 8 }
                ]}
              >
                <Text style={styles.labelText}>Arms</Text>
              </View>
              <View
                ref={l => {
                  this.labels[3] = l;
                }}
                style={[styles.label, { marginTop: height / 6 }]}
              >
                <Text style={styles.labelText}>Legs</Text>
              </View>
              <TouchableOpacity
                style={styles.searchButton}
                onPress={() => {
                  navigate("Choose", {
                    bodyLabel: BODY_PARTS.ALL
                  });
                }}
              >
                <LinearGradient
                  colors={[COLOR.gradient[1], COLOR.gradient[1]]}
                  style={[
                    {
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                      borderRadius: 100
                    },
                    styles.darkShadow
                  ]}
                  start={[0, 1]}
                  end={[1, 0]}
                />
                <Image source={IMAGES.search} style={styles.searchImage} />
                <Text style={styles.searchText}>Search</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    fontSize: 30,
    color: "white",
    fontWeight: "100"
  },
  bodyVertical: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    width: width * 0.65
  },
  labelContainer: {
    width: width * 0.383333,
    alignItems: "flex-end"
  },
  label: {
    margin: 10,
    marginLeft: 0,
    padding: 10
  },
  labelText: {
    textAlign: "left"
  },
  labelLine: {
    backgroundColor: "#000000",
    flex: 1,
    position: "absolute",
    height: 1,
    right: width * 0.35
  },
  emptyVertical: {
    width: (width * 1) / 30
  },
  vertical: {
    flexDirection: "column"
  },
  legs: {
    width: width / 4,
    height: height / 3
  },
  torso: {
    width: width / 4,
    flex: 1
  },
  head: {
    width: width / 4,
    height: height / 8
  },
  arm_left: {
    flex: 1
  },
  arm_right: {
    flex: 1
  },
  empty_bottom: {
    height: height / 3
  },
  empty_top: {
    height: height / 8
  },

  searchButton: {
    alignItems: "center",
    backgroundColor: "#42f4aa",
    alignSelf: "center",
    borderRadius: 1000,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    position: "absolute",
    bottom: 0,
    right: 20
  },
  searchImage: {
    width: 25,
    height: 25,
    tintColor: "white"
  },
  searchText: {
    fontSize: 15,
    fontWeight: "100",
    height: 20,
    textAlign: "center",
    color: "white"
  },
  darkShadow: {
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "#371f6a",
    shadowOpacity: 0.3
  }
});
