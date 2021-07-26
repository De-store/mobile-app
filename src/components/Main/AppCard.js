import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
import { createIpfsUrl } from '../../utils/IpfsUrl'
import { Avatar } from 'react-native-paper';

// AppCard - COMPONENT
class AppCard extends Component {

    render() {
        const { data, onCardClick } = this.props
        console.log("Data ", data)
        let icon_url = { uri: createIpfsUrl(data.icon.hash) }
        return (
            <TouchableOpacity key={data.appId} style={styles.contentItem} onPress={() => { onCardClick(data) }}>
                <View style={styles.row}>
                    <View style={styles.imageView}>
                        <Image source={icon_url} style={styles.image} />
                        {/* <Avatar.Image source={icon_url} style={{ borderRadius: 8 }} /> */}
                    </View>
                    <View style={styles.textView}>
                        <Text style={styles.heading}>{data.name}</Text>
                        <Text style={styles.subHeading}>{data.tagLine}</Text>

                    </View>

                </View>
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        width: "100%"
    },
    imageView: {
        padding: 5
    },
    image: {
        height: 64,
        width: 64,
        borderRadius: 8
    },
    heading: {
        fontSize: 24,
        color: "#313233",
        fontWeight: "700",
        textTransform: "capitalize"
    },
    subHeading: {
        fontSize: 16,
        color: "#606466",
        fontWeight: "500",
        textTransform: "capitalize"
    },
    contentItem: {
        padding: 20,
        margin: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        borderRadius: 8
    },
    imageView: {
        padding: 5
    },
    textView: {
        padding: 5,
        flexDirection: "column",
        justifyContent: "space-between"
    }
})

export default AppCard;