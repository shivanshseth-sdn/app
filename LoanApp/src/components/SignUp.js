import React,{Component} from 'react';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import {
  emailChanged,
  passwordChanged,
  signupUser,
	confirmPasswordChanged,
	showLoadingSignUp,
  clearResponseSignUp
} from '../actions/SignUpAction';

import {
  
    loginShowLoading,
    clearResponse,
    facebookLoginUser

} from '../actions/LoginAction';

import {
	Image,
	StyleSheet,
	Navigator,
	View,
  Text,
  Button,
	TouchableOpacity,
  ScrollView,
  Alert,
  AsyncStorage,
  Keyboard
} from 'react-native';

import FloatingLabel from 'react-native-floating-labels';
import{ Actions} from 'react-native-router-flux';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
import { Container, Content, Form, Item, Input,Label} from 'native-base';
import validator from 'validator';
import DeviceInfo from 'react-native-device-info';

const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  AccessToken
} = FBSDK;
import CustomAlertDialog from './CustomAlertDialog';
import * as Progress from 'react-native-progress';
import TextField from 'react-native-md-textinput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Platform} from 'react-native';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import OfflineBar from 'react-native-offline-status';
class SignUp extends Component{

  constructor() {
			super();
			this.state = {
				errorMsg: '',
        responseData:'',
        code:'',
        msg:'',
        fbresponseData:'',
        fbcode:'',
        fbmsg:'',
        errorOnTextField:'',
        popuMsg:''

			};

	}

