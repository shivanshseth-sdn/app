import React,{Component} from 'react';
import {
	Image,
	StyleSheet,
	Navigator,
	View,
  Text,
  Button,
	TouchableOpacity,
	Alert,
	AsyncStorage,
	TouchableHighlight,
	NetInfo

} from 'react-native';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import * as Progress from 'react-native-progress';
import {
  	loginEmailChanged,
  	loginPasswordChanged,
  	loginShowLoading,
	loginUser,
	clearResponse,
	facebookLoginUser

} from '../actions/LoginAction';
import{ Actions} from 'react-native-router-flux';
import FloatingLabel from 'react-native-floating-labels';
import UserInput from './UserInput';
import {FBLogin} from './FBLogin';
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
	AccessToken
} = FBSDK;
import validator from 'validator';
import DeviceInfo from 'react-native-device-info';
import CustomAlertDialog from './CustomAlertDialog';
import TextField from 'react-native-md-textinput';
import {Platform} from 'react-native';
import OfflineBar from 'react-native-offline-status';
const backImg  = require('../res/back.png');
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

class LoginComponent extends Component{

	constructor() {
			super();
			this.state = {
				errorMsg: '',
				responseData:'',
				fbResponse:'',
				code:'',
				fbcode:'',
				msg:'',
				fbmsg:'',
				firstName:'',
				lastName:'',
				email:'',
				fbid:'',
				userId:'',
				token:'',
				phoneVerified:'',
				errorOnTextField:'',
				dialogMsg:'',
        		isShowDialog:false,

			};
	}

	componentWillReceiveProps(nextProps) {


		console.log('LoginComponent componentWillReceiveProps ==== '+nextProps.facebookRes);
		this.setState({responseData:nextProps.loginRes});
		this.setState({fbResponse:nextProps.facebookRes});
		this.setState({code:nextProps.loginRes.code});
		this.setState({fbcode:nextProps.facebookRes.code});
		this.setState({msg:nextProps.loginRes.message});
		this.setState({fbmsg:nextProps.facebookRes.message});

		console.log('LoginComponent componentWillReceiveProps ==== ');
		var resData=JSON.stringify(nextProps.loginRes.data);
		var fbResData=JSON.stringify(nextProps.facebookRes.data);
		console.log(' LoginComponent componentWillReceiveProps ==== '+resData);

		try {
			if(resData != undefined)
			{
				let obj = JSON.parse(resData);
				if(resData!=undefined){

					AsyncStorage.setItem("userData",resData);
					if(obj.is_phone_verified!=undefined){
						this.setState({phoneVerified:obj.is_phone_verified});
					}
				}

				if(obj._id!=undefined){
					    console.log(' LoginComponent componentWillReceiveProps ====>>>> '+obj._id);
						var userId;
			      		AsyncStorage.getItem("userId").then((value) => {
		                  if(value) {

		                      userId=value;
		                       console.log('user id for checking'+userId);
		                       console.log('login user id??????????????????'+userId);
				               console.log('login user id??????????????????+++++++++++++'+obj._id);
				                if(userId!=obj._id)
				                {
										  AsyncStorage.removeItem('accessPin');
		                                  AsyncStorage.removeItem('isQuickAccess');
								}
		                  }
		                  else{
		 						console.log('else user id for checking'+userId);
		                  }
		                }).done();

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
					    var userId;
			      		AsyncStorage.getItem("userId").then((value) => {
		                  if(value) {

		                      userId=value;
		                      console.log('user id for checking'+userId);
		                  }
		                  else{
		 						console.log('else user id for checking'+userId);
		                  }
		                }).done();
		                if(userId!=obj._id)
		                {
								  AsyncStorage.removeItem('accessPin');
                                  AsyncStorage.removeItem('isQuickAccess');
						}
					    AsyncStorage.setItem("userId", obj._id);
					  

				}
				if(obj.token!=undefined){
					AsyncStorage.setItem("token", obj.token);
				}
							
			}

		} catch (ex) {
			console.error(ex);
		}

	}
  	onDialogButtonClick(){
			this.setState({isShowDialog:false});
			this.setState({dialogMsg:''});
		}

