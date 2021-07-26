// REACT/REACT_NATIVE IMPORTS
import React, { Component } from "react";
// REDUX IMPORTS
import { connect } from "react-redux";
import AppDetails from '../components/App/AppDetails'
import { View, Text, ActivityIndicator } from "react-native";

import { getAppDetails } from '../modules/actions/AppDetails/AppDetails'

class AppScreen extends Component {

    state = {
        appDetails: {}
    }

    componentDidMount() {
        console.log("THIS PROPS IN DETAILS ", JSON.stringify(this.props))
        if (this.props.route && this.props.route.params && this.props.route.params.data) {
            console.log("this.props.route.params.data ", this.props.route.params.data)
            this.props.appDetails(this.props.route.params.data)
        } else {
            this.props.navigation.navigate("Main")
        }
    }

    render() {
        return (
            <AppDetails
                navigation={this.props.navigation}/>
        );
    }
}

const mapStateToProps = (state) => ({
    main: state.main,
});
const mapDispatchToProps = (dispatch) => ({
    appDetails: (data) => dispatch(getAppDetails(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppScreen);