  componentWillReceiveProps(nextProps) {

    this.setState({responseData:nextProps.signupRes});
    this.setState({code:nextProps.signupRes.code});
    this.setState({msg:nextProps.signupRes.message});

    this.setState({fbresponseData:nextProps.facebookRes});
    this.setState({fbcode:nextProps.facebookRes.code});
    this.setState({fbmsg:nextProps.facebookRes.message});


    //var msg=nextProps.signupRes.message;
    var signupRes=JSON.stringify(nextProps.signupRes.data);
    var fbResData=JSON.stringify(nextProps.facebookRes.data);
    try {
			if(signupRes != undefined)
			{
        let obj = JSON.parse(signupRes);
				AsyncStorage.setItem("userData",signupRes);
				console.log(' signupRes componentWillReceiveProps ====>>>> '+obj.token);
        if(obj._id!=undefined){
            AsyncStorage.setItem("userId", obj._id);
        }
        if(obj.token!=undefined){
          AsyncStorage.setItem("token", obj.token);
        }
			}
      else if(fbResData!=undefined){

        let obj = JSON.parse(fbResData);
        if(fbResData!=undefined){
          AsyncStorage.setItem("userData",fbResData);
          if(obj.is_phone_verified!=undefined){
            this.setState({phoneVerified:obj.is_phone_verified});
          }
        }
        if(obj._id!=undefined){
          console.log(' facebook LoginComponent componentWillReceiveProps ====>>>> '+obj._id);
          AsyncStorage.setItem("userId", obj._id);
        }
        if(obj.token!=undefined){
          AsyncStorage.setItem("token", obj.token);
        }
              
      }



		} catch (ex) {
			console.error(ex);
		}

    console.log('SignUp componentWillReceiveProps ==== '+this.state.msg);

  }
 componentDidMount() {
                this.offlineBarRef.triggerAnimation
        FCM.requestPermissions(); // for iOS
        FCM.getFCMToken().then(token => {
            console.log("fcm_token"+token)
            if(token!=undefined){
              AsyncStorage.setItem("fcm_token", token);
            }
            else{
              AsyncStorage.setItem("fcm_token", 'fsdfdsfdfds');
            }
            //alert(token+"");
            // store fcm token in your server
        });
        this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
            console.log("fcm token==="+token)
            if(token!=undefined){
              AsyncStorage.setItem("fcm_token", token);
            }
            else{
              AsyncStorage.setItem("fcm_token", 'fsdfdsfdfds');
            }
            //alert(token+"");
            // fcm token may not be available on first load, catch it here
        });
    }

  componentWillUnmount(){
    this.props.emailChanged('');
    this.props.passwordChanged('');
    this.props.confirmPasswordChanged('');

     console.log('SignUp componentWillUnmount ==== ');
  }

  componentDidUpdate() {

      console.log('SignUp componentDidUpdate ==== '+this.state.code);
      console.log('SignUp componentDidUpdate ==== '+this.state.msg);
      {
        if(this.state.responseData!=''){
          if(this.state.code==200){
            if(this.state.msg=='Signup successfully done.'){
              this.props.showLoadingSignUp(false);
            
              this.setState({code:''});
              this.setState({msg:''});
              this.setState({popuMsg:'Please check your email inbox to verify your email address.'});
              this.props.clearResponseSignUp();
             
              AsyncStorage.removeItem('accessPin');
              AsyncStorage.removeItem('isQuickAccess');
            }
          }
          else{
             this.props.showLoadingSignUp(false);
            this.props.clearResponseSignUp();

            this.setState({popuMsg:this.state.msg});
           // Alert.alert(this.state.msg);
          }
        }
        else if(this.state.fbresponseData!=''){
        {

         
          if(this.state.fbcode==200){
             this.props.loginShowLoading(false);
             this.props.clearResponse();
             Actions.VerifyPhoneNumber();
              this.setState({popuMsg:''});
             AsyncStorage.removeItem('accessPin');
             AsyncStorage.removeItem('isQuickAccess');
           
          }
          else{
             this.props.loginShowLoading(false);
            this.props.clearResponse();
            //Alert.alert(this.state.fbmsg);
            this.setState({popuMsg:this.state.fbmsg});
          }
        }
      }
      }

  }

	navigateVerifyPhoneNumber = () => {
			// this.props.navigator.push({ screen: 'DashboardComponent' });
			Actions.VerifyPhoneNumber();
	}

	onEmailChange(text){
      this.setState({errorMsg:''});
      this.setState({errorOnTextField:''});
		  this.props.emailChanged(text);
	}

	onPasswordChange(text){
      //this.setState({errorMsg:''});
      //this.setState({errorOnTextField:''});
			this.props.passwordChanged(text);
      if(text==''){
        this.setState({errorMsg:''});
        this.setState({errorOnTextField:''});
      } 
      else if(text.length<6){
              this.setState({errorMsg:'Please select a password containing six characters or more.'});
              this.setState({errorOnTextField:1});
       // Alert.alert('Please enter minimum six digit password.')
      }
      else if (text.search(/[0-9]/) < 0) {
             this.setState({errorMsg:'Your password must contain at least one digit.'});
             this.setState({errorOnTextField:1});

      }
      else if (text.search(/[A-Z]/) < 0) { 
         
            this.setState({errorMsg:'Your password must contain at least one uppercase letter.'});
            this.setState({errorOnTextField:1});
      }
      else if (text.search(/[a-z]/) < 0) { 
         
            this.setState({errorMsg:'Your password must contain at least one lowercase letter.'});
            this.setState({errorOnTextField:1});
      }
      //  else if(text.search(/[!@#\$%\^&\*.,]/) > 0){
      //        this.setState({errorMsg:'Your password must not contain any special character.'});
      //        this.setState({errorOnTextField:1});
      //  } 
     
      else{
         this.setState({errorMsg:''});
        this.setState({errorOnTextField:''});
      }
     
	}

	onConfirmPasswordChange(text){

      this.setState({errorMsg:''});
    this.setState({errorOnTextField:''});

    this.props.confirmPasswordChanged(text);
    console.log('in confirm pass'+text);
    if(this.props.password.length>5){
     if (this.props.password == text){
        console.log('in confirm pass match');
        Keyboard.dismiss();
     }
    }
   
			
	}

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       return re.test(email);
  };

  dismissDialog =()=>{
    this.popupDialog.dismiss();
  }



