    import React, { Component } from 'react';
    import {TextInput , View , Text , StyleSheet , TouchableOpacity} from 'react-native'
    import Icon from 'react-native-vector-icons/FontAwesome5'
    import EIcon from 'react-native-vector-icons/MaterialCommunityIcons';
    export default CustomInput = (props) =>{
        return(
            <View>
                <View style={styles.inputView}>
                    <View style = {styles.iconView}>
                        <Icon name = {props.iconName} size = {16} color = {'#9b9b9b'} />
                    </View>
                    <TextInput {...props} style = {{width : props.leftIconName  ? '82%' : '90%' , height : 55 }}  />
                    {
                        props.leftIconName !== undefined ? 
                        <TouchableOpacity  onPress =  {()=> props.onRightIconPress()} >
                        <EIcon name = {props.leftIconName} size = {20} color = {'#9b9b9b'} />
                        </TouchableOpacity>
                            :
                            null
                    }
                </View>
                {
                    (props.errorText&&props.navigattion) ? 
                    <TouchableOpacity onPress={() => props.navigattion.navigate('ForgetPassword')}>
                        <Text style = {{textAlign : 'center' , color : '#e64f4f'}} >{props.errorText} </Text>
                    </TouchableOpacity>
                    : null
                }
            </View>
        )
    }
    const styles = StyleSheet.create({
    iconView : {width : '9%' , alignItems : 'center'},
    inputView : { marginHorizontal : '5%', borderWidth : 1 , borderColor : '#9b9b9b' , 
    height : 55 , marginVertical : 5 , borderRadius : 3 , flexDirection : 'row' , alignItems : "center"}
    })