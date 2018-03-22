import React,{Component} from 'react';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';

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
	Keyboard,
	Platform
} from 'react-native';

import FloatingLabel from 'react-native-floating-labels';
import{ Actions} from 'react-native-router-flux';
import * as Progress from 'react-native-progress';
import CustomAlertDialog from './CustomAlertDialog';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
import { Container, Content, Form, Item, Input,Label} from 'native-base';
import {
  	phoneChanged,
  	verifyMobile,
	showLoadingMobileVerification,
	clearResponse
} from '../actions/MobileVerificationAction';
import TextField from 'react-native-md-textinput';
class VerifyPhoneNumber extends Component{


	constructor() {
			super();
			this.state = {
				errorMsg: '',
        		responseData:'',
        		code:'',
        		msg:'',
        		popuMsg:''
			};
	}

  componentWillReceiveProps(nextProps) {


		this.setState({responseData:nextProps.mobileVerifyRes});
		this.setState({code:nextProps.mobileVerifyRes.code});
		this.setState({msg:nextProps.mobileVerifyRes.message});
		if(nextProps.mobileVerifyRes.phone!=undefined){
			AsyncStorage.setItem("phone", JSON.stringify(nextProps.mobileVerifyRes.phone));
		}
		
		var resData=JSON.stringify(nextProps.mobileVerifyRes.data);
		console.log(' VerifyPhoneNumber componentWillReceiveProps ==== '+JSON.stringify(resData));
		try {
			if(resData != undefined)
    	{
				let obj = JSON.parse(resData);
				console.log(' VerifyPhoneNumber componentWillReceiveProps ====>>>> '+obj.otpNumber);
				if(obj.otpNumber!=undefined){
					AsyncStorage.setItem("otp", JSON.stringify(obj.otpNumber));

				}
			}

		} catch (ex) {
		  console.error(ex);
		}

  }
  componentDidUpdate() {

      console.log('VerifyPhoneNumber componentDidUpdate ==== ');
			{

				if(this.state.responseData!=''){
					if(this.state.code==200){


					this.setState({popuMsg:''});
					this.props.clearResponse();
                    Actions.EnterVrificationCode();


	  			    }
	  			    else{
	  			    	this.props.clearResponse();
	  			    	this.setState({popuMsg:this.state.msg});
	  			    	//Alert.alert(this.state.msg);
	  			    	 
	  			    }
				}
				
  			}

  }
  componentWillUnmount(){
     this.props.phoneChanged('');
     console.log('componentWillUnmount ==== ');
  }

  onDialogButtonClick(){
    this.setState({popuMsg:''});
  }

	onMobileChange(text){
			this.setState({errorMsg:''});
			if(text.length<10){
 			this.props.phoneChanged(text);

			}
			else{
			var num=this.formatPhoneNumber(text);
		    console.log('format num ==== '+num);
		     if(num!=null){
						this.props.phoneChanged(num);
						 Keyboard.dismiss();
			        }
			        else{
			        	 this.props.phoneChanged(text);
			        }
			
			}

		   			
	}

	onPhoneClearClick(){
      this.props.phoneChanged('');
      this.setState({errorMsg:''});
      this.setState({errorOnTextField:''});
      
    }

	dismissDialog =()=>{
    this.popupDialog.dismiss();
  }

	_verifyMobile() {

		if (this.props.phone == ''){
			this.setState({errorMsg:'Please enter your mobile phone number.'});
			//Alert.alert('Please enter phone number.');
			//this.popupDialog.show();
		}
		else if(this.props.phone.replace(/[\s()-]+/gi, '').length<10){
			this.setState({errorMsg:'Please provide a valid U.S. phone number.'});
			//Alert.alert('Please provide a valid U.S. phone number.');
		}
		else{

			this.props.showLoadingMobileVerification(true);
			this.setState({errorMsg:''});

			var phoneNumber=parseInt(this.props.phone.replace(/[\s()-]+/gi, ''), 10);
			var mobileReq={
				phone:phoneNumber
			};
			console.log('VerifyPhoneNumber USER='+JSON.stringify(mobileReq));
			this.props.verifyMobile(mobileReq);
		}
	}

   formatPhoneNumber(s) {

		  var s2 = (""+s).replace(/\D/g, '');
		  var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
		  return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
		
		}




