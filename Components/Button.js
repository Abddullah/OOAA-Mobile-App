import React, { Component } from 'react'
import { TextInput, View, TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native'

export default (CustomButton = props => {
  return (
    <View style={{ alignItems: 'center',opacity:props.disable?0.3:1 }}>
      <TouchableOpacity disabled={props.disable?true:false} {...props} onPress={() => props.onClick()} style={[styles.buttonView,
      { backgroundColor: props.backgroundColor ? props.backgroundColor : null }]}>

        {
          (props.loader === true) ? (
            <ActivityIndicator style={{}} />
          ) : <Text style={[styles.btnText, { color: props.color ? props.color : null }]}> {props.label} </Text>

        }

      </TouchableOpacity>
    </View>
  )
})
const styles = StyleSheet.create({
  buttonView: {
    height: 45,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#141414',
    borderWidth: .3,
    marginVertical: 6,
    borderRadius: 5
  },
  btnText: { color: "#141414", fontSize: 17, fontWeight: "700" }
})
