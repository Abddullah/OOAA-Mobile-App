import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import CloseDrawer from '../../Components/closeDrawer'
import MyYardCatogeries from '../../Components/myYardCatogeries'
import ProfileDrawer from '../../Components/profileDrawer'
import Header from '../../Components/header'
import FilterDrawer from '../../Components/filterDrawer'
// import AppContainer from '../../Components/AppContainer';
class CreateYard extends Component {
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
                        title="Create Yard"
                    />
                </View>
                <ScrollView style={{ flex: 1, backgroundColor: this.props.themeColors.backGroundColor  }}>

                    {/* heading */}
                    <View style={{ alignItems: "center", padding: 10, justifyContent: "center", alignContent: "center" }}>
                        <Text style={{ fontSize: 25, fontWeight: "bold", color: "#474A48" }}>What are you offering</Text>
                    </View>

                    {/* catogeries */}
                    <MyYardCatogeries navigation={this.props.navigation} />


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
)(CreateYard);
