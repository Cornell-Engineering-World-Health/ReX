import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';

class Check extends Component {

    constructor(props) {
        super(props);

        this.state = {
            stretch: new Animated.Value(0)
        }
    }

    animate = () => {
        Animated.timing(
            this.state.stretch,
            {
                toValue: 1,
                duration: 500,
                ease: Easing.in()
            }
        ).start();
    }

    componentDidMount() {
        this.animate();
    }

    render() {
        var stretchLong = this.state.stretch.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 22]
        });

        var stretchShort = this.state.stretch.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 54]
        });

        var fadeIn = this.state.stretch.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });

        let styleShort = [
            {
                width: 4,
                height: stretchShort,
                borderRadius: 2,
                backgroundColor: "#6ef7c9",
                transform: [
                    {rotate: '0deg'}
                ],
                opacity: fadeIn
            },
            styles.checkmarkShort
        ];

        let styleLong = [
            {
                width: stretchLong,
                height: 4,
                borderRadius: 2,
                backgroundColor: "#6ef7c9",
                transform: [
                    {rotate: '0deg'}
                ],
                opacity: fadeIn
            },
            styles.checkmarkLong
        ];

        return (

                <View style={styles.wrapper}>
                    <Animated.View key="styleShort" style={styleShort}/>
                    <Animated.View key="styleLong" style={styleLong}/>
                </View>
        )
    }
}

var styles = {
    wrapper: {
        width: 60,
        height: 60,
        transform: [
            {rotate: '-140deg'}
        ]
    },
    checkmarkShort: {
        position: "absolute",
        top: 0,
        left: 0
    },

    checkmarkLong: {
        position: "absolute",
        top: 0,
        left: 0
    }
};

export default Check;