import React, { Component } from 'react';
import {
  Image,
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  SafeAreaView,
  Item,
  Icon,
  Button,
  Input,
  TextInput,
  View,
  PanResponder,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Content, Tab, Tabs, Container } from 'native-base';
import { connect } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import CloseDrawer from '../../Components/closeDrawer'
import ProfileDrawer from '../../Components/profileDrawer'
import FilterDrawer from '../../Components/filterDrawer'
// import AppContainer from '../../Components/AppContainer';
class DietaryRequirements extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
      isDrawer: false,
      isFilter: false,
      checked: true,
    };
    _panResponder = {};
  }
  animateParent(fals) {
    setTimeout(() => {
      this.setState({
        isDrawer: false, isFilter: false
      })
    }, 250);
  }
  render() {

    let { standard, relegious, common, isFilter, isDrawer, darkBody } = this.state;
    let logo = require('../../Assets/OOAAlogo.jpg');
    var { height, width } = Dimensions.get('window');
    return (
      <>
        {/* body */}



        {((isDrawer) && <CloseDrawer func={() => this.setState({ isDrawer: !isDrawer })} />)}
        {(isDrawer && <ProfileDrawer animationStyle="fadeInLeftBig" animateParent={this.animateParent.bind(this)} navigation={this.props.navigation} />)}
        {(isFilter && <FilterDrawer animationStyle="fadeInRightBig" animateParent={this.animateParent.bind(this)} navigation={this.props.navigation} />)}
        {((isFilter) && <CloseDrawer func={() => this.setState({ isFilter: !isFilter })} right={isFilter} />)}
        <View style={{}}>
          <Header
            darkBody={() => { this.setState({ darkBody: !darkBody }) }}
            func2={() => { this.setState({ isFilter: !isFilter }) }}
            func={() => { this.setState({ isDrawer: !isDrawer }) }}
          />
        </View>

        <ScrollView style={{ flex: 1 }}>
          <View style={{ borderBottomWidth: 0.3, borderBottomColor: '#9b9b9b' }}>
            <TouchableOpacity
              onPress={() => this.setState({ standard: !standard })}
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View
                style={{
                  paddingHorizontal: 16,
                  height: 50,
                  justifyContent: 'center',
                }}>
                <Text style={{ fontSize: 15, color: '#9b9b9b' }}>
                  Standard dietary requirement
                </Text>
              </View>
              <View
                style={{
                  paddingHorizontal: 16,
                  height: 50,
                  justifyContent: 'center',
                }}>
                <AntDesign
                  name={standard ? 'down' : 'right'}
                  style={{ color: '#9b9b9b', fontSize: 21 }}
                />
              </View>
            </TouchableOpacity>

            {standard && (
              <Animatable.View
                animation={'bounceInRight'}
                duration={800}
                style={{
                  width: '80%',
                  marginHorizontal: 15,
                  margin: 5,
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.18,
                  shadowRadius: 1.0,
                  elevation: 1,
                  backgroundColor: '#fff',
                }}>
                <CheckBox
                  containerStyle={{ height: 30, justifyContent: 'center' }}
                  textStyle={{ fontSize: 11 }}
                  size={20}
                  title="Vegan"
                  checked={this.state.checked}
                  onPress={() => this.setState({ checked: !this.state.checked })}
                />
                <CheckBox
                  containerStyle={{ height: 30, justifyContent: 'center' }}
                  textStyle={{ fontSize: 11 }}
                  size={20}
                  title="Ovo-Vegetarian"
                  checked={this.state.checked}
                  onPress={() => this.setState({ checked: !this.state.checked })}
                />
                <CheckBox
                  containerStyle={{ height: 30, justifyContent: 'center' }}
                  textStyle={{ fontSize: 11 }}
                  size={20}
                  title="Lacto-Vegetarian"
                  checked={this.state.checked}
                  onPress={() => this.setState({ checked: !this.state.checked })}
                />
                <CheckBox
                  containerStyle={{ height: 30, justifyContent: 'center' }}
                  textStyle={{ fontSize: 11 }}
                  size={20}
                  title="Lacto-Ovo Vegetarian"
                  checked={this.state.checked}
                  onPress={() => this.setState({ checked: !this.state.checked })}
                />
                <CheckBox
                  containerStyle={{ height: 30, justifyContent: 'center' }}
                  textStyle={{ fontSize: 11 }}
                  size={20}
                  title="Pescetarian"
                  checked={this.state.checked}
                  onPress={() => this.setState({ checked: !this.state.checked })}
                />
              </Animatable.View>
            )}
          </View>

          <View style={{ borderBottomWidth: 0.3, borderBottomColor: '#9b9b9b' }}>
            <TouchableOpacity
              onPress={() => this.setState({ relegious: !relegious })}
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View
                style={{
                  paddingHorizontal: 16,
                  height: 50,
                  justifyContent: 'center',
                }}>
                <Text style={{ fontSize: 15, color: '#9b9b9b' }}>
                  Religious restrictions
                </Text>
              </View>
              <View
                style={{
                  paddingHorizontal: 16,
                  height: 50,
                  justifyContent: 'center',
                }}>
                <AntDesign
                  name={relegious ? 'down' : 'right'}
                  style={{ color: '#9b9b9b', fontSize: 21 }}
                />
              </View>
            </TouchableOpacity>
            {relegious && (
              <Animatable.View
                animation={'bounceInRight'}
                duration={800}
                style={{
                  width: '80%',
                  marginHorizontal: 15,
                  margin: 5,
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.18,
                  shadowRadius: 1.0,
                  elevation: 1,
                  backgroundColor: '#fff',
                }}>
                <CheckBox
                  containerStyle={{ height: 30, justifyContent: 'center' }}
                  textStyle={{ fontSize: 11 }}
                  size={20}
                  title="Bahå'i"
                  checked={this.state.checked}
                  onPress={() => this.setState({ checked: !this.state.checked })}
                />
                <CheckBox
                  containerStyle={{ height: 30, justifyContent: 'center' }}
                  textStyle={{ fontSize: 11 }}
                  size={20}
                  title="Buddhism"
                  checked={this.state.checked}
                  onPress={() => this.setState({ checked: !this.state.checked })}
                />
                <CheckBox
                  containerStyle={{ height: 30, justifyContent: 'center' }}
                  textStyle={{ fontSize: 11 }}
                  size={20}
                  title="Christianity"
                  checked={this.state.checked}
                  onPress={() => this.setState({ checked: !this.state.checked })}
                />
                <CheckBox
                  containerStyle={{ height: 30, justifyContent: 'center' }}
                  textStyle={{ fontSize: 11 }}
                  size={20}
                  title="Hinduism"
                  checked={this.state.checked}
                  onPress={() => this.setState({ checked: !this.state.checked })}
                />
                <CheckBox
                  containerStyle={{ height: 30, justifyContent: 'center' }}
                  textStyle={{ fontSize: 11 }}
                  size={20}
                  title="Judaism"
                  checked={this.state.checked}
                  onPress={value =>
                    this.setState({ checked: !this.state.checked })
                  }
                />
                <CheckBox
                  containerStyle={{ height: 30, justifyContent: 'center' }}
                  textStyle={{ fontSize: 11 }}
                  size={20}
                  title="Islam"
                  checked={this.state.checked}
                  onPress={value =>
                    this.setState({ checked: !this.state.checked })
                  }
                />
              </Animatable.View>
            )}
          </View>
          <View style={{ borderBottomWidth: 0.3, borderBottomColor: '#9b9b9b' }}>
            <TouchableOpacity
              onPress={() => this.setState({ common: !common })}
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View
                style={{
                  paddingHorizontal: 16,
                  height: 50,
                  justifyContent: 'center',
                }}>
                <Text style={{ fontSize: 15, color: '#9b9b9b' }}>
                  Common food allergies
                </Text>
              </View>
              <View
                style={{
                  paddingHorizontal: 16,
                  height: 50,
                  justifyContent: 'center',
                }}>
                <AntDesign
                  name={common ? 'down' : 'right'}
                  style={{ color: '#9b9b9b', fontSize: 21 }}
                />
              </View>
            </TouchableOpacity>
            {common && (
              <Animatable.View
                animation={'bounceInRight'}
                duration={800}
                style={{
                  width: '80%',
                  marginHorizontal: 15,
                  margin: 5,
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.18,
                  shadowRadius: 1.0,
                  elevation: 1,
                  backgroundColor: '#fff',
                }}>
                <CheckBox
                  containerStyle={{ height: 30, justifyContent: 'center' }}
                  textStyle={{ fontSize: 11 }}
                  size={20}
                  title="Peanut"
                  checked={this.state.checked}
                  onPress={() => this.setState({ checked: !this.state.checked })}
                />
                <CheckBox
                  containerStyle={{ height: 30, justifyContent: 'center' }}
                  textStyle={{ fontSize: 11 }}
                  size={20}
                  title="Milk"
                  checked={this.state.checked}
                  onPress={() => this.setState({ checked: !this.state.checked })}
                />
                <CheckBox
                  containerStyle={{ height: 30, justifyContent: 'center' }}
                  textStyle={{ fontSize: 11 }}
                  size={20}
                  title="Egg"
                  checked={this.state.checked}
                  onPress={() => this.setState({ checked: !this.state.checked })}
                />
                <CheckBox
                  containerStyle={{ height: 30, justifyContent: 'center' }}
                  textStyle={{ fontSize: 11 }}
                  size={20}
                  title="Wheat"
                  checked={this.state.checked}
                  onPress={() => this.setState({ checked: !this.state.checked })}
                />
                <CheckBox
                  containerStyle={{ height: 30, justifyContent: 'center' }}
                  textStyle={{ fontSize: 11 }}
                  size={20}
                  title="Soy"
                  checked={this.state.checked}
                  onPress={() => this.setState({ checked: !this.state.checked })}
                />
                <CheckBox
                  containerStyle={{ height: 30, justifyContent: 'center' }}
                  textStyle={{ fontSize: 11 }}
                  size={20}
                  title="Fish"
                  checked={this.state.checked}
                  onPress={() => this.setState({ checked: !this.state.checked })}
                />
                <CheckBox
                  containerStyle={{ height: 30, justifyContent: 'center' }}
                  textStyle={{ fontSize: 11 }}
                  size={20}
                  title="Shellfish"
                  checked={this.state.checked}
                  onPress={() => this.setState({ checked: !this.state.checked })}
                />
                <CheckBox
                  containerStyle={{ height: 30, justifyContent: 'center' }}
                  textStyle={{ fontSize: 11 }}
                  size={20}
                  title="Other - Enter manually"
                  checked={this.state.checked}
                  onPress={() => this.setState({ checked: !this.state.checked })}
                />
              </Animatable.View>
            )}
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  buttonView: {
    height: 30,
    // width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(52, 52, 52, 1)',
    backgroundColor: 'rgba(25, 77, 51, 0.6)',
    borderWidth: 0.3,
    marginVertical: 6,
    borderRadius: 5,
  },
  btnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DietaryRequirements);
