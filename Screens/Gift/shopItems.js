import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Text, StyleSheet, ActivityIndicator, View, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import InfiniteScroll from 'react-native-infinite-scroll';
import PinsCard from '../../Components/PinsCard';
import AppContainer from "../../Components/AppContainer";
import EstablishmentCard from '../../Screens/Gift/EstablishmentCrad';

class ShopItems extends React.Component {
    constructor() {
        super()
        this.state = {
            activity: false,
            isloader: false,
        }
    }
    componentWillMount() {
        let navigate = this.props.navigation.getParam('navigate')
        let shop = this.props.navigation.getParam('key')
        let items = shop.items
        let itemsCode = []
        for (var i = 0; i < items.length; i++) {
            itemsCode.push(items[i].productId)
        }
        // console.log(itemsCode,"ITEM_CODES")
        this.setState({
            isloader: true
        })
        // getting shop items
        let urlM = `${this.props.mainUrl}products/getShopsItems/`
        var options = {
            method: 'POST',
            url: urlM,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: itemsCode
        };
        axios(options)
            .then(result => {
                // console.log(result.data.data, "DATA_FROM_API")
                let shopItems = result.data.data
                this.setState({
                    itemsCode: itemsCode,
                    shop: shop,
                    shopItems: shopItems,
                    isloader: false,
                    navigate: navigate,
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

    _onRefreshSearch() {

    }


    render() {
        let { isloader, shop, shopItems, navigate, itemsCode } = this.state
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
                    ) :
                        <AppContainer navigation={this.props.navigation}>
                            <ScrollView style={{ flex: 1, }}>
                                {
                                    (shop) ? (
                                        <Text style={[styles.category_text_styling, { color: this.props.themeColors.forGroundColor, marginTop: 10 }]}>{shop.shopeName + " / Products"}</Text>
                                    ) : null
                                }
                                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", }}>
                                    {
                                        (shopItems && shopItems.length != 0) ? (
                                            shopItems.map((key, index) => {
                                                // console.log(key, index, "INDEX")
                                                return (
                                                    <TouchableOpacity
                                                        key={index}
                                                        onPress={() => navigate.push('EstablishmentCard', { key: key, shop: shop, itemsCode: itemsCode, navigate: navigate })}
                                                    >
                                                        <PinsCard themeColors={this.props.themeColors} text={key.title} img={key.productImage[0]} />
                                                    </TouchableOpacity>
                                                )
                                            })
                                        ) : <View style={{
                                            flex: 1,
                                            justifyContent: 'center',
                                            alignItems: "center",
                                        }}>
                                                {/* <ActivityIndicator size="large" color="#003266" /> */}
                                                <Text style={{ marginTop: 10, color: "#003266" }} >No item in this shop....</Text>
                                            </View>
                                    }
                                </View>
                            </ScrollView>
                        </AppContainer>
                }
            </ >
        );
    }
}

const styles = StyleSheet.create({
    category_text_styling: {
        fontWeight: 'bold',
        fontSize: 18,
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginLeft: 6,
    },
    card: {
        flex: 1, flexDirection: "row", flexWrap: "wrap",
        // height: "100%",
        // margin
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
    }
})

function mapStateToProps(state) {
    return {
        themeColors: state.root.themeColors,
        mainUrl: state.root.mainUrl,
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopItems)

