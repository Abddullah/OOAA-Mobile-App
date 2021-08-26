import React, { Component } from 'react'
import {
  Image,
  Dimensions, Keyboard,
  StyleSheet,
  Text, AsyncStorage, Alert,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView, KeyboardAvoidingView, BackHandler
} from 'react-native'
import { connect } from 'react-redux'
// import  AsyncStorage  from '@react-native-community/async-storage'
import { bindActionCreators } from 'redux'
import CustomInput from '../../../Components/Input'
import CustomButton from '../../../Components/Button'
import CustomPicker from '../../../Components/PickerComp'
import { userSaveInStore, addressSaveToStore, waightUnitSet } from '../../../store/action/action';

import axios from 'axios';

const screenWidth = Dimensions.get('screen').width
class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      // email: 'abddullahshah@gmail.com',
      // password: '12345678',
      // email: 'hello@gmail.com',
      // password: '12345678',
      showPassword: false,
      showError: false,
      language: 'english',
      loader: false,
      activate: false,
    }
  }
  // componentWillMount(){

  // }

  componentDidMount() {
    let saveCredentials = this.props.navigation.getParam('saveCredentials');
    let email = this.props.navigation.getParam('email');
    let password = this.props.navigation.getParam('password');
    // let flag = true
    console.log(saveCredentials, email, password, "routt")
    if (saveCredentials) {
      AsyncStorage.multiGet(["email", "password"]).then(response => {
        if (response[0][1] && response[1][1]) {
          // flag = false
          this.setState({
            email: response[0][1],
            password: response[1][1]
          })
        }
        console.log(response[0][0], "gettttt") // Key1
        console.log(response[0][1]) // Value1
        console.log(response[1][0]) // Key2
        console.log(response[1][1]) // Value2
      })
    }
    else {
      AsyncStorage.multiRemove(["email", "password"]).then(response => {
        // if (response[0][1] && response[1][1]) {
        //   // flag = false
        //   this.setState({
        //     email: response[0][1],
        //     password: response[1][1]
        //   })
        // }
        console.log(response, "gettttt") // Key1

      })
    }


    // if (saveCredentials && flag) {
    //   this.setState({
    //     email: email,
    //     password: password
    //   })
    // }

  }
  // componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', BackHandler.exitApp());
  // }
  showPassword = () => {
  }
  onChangeText = (name, text) => {
    this.setState({ [name]: text })
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('waightUnit');
      if (value !== null) {
        // We have data!!
        console.log(value, "GETDATAFROMAS");
        let getDataFromAs = JSON.parse(value)
        this.props.waightUnitSet(getDataFromAs)
      }
    } catch (error) {
      console.log(value, "GETDATAFROMAS");
      // Error retrieving data
    }
  };
  login = () => {
    if (this.state.email && this.state.password) {
      this.setState({
        loader: !this.state.loader
      })
      let cloneData = {
        email: this.state.email,
        password: this.state.password
      }
      var options = {
        method: 'POST',
        url: `${this.props.mainUrl}signin`,
        // url: `http://192.168.100.156:3002/signin`,
        headers:
        {
          'cache-control': 'no-cache',
          "Allow-Cross-Origin": '*',
        },
        data: cloneData
      };
      axios(options)
        .then((data) => {
          this.setState({
            loader: !this.state.loader
          })
          this.props.userSaveInStore(data.data)


          let urlm = `${this.props.mainUrl}profile/getAddress/${data.data._id}`;
          console.log(urlm, "urlm")
          axios({
            method: 'get',
            url: urlm,
            headers: {
              'cache-control': 'no-cache',
              "Allow-Cross-Origin": '*',
            },
          })
            .then(data => {
              console.log(data.data, "userdetails")
              this.props.addressSaveToStore(data.data.data)
              this._retrieveData()
              this.props.navigation.navigate('Home')
            })
            .catch(err => {
              console.log(JSON.stringify(err.response.data.message), "-------err")
              // alert(err.response.data.message)
              // this.props.navigation.navigate('Home')
              this.props.navigation.navigate('App');


            })

        }).catch((err) => {
          console.log(JSON.stringify(err.response.data.message), "-------err")
          if (err.response.status === 402) {
            this.setState({
              activate: true
            }, () => {
              setTimeout(() => {
                this.setState({
                  activate: false
                })
              }, 10000);
            })

          }
          else {
            alert(err.response.data.message)
          }


          // alert(JSON.stringify(err.response.data.message))
          this.setState({
            loader: !this.state.loader, showError: true
          })
        })
    }


  }
  valueChange = (value) => {
    console.log(value)
  }
  activate() {

    let cloneData = {
      email: this.state.email,
      createdAt: Date.now(),
    }
    var options = {
      method: 'POST',
      // url: `http://192.168.10.12:3002/signup`,
      url: `${this.props.mainUrl}activatecodesend`,
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
        this.setState({
          loader: !this.state.loader
        })

        this.props.navigation.push('ActivateAccount', {
          // saveCredentials: this.state.checkBox,
          email: this.state.email,
          // password: this.state.password
        })
      }).catch((err) => {
        console.log(err.response, "-------err", err.response.status)
        this.setState({
          loader: !this.state.loader
        })
        // if (err.response.status === 401) {
        //   this.Customalert(err.response.data.message)
        // }
        // else {
        alert(err.response.data.message)
        // }
      })

  }
  render() {
    console.log(this.props.mainUrl, "--------************", `${this.props.mainUrl}signin`)
    let { email, password, showPassword, showError, activate } = this.state
    let logo = require('../../../Assets/OOAAlogo.jpg')
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height" >

        <SafeAreaView style={{
          flex: 1,
          // backgroundColor: "red"
        }}>
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
                value={this.state.email}
                placeholder={'Username , email address or phone number'}
              // onFocus={() => this.setState({ showError: false })}
              // errorText={showError ? 'Username not recognized' : undefined}
              />

              <CustomInput iconName={'lock'}
                onRightIconPress={() => this.setState({ showPassword: !this.state.showPassword })}
                errorText={showError ? 'Forgetten your passworssd' : undefined}
                // onFocus={() => this.setState({ showError: false })}
                leftIconName={password !== '' && showPassword === false ? 'eye-off-outline' : password !== '' && showPassword === true ? 'eye-outline' : undefined}
                onChangeText={(text) => this.onChangeText('password', text)}
                placeholder={'Password'} secureTextEntry={showPassword ? false : true}
                navigattion={this.props.navigation}
                value={this.state.password}

              />

              {(activate &&
                <TouchableOpacity onPress={() => this.activate()}>
                  <Text style={{ color: 'red', marginLeft: 6, textAlign: 'center' }}>Activate your account</Text>
                </TouchableOpacity>
              )}

              <CustomButton
                loader={this.state.loader}
                label={'Login'} backgroundColor={'#004dcf'}
                color={'#fff'}
                onClick={() => this.login()} />

              {/* <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 17 }}> Or </Text> */}

              <CustomButton label={'Sign Up'}
                onClick={() => this.props.navigation.navigate('SignUp')}
                backgroundColor={'#1273de'}
                color={'#fff'} />

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
    // isLoader: state.root.isLoader,
  }
}



function mapDispatchToProp(dispatch) {
  return ({
    userSaveInStore: (data) => {
      dispatch(userSaveInStore(data));
    },
    addressSaveToStore: (data) => {
      dispatch(addressSaveToStore(data));
    },
    waightUnitSet: (data) => {
      dispatch(waightUnitSet(data));
    },

  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProp
)(Login)
