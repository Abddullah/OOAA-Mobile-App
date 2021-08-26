import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View, TouchableOpacity, TextInput,
    ScrollView,
} from 'react-native';
import Textarea from 'react-native-textarea';
import { Madoka } from 'react-native-textinput-effects';
import { connect } from 'react-redux';
import { Item, Input, Label } from 'native-base';
import CloseDrawer from '../../Components/closeDrawer'
import MyYardCatogeries from '../../Components/myYardCatogeries'
import ProfileDrawer from '../../Components/profileDrawer'
import Header from '../../Components/header'
import FilterDrawer from '../../Components/filterDrawer'
import CreateYardsInputs from '../../Components/createYardsInputs'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import RangeSlider from 'rn-range-slider';


// import { Input } from 'react-native-elements';
// import AppContainer from '../../Components/AppContainer';
class IncludeDetails extends Component {
    constructor() {
        super();
        this.state = {
            quantity: 1,
            isDrawer: false,
            isFilter: false,
            checked: true,
            description: "ss",
            phone: "",
            address: "",
            price: "0",
            weight: "0",
            packing: false,
            flag: false,
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
    componentWillMount() {
        let editDataRecieve = this.props.navigation.getParam()
    }
    render() {
        let catogery = this.props.navigation.getParam('catogery');
        let editDataRecieve = this.props.navigation.getParam('fullItemDataForEdit');

        let { description, isFilter, isDrawer, darkBody, packing, phone, price, weight, address } = this.state;
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
                        // title="Include Some Details"
                        title={"What are you trying to sell?"}
                    />
                </View>
                <ScrollView style={{ flex: 1, backgroundColor: this.props.themeColors.backGroundColor }}>
                    <CreateYardsInputs navigation={this.props.navigation} catogery={catogery} editDataRecieve={editDataRecieve} />
                </ScrollView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 18,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:"pink"
    },
    textareaContainer: {
        height: 180,
        padding: 5,
        backgroundColor: 'rgba(52, 52, 52, .1)',
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        color: '#878C8A',
    },
});

function mapStateToProps(state) {
    return {
        themeColors: state.root.themeColors,
        darkmode: state.root.darkmode,
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(IncludeDetails);
