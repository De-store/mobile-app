// REACT/REACT_NATIVE IMPORTS
import React, { Component } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
// REDUX IMPORTS
import { connect } from "react-redux";
import AppCard from './AppCard';

import { Searchbar } from 'react-native-paper';

class NewContract extends Component {

    state = {
        allFiles: [],
        searchValue: ""
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { main: thisMain } = this.props
        if (thisMain.files && !thisMain.loading && !thisMain.error) {
            this.setState({
                allFiles: thisMain.files
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { main: prevvMain } = prevProps
        const { main: thisMain } = this.props
        console.log("this.props ", JSON.stringify(this.props))
        console.log("prevProps ", JSON.stringify(prevProps))
        console.log("prevState ", JSON.stringify(prevState))
        console.log("this.state ", JSON.stringify(this.state))
        if (prevState.allFiles !== thisMain.files && !thisMain.loading && !thisMain.error) {
            this.setState({
                allFiles: thisMain.files
            })
        }
    }

    searchAppByName = async () => {
        const { searchValue } = this.state
        if (searchValue !== "") {
            this.props.getFiles(searchValue)
            this.setState({
                searchValue: ""
            })
        }
    }

    goToAppDetails = (data) => {
        this.props.navigation.navigate("App", {
            data
        })
    }

    render() {
        const { allFiles, searchValue } = this.state

        console.log("allFiles ", allFiles)

        const listItem = ({ item }) => {
            return (
                <AppCard data={item} onCardClick={this.goToAppDetails} />
            )
        }

        return (
            <View style={styles.mainComponentContainer}>
                <View style={styles.searchBarContainer}>
                    <Searchbar
                        placeholder="Search"
                        onChangeText={(e) => { this.setState({ searchValue: e }) }}
                        onIconPress={this.searchAppByName}
                        value={searchValue}
                        style={styles.searchBar}
                    />
                </View>
                <FlatList
                    data={allFiles}
                    renderItem={listItem}
                    keyExtractor={item => item.appId}
                    contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainComponentContainer: {
        padding: 20
    },  
    contentContainer: {
        paddingVertical: 20,
        paddingBottom: 40,
    },
});

// MAP REDUX STATE TO PROPS
const mapStateToProps = (state) => ({
    main: state.main
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NewContract);