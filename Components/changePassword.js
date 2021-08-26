
import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, StatusBar,
    ScrollView, Picker, Image, SafeAreaView, ActivityIndicator,
    images, Dimensions, ImageBackground, Alert
} from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Item, Fab, Input } from 'native-base';
// import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from "react-native-modal";
import axios from 'axios';
import { userSaveInStore } from '../store/action/action';

class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: true,
            updateLoader: true,
            oldPassword: false
        }
    }
    componentWillMount() {
        console.log(this.props.user, "USER")
        var { height, width } = Dimensions.get('window');
        this.setState({
            screenHeight: height,
        })
    }


    closeModal = () => {
        this.setState({ isModalVisible: false })
        this.props.closeModal(false)

    }

    upDatePassword() {
        if (this.state.password === this.state.repPassword) {
            if (this.state.password.length < 8) {
                Alert.alert("password should be 8 characters")
            }
            else {
                this.setState({
                    updateLoader: !this.state.updateLoader
                })
                let cloneData = {
                    email: this.props.user.email,
                    newPassword: this.state.password,
                    currentPassword: this.state.oldPassword,
                }
                console.log(cloneData, "data")
                var options = {
                    method: 'POST',
                    url: `${this.props.mainUrl}resetpassword/changepasswordinsideapp/`,
                    headers:
                    {
                        'cache-control': 'no-cache',
                        "Allow-Cross-Origin": '*',
                    },
                    data: cloneData
                };
                axios(options)
                    .then((data) => {
                        console.log(data, "data")
                        this.closeModal()
                        Alert.alert(data.data.message)
                        // this.props.navigation.navigate('Login')

                    }).catch((err) => {
                        Alert.alert(JSON.stringify(err.response.data.message))
                        this.setState({
                            updateLoader: !this.state.updateLoader
                        })
                    })
            }

        }
        else {
            Alert.alert("These passwords don't match. Please try again")
        }
    }

    render() {
        console.log(this.props.user, "user")
        let { password, repPassword, oldPassword } = this.state
        return (
            <View>
                <Modal isVisible={this.state.isModalVisible}>
                    <View
                        style={{ height: this.state.screenHeight / 2, justifyContent: 'center', alignItems: "center", }}>
                        <View style={{ backgroundColor: "white", width: "90%", height: "100%", borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
                            <View style={{ width: "80%", flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                                {/* Cancel Button*/}
                                <View style={{ width: "95%", alignItems: "flex-end", flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={{ marginLeft: "2%", fontWeight: "bold" }}>{"Change Password"}</Text>
                                    <TouchableOpacity
                                        style={{ width: 30, marginTop: 10, }}
                                        onPress={this.closeModal}
                                    >
                                        <Entypo name='cross' style={{ textAlign: "right", marginRight: 10, fontSize: 19, fontWeight: "bold", color: "#1E90FF" }} />
                                    </TouchableOpacity>
                                </View>

                                {/* old password */}
                                < View style={{ marginTop: 0 }}>
                                    <Item style={styles.input}>
                                        <Input
                                            secureTextEntry
                                            placeholder={"Please type current password"}
                                            placeholderStyle={{ fontSize: 10 }}
                                            placeholderTextColor="#b3b3b3"
                                            label={"Please type current password"}
                                            style={{ fontSize: 15 }}
                                            onChangeText={(e) => { this.setState({ oldPassword: e }) }}
                                            value={oldPassword}
                                        />
                                        <Entypo name='key' style={{ color: "#1E90FF", fontWeight: "bold", fontSize: 15, marginRight: 12, }} />
                                    </Item>
                                </View>
                                {/* password */}
                                < View style={{ marginTop: 0 }}>
                                    <Item style={styles.input}>
                                        <Input
                                            secureTextEntry
                                            placeholder={"Please type new password"}
                                            placeholderStyle={{ fontSize: 10 }}
                                            placeholderTextColor="#b3b3b3"
                                            label={"Please type new password"}
                                            style={{ fontSize: 15 }}
                                            onChangeText={(e) => { this.setState({ password: e }) }}
                                            value={password}
                                        />
                                        <Entypo name='key' style={{ color: "#1E90FF", fontWeight: "bold", fontSize: 15, marginRight: 12, }} />
                                    </Item>
                                </View>
                                {/* repeat password */}
                                <View style={{ marginTop: 0 }}>
                                    <Item style={styles.input}>
                                        <Input
                                            secureTextEntry
                                            placeholder={"Repeate password"}
                                            placeholderStyle={{ fontSize: 10 }}
                                            placeholderTextColor="#b3b3b3"
                                            label={"Repeate password"}
                                            style={{ fontSize: 15 }}
                                            onChangeText={(e) => { this.setState({ repPassword: e }) }}
                                            value={repPassword}
                                        />
                                        <Entypo name='key' style={{ color: "#1E90FF", fontWeight: "bold", fontSize: 15, marginRight: 12, }} />
                                    </Item>
                                </View>



                                {
                                    (this.state.updateLoader === true) ? (
                                        <TouchableOpacity style={{ width: "100%", height: 50, marginTop: 20, marginBottom: 20, justifyContent: "center", alignItems: "center", backgroundColor: this.props.themeColor }}
                                            onPress={() => this.upDatePassword()}>
                                            <Text style={{ color: "white", fontWeight: "bold" }}>Change Password</Text>
                                        </TouchableOpacity>
                                    ) : <ActivityIndicator style={{ top: 20, marginBottom: 20 }} />
                                }
                            </View>
                        </View>
                    </View>
                </Modal>
            </View >
        );
    }
}


let mapStateToProps = state => {
    return {
        themeColor: state.root.themeColor,
        mainUrl: state.root.mainUrl,
        user: state.root.user,
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        userSaveInStore: (data) => {
            dispatch(userSaveInStore(data));
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

const styles = StyleSheet.create({
    holder: {
        flex: 0.25,
        justifyContent: 'center',
    },
    contentContainer: {
        paddingBottom: 40,
        backgroundColor: "white",
    },
    container: {
        flex: 1,
    },
    containerForModal: {
        // flex: 1,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
        // width:"100%"
    },
    textareaContainer: {
        height: "30%",
        width: "95%",
        padding: 5,
        // backgroundColor: '#F8F8F8',
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 100,
        fontSize: 14,
        // color: '#333',
    },
    customSlide: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    customImage: {
        width: "100%",
        height: "100%",
    },
    listView: {
        width: "100%", height: 40, marginTop: 15,
        borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    listTextOption: {
        marginLeft: 10, color: "#000", fontWeight: "bold", fontSize: 12
    },
    listTextOptionValue: {
        marginLeft: 10, color: "#6a6a6a", textAlign: "right",
    },
    input: { justifyContent: 'center', alignItems: 'center', width: '95%', },
});  
