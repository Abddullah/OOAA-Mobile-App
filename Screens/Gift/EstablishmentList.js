import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Text, StyleSheet, ActivityIndicator, View, ScrollView, RefreshControl, TouchableOpacity, Image } from 'react-native';
import InfiniteScroll from 'react-native-infinite-scroll';
import PinsCard from '../../Components/PinsCard';
import AntDesign from 'react-native-vector-icons/AntDesign';

class EstablishmentList extends React.Component {
    constructor() {
        super()
        this.state = {
            activity: false,
            isloader: false,
        }
    }
    componentWillMount() {
        this.setState({
            isloader: true
        })
        // getting all shops according to location
        // let urlM = `${this.props.mainUrl}addservice/getService/${this.props.user._id}`
        let urlM = `${this.props.mainUrl}addservice/getService/5dd53c99284c720017365646`
        // console.log(urlM, "urlM")
        axios({
            method: 'get',
            url: urlM,
        })
            .then(result => {
                console.log(result.data.data, "DATA_FROM_API")
                let services = result.data.data
                let shopsUnder1Month = []
                let shopsOpen = []
                let shopsClose = []
                let shopsGold = []

                for (var i = 0; i < services.length; i++) {
                    let key = services[i]
                    var createTimePlus1monthTime = key.createdAt + 2.628e+9
                    var currentTime = new Date().getTime();
                    if (currentTime < createTimePlus1monthTime) {
                        // console.log(key, "Under1month")
                        shopsUnder1Month.push(key)
                    }
                    else {
                        if (key.shopeTime.opening < new Date().toLocaleTimeString('en-GB') && key.shopeTime.closing > new Date().toLocaleTimeString('en-GB')) {
                            // console.log(key, "OPEN_After1month")
                            if (key.catogery === "Gold") {
                                shopsGold.push(key)
                            }
                            else {
                                shopsOpen.push(key)
                            }
                        }
                        else {
                            // console.log(key, "CLOSE_After1month")
                            shopsClose.push(key)
                        }
                    }
                }
                this.setState({
                    shopsUnder1Month: shopsUnder1Month,
                    shopsOpen: shopsOpen,
                    shopsClose: shopsClose,
                    shopsGold: shopsGold,
                    isloader: false
                })
            })
            .catch(err => {
                let error = JSON.parse(JSON.stringify(err))
                console.log(error, 'ERRROR', err)
                this.setState({
                    err: error,
                    isloader: false
                })
            })
    }

    _onRefreshSearch(tags) {
        this.componentWillMount()
    }

    _onEndReached(category, index) {

    }

