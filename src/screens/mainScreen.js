// REACT/REACT_NATIVE IMPORTS
import React, { Component } from "react";
import { View, Text, RefreshControl, ScrollView } from "react-native";
// REDUX IMPORTS
import { connect } from "react-redux";
// NAVIGATION IMPORTS
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs";
// SHADOW COMPONENT IMPORT
import DropShadow from "react-native-drop-shadow";
// Components
import Chat from '../components/Chat'
import Connection from '../components/Connection'
import Contract from '../components/Contract'
import NewContract from '../components/Main/NewContract'
import Profile from '../components/Profile'

import { getFileData } from '../modules/actions/Main/Main'
// import { ScrollView } from "react-native-gesture-handler";

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
            // <Tab.Navigator
            //     tabBar={(props) =>
            //         <DropShadow
            //             style={{
            //                 shadowColor: "#7966FF",
            //                 shadowOffset: {
            //                     width: 0,
            //                     height: 0,
            //                 },
            //                 shadowOpacity: 0.6,
            //                 shadowRadius: 2,
            //             }}
            //         >
            //             <BottomTabBar {...props} />
            //         </DropShadow>
            //     }
            //     initialRouteName="NewContract"
            //     screenOptions={({ route }) => ({
            //         tabBarIcon: ({ focused, color, size }) => {
            //             let mainStyle = {
            //                 marginTop: -10,
            //                 backgroundColor: "#8FAAFE",
            //                 borderRadius: 50
            //             }
            //             let mainFocusedStyle = {
            //                 marginTop: -10,
            //                 backgroundColor: "#7966FF",
            //                 borderRadius: 50
            //             }
            //             let tstyle = {};
            //             let tMainStyle;
            //             if (focused) {
            //                 tMainStyle = mainFocusedStyle;
            //             }
            //             else {
            //                 tMainStyle = mainStyle;
            //             }
            //             if (route.name === "Profile") {
            //                 return (
            //                     <View style={color === 'blue' ? tMainStyle : tstyle}>
            //                         <Text>P</Text>
            //                     </View>
            //                 );
            //             } else if (route.name === "Contracts") {
            //                 return (
            //                     <View style={color === 'blue' ? tMainStyle : tstyle}>
            //                         <Text>C</Text>
            //                     </View>
            //                 );
            //             }
            //             else if (route.name === "NewContract") {
            //                 return (
            //                     <View style={color === 'blue' ? tMainStyle : tstyle}>
            //                         <Text>C</Text>
            //                     </View>
            //                 );
            //             }
            //             else if (route.name === "Connections") {
            //                 return (
            //                     <View style={color === 'blue' ? tMainStyle : tstyle}>
            //                         <Text>C</Text>
            //                     </View>
            //                 );
            //             }
            //             else if (route.name === "Chat") {
            //                 return (
            //                     <View style={color === 'blue' ? tMainStyle : tstyle}>
            //                         <Text>C</Text>
            //                     </View>
            //                 );
            //             }
            //         },
            //     })}
            //     tabBarOptions={{
            //         showLabel: false,
            //         activeTintColor: "blue",
            //         inactiveTintColor: "white",
            //         style: {
            //             backgroundColor: "white",
            //             height: 60,
            //             borderTopWidth: 1,
            //         }
            //     }}>
            //     <Tab.Screen name="Chat" component={Chat} />
            //     <Tab.Screen name="Contracts" component={Contract} />
            // <Tab.Screen name="NewContract" children={() => 
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={this.onRefresh}
                />
            }>
                <NewContract getFiles={this.getFilesOnClick} navigation={this.props.navigation} />
            </ScrollView>
            // } />
            //     <Tab.Screen name="Connections" component={Connection} />
            //     <Tab.Screen name="Profile" component={Profile} />
            // </Tab.Navigator>
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