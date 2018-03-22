import React,{Component} from 'react';
import {
	Image,
	StyleSheet,
	Navigator,
	View,
  Text,
  Button,
	TouchableOpacity,
  ScrollView,
  Platform
} from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import{ Actions} from 'react-native-router-flux';
import * as Progress from 'react-native-progress';
import Communications from 'react-native-communications';

class Support extends Component{





    render(){
      return(
        <Image style={styles.container}
          source={require('../res/bg.png')}>
          <ScrollView>
            <View>
            <View style={styles.linkAccountImageContainer}>
            <Image
              source={require('../res/conatct_logo.png')}>
            </Image>
            </View>

            <Text style={styles.forgotDetailText}>Questions, comments, or issues? Please reach out to us via email or phone by clicking the buttons below.</Text>

            <View style={styles.buttonViewStyle}>

                  <TouchableOpacity style={styles.buttonLogin}
                    onPress={() => Communications.phonecall('3059281260', true)}
                  >
                  <Text style={styles.buttonTextStyle}>Call Support</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonViewStyle}>

                  <TouchableOpacity style={styles.buttonLogin}
                    onPress={() => Communications.email(['support@bankroll.co'],null,null,'Support','')}
                  >
                  <Text style={styles.buttonTextStyle}>Email Support</Text>
              </TouchableOpacity>
            </View>


            </View>
          </ScrollView>
        </Image>
      );
    }
}
export default Support;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    justifyContent:'center',
    resizeMode: 'cover',
    paddingTop: 120
  },
  forgotText: {
    color:'#ffffff',
    fontSize: 20,
    textAlign: 'center',
    paddingTop:20,
     fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'
  },
  forgotDetailText: {
    color:'#ffffff',
    fontSize: 16,
    textAlign: 'center',
    paddingTop:40,
    paddingLeft:30,
    paddingRight:30,
      fontFamily:'FuturaStd-Book',
    paddingBottom:10,
    backgroundColor:'transparent',
      lineHeight:(Platform.OS === 'ios') ? 0 : 25,

  },

  buttonViewStyle:{
    paddingTop:40,
    marginLeft: 20,
    marginRight:20,
    alignSelf: 'stretch',
  },

  buttonLogin:{
    height: 45,
    borderRadius: 5,
     paddingTop:(Platform.OS === 'ios') ? 5 : 0,
      justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#7ACBBC'},

  buttonTextStyle:{
        color:'#ffffff',
        fontSize: 18,
        alignSelf: 'center',
          fontFamily:'FuturaStd-Book',
  },
  linkAccountImageContainer:{

    alignItems:'center'
  }

});
