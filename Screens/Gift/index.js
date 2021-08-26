import React, { Component } from 'react';
import {
  Text,
  SafeAreaView,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import EstablishmentList from '../../Screens/Gift/EstablishmentList';
import EstablishmentCrad from '../../Screens/Gift/EstablishmentCrad';
import { ScrollView } from 'react-native-gesture-handler';
import { setUserLocation } from '../../store/action/action';

class Gift extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentWillMount() {
    this.allowLocation()
  }
  componentDidMount() {
    this.allowLocation()
  }
  allowLocation = async () => {
    // Instead of navigator.geolocation, just use Geolocation.
    await Geolocation.getCurrentPosition(
      (position) => {
        if (position) {
          console.log(position, "USER_CURRENT_LOCATION")
          this.props.setUserLocation(position.coords)
          this.setState({
            coords: position.coords
          })
        }
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message, "66666");
      },
      { enableHighAccuracy: true, timeout: 25000, maximumAge: 10000, }
    );
  }


  render() {
    let { coords } = this.state
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: this.props.themeColors.backGroundColor }}>

        {
          coords ?
            <EstablishmentList navigate={this.props.navigate} coords={coords} />
            :
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1
            }}>
              <Text>Turn on device location to see the Establishments</Text>
            </View>
        }

        {/* <EstablishmentList navigate={this.props.navigate} /> */}

        {/* <ScrollView>
          <EstablishmentCrad />
        </ScrollView> */}

      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    themeColors: state.root.themeColors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUserLocation: (coords) => {
      dispatch(setUserLocation(coords))
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Gift);
