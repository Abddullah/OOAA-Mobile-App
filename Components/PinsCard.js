import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';



const PinsCard = (props) => {
    //props
    const { img, text, themeColors } = props;
    return (
        <View
            style={[styles.card2ndOption, {
                backgroundColor: themeColors ? themeColors.backGroundColor : "red",
            }]}
        >
            {/* Image */}
            {
                img ?
                    <Image style={{ width: 140, height: 120 }} resizeMode="cover" source={{ uri: img }} /> :
                    <Image
                        resizeMode="cover"
                        source={require("../Assets/nophoto.png")}
                        // source={require("../Assets/shopIcons/shopBlue.png")}
                        style={{ width: 140, height: 120 }}
                    />

            }
            {/* Title of products */}
            <Text style={[styles.card_text, {
                color: themeColors ? themeColors.forGroundColor : "red",
            }]}> {text} </Text>
        </View>

    );
}


const styles = StyleSheet.create({
    card2ndOption: {
        flex: 1, margin: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    card_text: {
        fontWeight: 'bold',
        fontSize: 15,
        margin: 3
    },

});


export default PinsCard;