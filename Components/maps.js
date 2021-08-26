import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet, ActivityIndicator, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux'

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
// import Geolocation from 'react-native-geolocation-service';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapDirection extends React.Component {
    constructor() {
        super()
        this.state = {
            location: null,
            errorMessage: null,
        }
    }

    componentWillMount() {
        if (this.props.sendLocation) {
            console.log(this.props.sendLocation, "sendLocation")
            this.setState({ coords: this.props.sendLocation });
        }
    }

    render() {
        let { coords } = this.state
        if (coords) {
            console.log(coords)
        }
        return (
            <View >
                {
                    (coords && coords.latitude && coords.longitude) ?
                        <MapView style={{ width: "99%", height: 500 }}
                            provider={PROVIDER_GOOGLE}
                            region={{
                                latitude: coords.latitude,
                                longitude: coords.longitude,
                                latitudeDelta: LATITUDE_DELTA,
                                longitudeDelta: LONGITUDE_DELTA,
                            }}
                        >
                            <Marker draggable={false}
                                coordinate={
                                    {
                                        latitude: coords.latitude,
                                        longitude: coords.longitude,
                                        latitudeDelta: LATITUDE_DELTA,
                                        longitudeDelta: LONGITUDE_DELTA,
                                    }
                                }
                            >
                            </Marker>
                        </MapView> : <MapView style={{ width: "99%", height: 500 }}
                            provider={PROVIDER_GOOGLE}
                            region={{
                                latitude: 37.78825,
                                longitude: -122.4324,
                                latitudeDelta: LATITUDE_DELTA,
                                longitudeDelta: LONGITUDE_DELTA,
                            }}
                        >
                        </MapView>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 500,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

const mapStateToProps = state => {
    return {
        // isLoader: state.root.isLoader,
    };
};


function mapDispatchToProps(dispatch) {
    return ({
        // userAuth: (Email, Password) => {
        //     dispatch(userAction(Email, Password));
        // }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(MapDirection);



