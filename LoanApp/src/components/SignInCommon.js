import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, Text,Platform,AsyncStorage } from 'react-native';
import { Button } from './common';


const DEVICE_WIDTH = Dimensions.get('window').width;
import{ Actions} from 'react-native-router-flux';
class SignInCommon extends Component {

  navigateLoginComponent = () => {

       AsyncStorage.getItem("isQuickAccess").then((value) => {
                 

                      if(value=='true'){
                        console.log('in dashboard quickAccess AsyncStorage');
                          Actions.CreateAccessPin();
                      }
                      else{
                       Actions.LoginComponent();
                      }
                 
        }).done();
      // this.props.navigator.push({ screen: 'DashboardComponent' });
     
  }
  navigateSignup = () => {
      // this.props.navigator.push({ screen: 'DashboardComponent' });
      Actions.SignUp();
  }
  render() {
      const { buttonStyles, textStyle } = styles;
    return (
    <View>
    <View style={{ height: 40, width: DEVICE_WIDTH - 40 }}>
    <Button onPress={this.navigateSignup} > Sign Up </Button>
    </View>

    <View >
    <TouchableOpacity style={styles.buttonStyles}
    onPress={this.navigateLoginComponent}
    >
      <Text style={styles.textStyle}>Login</Text>
    </TouchableOpacity>
    </View>
    </View>
    );
  }
}

const styles = {
  buttonStyles: {
    flex: 1,
    alignSelf: 'stretch',
    height: 40, marginTop: 10,
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#fff',
   
  },
  textStyle: {
    alignSelf: 'center',
    color:'#fff',
    backgroundColor: 'transparent',
    fontSize: 16,
      paddingTop:(Platform.OS === 'ios') ? 10 : 8,
    paddingBottom: 10,
    justifyContent: 'center', 
    alignItems: 'center', 
    fontFamily:'FuturaStd-Book'

  }
};

export default SignInCommon;
