// REACT/REACT_NATIVE IMPORTS
import React, { Component } from "react";
import { View, Text, Button, Image, ActivityIndicator, TouchableOpacity, ScrollView, StyleSheet, StatusBar, FlatList, Alert } from "react-native";
// REDUX IMPORTS
import { connect } from "react-redux";
import { Avatar } from 'react-native-paper';
import { createIpfsUrl, createIpfsInfuraUrl } from '../../utils/IpfsUrl'
import RNFetchBlob from 'rn-fetch-blob';
import { TYPE_APK } from '../../constant/constant'

import LinearGradient from "react-native-linear-gradient";


class AppDetails extends Component {

    state = {
        currentApp: {},
        apkInstalling: false
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { appDetails: thisAppDetails } = this.props
        if (thisAppDetails.app && !thisAppDetails.loading && !thisAppDetails.error) {
            this.setState({
                currentApp: thisAppDetails.app
            })
        }
    }

    componentWillReceiveProps() {
        const { appDetails: thisAppDetails } = this.props
        if (this.state.currentApp !== thisAppDetails.app && !thisAppDetails.loading && !thisAppDetails.error) {
            this.setState({
                currentApp: thisAppDetails.app
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { appDetails: prevAppDetails } = prevProps
        const { appDetails: thisAppDetails } = this.props
        if (prevState.currentApp !== thisAppDetails.app && !thisAppDetails.loading && !thisAppDetails.error) {
            this.setState({
                currentApp: thisAppDetails.app
            })
        }
    }

    installApl = (name, data) => {
        this.setState({
            apkInstalling: true
        })
        let date = new Date();
        let FILE_URL = createIpfsInfuraUrl(data);

        let file_ext = '.' + 'apk';

        const { config, fs } = RNFetchBlob;
        let RootDir = fs.dirs.DownloadDir;
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                title: `${name}.apk`,
                description: 'Download in progress',
                mime: TYPE_APK,
                mediaScannable: true,
                notification: true,
                path:
                    RootDir +
                    '/file_' +
                    name +
                    file_ext,
            },
        };
        const android = RNFetchBlob.android
        config(options)
            .fetch('GET', FILE_URL)
            .then(res => {
                // Alert after successful downloading
                this.setState({
                    apkInstalling: false
                })
                android.actionViewIntent(res.path(), TYPE_APK)
            }).catch(err => {
                this.setState({
                    apkInstalling: false
                })
                Alert.alert(
                    "Installation failed!",
                    "Try again later...",
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                )
            });
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        const { currentApp: data, apkInstalling } = this.state
        const { appDetails } = this.props

        if (appDetails.loading || data === {})
            return (
                <ActivityIndicator style={{ marginTop: 10 }} size="small" color="black" />
            )
        else if (appDetails.error)
            return (
                <ActivityIndicator style={{ marginTop: 10 }} size="small" color="black" />
            )
        else if (Object.keys(data).length) {
            let icon_url = { uri: createIpfsInfuraUrl(data.icon.hash) }
            let image_url = { uri: createIpfsInfuraUrl(data.images.hash) }
            return (

                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={["#61DAFB", "#8FAAFE", "#282c34"]}
                    locations={[0, 0.3, 0.6]}
                    style={styles.mainView}>
                    {/* TITLE */}
                    <View style={styles.header}>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={this.goBack}>
                                <Avatar.Icon size={34} icon="arrow-left" style={styles.iconBg} />
                            </TouchableOpacity >
                            <TouchableOpacity>
                                <Avatar.Icon size={34} icon="magnify" style={styles.iconBg} />
                            </TouchableOpacity>
                        </View>
                        <Avatar.Image size={84} source={icon_url} style={{ backgroundColor: "white" }} />
                    </View>
                    <ScrollView style={styles.innerView} showsVerticalScrollIndicator={false}>
                        {/* Name / Tagline */}
                        <View style={styles.nameTextView}>
                            <View style={styles.textView}>
                                <Text style={styles.nameText}>
                                    {data.name}
                                </Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.tagLineText}>{data.tagLine}</Text>
                            </View>
                        </View >

                        {/* Install button */}
                        <View style={styles.installButtonView}>
                            {
                                apkInstalling ?
                                    <TouchableOpacity style={styles.touchableButton}>
                                        <View >
                                            <ActivityIndicator size="small" color="white" />
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => { this.installApl(data.name, data.apk.hash) }} style={styles.touchableButton}>
                                        <Text style={styles.buttonText}>INSTALL</Text>
                                    </TouchableOpacity>
                            }
                        </View>

                        <View style={styles.hr}>
                            <Text>Line</Text>
                        </View>

                        {/* Image */}
                        <View style={styles.imageView}>
                            <Image source={image_url} style={{ height: 200, resizeMode: 'stretch', padding: 5, borderRadius: 8 }} />
                        </View>

                        <View style={styles.hr} />

                        {/* Description */}
                        <View>
                            <View style={styles.textView}>
                                <Text style={styles.aboutHeading}>About this App</Text>
                            </View>
                            <View style={{ ...styles.textView, paddingBottom: 40 }}>
                                <Text style={styles.tagLineText}>{data.description}</Text>

                            </View>
                        </View>

                    </ScrollView>

                </LinearGradient >
            );
        }
        else {
            return (
                <ActivityIndicator style={{ marginTop: 10 }} size="small" color="black" />
            )
        }
    }
}

const styles = StyleSheet.create({
    iconBg: {
        backgroundColor: "#2956a3"
    },
    mainView: {
        height: "100%",
        justifyContent: "flex-end",
    },
    innerView: {
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
    },
    header: {
        padding: 20,
        alignItems: "center"
    },
    hr: {
        margin: 10,
        height: 1,
        paddingHorizontal: 50,
        backgroundColor: "#efefef",
        textAlign: "center",
        justifyContent: "center",
        shadowColor: '#282c34',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5
    },
    nameTextView: {},
    installButtonView: {
        width: "100%",
        paddingVertical: 10
    },
    touchableButton: {
        backgroundColor: "#282c34",
        color: "white",
        borderRadius: 8,
        padding: 15,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
    imageView: {
        padding: 10
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        paddingBottom: 0,
        width: "100%"
    },
    textView: {
        padding: 5,
        paddingBottom: 0
    },
    nameText: {
        fontSize: 24,
        color: "#313233",
        fontWeight: "700",
        textTransform: "capitalize"
    },
    tagLineText: {
        fontSize: 16,
        color: "#606466",
        fontWeight: "500",
        textTransform: "capitalize"
    },
    aboutHeading: {
        fontSize: 20,
        color: "#313233",
        fontWeight: "700",
        textTransform: "capitalize"
    },
    tagLineText: {
        fontSize: 12,
        color: "#606466",
        fontWeight: "400",
        textTransform: "capitalize"
    },
})

// MAP REDUX STATE TO PROPS
const mapStateToProps = (state) => ({
    main: state.main,
    appDetails: state.appDetails
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AppDetails);