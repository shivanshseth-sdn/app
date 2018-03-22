import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

const Header = (props) =>{
  return (
    <View style={styles.viewStyle}>
    <Text style={styles.textStyle}>{props.headertext}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 10,
    shadowColor: 'black',
    elevation: 10,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20,
  }
});

export { Header };
