// REACT/REACT_NATIVE IMPORTS
import React, { Component } from "react";
import { View, Text, RefreshControl, ScrollView } from "react-native";
// REDUX IMPORTS
import { connect } from "react-redux";
// NAVIGATION IMPORTS
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs";
// SHADOW COMPONENT IMPORT
import NewContract from '../components/Main/NewContract'

import { getFileData } from '../modules/actions/Main/Main'

const Tab = createBottomTabNavigator();

// MAINSCREEN - COMPONENT
class MainScreen extends Component {

    state = {
        currentFiles: [],
        refreshing: false
    }

    componentDidMount() {
        this.props.getFiles()
    }

    componentDidUpdate(prevProps, prevState) {
        const { main } = this.props
        if (!main.loading && !main.error && main.files.length > 0 && prevProps.main.loading !== main.loading && this.state.currentFiles !== main.files) {
            this.setState({
                currentFiles: main.files
            })
        }
    }

    getFilesOnClick = (_search = "") => {
        this.props.getFiles(_search)
    }

    onRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            this.props.getFiles()
            setTimeout(() => {
                this.setState({
                    refreshing: false
                })
            }, 2000);
        })
    }

    render() {
        const { refreshing } = this.state
        return (
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={this.onRefresh}
                />
            }>
                <NewContract getFiles={this.getFilesOnClick} navigation={this.props.navigation} />
            </ScrollView>
        );
    }
}

// MAP REDUX STATE TO PROPS
const mapStateToProps = (state) => ({
    main: state.main
});
const mapDispatchToProps = (dispatch) => ({
    getFiles: (_search) => dispatch(getFileData(_search))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);