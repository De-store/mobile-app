// REACT/REACT_NATIVE IMPORTS
import React, { Component } from "react";
import { View, Text } from "react-native";
// REDUX IMPORTS
import { connect } from "react-redux";

class Connection extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() { }

    render() {
        return (
            <View >
                <Text>Connection</Text>
            </View>
        );
    }
}

// MAP REDUX STATE TO PROPS
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Connection);