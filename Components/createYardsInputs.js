import React, { Component } from 'react';
import {
    StyleSheet,
    Text, Alert, Picker,
    View, TouchableOpacity, TextInput,
} from 'react-native';
import Textarea from 'react-native-textarea';
import { Madoka } from 'react-native-textinput-effects';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SelectImages from '../Components/SelectImages'
import { CheckBox } from 'react-native-elements';
import CustomButton from '../Components/Button'
import { connect } from 'react-redux';
import { array } from 'prop-types';

class CreateYardsInputs extends Component {
    constructor() {
        super()
        this.state = {
            isDrawer: false,
            isFilter: false,
            // checked: true,
            loader: false,
            description: "",
            phone: "",
            checked: true,
            title: "",
            address: "",
            price: "",
            weight: "",
            weightUnit: "",
            packing: false,
            flag: false,
            otherFlag: false,
            otherData: "",
            standard: {
                vegan: false, OvoVegetarian: false, LactoVegetarian: false, LactoOvoVegetarian: false, pescetarian: false
            },
            religious: {
                bahai: false, Buddhism: false, Christianity: false, Hinduism: false, Judaism: false, Islam: false
            },
            common: {
                Peanut: false, Milk: false, Egg: false, Wheat: false, Soy: false, Fish: false, Shellfish: false, Other: false,
            },
        }
        _panResponder = {};
    }
    post(catogery) {
        const { title, description, selectedImages, price, weight, address, phone, packing, common, religious, standard, weightUnit, otherData } = this.state
        let myYard = {
            title, description, selectedImages, price, weight, address, phone, packing, catogery,
            time: new Date().getTime()
        }
        if (title && price) {

            this.setState({
                loader: !this.state.loader
            })

            if (common.Other === true) {
                common[otherData] = common.Other
                delete common.Other
            }

            let subCatogeries = []
            if (catogery === "Food") {
                subCatogeries.push(standard)
                subCatogeries.push(religious)
                subCatogeries.push(common)
                myYard.subcatory = subCatogeries
            }
            var bodyFormData = new FormData();

            console.log(myYard, subCatogeries, "/////////////")
            var bodyFormData = new FormData();
            bodyFormData.append('packing', myYard.packing);
            bodyFormData.append('title', myYard.title);
            bodyFormData.append('description', myYard.description);
            bodyFormData.append('price', myYard.price);
            bodyFormData.append('address', myYard.address);
            bodyFormData.append('phone', myYard.phone);
            bodyFormData.append('categoryType', myYard.catogery);
            bodyFormData.append('userId', this.props.userInfo._id);
            bodyFormData.append('waight', myYard.weight);
            bodyFormData.append('waightUnit', weightUnit);

            if (catogery === "Food") {
                bodyFormData.append('subcatory', JSON.stringify(subCatogeries));
            }

            // console.log(selectedImages, this.state.fileSystem, "5454545")
            if (selectedImages && this.state.fileSystem === "fileSystem") {
                for (var i = 0; i < selectedImages.length; i++) {
                    bodyFormData.append('imgs', myYard.selectedImages[i]);
                }
            }

            // console.log(bodyFormData, "bodyyyyyyyyy")
            let url;
            if (this.props.editDataRecieve) {
                url = `${this.props.mainUrl}addproduct/update`
                bodyFormData.append('_id', this.props.editDataRecieve._id);
                // console.log(this.props.editDataRecieve, this.state.selectedImages.length > 0, this.state.fileSystem, "this.state.fileSystem")
                if (this.props.editDataRecieve && this.state.selectedImages && this.state.fileSystem !== "fileSystem") {
                    bodyFormData.append('productImage', JSON.stringify(this.state.selectedImages));
                }
            }
            else {
                url = `${this.props.mainUrl}addproduct/`
            }
            var options = {
                method: 'POST',
                // url: `http://192.168.10.12:3002/resetpassword/verifycode`,
                url: url,
                headers:
                {
                    contentType: 'application/json',
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                },
                data: bodyFormData
            };
            axios(options)
                .then((data) => {
                    console.log(data, "data")
                    // alert(data.data.message)
                    // alert("Your product has successfully been posted!")
                    this.Customalert("Your product has successfully been posted!")
                    this.props.navigation.push("Home")
                    this.setState({
                        loader: !this.state.loader
                    })
                }).catch((err) => {
                    let errr = JSON.parse(JSON.stringify(err))
                    // JSON.parse(errr)
                    console.log("-------err", errr)
                    alert(errr.message)
                    this.setState({
                        loader: !this.state.loader
                    })
                })
        }
        else {
            this.Customalert("Please make sure you have entered something into the mandatory fields.Title & Price")
        }
    }
    componentWillMount() {
        // console.log(this.props.editDataRecieve, "/*/sss*/*/*")
        let editDataRecieve = this.props.editDataRecieve
        if (this.props.editDataRecieve) {
            this.setState({
                title: editDataRecieve.title,
                description: editDataRecieve.description,
                editImage: editDataRecieve.productImage,
                price: editDataRecieve.price,
                weight: editDataRecieve.waight,
                address: editDataRecieve.address,
                phone: editDataRecieve.phone,
                packing: editDataRecieve.packing,
                weightUnit: editDataRecieve.waightUnit,
            })
        }
    }
    Customalert(err) {
        // alert("work")
        Alert.alert(
            '',
            err,
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: true },
        );
    }
    render() {

        let { description, isFilter, isDrawer, darkBody, packing, phone, price, weight, address, weightUnit, otherFlag, otherData, common } = this.state;
        console.log(this.props.waightUnit, "waightunit")
        return (
            <>
                <View style={{ paddingHorizontal: "5%", marginVertical: 12 }}>
                    <TextInput
                        style={{ height: 40, borderBottomColor: '#878C8A', borderBottomWidth: 1, color: this.props.darkmode === true ? this.props.themeColors.forGroundColor : "#000000" }}
                        onChangeText={title => title.length < 51 ? this.setState({ title }) : null}
                        value={this.state.title}
                        placeholder={"Title"}
                        placeholderTextColor={this.props.darkmode === false ? "grey" : this.props.themeColors.forGroundColor}

                    />
                </View>
                <View style={styles.container}>
                    <Textarea
                        containerStyle={[styles.textareaContainer, {
                            backgroundColor: this.props.darkmode === true ? this.props.themeColors.forGroundColor : 'rgba(52, 52, 52, .1)',
                        }]}
                        style={[styles.textarea, { color: this.props.darkmode === false ? this.props.themeColors.forGroundColor : "#000000" }]}
                        onChangeText={(description) => this.setState({ description })}
                        defaultValue={description}
                        maxLength={4096}
                        placeholder={'Description'}
                        underlineColorAndroid={'transparent'}
                    />
                </View>
                <View style={{ paddingHorizontal: "5%", paddingVertical: "2%" }}>
                    <SelectImages func={(selectedImages, fileSystem) => this.setState({ selectedImages, fileSystem })} editImage={this.state.editImage ? this.state.editImage : null} />
                </View>

                <View style={{ flexDirection: "row", flex: 1, paddingHorizontal: "5%", }}>
                    <View style={{ flex: 3, height: 80, justifyContent: "center" }}>
                        <TextInput
                            placeholderTextColor={this.props.darkmode === false ? "grey" : this.props.themeColors.forGroundColor}
                            keyboardType="numeric"
                            style={{ height: 40, borderBottomColor: '#878C8A', borderBottomWidth: 1, color: this.props.darkmode === true ? this.props.themeColors.forGroundColor : "#000000" }}
                            onChangeText={price => this.setState({ price })}
                            value={price.toString()}
                            defaultValue={price}
                            placeholder={"Price"}
                        />
                    </View>
                    <View style={{ flex: 3, height: 80, justifyContent: "center", marginLeft: "5%" }}>
                        <TextInput
                            placeholderTextColor={this.props.darkmode === false ? "grey" : this.props.themeColors.forGroundColor}
                            keyboardType="numeric"
                            style={{ height: 40, borderBottomColor: '#878C8A', borderBottomWidth: 1, color: this.props.darkmode === true ? this.props.themeColors.forGroundColor : "#000000" }}
                            onChangeText={phone => phone.length < 51 ? this.setState({ phone }) : null}
                            value={phone}
                            placeholder={"Phone"}
                        />
                    </View>
                </View>

                <View style={{ flexDirection: "row", flex: 1, paddingHorizontal: "5%", }}>
                    <View style={{ flex: 3, height: 30, justifyContent: "center" }}>
                        <TextInput
                            placeholderTextColor={this.props.darkmode === false ? "grey" : this.props.themeColors.forGroundColor}
                            style={{ height: 40, borderBottomColor: '#878C8A', borderBottomWidth: 1, color: this.props.darkmode === true ? this.props.themeColors.forGroundColor : "#000000" }}
                            onChangeText={address => this.setState({ address })}
                            value={address}
                            placeholder={"Address"}
                        />
                    </View>
                </View>

                <View style={{ flexDirection: "row", flex: 1, paddingHorizontal: "5%", justifyContent: "center", alignItems: "center", }}>
                    <View style={{ flex: 3, flexDirection: "row", height: 80, marginTop: 25, justifyContent: "center" }}>
                        <TextInput
                            placeholderTextColor={this.props.darkmode === false ? "grey" : this.props.themeColors.forGroundColor}
                            keyboardType="numeric"
                            style={{ height: 40, width: "100%", borderBottomColor: '#878C8A', borderBottomWidth: 1, color: this.props.darkmode === true ? this.props.themeColors.forGroundColor : "#000000" }}
                            onChangeText={weight => this.setState({ weight })}
                            value={weight}
                            defaultValue={weight}
                            placeholder={"Weight"}
                        />
                    </View>

                    <View style={{}}>
                        {/* <Picker
                            selectedValue={this.state.weightUnit}
                            style={{ marginLeft: 15, width: 100 }}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ weightUnit: itemValue })
                            }>
                            <Picker.Item color={this.props.themeColors.forGroundColor} label="Unit" value="" />
                            <Picker.Item color={this.props.themeColors.forGroundColor} label="Gram" value="Gram" />
                            <Picker.Item color={this.props.themeColors.forGroundColor} label="Kilogram" value="Kilogram" />
                            <Picker.Item color={this.props.themeColors.forGroundColor} label="Tonne" value="Tonne" />
                            <Picker.Item color={this.props.themeColors.forGroundColor} label="Stone" value="Stone" />
                            <Picker.Item color={this.props.themeColors.forGroundColor} label="Pounds" value="Pounds" />
                            <Picker.Item color={this.props.themeColors.forGroundColor} label="Ton" value="Ton" />

                        </Picker> */}

                        {
                            (this.props.waightUnit.Metric === true) ? (
                                <Picker
                                    selectedValue={this.state.weightUnit}
                                    style={{ marginLeft: 15, width: 100 }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ weightUnit: itemValue })
                                    }>
                                    <Picker.Item color={this.props.themeColors.forGroundColor} label="Unit" value="" />
                                    <Picker.Item color={this.props.themeColors.forGroundColor} label="Gram" value="Gram" />
                                    <Picker.Item color={this.props.themeColors.forGroundColor} label="Kilogram" value="Kilogram" />
                                    <Picker.Item color={this.props.themeColors.forGroundColor} label="Tonne" value="Tonne" />
                                </Picker>
                            ) : <Picker
                                selectedValue={this.state.weightUnit}
                                style={{ marginLeft: 15, width: 100 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ weightUnit: itemValue })
                                }>
                                    <Picker.Item color={this.props.themeColors.forGroundColor} label="Unit" value="" />
                                    <Picker.Item color={this.props.themeColors.forGroundColor} label="Stone" value="Stone" />
                                    <Picker.Item color={this.props.themeColors.forGroundColor} label="Pounds" value="Pounds" />
                                    <Picker.Item color={this.props.themeColors.forGroundColor} label="Ton" value="Ton" />
                                </Picker>
                        }

                    </View>
                </View>

                {(this.props.catogery === "Food" && !this.props.editDataRecieve) &&
                    <>
                        <View style={{ paddingHorizontal: "5%" }}>
                            <Text style={{ fontWeight: "bold", marginVertical: 5, color: this.props.themeColors.forGroundColor }}>Standard dietary requirement:</Text>
                            <View style={{ fontWeight: "bold", marginVertical: 5 }}>
                                <CheckBox
                                    containerStyle={{
                                        height: 30, justifyContent: 'center',
                                        backgroundColor: this.props.darkmode === true ? this.props.themeColors.forGroundColor : null
                                    }}
                                    textStyle={{ fontSize: 11 }}
                                    size={20}
                                    title="Vegan"
                                    checkedColor='#003366'
                                    checked={this.state.standard.vegan}
                                    onPress={() => {
                                        let standard = this.state.standard
                                        standard.vegan = !this.state.standard.vegan
                                        this.setState({ standard: standard })
                                    }}
                                />
                                <CheckBox
                                    containerStyle={{
                                        height: 30, justifyContent: 'center',
                                        backgroundColor: this.props.darkmode === true ? this.props.themeColors.forGroundColor : null
                                    }}
                                    textStyle={{ fontSize: 11 }}
                                    size={20}
                                    title="Ovo-Vegetarian"
                                    checkedColor='#003366'
                                    checked={this.state.standard.OvoVegetarian}
                                    onPress={() => {
                                        let standard = this.state.standard
                                        standard.OvoVegetarian = !this.state.standard.OvoVegetarian
                                        this.setState({ standard: standard })
                                    }}
                                />
                                <CheckBox
                                    containerStyle={{
                                        height: 30, justifyContent: 'center',
                                        backgroundColor: this.props.darkmode === true ? this.props.themeColors.forGroundColor : null
                                    }}
                                    textStyle={{ fontSize: 11 }}
                                    size={20}
                                    title="Lacto-Vegetarian"
                                    checkedColor='#003366'
                                    checked={this.state.standard.LactoVegetarian}
                                    onPress={() => {
                                        let standard = this.state.standard
                                        standard.LactoVegetarian = !this.state.standard.LactoVegetarian
                                        this.setState({ standard: standard })
                                    }}
                                />
                                <CheckBox
                                    containerStyle={{
                                        height: 30, justifyContent: 'center',
                                        backgroundColor: this.props.darkmode === true ? this.props.themeColors.forGroundColor : null
                                    }}
                                    textStyle={{ fontSize: 11 }}
                                    size={20}
                                    title="Lacto-Ovo Vegetarian"
                                    checkedColor='#003366'
                                    checked={this.state.standard.LactoOvoVegetarian}
                                    onPress={() => {
                                        let standard = this.state.standard
                                        standard.LactoOvoVegetarian = !this.state.standard.LactoOvoVegetarian
                                        this.setState({ standard: standard })
                                    }}
                                />
                                <CheckBox
                                    containerStyle={{
                                        height: 30, justifyContent: 'center',
                                        backgroundColor: this.props.darkmode === true ? this.props.themeColors.forGroundColor : null
                                    }} textStyle={{ fontSize: 11 }}
                                    size={20}
                                    title="Pescetarian"
                                    checkedColor='#003366'
                                    checked={this.state.standard.pescetarian}
                                    onPress={() => {
                                        let standard = this.state.standard
                                        standard.pescetarian = !this.state.standard.pescetarian
                                        this.setState({ standard: standard })
                                    }}
                                />
                            </View>
                        </View>

                        <View style={{ paddingHorizontal: "5%" }}>
                            <Text style={{ fontWeight: "bold", marginVertical: 5, color: this.props.themeColors.forGroundColor }}>Religious restrictions:</Text>
                            <View style={{ fontWeight: "bold", marginVertical: 5, }}>
                                <CheckBox
                                    containerStyle={{
                                        height: 30, justifyContent: 'center',
                                        backgroundColor: this.props.darkmode === true ? this.props.themeColors.forGroundColor : null
                                    }}
                                    textStyle={{ fontSize: 11 }}
                                    size={20}
                                    title="Bahå'i"
                                    checkedColor='#003366'
                                    checked={this.state.religious.bahai}
                                    onPress={() => {
                                        let religious = this.state.religious
                                        religious.bahai = !this.state.religious.bahai
                                        this.setState({ religious: religious })
                                    }}
                                />
                                <CheckBox
                                    containerStyle={{
                                        height: 30, justifyContent: 'center',
                                        backgroundColor: this.props.darkmode === true ? this.props.themeColors.forGroundColor : null
                                    }}
                                    textStyle={{ fontSize: 11 }}
                                    size={20}
                                    title="Buddhism"
                                    checkedColor='#003366'
                                    checked={this.state.religious.Buddhism}
                                    onPress={() => {
                                        let religious = this.state.religious
                                        religious.Buddhism = !this.state.religious.Buddhism
                                        this.setState({ religious: religious })
                                    }}
                                />
                                <CheckBox
                                    containerStyle={{
                                        height: 30, justifyContent: 'center',
                                        backgroundColor: this.props.darkmode === true ? this.props.themeColors.forGroundColor : null
                                    }}
                                    textStyle={{ fontSize: 11 }}
                                    size={20}
                                    title="Christianity"
                                    checkedColor='#003366'
                                    checked={this.state.religious.Christianity}
                                    onPress={() => {
                                        let religious = this.state.religious
                                        religious.Christianity = !this.state.religious.Christianity
                                        this.setState({ religious: religious })
                                    }}
                                />
                                <CheckBox
                                    containerStyle={{
                                        height: 30, justifyContent: 'center',
                                        backgroundColor: this.props.darkmode === true ? this.props.themeColors.forGroundColor : null
                                    }}
                                    textStyle={{ fontSize: 11 }}
                                    size={20}
                                    title="Hinduism"
                                    checkedColor='#003366'
                                    checked={this.state.religious.Hinduism}
                                    onPress={() => {
                                        let religious = this.state.religious
                                        religious.Hinduism = !this.state.religious.Hinduism
                                        this.setState({ religious: religious })
                                    }}
                                />
                                <CheckBox
                                    containerStyle={{
                                        height: 30, justifyContent: 'center',
                                        backgroundColor: this.props.darkmode === true ? this.props.themeColors.forGroundColor : null
                                    }}
                                    textStyle={{ fontSize: 11 }}
                                    size={20}
                                    title="Judaism"
                                    checkedColor='#003366'
                                    checked={this.state.religious.Judaism}
                                    onPress={() => {
                                        let religious = this.state.religious
                                        religious.Judaism = !this.state.religious.Judaism
                                        this.setState({ religious: religious })
                                    }}
                                />
                                <CheckBox
                                    containerStyle={{
                                        height: 30, justifyContent: 'center',
                                        backgroundColor: this.props.darkmode === true ? this.props.themeColors.forGroundColor : null
                                    }}
                                    textStyle={{ fontSize: 11 }}
                                    size={20}
                                    title="Islam"
                                    checkedColor='#003366'
                                    checked={this.state.religious.Islam}
                                    onPress={() => {
                                        let religious = this.state.religious
                                        religious.Islam = !this.state.religious.Islam
                                        this.setState({ religious: religious })
                                    }}
                                />
                            </View>
                        </View>

                        <View style={{ paddingHorizontal: "5%" }}>
                            <Text style={{ fontWeight: "bold", marginVertical: 5, color: this.props.themeColors.forGroundColor }}>Common food allergies:</Text>
                            <View style={{ fontWeight: "bold", marginVertical: 5 }}>
                                <CheckBox
                                    containerStyle={{
                                        height: 30, justifyContent: 'center',
                                        backgroundColor: this.props.darkmode === true ? this.props.themeColors.forGroundColor : null
                                    }}
                                    textStyle={{ fontSize: 11 }}
                                    size={20}
                                    title="Peanut"
                                    checkedColor='#003366'
                                    checked={this.state.common.Peanut}
                                    onPress={() => {
                                        let common = this.state.common
                                        common.Peanut = !this.state.common.Peanut
                                        this.setState({ common: common })
                                    }}
                                />
                                <CheckBox
                                    containerStyle={{
                                        height: 30, justifyContent: 'center',
                                        backgroundColor: this.props.darkmode === true ? this.props.themeColors.forGroundColor : null
                                    }}
                                    textStyle={{ fontSize: 11 }}
                                    size={20}
                                    title="Milk"
                                    checkedColor='#003366'
                                    checked={this.state.common.Milk}
                                    onPress={() => {
                                        let common = this.state.common
                                        common.Milk = !this.state.common.Milk
                                        this.setState({ common: common })
                                    }}
                                />
                                <CheckBox
                                    containerStyle={{
                                        height: 30, justifyContent: 'center',
                                        backgroundColor: this.props.darkmode === true ? this.props.themeColors.forGroundColor : null
                                    }}
                                    textStyle={{ fontSize: 11 }}
                                    size={20}
                                    title="Egg"
                                    checkedColor='#003366'

                                    checked={this.state.common.Egg}
                                    onPress={() => {
                                        let common = this.state.common
                                        common.Egg = !this.state.common.Egg
                                        this.setState({ common: common })
                                    }}
                                />
                                <CheckBox
                                    containerStyle={{
                                        height: 30, justifyContent: 'center',
                                        backgroundColor: this.props.darkmode === true ? this.props.themeColors.forGroundColor : null
                                    }}
                                    textStyle={{ fontSize: 11 }}
                                    size={20}
                                    title="Wheat"
                                    checkedColor='#003366'
                                    checked={this.state.common.Wheat}
                                    onPress={() => {
                                        let common = this.state.common
                                        common.Wheat = !this.state.common.Wheat
                                        this.setState({ common: common })
                                    }}
                                />
                                <CheckBox
                                    containerStyle={{
                                        height: 30, justifyContent: 'center',
                                        backgroundColor: this.props.darkmode === true ? this.props.themeColors.forGroundColor : null
                                    }}
                                    textStyle={{ fontSize: 11 }}
                                    size={20}
                                    title="Soy"
                                    checkedColor='#003366'
                                    checked={this.state.common.Soy}
                                    onPress={() => {
                                        let common = this.state.common
                                        common.Soy = !this.state.common.Soy
                                        this.setState({ common: common })
                                    }}
                                />
                                <CheckBox
                                    containerStyle={{
                                        height: 30, justifyContent: 'center',
                                        backgroundColor: this.props.darkmode === true ? this.props.themeColors.forGroundColor : null
                                    }}
                                    textStyle={{ fontSize: 11 }}
                                    size={20}
                                    title="Fish"
                                    checkedColor='#003366'
                                    checked={this.state.common.Fish}
                                    onPress={() => {
                                        let common = this.state.common
                                        common.Fish = !this.state.common.Fish
                                        this.setState({ common: common })
                                    }}
                                />
                                <CheckBox
                                    containerStyle={{
                                        height: 30, justifyContent: 'center',
                                        backgroundColor: this.props.darkmode === true ? this.props.themeColors.forGroundColor : null
                                    }}
                                    textStyle={{ fontSize: 11 }}
                                    size={20}
                                    title="Shellfish"
                                    checkedColor='#003366'
                                    checked={this.state.common.Shellfish}
                                    onPress={() => {
                                        let common = this.state.common
                                        common.Shellfish = !this.state.common.Shellfish
                                        this.setState({ common: common })
                                    }}
                                />
                                <CheckBox
                                    containerStyle={{
                                        height: 30, justifyContent: 'center',
                                        backgroundColor: this.props.darkmode === true ? this.props.themeColors.forGroundColor : null
                                    }}
                                    textStyle={{ fontSize: 11 }}
                                    size={20}
                                    title="Other"
                                    checkedColor='#003366'
                                    checked={this.state.common.Other}
                                    onPress={() => {
                                        let common = this.state.common
                                        common.Other = !this.state.common.Other
                                        this.setState({
                                            common: common,
                                            otherFlag: !this.state.otherFlag
                                        })
                                    }}
                                />
                            </View>
                            {/* {
                                (this.state.otherFlag === true) ? (
                                    <View style={{ flexDirection: "row", flex: 1, paddingHorizontal: "5%", }}>
                                        <View style={{ flex: 3, height: 30, justifyContent: "center" }}>
                                            <TextInput
                                                placeholderTextColor={this.props.darkmode === false ? "grey" : this.props.themeColors.forGroundColor}
                                                style={{ height: 40, borderBottomColor: '#878C8A', borderBottomWidth: 1, color: this.props.darkmode === true ? this.props.themeColors.forGroundColor : "#000000" }}
                                                onChangeText={otherData => this.setState({ otherData })}
                                                value={otherData}
                                                placeholder={"Other Data"}
                                            />
                                        </View>
                                    </View>
                                ) : null
                            } */}
                        </View>

                    </>
                }

                {(otherFlag === true) ? (
                    <View style={{ flexDirection: "row", flex: 1, paddingHorizontal: "8%", }}>
                        <View style={{ flex: 3, height: 30, justifyContent: "center" }}>
                            <TextInput
                                placeholderTextColor={this.props.darkmode === false ? "grey" : this.props.themeColors.forGroundColor}
                                style={{ height: 40, borderBottomColor: '#878C8A', borderBottomWidth: 1, color: this.props.darkmode === true ? this.props.themeColors.forGroundColor : "#000000" }}
                                onChangeText={otherData => this.setState({ otherData })}
                                value={otherData}
                                placeholder={"Enter manually"}
                            />
                        </View>
                    </View>
                ) : null}


                <View>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center', margin: 12 }}
                        onPress={() => this.setState({ packing: !packing })}
                    >
                        <Icon size={19} name={packing ? 'check-box-outline' : 'checkbox-blank-outline'} color={this.props.themeColors.forGroundColor} />
                        <Text style={{ fontSize: 15, color: this.props.themeColors.forGroundColor }}> Do you provide packing? </Text>
                    </TouchableOpacity>
                </View>
                <CustomButton label={'Post to Yard sales'}
                    loader={this.state.loader}
                    onClick={() => this.post(this.props.catogery)}
                    backgroundColor={'#1273de'}
                    color={'#fff'} />
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 18,
        justifyContent: 'center',
        alignItems: 'center',
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
        color: 'black',
    },
});

function mapStateToProps(state) {
    return {
        mainUrl: state.root.mainUrl,
        userInfo: state.root.user,
        themeColors: state.root.themeColors,
        darkmode: state.root.darkmode,
        waightUnit: state.root.waightUnit,
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateYardsInputs);