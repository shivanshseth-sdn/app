import React, { Component } from 'react';
import { View, Image, Text,Dimensions } from 'react-native';
import intrologo from '../res/Intrologo.png';

 
const window = Dimensions.get('window');
class SignIn extends Component {

  render() {
    return (
    <View style={styles.container}>
    <View style={styles.logoContainer}>
    <Image source={intrologo} style={{ width: window.width*0.4, height: window.width*0.4 }} />
    <Text style={styles.titleStyle}> Welcome to Bankroll </Text>
    <Text style={styles.subtitleStyle}> Swipe to learn more </Text>
    </View>
    </View>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginBottom: 100
  },
  logoContainer: {
    alignItems: 'center'
  },
  titleStyle: {
    marginTop: 20,
    color: 'white',
    fontSize: 20,
    fontFamily:'FuturaStd-Book'
  },
  subtitleStyle: {
    fontSize: 12,
    color: 'white',
    marginTop: 10,
    fontFamily:'FuturaStd-Book'
  }

};


export default SignIn;