_signUp() {

	if (this.props.email == ''||!validator.isEmail(this.props.email)){
		this.setState({errorMsg:'Please enter a valid email address.'});
    this.setState({errorOnTextField:0});
    //Alert.alert('Please enter valid email address.');
    //this.popupDialog.show();
	}
	else if (this.props.password == ''){
		this.setState({errorMsg:'Please select a password.'});
    this.setState({errorOnTextField:1});
    //Alert.alert('Please enter password.');
    //this.popupDialog.show();
	}
  else if(this.props.password.length<6){
    this.setState({errorMsg:'Please select a password containing six characters or more.'});
    this.setState({errorOnTextField:1});
   // Alert.alert('Please enter minimum six digit password.')
  }
  else if (this.props.password.search(/[0-9]/) < 0) {
         this.setState({errorMsg:'Your password must contain at least one digit.'});
        this.setState({errorOnTextField:1});

  }
  else if (this.props.password.search(/[A-Z]/) < 0) { 
     
    this.setState({errorMsg:'Your password must contain at least one uppercase letter.'});
        this.setState({errorOnTextField:1});
  }
  // else if(this.props.password.search(/[!@#\$%\^&\*.,]/) > 0){
  //    this.setState({errorMsg:'Your password must not contain any special character.'});
  //       this.setState({errorOnTextField:1});
  // } 
  else if (this.props.confirmPass==''){
    this.setState({errorMsg:'Please re-enter your password.'});
    this.setState({errorOnTextField:2});
   
  }
	else if (this.props.password != this.props.confirmPass){
		this.setState({errorMsg:'The passwords do not match. Please try again.'});
    this.setState({errorOnTextField:2});
    
	}
	else{

		this.props.showLoadingSignUp(true);
		this.setState({errorMsg:''});
    this.setState({errorOnTextField:''});

    let device_token;
    AsyncStorage.getItem("fcm_token").then((value) => {
      if(value) {


                console.log('fcm_token if='+value);
                device_token=value;
                var user={
                  email:this.props.email,
                  password:this.props.password,
                  deviceId:DeviceInfo.getUniqueID(),
                  deviceType:DeviceInfo.getSystemName(),
                  deviceToken:device_token,
                  manufacturer:DeviceInfo.getManufacturer(),
                  brand:DeviceInfo.getBrand(),
                  model:DeviceInfo.getModel(),
                  systemName:DeviceInfo.getSystemName(),
                  systemVersion:DeviceInfo.getSystemVersion(),
                  uniqueID:DeviceInfo.getDeviceId()
                };
                console.log('SignUp USER='+JSON.stringify(user));
                this.props.signupUser(user);

        }
        else {

              console.log('fcm_token else='+value);
            }
        }).done();
   
		
	}
}


  fbLoginReq(json){

    console.log(json.first_name+json.last_name+json.email);
    this.props.loginShowLoading(true);
    this.setState({errorMsg:''});
    this.setState({errorOnTextField:''});
    var user={
      firstname:json.first_name,
      lastname:json.last_name,
      email:json.email,
      facebook_id:json.id,
      deviceId:DeviceInfo.getUniqueID(),
      deviceToken:'fdsfsdf',
      isFromSignup:'true',
      deviceType:DeviceInfo.getSystemName(),
      manufacturer:DeviceInfo.getManufacturer(),
      brand:DeviceInfo.getBrand(),
      model:DeviceInfo.getModel(),
      systemName:DeviceInfo.getSystemName(),
      systemVersion:DeviceInfo.getSystemVersion(),
      uniqueID:DeviceInfo.getDeviceId()
    };
    console.log('SignUp USER='+JSON.stringify(user));
    this.props.facebookLoginUser(user);

  }

facebookLogin=()=>{

      var self=this;
      LoginManager.logInWithReadPermissions(['email','public_profile']).then(
      function(result) {
        if (result.isCancelled) {
          alert('Login was cancelled');
        } else {

        AccessToken.getCurrentAccessToken().then(
                  (data) => {

                    console.log(data.accessToken.toString());
                    fetch('https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name,name,friends&access_token=' + data.accessToken.toString())
                    .then((response) => response.json())
                    .then((json) => {
                      // Some user object has been set up somewhere, build that user here
                        //alert(json.first_name+json.last_name+json.name);
                          console.log("facebook response======"+json.first_name+json.last_name+json.name);
                          if(json.id!=''){
                            self.fbLoginReq(json);
                          }


                    }).catch((err)=>{
                      console.log("excep",err)
                    })

                })

        }
      },
      function(error) {
        alert('Login failed with error: ' + error);
      });
  }

    onDialogButtonClick(){
    
        if(this.state.popuMsg=='Please check your email inbox to verify your email address.'){
         Actions.VerifyPhoneNumber();
        }
        this.setState({popuMsg:''});
    }

    onEmailClearClick(){

      this.props.emailChanged('');
      this.setState({errorMsg:''});
      this.setState({errorOnTextField:''});
      
    }

    onPasswordClearClick(){

      this.props.passwordChanged('');
      this.setState({errorMsg:''});
      this.setState({errorOnTextField:''});
      
    }

    onConfirmsPassClearClick(){


      this.props.confirmPasswordChanged('');
      this.setState({errorMsg:''});
      this.setState({errorOnTextField:''});
      
      
    }


  render(){
    console.log('SignUp render ==== '+JSON.stringify(this.state.responseData.code));

    return(
      <Image style={styles.container}
        source={require('../res/bg.png')}>
        <OfflineBar ref={(r) => this.offlineBarRef = r} />
      <KeyboardAwareScrollView contentContainerStyle={{paddingBottom:50}}
      keyboardShouldPersistTaps={'always'}
      >
        <View >


  
            <View style={{alignItems:'center'}}>
             <Progress.Bar progress={0.10} width={DEVICE_WIDTH*0.9} unfilledColor={'#FFFFFF'} color={'#7ACBBC'} />
             <Text style={styles.screenProgressText}>01/10</Text>
            </View>
            <Text style={styles.forgotText}>WELCOME TO BANKROLL</Text>
            <Text style={styles.forgotDetailText}>Get started by entering your primary email address and we will send you an one-time verification code to the email address provided.</Text>

            
            <View style={styles.inputContainer}>


               <TextField
                labelStyle={{fontFamily:'FuturaStd-Book'}}
                inputStyle={{fontFamily:'FuturaStd-Book'}}
                label={'Email'}
                height={(Platform.OS === 'ios') ? 35 : 40}
                highlightColor={'#FFFFFF'}
                labelColor={'#FFFFFF'}
                textColor={'#FFFFFF'}
                borderColor={'#FFFFFF'} 
                selectionColor='#FFFFFF'
                autoCapitalize='none'
                returnKeyType='next'
                keyboardType='email-address'
                autoCorrect={false}
                underlineColorAndroid='transparent'
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email}
                onSubmitEditing={(event)=>{this.refs.inputPass.focus()}}
              />


              {this.props.email!=''?<View style={styles.inlineImg}><TouchableOpacity  onPress={this.onEmailClearClick.bind(this)}><Image style={styles.clearImageStyle}
                                source={require('../res/clrfield.png')}></Image></TouchableOpacity></View>:null}    

            
             
            </View>

              {
                this.state.errorMsg!=''&&this.state.errorOnTextField==0?<Text style={styles.errorText}>{this.state.errorMsg}</Text>:null
              }
                
            <View style={styles.inputContainer}>


                 <TextField
                  labelStyle={{fontFamily:'FuturaStd-Book'}}
                  inputStyle={{fontFamily:'FuturaStd-Book'}}
                  label={'Password'}
                  height={(Platform.OS === 'ios') ? 35 : 40}
                  highlightColor={'#FFFFFF'}
                  labelColor={'#FFFFFF'}
                  textColor={'#FFFFFF'}
                  borderColor={'#FFFFFF'} 
                  selectionColor='#FFFFFF'
                  underlineColorAndroid='transparent'
                  returnKeyType='next'
                  secureTextEntry={true}
                  maxLength={15}
                  autoCorrect={false}
                  onChangeText={this.onPasswordChange.bind(this)}
                  value={this.props.password}
                  ref='inputPass'
                  onSubmitEditing={(event)=>{this.refs.inputConfrimPass.focus()}}
                     
                />

                
                {this.props.password!=''?<View style={styles.inlineImg}><TouchableOpacity  onPress={this.onPasswordClearClick.bind(this)}><Image style={styles.clearImageStyle}
                                source={require('../res/clrfield.png')}></Image></TouchableOpacity></View>:null}    

           
               
            </View>

                {
                  this.state.errorMsg!=''&&this.state.errorOnTextField==1?<Text style={styles.errorText}>{this.state.errorMsg}</Text>:null
                }
            <View style={styles.inputContainer}>


                  <TextField
                    labelStyle={{fontFamily:'FuturaStd-Book'}}
                    inputStyle={{fontFamily:'FuturaStd-Book'}}
                    label={'Confirm Password'}
                    height={(Platform.OS === 'ios') ? 35 : 40}
                    highlightColor={'#FFFFFF'}
                    labelColor={'#FFFFFF'}
                    textColor={'#FFFFFF'}
                    borderColor={'#FFFFFF'} 
                    selectionColor='#FFFFFF'
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    returnKeyType='done'
                    maxLength={15}
                    autoCorrect={false}
                    onChangeText={this.onConfirmPasswordChange.bind(this)}
                    value={this.props.confirmPass}
                    ref='inputConfrimPass'
                                            
                  />
           
                  {this.props.confirmPass!=''?<View style={styles.inlineImg}><TouchableOpacity  onPress={this.onConfirmsPassClearClick.bind(this)}><Image style={styles.clearImageStyle}
                                source={require('../res/clrfield.png')}></Image></TouchableOpacity></View>:null} 

                 
              
            </View>

             <Text style={styles.passwordHintText}>Password must contain at least one CAPITAL letter, one lower case letter, one number and must be atleast 6 characters long</Text>
              
                {
                  this.state.errorMsg!=''&&this.state.errorOnTextField==2?<Text style={styles.errorText}>{this.state.errorMsg}</Text>:null
                }
            <View style={styles.buttonViewStyle}>

		              <TouchableOpacity style={styles.buttonLogin}
									 onPress={this._signUp.bind(this)}
		  						>
                  <Text style={styles.buttonTextStyle}>Next</Text>
              </TouchableOpacity>
            </View>

                   {/*<Text style={styles.orText}>Or</Text>
                    <View style={styles.fbbuttonViewStyle}>
                        <TouchableOpacity style={styles.buttonFBLogin}
                        onPress={this.facebookLogin}>
                            <Image style={styles.fbicon}
                              source={require('../res/facebook.png')}>
                            </Image>
                            <Text style={styles.buttonTextStyle}>Sign up with Facebook</Text>
                        </TouchableOpacity>
                    </View>*/}

						{this.props.isLoadingSignUp ?
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
      </KeyboardAwareScrollView>
        {console.log("+++++++++++>>>>>>>>>>>>>>>??????????????"+this.state.popuMsg)}      
        {this.state.popuMsg!=''&&this.state.popuMsg!=undefined?<View style={styles.dialogViewStyle}>
                       <CustomAlertDialog title='Bankroll' onPress={this.onDialogButtonClick.bind(this)} subtitle={this.state.popuMsg}/>
                          </View>:null}
		
      </Image>
    );
  }
}

