import React, { Component } from 'react';

import { StyleSheet, Text, View, PanResponder, TouchableOpacity, ScrollView, AsyncStorage, Alert } from 'react-native';
import { Switch, Radio } from 'native-base';
import { List } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

import { connect } from 'react-redux';

import { changeTheme, waightUnitSet } from "./../store/action/action";
import UpdateAddress from '../../client/Components/updateAddressModal'
import DeleteProfileModal from '../../client/Components/deleteProfileModal'
import ChangePassword from '../../client/Components/changePassword'

class ProfileDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawer: false,
      updateAddress: false,
      deleteProfileModal: false,
      changePassword: false,
      userName: "",
      waightUnit: {
        Metric: true, Imperial: false,
      }
    };
    _panResponder = {};
    this.openYard = this.openYard.bind(this);
  }

  componentWillMount() {
    //user name set
    let userName = this.props.user.email
    var n = userName.indexOf("@");
    var res = userName.substring(0, n);

    this.setState({
      userName: res,
      // userAddress: this.props.userAddress,
      waightUnit: this.props.waightUnit
    })

    //drawer open and animation
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        if (gestureState.dx < -45) {
          this.setState({
            animationStyle: "fadeOutRightBig"
          });
          this.props.animateParent(false);
        }
      },
      onPanResponderRelease: (evt, gestureState) => { },
    });
    this.setState({
      animationStyle: this.props.animationStyle,
    });
  }


  componentWillReceiveProps(nextProp) {
    //waight unit set after getting AsyncStorage
    this.setState({
      waightUnit: nextProp.waightUnit,
      // userAddress: nextProp.userAddress,
    })
  }

  //rounting change function
  openYard(logout) {
    console.log(logout, "logout")
    if (logout === "logout") {
      this.props.navigation.navigate('Auth');
    }
    if (logout === "AddressList") {
      this.props.navigation.push('AddressList');
    }
    if (logout === "Dietry") {
      this.props.navigation.push('DietryRequirements');
    }
    if (logout === "Yard") {
      this.props.navigation.push('Yard');
    }
  }

  //theme change function
  changeTheme() {
    if (this.props.darkmode === true) {
      let themeColors = {
        backGroundColor: "#ffffff",
        forGroundColor: "#000000",
        externalShade: "#ffffff",
      }
      this.props.changeTheme(themeColors, false)
    }
    else {
      let themeColors = {
        backGroundColor: "#121a25",
        forGroundColor: "#99ccff",
        externalShade: "#032839",
      }
      this.props.changeTheme(themeColors, true)
    }
  }

  //address eidt routing
  // _goto(object) {
  //   this.props.navigation.push('UpdateAddress', { edit: true, dataforedit: object })
  // }

  //active address
  // activeAddress(key, index) {
  //   let AllAddress = this.state.userAddress

  //   for (var i = 0; i < AllAddress.length; i++) {
  //     AllAddress[i].active = false
  //   }
  //   AllAddress[index].active = true

  //   this.setState({
  //     userAddress: AllAddress
  //   })
  // }

  //set waight unit to async
  setWaightUnit(Unit) {
    this.setState({
      waightUnit: { Metric: false, Imperial: false, }
    }, () => {
      let { waightUnit } = this.state
      let waightUnitClone = waightUnit
      waightUnitClone[Unit] = true
      this.setState({
        waightUnit: waightUnitClone
      })
      try {
        AsyncStorage.setItem('waightUnit', JSON.stringify(waightUnitClone));
      } catch (error) {
        // Error saving data
      }
      this.props.waightUnitSet(waightUnitClone)
    })
  }

  // addAddress = () => {
  //   if (this.state.userAddress.length < 10) {
  //     this.props.navigation.push('UpdateAddress')
  //   }
  //   else {
  //     Alert.alert("Limit each user to 10 addresses.")
  //   }

  // }

  render() {
    let { waightUnit } = this.state;

    return (
      <Animatable.View
        {...this._panResponder.panHandlers}
        animation={this.state.animationStyle}
        duration={300}
        style={{
          borderRightWidth: 1,
          borderRightRadius: 2,
          borderBottomWidth: 0,
          shadowColor: '#000',
          flex: 1,
          width: '80%',
          height: '100%',
          position: 'absolute',
          zIndex: 2,
        }}
      >
        {/* UpdateAddress */}
        {/* {
          (this.state.updateAddress === true) ? (
            <UpdateAddress closeModal={(data) => {
              this.setState({
                updateAddress: data
              })
            }} />
          ) : null
        } */}
        {/* ChangePassword */}
        {
          (this.state.changePassword === true) ? (
            <ChangePassword navigation={this.props.navigation} closeModal={(data) => {
              this.setState({
                changePassword: data
              })
            }} />
          ) : null
        }
        {/* Delete_Profile_Modal */}
        {
          (this.state.deleteProfileModal === true) ? (
            <DeleteProfileModal navigation={this.props.navigation} closeModal={(data) => {
              this.setState({
                deleteProfileModal: data
              })
            }} />
          ) : null
        }

        <ScrollView style={{
          flex: 1,
          backgroundColor: this.props.themeColors.backGroundColor
        }}>
          {/* User Name */}
          <View style={{ marginLeft: "5%", marginTop: 20, flexDirection: "row", }}>
            <Text style={{ fontSize: 16, color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>User Name:</Text>
            <Text style={{ marginLeft: 10, fontSize: 16, color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>{this.state.userName}</Text>
          </View>
          {/* My Yard */}
          <TouchableOpacity onPress={() => { this.openYard("Yard") }}>
            <List.Item titleStyle={{ color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }} title="My Yard" />
          </TouchableOpacity>
          {/* Messaging */}
          <TouchableOpacity >
            <List.Item titleStyle={{ color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }} title="Messaging" />
          </TouchableOpacity>
          {/* Size Unit */}
          <View>
            <List.Accordion titleStyle={{ color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }} title="Size Unit" theme={{ colors: { primary: 'red' } }}>
              <View style={{ flexDirection: "row", }}>
                <View style={{ flex: 1, }}>
                  <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
                    <Radio color={this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor} selected={true} style={{ marginLeft: 20 }} />
                    <Text style={{ marginLeft: 10, color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Metric</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1, }}>
                  <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
                    <Radio color={this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor} selected={false} style={{ marginLeft: 0 }} />
                    <Text style={{ marginLeft: 10, color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Imperial</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </List.Accordion>
          </View>
          {/* Weight Unit */}
          <View>
            <List.Accordion titleStyle={{ color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }} title="Weight Unit" theme={{ colors: { primary: '#000000' } }}>
              <View style={{ flexDirection: "row", }}>
                <View style={{ flex: 1, }}>
                  <TouchableOpacity onPress={() => { this.setWaightUnit("Metric") }} style={{ flexDirection: "row", alignItems: "center" }}>
                    <Radio color={this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor} selected={waightUnit.Metric} style={{ marginLeft: 20 }} />
                    <Text style={{ marginLeft: 10, color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Metric</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1, }}>
                  <TouchableOpacity onPress={() => { this.setWaightUnit("Imperial") }} style={{ flexDirection: "row", alignItems: "center" }}>
                    <Radio color={this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor} selected={waightUnit.Imperial} style={{ marginLeft: 0 }} />
                    <Text style={{ marginLeft: 10, color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>Imperial</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </List.Accordion>
          </View>
          {/* Discounts and Coupens */}
          <List.Accordion titleStyle={{ color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }} title="Discounts and Coupens" theme={{ colors: { primary: '#000000' } }}>
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </List.Accordion>

          {/* Address List */}
          <TouchableOpacity onPress={() => { this.openYard("AddressList") }}>
            <List.Item titleStyle={{ color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }} title="Address List" />
          </TouchableOpacity>
          
          {/* Addresses */}
          {/* <List.Accordion titleStyle={{ color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }} title="Addresses" theme={{ colors: { primary: '#000000' } }}>
            <View style={{
              width: "90%",
              marginHorizontal: "5%",
              height: 200,
            }}>
              <ScrollView>
                {
                  (this.props.userAddress && this.props.userAddress.length != 0) ? (
                    this.props.userAddress.map((key, index) => {
                      console.log(key, "KEY")
                      return (
                        <TouchableOpacity key={index}
                          onPress={() => { this.activeAddress(key, index) }}
                          onLongPress={() => this._goto(key)}
                          style={{ flex: 1, flexDirection: "row", margin: 10 }}>
                          <Radio color={this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor} selected={key.active} style={{ marginLeft: 10 }} />
                          <Text style={{ marginLeft: 10, color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>{key.flatNumber + " " + key.streetNumber + " " + key.townCity + " " + key.Country}</Text>
                        </TouchableOpacity>
                      )
                    })
                  ) : null
                }
                <TouchableOpacity style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", margin: 10, }}
                  // onPress={() => this.props.navigation.push('UpdateAddress')}
                  onPress={() => this.addAddress()}
                >
                  <Text style={{ marginLeft: 10, fontWeight: "bold", fontSize: 18, color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}>+ Add Address</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </List.Accordion> */}
          {/* Dietry */}
          <TouchableOpacity onPress={() => this.openYard("Dietry")}>
            <List.Item titleStyle={{ color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }} title="Dietry Requirements" />
          </TouchableOpacity>
          {/* Dark Mode */}
          <List.Item titleStyle={{ color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }}
            title="Dark Mode"
            right={props => (
              <Switch
                value={this.props.darkmode}
                onValueChange={() => this.changeTheme()}
              />
            )}
          />
          {/* logout */}
          <TouchableOpacity onPress={() => this.openYard("logout")}>
            <List.Item titleStyle={{ color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }} title="Logout" />
          </TouchableOpacity>
          {/* Change Password */}
          <TouchableOpacity
            onPress={() => this.setState({ changePassword: !this.state.changePassword })}
          >
            <List.Item titleStyle={{ color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }} title="Change Password" />
          </TouchableOpacity>
          {/* Delete Profile */}
          <TouchableOpacity
            onPress={() => this.setState({ deleteProfileModal: !this.state.deleteProfileModal })}
          >
            <List.Item titleStyle={{ color: this.props.darkmode === false ? "#000000" : this.props.themeColors.forGroundColor }} title="Delete Profile" />
          </TouchableOpacity>

        </ScrollView>
      </Animatable.View >
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

function mapStateToProps(state) {
  return {
    darkmode: state.root.darkmode,
    themeColors: state.root.themeColors,
    userAddress: state.root.userAddress,
    user: state.root.user,
    waightUnit: state.root.waightUnit,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeTheme: (color, drawerBolean) => {
      dispatch(changeTheme(color, drawerBolean));
    },
    waightUnitSet: (color, drawerBolean) => {
      dispatch(waightUnitSet(color, drawerBolean));
    },

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileDrawer);
