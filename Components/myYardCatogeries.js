import React, { Component } from 'react'
import { TextInput, View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';

class MyYardCatogeries extends Component {
    constructor() {
        super()
        this.state = {
            dot: false
        }
        _panResponder = {};
    }
    render() {

        return (
            <View style={{ justifyContent: "center", alignItems: "center", }}>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 15 }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("IncludeDetails", { catogery: "Food" })}
                        style={{ width: 160, height: 160, alignItems: "center", justifyContent: "center", borderRightColor: "#F0F2F1", borderBottomColor: "#F0F2F1", borderRightWidth: 3, borderBottomWidth: 3, padding: 10 }}>
                        <MaterialCommunityIcons name='food-fork-drink' style={{ fontWeight: "bold", fontSize: 40, color: this.props.themeColors.forGroundColor }} />
                        <Text style={{ fontSize: 21, color: "#474A48" }}>Food </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("IncludeDetails", { catogery: "Home" })}
                        style={{ width: 160, height: 160, alignItems: "center", justifyContent: "center", borderBottomColor: "#F0F2F1", borderBottomWidth: 3, padding: 10 }}>
                        <Entypo name='home' style={{ fontWeight: "bold", fontSize: 40, color: this.props.themeColors.forGroundColor }} />
                        <Text style={{ fontSize: 21, color: "#474A48" }}>Home </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("IncludeDetails", { catogery: "Popular" })}
                        style={{ width: 160, height: 160, alignItems: "center", justifyContent: "center", borderRightColor: "#F0F2F1", borderRightWidth: 3, padding: 10 }}>
                        <AntDesign name='barschart' style={{ fontWeight: "bold", fontSize: 40, color: this.props.themeColors.forGroundColor }} />
                        <Text style={{ fontSize: 21, color: "#474A48" }}>Popular </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("IncludeDetails", { catogery: "Seasonal" })}
                        style={{ width: 160, height: 160, alignItems: "center", justifyContent: "center", padding: 10 }}>
                        <MaterialCommunityIcons name='charity' style={{ fontWeight: "bold", fontSize: 40, color: this.props.themeColors.forGroundColor }} />
                        <Text style={{ fontSize: 21, color: "#474A48" }}>Seasonal </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonView: {
        height: 45,
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#141414',
        borderWidth: .3,
        marginVertical: 6,
        borderRadius: 5
    },
    btnText: { color: "#141414", fontSize: 17, fontWeight: "700" }
})

function mapStateToProps(state) {
    return {
        themeColors: state.root.themeColors,
        darkmode: state.root.darkmode,
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MyYardCatogeries);
