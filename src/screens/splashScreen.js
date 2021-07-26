// REACT/REACT_NATIVE IMPORTS
import React, { Component } from "react";
import { View, Image, StyleSheet, Animated, ActivityIndicator, Text } from "react-native";
// REDUX IMPORTS
import { connect } from "react-redux";
// GRADIENT COMPONENT IMPORTS
import LinearGradient from "react-native-linear-gradient";
import { loadMainScreen } from '../modules/actions/Initial/Initial'

// SPLASHSCREEN - COMPONENT
class SplashScreen extends Component {

    state = {
        fadeAnim: new Animated.Value(0),
    }

    componentDidMount() {
        Animated.timing(this.state.fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start();
        this.props.loadMainScreen();
    }

    componentDidUpdate(prevProps, prevState) {
        const { initial } = this.props
        if (!initial.loading && initial.goToMain && prevProps.initial.loading !== initial.loading && prevProps.initial.goToMain !== initial.goToMain) {
            // ADDING DELAY TO LET THE ANIMATION COMPLETE
            setTimeout(() => {
                this.props.navigation.replace("Main")
            }, 3000)
        }
    }

    render() {
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={["#61DAFB", "#8FAAFE", "#282c34"]}
                style={styles.MainView}>
                <Animated.View style={[styles.Container, { opacity: this.state.fadeAnim }]}>
                    <Text style={styles.Title}>Welcome</Text>
                    <ActivityIndicator style={{ marginTop: 10 }} size="small" color="white" />
                </Animated.View>
            </LinearGradient>
        );
    }

}

const styles = StyleSheet.create({
    MainView: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    Container: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    Logo: {
        height: "40%",
        aspectRatio: 2284 / 2136,
    },
    Title: {
        fontSize: 40,
        textAlign: "center",
        color: "white",
        fontWeight: "bold"
    }
})
// MAP REDUX STATE TO PROPS
const mapStateToProps = (state) => ({
    initial: state.initial
});
const mapDispatchToProps = (dispatch) => ({
    loadMainScreen: () => dispatch(loadMainScreen())
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);