    render() {
        let { isloader, shopsUnder1Month, shopsOpen, shopsClose, shopsGold } = this.state
        // console.log(this.props.user, "USER")
        return (
            <>
                {
                    (isloader === true) ? (
                        <View style={{
                            height: "100%",
                            justifyContent: 'center',
                            alignItems: "center",
                        }}>
                            <ActivityIndicator size="large" color="#003266" />
                            <Text style={{ marginTop: 10, color: "#003266" }} >Loading....</Text>
                        </View>
                    ) : <InfiniteScroll
                        showsHorizontalScrollIndicator={false}
                        horizontal={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.activity}
                                onRefresh={this._onRefreshSearch.bind(this)}
                            />
                        }
                    >

                            {/* Open shops */}
                            {
                                (shopsOpen && shopsOpen != 0) ? (
                                    <Text style={[styles.category_text_styling, { color: this.props.themeColors.forGroundColor, }]}>Open Shops</Text>
                                ) : null
                            }
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flex: 1, flexDirection: "row", marginTop: 10, }}>
                                {
                                    (shopsOpen && shopsOpen != 0) ? (
                                        shopsOpen.map((key, index) => {
                                            return (
                                                <TouchableOpacity key={index}
                                                    style={[styles.card2ndOption, {
                                                        backgroundColor: this.props.themeColors ? this.props.themeColors.backGroundColor : "red",
                                                    }]}
                                                    onPress={() => this.props.navigate.push('ShopItems', { key: key, navigate: this.props.navigate })}
                                                >
                                                    <Image
                                                        resizeMode="cover"
                                                        source={require("../../Assets/shopIcons/shopBlue.png")}
                                                        style={{ width: 140, height: 120 }}
                                                    />
                                                    <Text
                                                        style={[styles.card_text, {
                                                            color: this.props.themeColors ? this.props.themeColors.forGroundColor : "red",
                                                        }]}
                                                    >{key.shopeName}</Text>
                                                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", height: 45, }}>
                                                        <View
                                                            style={{ flexDirection: "row" }}
                                                        >
                                                            {[0, 1, 2, 3].map((e, index) => (
                                                                <AntDesign
                                                                    name="star"
                                                                    style={{ fontSize: 15, color: '#ffbb33' }}
                                                                    key={index}
                                                                />
                                                            ))}
                                                        </View>
                                                        <View style={{ width: "50%", justifyContent: "center", alignItems: "center", }}>
                                                            <Text
                                                                style={[styles.card_text, {
                                                                    color: this.props.themeColors ? this.props.themeColors.forGroundColor : "red",
                                                                }]}
                                                            >{key.shopeTime.opening}</Text>
                                                            <Text
                                                                style={[styles.card_text, {
                                                                    color: this.props.themeColors ? this.props.themeColors.forGroundColor : "red",
                                                                }]}
                                                            >{key.shopeTime.closing}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })
                                    ) : null
                                }
                            </ScrollView>

                            {/* Close shops */}
                            {
                                (shopsClose && shopsClose != 0) ? (
                                    <Text style={[styles.category_text_styling, { color: this.props.themeColors.forGroundColor, }]}>Close Shops</Text>
                                ) : null
                            }
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flex: 1, flexDirection: "row", marginTop: 10, }}>
                                {
                                    (shopsClose && shopsClose != 0) ? (
                                        shopsClose.map((key, index) => {
                                            return (
                                                <TouchableOpacity key={index}
                                                    style={[styles.card2ndOption, {
                                                        backgroundColor: this.props.themeColors ? this.props.themeColors.backGroundColor : "red",
                                                    }]}
                                                    onPress={() => this.props.navigate.push('ShopItems', { key: key, navigate: this.props.navigate })}
                                                >
                                                    <Image
                                                        resizeMode="cover"
                                                        source={require("../../Assets/shopIcons/shopGrey.png")}
                                                        style={{ width: 140, height: 120 }}
                                                    />
                                                    <Text
                                                        style={[styles.card_text, {
                                                            color: this.props.themeColors ? this.props.themeColors.forGroundColor : "red",
                                                        }]}
                                                    >{key.shopeName}</Text>
                                                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", height: 45, }}>
                                                        <View
                                                            style={{ flexDirection: "row" }}
                                                        >
                                                            {[0, 1, 2, 3].map((e, index) => (
                                                                <AntDesign
                                                                    name="star"
                                                                    style={{ fontSize: 15, color: '#ffbb33' }}
                                                                    key={index}
                                                                />
                                                            ))}
                                                        </View>
                                                        <View style={{ width: "50%", justifyContent: "center", alignItems: "center", }}>
                                                            <Text
                                                                style={[styles.card_text, {
                                                                    color: this.props.themeColors ? this.props.themeColors.forGroundColor : "red",
                                                                }]}
                                                            >{key.shopeTime.opening}</Text>
                                                            <Text
                                                                style={[styles.card_text, {
                                                                    color: this.props.themeColors ? this.props.themeColors.forGroundColor : "red",
                                                                }]}
                                                            >{key.shopeTime.closing}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })
                                    ) : null
                                }
                            </ScrollView>

                            {/* Gold shops */}
                            {
                                (shopsGold && shopsGold != 0) ? (
                                    <Text style={[styles.category_text_styling, { color: this.props.themeColors.forGroundColor, }]}>Gold Shops</Text>
                                ) : null
                            }
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flex: 1, flexDirection: "row", marginTop: 10, }}>
                                {
                                    (shopsGold && shopsGold != 0) ? (
                                        shopsGold.map((key, index) => {
                                            return (
                                                <TouchableOpacity key={index}
                                                    style={[styles.card2ndOption, {
                                                        backgroundColor: this.props.themeColors ? this.props.themeColors.backGroundColor : "red",
                                                    }]}
                                                    onPress={() => this.props.navigate.push('ShopItems', { key: key, navigate: this.props.navigate })}
                                                >
                                                    <Image
                                                        resizeMode="cover"
                                                        source={require("../../Assets/shopIcons/shopGold.png")}
                                                        style={{ width: 140, height: 120 }}
                                                    />
                                                    <Text
                                                        style={[styles.card_text, {
                                                            color: this.props.themeColors ? this.props.themeColors.forGroundColor : "red",
                                                        }]}
                                                    >{key.shopeName}</Text>
                                                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", height: 45, }}>
                                                        <View
                                                            style={{ flexDirection: "row" }}
                                                        >
                                                            {[0, 1, 2, 3].map((e, index) => (
                                                                <AntDesign
                                                                    name="star"
                                                                    style={{ fontSize: 15, color: '#ffbb33' }}
                                                                    key={index}
                                                                />
                                                            ))}
                                                        </View>
                                                        <View style={{ width: "50%", justifyContent: "center", alignItems: "center", }}>
                                                            <Text
                                                                style={[styles.card_text, {
                                                                    color: this.props.themeColors ? this.props.themeColors.forGroundColor : "red",
                                                                }]}
                                                            >{key.shopeTime.opening}</Text>
                                                            <Text
                                                                style={[styles.card_text, {
                                                                    color: this.props.themeColors ? this.props.themeColors.forGroundColor : "red",
                                                                }]}
                                                            >{key.shopeTime.closing}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })
                                    ) : null
                                }
                            </ScrollView>

                            {/* New shops */}
                            {
                                (shopsUnder1Month && shopsUnder1Month != 0) ? (
                                    <Text style={[styles.category_text_styling, { color: this.props.themeColors.forGroundColor, }]}>New Shops</Text>
                                ) : null
                            }
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flex: 1, flexDirection: "row", marginTop: 10, }}>
                                {
                                    (shopsUnder1Month && shopsUnder1Month != 0) ? (
                                        shopsUnder1Month.map((key, index) => {
                                            return (
                                                <TouchableOpacity key={index}
                                                    style={[styles.card2ndOption, {
                                                        backgroundColor: this.props.themeColors ? this.props.themeColors.backGroundColor : "red",
                                                    }]}
                                                    onPress={() => this.props.navigate.push('ShopItems', { key: key, navigate: this.props.navigate })}
                                                >
                                                    <Image
                                                        resizeMode="cover"
                                                        source={require("../../Assets/shopIcons/shopRed.png")}
                                                        style={{ width: 140, height: 120 }}
                                                    />
                                                    <Text
                                                        style={[styles.card_text, {
                                                            color: this.props.themeColors ? this.props.themeColors.forGroundColor : "red",
                                                        }]}
                                                    >{key.shopeName}</Text>
                                                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", height: 45, }}>
                                                        <View
                                                            style={{ flexDirection: "row" }}
                                                        >
                                                            {[0, 1, 2, 3].map((e, index) => (
                                                                <AntDesign
                                                                    name="star"
                                                                    style={{ fontSize: 15, color: '#ffbb33' }}
                                                                    key={index}
                                                                />
                                                            ))}
                                                        </View>
                                                        <View style={{ width: "50%", justifyContent: "center", alignItems: "center", }}>
                                                            <Text
                                                                style={[styles.card_text, {
                                                                    color: this.props.themeColors ? this.props.themeColors.forGroundColor : "red",
                                                                }]}
                                                            >{key.shopeTime.opening}</Text>
                                                            <Text
                                                                style={[styles.card_text, {
                                                                    color: this.props.themeColors ? this.props.themeColors.forGroundColor : "red",
                                                                }]}
                                                            >{key.shopeTime.closing}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })
                                    ) : null
                                }
                            </ScrollView>

                        </InfiniteScroll>
                }
            </ >
        );
    }
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
        fontSize: 13,
        margin: 0
    },
    category_text_styling: {
        fontWeight: 'bold',
        fontSize: 18,
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginLeft: 6,
    },
    card: {
        flex: 1, flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    }
})

function mapStateToProps(state) {
    return {
        themeColors: state.root.themeColors,
        mainUrl: state.root.mainUrl,
        user: state.root.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(EstablishmentList)

