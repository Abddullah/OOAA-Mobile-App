import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Text, StyleSheet, ActivityIndicator, View, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import InfiniteScroll from 'react-native-infinite-scroll';
import PinsCard from '../../Components/PinsCard';

class SearchPage extends React.Component {
    constructor() {
        super()
        this.state = {
            categoryOffset: 0,
            activity: false,
            isloader: false,
            nestedCat: [],
            currentCategory: ''
        }
    }

    componentWillMount() {
        let { categoryOffset } = this.state
        this.setState({
            isloader: true
        })
        // getting all products
        let urlM = `${this.props.mainUrl}products/getallproductswithtags/${0}`
        console.log(urlM, "urlM")
        axios({
            method: 'get',
            url: urlM,
        })
            .then(result => {
                console.log(result.data.data, "DATA_FROM_API")
                let products = result.data.data
                if (products.length != 0) {
                    let tags = []
                    let j;
                    for (j = 0; j < products.length; j++) {
                        let data = products[j]
                        console.log(data, "DATAAAAAAA")
                        if (data && data[j] && data[j].tags && data[j].tags != undefined) {
                            console.log(data[j].tags[0], "TAGS")
                            let matchingTag = (tags.indexOf(data[j].tags[0]) > -1);
                            if (matchingTag === false) {
                                tags.push(data[j].tags[0])
                            }
                        }
                    }
                    for (var i = 0; i < tags.length; i++) {
                        // console.log(tags[i], "TAGS")
                        this.setState({
                            [`limit${tags[i]}`]: 4,
                            [`offset${tags[i]}`]: 4,
                            [`moreloader${tags[i]}`]: false,
                        })
                    }
                    this.setState({
                        tags: tags,
                        products: products,
                        isloader: false
                    })
                }
                else {
                    this.setState({
                        isloader: false
                    })
                }
                this.setState({
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
        for (var i = 0; i < tags.length; i++) {
            console.log(tags[i], "TAGS")
            this.setState({
                [`offset${tags[i]}`]: 4,
                categoryOffset: 0,
                nestedCat: []
            }, () => {
                this.componentWillMount()
            })
        }
    }

    _onEndReached(category, index) {
        // console.log(category, index, "category")
        //loader start
        this.setState({
            [`moreloader${category}`]: true,
        })
        //clone offset, limit , loader, flags and url
        let offsetCount = this.state[`offset${category}`]
        let limitCount = this.state[`limit${category}`]
        let moreLoad = this.state[`moreloader${category}`]
        let urlM = `${this.props.mainUrl}products/getproductcategorywiseAccTags/${category}/${offsetCount}/${limitCount}`
        // console.log(urlM, "urlM")
        if (moreLoad === false) {
            //getting data from api
            return axios({
                method: 'get',
                url: urlM,
            })
                .then(result => {
                    console.log(result.data.data, "DATA_FROM_API")
                    let responseAPI = result.data.data
                    let clonData = this.state.products[index]
                    // console.log(clonData, "CURRENT_DATA")
                    for (var i = 0; i < responseAPI.length; i++) {
                        clonData.push(responseAPI[i])
                    }
                    // console.log(clonData, "UPDATE_DATA")
                    this.setState({
                        // products: clonData,
                        [`moreloader${category}`]: false,
                        [`offset${category}`]: offsetCount + responseAPI.length,
                    })
                })
                .catch(err => {
                    let error = JSON.parse(JSON.stringify(err))
                    console.log(error, 'ERRROR', err)
                    this.setState({
                        err: error,
                        [`moreloader${category}`]: false,
                    })
                })
        }
    }

    nestedCategoryCheck(products, tags, index) {
        this.getNestedCategory(products, tags, index)
    }
    nestedCategoryBack(products, tags, index) {
        this.getNestedCategory(products, tags, index)
    }
    getNestedCategory(products, tags, index) {
        let { categoryOffset } = this.state
        let nextCategory = products[index].tags[categoryOffset + 1]
        let cloneNestedCat = this.state.nestedCat
        let isFetchMore = cloneNestedCat.length == 0 || tags === cloneNestedCat[cloneNestedCat.length - 1]
        let matchingTag = (cloneNestedCat.indexOf(products[index].tags[categoryOffset]) > -1);
        if (matchingTag === false) {
            if (products[index].tags[categoryOffset] != undefined) {
                cloneNestedCat.push(products[index].tags[categoryOffset])
            }
        }
        let matchingTag1 = (cloneNestedCat.indexOf(nextCategory) > -1);
        if (matchingTag1 === false) {
            if (nextCategory != undefined) {
                cloneNestedCat.push(nextCategory)
            }
        }

        tagIndex = cloneNestedCat.indexOf(tags)

        if (isFetchMore) {
            if (nextCategory != undefined) {
                this.setState({
                    isloader: true,
                    currentCategory: tags
                })

                // getting nested product products
                let urlM = `${this.props.mainUrl}products/getproductcategorywiseAccTags/${nextCategory}/${0}/${4}`

                axios({
                    method: 'get',
                    url: urlM,
                })
                    .then(result => {
                        let products = []
                        products.push(result.data.data)
                        console.log(result.data.data, "DATA_FROM_API", products, cloneNestedCat, tags)
                        if (products.length != 0) {
                            let tags = [nextCategory]

                            for (var i = 0; i < tags.length; i++) {
                                this.setState({
                                    [`limit${tags[i]}`]: 4,
                                    [`offset${tags[i]}`]: 4,
                                    [`moreloader${tags[i]}`]: false,
                                })
                            }

                            this.setState({
                                nestedCat: cloneNestedCat,
                                categoryOffset: categoryOffset + 1,
                                tags: tags,
                                products: products,
                                isloader: false
                            })
                        }
                        else {
                            this.setState({
                                isloader: false
                            })
                        }
                        this.setState({
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
        }
        else {
            if (index > 0) {
                let urlM = `${this.props.mainUrl}products/getproductcategorywiseAccTags/${tags}/${0}/${4}`
                axios({
                    method: 'get',
                    url: urlM,
                })
                    .then(result => {
                        let products = []
                        products.push(result.data.data)
                        cloneNestedCat.splice(tagIndex + 1, cloneNestedCat.length - tagIndex)
                        if (products.length != 0) {
                            let tags = [cloneNestedCat]
                            for (var i = 0; i < tags.length; i++) {
                                this.setState({
                                    [`limit${tags[i]}`]: 4,
                                    [`offset${tags[i]}`]: 4,
                                    [`moreloader${tags[i]}`]: false,
                                })
                            }
                            this.setState({
                                nestedCat: cloneNestedCat,
                                categoryOffset: index,
                                tags: tags,
                                products: products,
                                isloader: false
                            })
                        }
                        else {
                            this.setState({
                                isloader: false
                            })
                        }
                        this.setState({
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
            else {
                this._onRefreshSearch(this.state.tags)
            }
        }
    }

    render() {
        let { isloader, products, tags, nestedCat } = this.state
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
                                onRefresh={this._onRefreshSearch.bind(this, tags)} />
                        }
                    >
                            <View style={{ marginTop: 10 }}>
                                {
                                    (products && products != 0 && tags && tags != 0) ? (
                                        products.map((key, index) => {
                                            return (
                                                <View key={index}>
                                                    <View style={{ flexDirection: "row" }}>
                                                        {
                                                            (nestedCat.length != 0) ? (
                                                                nestedCat.map((data, index) => {
                                                                    console.log(data, 'nesting category', data, tags)
                                                                    return (
                                                                        <TouchableOpacity style={{ flexDirection: "row", }} key={index}
                                                                            onPress={() => this.nestedCategoryBack(key, data, index)}
                                                                        >
                                                                            <Text style={[styles.category_text_styling, { color: this.props.themeColors.forGroundColor, }]}>{data + " /"}</Text>
                                                                        </TouchableOpacity>
                                                                    )
                                                                })
                                                            ) : <TouchableOpacity
                                                                onPress={() => this.nestedCategoryCheck(key, tags[index], index)}
                                                            >
                                                                    <Text style={[styles.category_text_styling, { color: this.props.themeColors.forGroundColor, }]}>{tags[index]}</Text>
                                                                </TouchableOpacity>
                                                        }
                                                    </View>
                                                    
                                                    <InfiniteScroll
                                                        showsHorizontalScrollIndicator={false}
                                                        horizontal={true}
                                                        onLoadMoreAsync={this._onEndReached.bind(this, tags[index], index)}
                                                    >
                                                        {
                                                            (key.length != 0) ? (
                                                                <View style={styles.card}>
                                                                    {
                                                                        key.map((products, count) => {
                                                                            return (
                                                                                <TouchableOpacity
                                                                                    key={count}
                                                                                    onPress={() => this.props.navigate.push('ProductsRender', { key: products, category: tags[index], navigate: this.props.navigate })}
                                                                                >
                                                                                    <PinsCard themeColors={this.props.themeColors} text={products.title} img={products.productImage[0]} />
                                                                                </TouchableOpacity>
                                                                            )
                                                                        })
                                                                    }
                                                                    {
                                                                        (this.state[`moreloader${tags[index]}`] === true) ? (
                                                                            <View style={{
                                                                                justifyContent: 'center',
                                                                                alignItems: "center",
                                                                            }}>
                                                                                <ActivityIndicator size="large" color="#003266" />
                                                                            </View>
                                                                        ) : null
                                                                    }
                                                                </View>

                                                            ) : null
                                                        }
                                                    </InfiniteScroll>
                                                </View>
                                            )
                                        })
                                    ) : null
                                }
                            </View>
                        </InfiniteScroll>
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
        flex: 1, flexDirection: "row",
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)

