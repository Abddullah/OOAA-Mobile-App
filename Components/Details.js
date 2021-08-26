import React, { Component } from 'react'
import { TextInput, View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native'
import { connect } from 'react-redux'

class Details extends Component {
    constructor() {
        super()
        this.state = {
            dot: false
        }
        _panResponder = {};
    }
    render() {

        return (
            <View

                style={{
                    flexDirection: "row",
                    // marginLeft: 5,
                    // marginRight: 5,
                    marginTop: 10, shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,

                    elevation: 3,
                    backgroundColor: this.props.themeColors.backGroundColor,
                }} >
                {/* headings */}
                <View style={{
                    flex: 1,
                    // backgroundColor: "#fff",
                    padding: "2.5%"
                }}>



                    <Text style={{ fontWeight: "bold", fontSize: 13, color: "#908073", margin: 5 }}>Full Name:</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 13, color: "#908073", margin: 5 }}>Address 1</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 13, color: "#908073", margin: 5 }}>Address 2</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 13, color: "#908073", margin: 5 }}>Address 3</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 13, color: "#908073", margin: 5 }}>Address 4</Text>
                </View>
                {/* values */}
                <View style={{
                    flex: 2,
                    // backgroundColor: "#fff",
                    padding: "2%"
                }}>
                    <TouchableOpacity activeOpacity={1}

                    // style={{ backgroundColor: "red" }}
                    // onPress={() => this.getFullPost(iAdded)}
                    >


                        <Text style={{ fontSize: 13, color: "#908073", margin: 5 }}>Muzammil Hussain Shah</Text>
                        <Text style={{ fontSize: 13, color: "#908073", margin: 5 }}>R592, Sector 8</Text>
                        <Text style={{ fontSize: 13, color: "#908073", margin: 5 }}>R592, Sector 8</Text>
                        <Text style={{ fontSize: 13, color: "#908073", margin: 5 }}>R592, Sector 8</Text>
                        <Text style={{ fontSize: 13, color: "#908073", margin: 5 }}>R592, Sector 8</Text>
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
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)