	componentWillUnmount(){
   	this.props.loginEmailChanged('');
   		this.props.loginPasswordChanged('');

  }
   	renderBack = () => {

      return (
       	
       	<TouchableOpacity underlayColor="transparent" style={styles.hamBurgerContainer} onPress={() => this.onBackPress()}>
					          				<Image
					                  			source={backImg}
					                  			resizeMode="contain">
					                		</Image>
		</TouchableOpacity>
      )
    }
    onBackPress(){
  		 Actions.Slider({type: "reset"});
  	}


  	 componentDidMount() {
      	this.offlineBarRef.triggerAnimation
      	Actions.refresh({ renderLeftButton: this.renderBack})
        FCM.requestPermissions(); // for iOS
        FCM.getFCMToken().then(token => {
            console.log("fcm_token"+token)
            if(token!=undefined){
              AsyncStorage.setItem("fcm_token", token);
            }
            else{
              AsyncStorage.setItem("fcm_token", 'fsdfdsfdfds');
            }
          
        });
        this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
            console.log("fcm token==="+token)
            if(token!=undefined){
              AsyncStorage.setItem("fcm_token", token);
            }
            else{
              AsyncStorage.setItem("fcm_token", 'fsdfdsfdfds');
            }
          
        });
    }


	componentDidUpdate() {

			console.log('LoginComponent componentDidUpdate ==== ');
			if(this.state.responseData!=''){
				{
					if(this.state.code==200){

						this.props.clearResponse();
						
			            this.props.loginShowLoading(false);
					   // Actions.Dashboard({type: "reset"});
						 if(this.state.phoneVerified==true){
						 	Actions.Dashboard({type: "reset"});
						 }
						 else{
						 	 Actions.VerifyPhoneNumber();
						 }
			
						
					}
					else{
						 this.props.loginShowLoading(false);
						this.props.clearResponse();
						this.setState({isShowDialog:true});
						this.setState({dialogMsg:this.state.msg});
						//Alert.alert(this.state.msg);
					}
				}
			}
			else if(this.state.fbResponse!=''){
				{
					if(this.state.fbcode==200){
						this.props.clearResponse();
						 this.props.loginShowLoading(false);
						if(this.state.phoneVerified==true){
							 	
							Actions.Dashboard({type: "reset"});

						}
						else{
							 Actions.VerifyPhoneNumber();
						}
					}
					else{
						
						 this.props.loginShowLoading(false);
						this.props.clearResponse();
						this.setState({isShowDialog:true});
						 this.setState({dialogMsg:this.state.msg});
						//Alert.alert(this.state.fbmsg);
					}
				}
			}



	}

 
  navigateForgotPass = () => {
     
      Actions.ForgotPassword();
  }
	navigateDashboard = () => {
			
			Actions.Dashboard({type: "reset"});
	}

	onEmailChange(text){
		this.setState({errorMsg:''});
    		this.setState({errorOnTextField:''});
			this.props.loginEmailChanged(text);
	}

	onPasswordChange(text){
		this.setState({errorMsg:''});
    		this.setState({errorOnTextField:''});
			this.props.loginPasswordChanged(text);
	}

	onEmailClearClick(){
      this.props.loginEmailChanged('');
      this.setState({errorMsg:''});
      this.setState({errorOnTextField:''});
      
    }

    onPasswordClearClick(){
      this.props.loginPasswordChanged('');
      this.setState({errorMsg:''});
      this.setState({errorOnTextField:''});
      
    }
	validateEmail = (email) => {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			 return re.test(email);
	};
	_userLogin() {


		// NetInfo.fetch().then((reach) => {
		//   console.log('Initial: ' + reach);
		// });
		// function handleFirstConnectivityChange(reach) {
		//   console.log('First change: ' + reach);
		//   NetInfo.removeEventListener(
		//     'change',
		//     handleFirstConnectivityChange
		//   );
		// }
		// NetInfo.addEventListener(
		//   'change',
		//   handleFirstConnectivityChange
		// );

		if (this.props.email == ''||!validator.isEmail(this.props.email)){
		

			this.setState({errorMsg:'Please enter a valid email address.'});
    		this.setState({errorOnTextField:0});
		}
		else if (this.props.password == ''){
		
			this.setState({errorMsg:'Please enter your password.'});
    		this.setState({errorOnTextField:1});
		}

		else{

			this.props.loginShowLoading(true);
			this.setState({errorMsg:''});
    		this.setState({errorOnTextField:''});
			this.setState({errorMsg:''});
			AsyncStorage.getItem("fcm_token").then((value) => {
				 if(value) {


						console.log('fcm_token if='+value);

						
						
						
						var user={

							email:this.props.email,
							password:this.props.password,
							device_token:value,
							deviceId:DeviceInfo.getUniqueID(),
							deviceType:DeviceInfo.getSystemName(),
							manufacturer:DeviceInfo.getManufacturer(),
							brand:DeviceInfo.getBrand(),
							model:DeviceInfo.getModel(),
							systemName:DeviceInfo.getSystemName(),
							systemVersion:DeviceInfo.getSystemVersion(),
							uniqueID:DeviceInfo.getDeviceId()


						};
						console.log('SignUp USER='+JSON.stringify(user));
						this.props.loginUser(user);

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

    		AsyncStorage.getItem("fcm_token").then((value) => {
				 if(value) {


						console.log('fcm_token if='+value);

							var user={

								firstname:json.first_name,
								lastname:json.last_name,
								email:json.email,
								facebook_id:json.id,
								deviceToke:value,
								isFromSignup:'false',
								deviceId:DeviceInfo.getUniqueID(),
								deviceType:DeviceInfo.getSystemName()

							};
							console.log('SignUp USER='+JSON.stringify(user));
							this.props.facebookLoginUser(user);

				 }
				 else {

						 console.log('fcm_token else='+value);
				 }
			 }).done();
	

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
													console.log(json.first_name+json.last_name+json.name);
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


  render(){



			if(this.state.fbid!=''){
					this.fbLoginReq.bind(this);
			}
   			 return(
						<Image style={styles.container}
						 	source={require('../res/bg.png')}>
						 	<OfflineBar ref={(r) => this.offlineBarRef = r} />
							<View>
									
									<View style={styles.inputContainer}>

										<Image source={require('../res/emails.png')}
												style={styles.inlineImg} />

						
										 <TextField
						                    labelStyle={{fontFamily:'FuturaStd-Book',paddingLeft:25}}
						                    inputStyle={{fontFamily:'FuturaStd-Book',paddingLeft:25}}	
						                    label={'Email'}
						                    highlightColor={'#FFFFFF'}
						                    labelColor={'#FFFFFF'}
						                    textColor={'#FFFFFF'}
						                    borderColor={'#FFFFFF'} 
						                    height={(Platform.OS === 'ios') ? 35 : 40}
						                    selectionColor='#FFFFFF'
						                    keyboardType='email-address'
						                    underlineColorAndroid='transparent'
						                    returnKeyType='next'
						                    autoCapitalize='none'
						                    autoCorrect={false}
						                    onChangeText={this.onEmailChange.bind(this)}
											onSubmitEditing={(event)=>{this.refs.inputPass.focus()}}
											value={this.props.email}
						                                            
						                  />

						                  {this.props.email!=''?<View style={styles.inlineClearImg}><TouchableOpacity  onPress={this.onEmailClearClick.bind(this)}><Image style={styles.clearImageStyle}
                  							source={require('../res/clrfield.png')}></Image></TouchableOpacity></View>:null}

							        </View>

							          {
							              this.state.errorMsg!=''&&this.state.errorOnTextField==0?<Text style={styles.errorText}>{this.state.errorMsg}</Text>:null
							          }

							          <View style={styles.inputContainer}>

							          		<Image source={require('../res/pass.png')}
												style={styles.inlineImg} />

										 <TextField
						                    labelStyle={{fontFamily:'FuturaStd-Book',paddingLeft:25}}
						                    inputStyle={{fontFamily:'FuturaStd-Book',paddingLeft:25}}	
						                    label={'Password'}
						                    highlightColor={'#FFFFFF'}
						                    labelColor={'#FFFFFF'}
						                    textColor={'#FFFFFF'}
						                    borderColor={'#FFFFFF'} 
						                    selectionColor='#FFFFFF'
						                    height={(Platform.OS === 'ios') ? 35 : 40}
						                    underlineColorAndroid='transparent'
						                   
						                    autoCorrect={false}						                    
											secureTextEntry={true}
											autoCapitalize='none'
											returnKeyType='done'
											ref='inputPass'
											onChangeText={this.onPasswordChange.bind(this)}
											value={this.props.password}
						                                            
						                  />


                  						  {this.props.password!=''?<View style={styles.inlineClearImg}><TouchableOpacity  onPress={this.onPasswordClearClick.bind(this)}><Image style={styles.clearImageStyle}
                  							source={require('../res/clrfield.png')}></Image></TouchableOpacity></View>:null}


							          </View>

							          	{
							                  this.state.errorMsg!=''&&this.state.errorOnTextField==1?<Text style={styles.errorText}>{this.state.errorMsg}</Text>:null
							            }
										


										<TouchableOpacity onPress={this.navigateForgotPass}>
											<Text style={styles.forgotPass}>Forgot Password?</Text>
										</TouchableOpacity>
										<View style={styles.buttonViewStyle}>
											<TouchableOpacity
											 onPress={this._userLogin.bind(this)}
											 style={styles.buttonLogin}>
													<Text style={styles.buttonTextStyle}>Login</Text>
											</TouchableOpacity>
										</View>
										{/*<Text style={styles.orText}>Or</Text>
										<View style={styles.buttonViewStyle}>
												<TouchableOpacity style={styles.buttonFBLogin}
												onPress={this.facebookLogin}>
														<Image style={styles.fbicon}
															source={require('../res/facebook.png')}>
														</Image>
														<Text style={styles.buttonTextStyle}>Sign in with Facebook</Text>
												</TouchableOpacity>
										</View>*/}

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

								{this.state.isShowDialog==true?<View style={styles.dialogViewStyle}>
			             			<CustomAlertDialog title='Bankroll' onPress={this.onDialogButtonClick.bind(this)} subtitle={this.state.dialogMsg} />
			    				</View>:null} 	
	       

						</Image>

    );
  }
}

const mapStateToProps = ({ loginUser }) => {

  const {email, password,isLoading,loginRes,facebookRes} = loginUser;
  console.log("loginRes Output: "+JSON.stringify(facebookRes));

  return {
    email: email,
    password: password,
	isLoading:isLoading,
    loginRes:loginRes,
	facebookRes:facebookRes,

  }
}
export default connect(mapStateToProps,{loginEmailChanged,loginPasswordChanged,loginUser,loginShowLoading,clearResponse,facebookLoginUser})(LoginComponent);


const styles = StyleSheet.create({
  container: {
    flex: 1,
		width: null,
		height: null,
		resizeMode: 'cover',
		paddingTop: 80
  },

  forgotPass: {
    color:'#ffffff',
    fontSize: 15,
    textAlign: 'right',
    paddingTop:20,
    marginRight:20,
     fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'

  },

  orText: {
    color:'#ffffff',
    fontSize: 15,
    textAlign: 'center',
    paddingTop:20,
     fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'
  },

  buttonViewStyle:{
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

	buttonFBLogin:{

			height: 45,
			borderRadius: 5,
			paddingTop:(Platform.OS === 'ios') ? 5 : 0,
			justifyContent: 'center', 
            alignItems: 'center', 
			backgroundColor: '#3D65C4'},

	buttonTextStyle:{
		 color:'#ffffff',
		 fontSize: 18,
    	 alignSelf: 'center',
		 fontFamily:'FuturaStd-Book',
  },

	fbicon:{

	  		position:'absolute',
				left:5,
                width: 40,
                height: 40,

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
    paddingTop:5,
    paddingLeft:20,
    paddingRight:20,
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
		left: 0,
		bottom:(Platform.OS === 'ios') ? 20 : 18,

	},

inputContainer: {
    marginTop:10,
     marginLeft:20,
    marginRight:20
  },
  inlineClearImg: {
    position: 'absolute',
    right: 5,
    bottom:16,
   
  },
  clearImageStyle:{

  	padding:10,
  },

});
