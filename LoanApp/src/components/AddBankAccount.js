import React,{Component} from 'react';
import Dimensions from 'Dimensions';
import { connect } from 'react-redux';
import {
	Image,
	StyleSheet,
	Navigator,
	View,
  Text,
  Button,
	TouchableOpacity,
  ScrollView,
	AsyncStorage,
	Alert,
  Platform
} from 'react-native';

import FloatingLabel from 'react-native-floating-labels';
import{ Actions} from 'react-native-router-flux';
import * as Progress from 'react-native-progress';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class AddBankAccount extends Component{


		constructor(props){
		 super(props)
		 this.state = {
									 errorMsg: '',
									 resData:'',
									 code:'',
									 msg:''

									}
		}

		componentWillReceiveProps(nextProps) {

			
		}
		componentDidUpdate() {

			
		}
    componentWillMount(){
    
    }

    onConnectClick=()=>{
			Actions.Congrats();
		}

		connectAccount(){


				Actions.PlaidView();


		}


    render(){
      return(
        <Image style={styles.container}
          source={require('../res/bg.png')}>
       
          <ScrollView contentContainerStyle={{paddingBottom:30}}>
            <View>
             <View style={{alignItems:'center'}}>
             <Progress.Bar progress={1.0} width={DEVICE_WIDTH*0.9} unfilledColor={'#FFFFFF'} color={'#7ACBBC'} />
             <Text style={styles.screenProgressText}>10/10</Text>
            </View>
            <View style={styles.linkAccountImageContainer}>
            <Image
              source={require('../res/link_acnt.png')}>
            </Image>
            </View>

            <Text style={styles.forgotText}>LINK ACCOUNT</Text>
            <Text style={styles.forgotDetailText}>Please connect to your primary bank account. That is, where you deposit your paychecks. Bankroll uses this to determine how much you can borrow and deposit your cash.</Text>

            <View style={styles.buttonViewStyle}>

                  <TouchableOpacity style={styles.buttonLogin}
                  onPress={this.connectAccount.bind(this)}
                  >
                  <Text style={styles.buttonTextStyle}>Connect</Text>
              </TouchableOpacity>
            </View>

						{this.props.isLoading ?
							<View style={styles.circles}>

								 <Progress.CircleSnail
									 style={styles.progress}
									 thickness={5}
									 size={55}
									 color={[
										 '#FFFFFF',
										 '#FFFFFF',
										 '#FFFFFF',
									 ]}
								 />
						 </View> : null
					 }

            </View>
          </ScrollView>
        </Image>
      );
    }
}



export default AddBankAccount;

//Style for Add Bank Account Screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    justifyContent:'center',
    resizeMode: 'cover',
    paddingTop: 80
  },
  forgotText: {
    color:'#ffffff',
    fontSize: 20,
    textAlign: 'center',
    paddingTop:20,
    fontWeight:'400',
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'
  },
  forgotDetailText: {
    color:'#ffffff',
    fontSize: 15,
    textAlign: 'center',
    paddingTop:25,
    paddingLeft:25,
    paddingRight:25,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent',
    lineHeight:(Platform.OS === 'ios') ? 0 : 25,

  },
  screenProgressText:{
 	color:'#ffffff',
    fontSize: 15,
    textAlign: 'right',
    fontFamily:'FuturaStd-Book',
    alignSelf: 'flex-end',  
    paddingRight:20,
    paddingTop:10,
    backgroundColor:'transparent'
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
  	marginTop:20,
    alignItems:'center'
  },
	circles: {
		    position:'absolute',
		    left:0,
		    right:0,
		    top:0,
		    bottom:0,
		    justifyContent:'center',
				alignItems:'center'
			},
	progress: {
		    margin: 10,

		  },

});
