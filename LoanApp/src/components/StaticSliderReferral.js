import React, { Component } from 'react';
import { View, Image, Text,Platform ,Dimensions} from 'react-native';
import general from '../res/referral_general.png';
const window = Dimensions.get('window');
class StaticSliderReferral extends Component {

  render() {
    return (
    <View style={styles.container}>
    <View style={styles.logoContainer}>
    <Image source={general} style={{ width: 120, height: 245 }} />
    <Text style={styles.titleStyle}>Cash. Made Easy.</Text>
    <Text style={styles.subtitleStyle}>Bankroll allows you to borrow up to $500, deposited directly to your checking account. No pay-stubs required and no impact to your FICO score.</Text>
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
    marginTop: 40,
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    fontFamily:'FuturaStd-Book'
  },
  subtitleStyle: {
    fontSize: 15,
    color: 'white',
    marginTop: 10,
    paddingLeft:10,
    paddingRight:10,
    textAlign: 'center',
    fontFamily:'FuturaStd-Book',
    lineHeight:(Platform.OS === 'ios') ? 0 : 25,
  }

};


export default StaticSliderReferral;