const mapStateToProps = ({ signup,loginUser }) => {

  const {email, password,confirmPass,isLoadingSignUp,signupRes} = signup;
  const {isLoading,facebookRes} = loginUser;
  console.log("SignUp Output: "+JSON.stringify(signupRes));
  console.log("SignUp facebookRes: "+JSON.stringify(facebookRes));
  return {
    email: email,
    password: password,
		confirmPass:confirmPass,
		isLoadingSignUp:isLoadingSignUp,
    signupRes:signupRes,
    facebookRes:facebookRes,
    isLoading:isLoading,
  }
}

export default connect(mapStateToProps,{loginShowLoading,clearResponse,facebookLoginUser,emailChanged,passwordChanged,signupUser,confirmPasswordChanged,showLoadingSignUp,clearResponseSignUp})(SignUp);


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
    color:'#7ACBBC',
    fontSize: 18,
    textAlign: 'center',
    paddingTop:20,
    backgroundColor:'transparent',
    fontFamily:'FuturaStd-Heavy'
  },
  forgotDetailText: {
    color:'#ffffff',
    fontSize: 15,
    textAlign: 'center',
    paddingTop:25,
    paddingLeft:20,
    paddingRight:20,
    backgroundColor:'transparent',
    fontFamily:'FuturaStd-Book',
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
    marginTop:10,
     marginLeft:20,
    marginRight:20
  },
  buttonViewStyle:{
		paddingTop:40,
		marginLeft: 20,
		marginRight:20,
		alignSelf: 'stretch',
	},
  fbbuttonViewStyle:{
    paddingTop:20,
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
        fontFamily:'FuturaStd-Book'
    },

	dialogText: {
	    color:'#000000',
	    fontSize: 15,
			fontWeight:'bold',
	    textAlign: 'center',
	    paddingTop:25,
	    paddingLeft:20,
	    paddingRight:20

	  },

	forgotDialogStyle:{
			marginLeft: 20,
			marginRight:20,
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
   orText: {
    color:'#ffffff',
    fontSize: 15,
    textAlign: 'center',
    paddingTop:20,
     fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'
  },
  buttonFBLogin:{

      height: 45,
      borderRadius: 5,
      paddingTop:5,
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: '#3D65C4'},

  fbicon:{

        position:'absolute',
        left:5,
        width: 40,
        height: 40,

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

  passwordHintText: {
    color:'white',
    fontSize: 12,
    textAlign: 'left',
    paddingTop:5,
    paddingLeft:20,
    backgroundColor:'transparent',
    fontFamily:'FuturaStd-Book',
    lineHeight:(Platform.OS === 'ios') ? 0 : 25,
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
