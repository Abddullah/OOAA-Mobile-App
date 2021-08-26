import React, { Component } from 'react'
import {
  Image,
  Dimensions, Keyboard, AsyncStorage,
  StyleSheet,
  Text, Alert,
  SafeAreaView,
  View, KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView
} from 'react-native'
// import  AsyncStorage  from '@react-native-community/async-storage'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import CustomInput from '../../../Components/Input'
import CustomButton from '../../../Components/Button'
import CustomPicker from '../../../Components/PickerComp'
import DatePicker from 'react-native-datepicker'
import axios from 'axios';
const screenWidth = Dimensions.get('screen').width
class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      showPassword: false,
      showError: false,
      language: 'english',
      checkBox: true,
      loader: false,
      dateofbirth: ""
    }
  }
  showPassword = () => {
  }
  onChangeText = (name, text) => {
    this.setState({ [name]: text })
  }
  signUp = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.email) === false) {
      alert("invalid email type")
    }
    else {
      if (this.state.password.length < 8) {
        alert("password should be 8 characters")
      }
      else if (!this.state.dateofbirth) {
        alert("Date of birth is required")
      }
      else {
        this.setState({
          loader: !this.state.loader
        })
        let cloneData = {
          email: this.state.email,
          password: this.state.password,
          createdAt: Date.now(),
          dateofbirth: this.state.dateofbirth,
        }
        var options = {
          method: 'POST',
          // url: `http://192.168.10.12:3002/signup`,
          url: `${this.props.mainUrl}signup`,
          headers:
          {
            'cache-control': 'no-cache',
            "Allow-Cross-Origin": '*',
          },
          data: cloneData
        };
        axios(options)
          .then((data) => {

            if (this.state.checkBox) {
              _storeCredentials(this.state.email, this.state.password)
            }
            console.log(data, "data")
            this.setState({
              loader: !this.state.loader
            })

            this.props.navigation.push('ActivateAccount', {
              saveCredentials: this.state.checkBox,
              email: this.state.email,
              password: this.state.password
            })
          }).catch((err) => {
            console.log(err.response, "-------err", err.response.status)
            this.setState({
              loader: !this.state.loader
            })
            if (err.response.status === 401) {
              this.Customalert(err.response.data.message)
            }
            else {
              alert(err.response.data.message)
            }
          })
      }
    }

    const _storeCredentials = async (email, password) => {
      // let userData = JSON.stringify(user)
      console.log("token,user, reject", email, password)
      try {
        await AsyncStorage.multiSet([['email', email], ['password', password]]);
        // await AsyncStorage.setItem('password', password);
        return;
      } catch (error) {
        console.log(error, "error")
        alert("Something went wrong.")
        reject()
      }

    };
  }
  Customalert(err) {
    // alert("work")
    Alert.alert(
      'Alert',
      err,
      [
        { text: 'Reset password', onPress: () => this.props.navigation.navigate("ForgetPassword") },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          // style: 'cancel',
        },
        // { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: true },
    );
  }
  valueChange = (value) => {
    console.log(value)
  }
  render() {
    let { email, password, showPassword, showError, checkBox } = this.state
    let logo = require('../../../Assets/OOAAlogo.jpg')
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height" >

        <SafeAreaView style={{ flex: 1 }}>
          <View style={{
            flex: 10,
            // backgroundColor: "yellow"
          }}>
            <View style={{ alignItems: 'center', flex: 1, justifyContent: "center" }}>
              <Image
                source={logo}
                style={{ height: 145, width: '80%', resizeMode: 'contain' }}
              />
            </View>
            <View style={{ flex: 1.5 }}>
              <CustomInput iconName={'user'}
                onChangeText={(text) => this.onChangeText('email', text)}
                placeholder={'Email Address'}
                onFocus={() => this.setState({ showError: false })}
                value={this.state.email}
                errorText={showError ? 'Username not recognized' : undefined} />

              <CustomInput iconName={'lock'}
                onRightIconPress={() => this.setState({ showPassword: !this.state.showPassword })}
                errorText={showError ? 'Forgetten your password' : undefined}
                onFocus={() => this.setState({ showError: false })}
                leftIconName={password !== '' && showPassword === false ? 'eye-off-outline' : password !== '' && showPassword === true ? 'eye-outline' : undefined}
                onChangeText={(text) => this.onChangeText('password', text)}
                value={this.state.password}
                placeholder={'Password'} secureTextEntry={showPassword ? false : true} />

              <View style={{
                justifyContent: "center", alignItems: "center",
                marginTop: 10, width: "90%", marginHorizontal: "5%",
                borderRadius: 3, height: 50,
                borderWidth: 1, borderColor: "#9b9b9b",
                flexDirection: "row",
                // backgroundColor: "red"
              }}>
                <View style={{
                  flex: 0.8,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: "green"
                }}>
                  <Fontisto size={16} name={"date"} />

                </View>
                <View style={{
                  flex: 8,
                  flexDirection: "row",
                  // backgroundColor: "yellow"
                }}>
                  <DatePicker showIcon={false}
                    style={{
                      width: 280,
                      // backgroundColor: "yellow"
                    }}
                    date={this.state.dateofbirth}
                    mode="date"
                    placeholder="Date Of Birth"
                    format="YYYY-MM-DD"
                    // minDate="2016-05-01"
                    // maxDate="2016-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      placeholderText: {
                        marginRight: 0, color: "#9b9b9b"
                      },
                      dateInput: {
                        height: 52,
                        borderLeftWidth: 0,
                        borderRightWidth: 0,
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                        marginRight: 180,
                      }
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => { this.setState({ dateofbirth: date }) }}
                  />
                </View>
                {/* <Fontisto size={16} name={"date"} />

                <DatePicker showIcon={false}
                  style={{
                    width: 280,
                    // backgroundColor: "yellow"
                  }}
                  date={this.state.dateofbirth}
                  mode="date"
                  placeholder="Date Of Birth"
                  format="YYYY-MM-DD"
                  // minDate="2016-05-01"
                  // maxDate="2016-06-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    placeholderText: {
                      marginRight: 180, color: "#9b9b9b"
                    },
                    dateInput: {
                      height: 52,
                      borderLeftWidth: 0,
                      borderRightWidth: 0,
                      borderTopWidth: 0,
                      borderBottomWidth: 0
                    }
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(date) => { this.setState({ dateofbirth: date }) }}
                /> */}
              </View>

              <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center', margin: 12 }}
                onPress={() => this.setState({ checkBox: !checkBox })}
              >
                <Icon size={19} name={checkBox ? 'check-box-outline' : 'checkbox-blank-outline'} />
                <Text style={{ fontSize: 15 }}> Save credentials to this device </Text>
              </TouchableOpacity>

              <CustomButton
                disable={email ? false : true}
                label={'Sign Up'}
                loader={this.state.loader}
                onClick={() => this.signUp()}
                backgroundColor={email ? '#1273de' : '#1273de'}
                color={'#fff'} />


              <TouchableOpacity style={{ justifyContent: "center", alignItems: 'center', }}
                onPress={() => this.props.navigation.navigate("Login")}
              >
                {/* <Ic/on size={19} name={checkBox ? 'check-box-outline' : 'checkbox-blank-outline'} /> */}
                <Text style={{ fontSize: 15, color: "blue", textDecorationLine: "underline" }}>Already have an account? </Text>
              </TouchableOpacity>

              {/* <View style={{ justifyContent: 'flex-end', }}>
                <CustomPicker value={this.state.language} />
              </View> */}
            </View>
            <View style={{
              flex: 0.25,
              // backgroundColor: "grey"
            }}>

              <CustomPicker value={this.state.language} />

            </View>

          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 }
})

function mapStateToProps(state) {
  return {
    mainUrl: state.root.mainUrl,

  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)