  render(){
    return(
      <Image style={styles.container}
        source={require('../res/bg.png')}>
        <ScrollView keyboardShouldPersistTaps={'always'}>
          <View>

          	<View style={{alignItems:'center'}}>
             <Progress.Bar progress={0.20} width={DEVICE_WIDTH*0.9} unfilledColor={'#FFFFFF'} color={'#7ACBBC'} />
             <Text style={styles.screenProgressText}>02/10</Text>
            </View>
            <Text style={styles.forgotDetailText}>Please take a moment to verify your phone number. This helps us to confirm your identity and secure your account.</Text>
            <View style={styles.inputContainer}>

            	<TextField
                labelStyle={{fontFamily:'FuturaStd-Book'}}
                inputStyle={{fontFamily:'FuturaStd-Book'}}
                label={'Phone Number'}
                height={(Platform.OS === 'ios') ? 35 : 40}
                highlightColor={'#FFFFFF'}
                labelColor={'#FFFFFF'}
                textColor={'#FFFFFF'}
                borderColor={'#FFFFFF'} 
                underlineColorAndroid='transparent'
				onChangeText={this.onMobileChange.bind(this)}
				value={this.props.phone}
				keyboardType='phone-pad'
	 			returnKeyType='done'
                maxLength={14}
              />


                 {this.props.phone!=''?<View style={styles.inlineImg}><TouchableOpacity  onPress={this.onPhoneClearClick.bind(this)}><Image style={styles.clearImageStyle}
                                source={require('../res/clrfield.png')}></Image></TouchableOpacity></View>:null}    


                
            </View>

             {
                  this.state.errorMsg!=''?<Text style={styles.errorText}>{this.state.errorMsg}</Text>:null
                 }

            <View style={styles.buttonViewStyle}>

              <TouchableOpacity style={styles.buttonLogin}
               onPress= {this._verifyMobile.bind(this)}
              >
                  <Text style={styles.buttonTextStyle}>Next</Text>
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
  			{this.state.popuMsg!=''&&this.state.popuMsg!=undefined?<View style={styles.dialogViewStyle}>
                       <CustomAlertDialog title='Bankroll' onPress={this.onDialogButtonClick.bind(this)} subtitle={this.state.popuMsg}/>
                          </View>:null}
				
      </Image>
    );
  }
}

const mapStateToProps = ({ mobileVerify }) => {

  const {phone,isLoading,mobileVerifyRes} = mobileVerify;
	console.log("Phone verify Output: "+JSON.stringify(mobileVerifyRes));
  return {
    phone: phone,
		isLoading:isLoading,
    mobileVerifyRes:mobileVerifyRes
  }
}

export default connect(mapStateToProps,{phoneChanged,showLoadingMobileVerification,verifyMobile,clearResponse})(VerifyPhoneNumber);
const styles = StyleSheet.create({

  container: {
    flex: 1,
		width: null,
		height: null,
		resizeMode: 'cover',
		paddingTop: 80
  },
  forgotDetailText: {
    color:'#ffffff',
    fontSize: 15,
    textAlign: 'center',
    paddingTop:30,
    paddingLeft:20,
    paddingRight:20,
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

  labelInput: {
		color: '#FFFFFF',
		paddingLeft:5,
		backgroundColor:'transparent'

	},
	formInput: {
		borderBottomWidth: 1,
		marginLeft: 20,
		marginRight:20,
		borderColor: '#FFFFFF',
		alignSelf: 'stretch',

	},
	input: {
		borderWidth: 0,
		paddingLeft:5,
		color:'#ffffff',
	},
  inputContainer: {
    marginTop:30,
    marginLeft:20,
    marginRight:20
  },
  buttonViewStyle:{
		paddingTop:50,
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
		buttonDialogStyle:{

			marginLeft: 50,
			marginRight:50,
			paddingTop:20,

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

		errorText: {
		    color:'red',
		    fontSize: 14,
		    textAlign: 'left',
		    paddingTop:10,
		    paddingLeft:20,
		    backgroundColor:'transparent',
		    fontFamily:'FuturaStd-Book'
		  },

		    dialogViewStyle:{

    position: 'absolute', 
    top: 0, left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
  },

  inlineImg: {
    position: 'absolute',
    right: 5,
    bottom:16,

  },
    clearImageStyle:{

  	padding:10,
  },

  });
