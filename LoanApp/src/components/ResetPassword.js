import React,{Component} from 'react';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';

import DeviceInfo from 'react-native-device-info';

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
  TouchableWithoutFeedback,

} from 'react-native';

import {
  
    oldPasswordChanged,
    resetPasswordChanged,
    resetConfirmPasswordChanged,
    showLoadingResetPassword,
    clearResponseResetPassword,
    ResetPasswordReq

} from '../actions/ResetPasswordAction';

import FloatingLabel from 'react-native-floating-labels';
import{ Actions} from 'react-native-router-flux';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
import { Container, Content, Form, Item, Input,Label} from 'native-base';
import CustomAlertDialog from './CustomAlertDialog';
import * as Progress from 'react-native-progress';
import TextField from 'react-native-md-textinput';

import {Platform} from 'react-native';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

class ResetPassword extends Component{

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
        oldPin:'',
        newPin:'',
        confirmPin:'',
        errorOnTextField:'',
        dialogMsg:'',
        isShowDialog:false,
      

			};

	}


    onDialogButtonClick(isBack){
      if(isBack==true){
          Actions.pop();
          setTimeout(()=> Actions.refresh(), 100); 
      }
      this.setState({isShowDialog:false});
      this.setState({dialogMsg:''});
    }
  componentWillReceiveProps(nextProps) {

              this.setState({responseData:nextProps.resetPasswordRes});
              this.setState({code:nextProps.resetPasswordRes.code});
              this.setState({msg:nextProps.resetPasswordRes.message});

               console.log('create pin componentWillReceiveProps ==== ');
              var resData=JSON.stringify(nextProps.resetPasswordRes.data);
             
              console.log(' create pin componentWillReceiveProps ==== '+resData);

              try {
                if(resData != undefined&&resData!=''&&resData!="{}")
                {
                  let obj = JSON.parse(resData);
                  if(resData!=undefined&&resData!=''){

                    AsyncStorage.setItem("userData",resData);
                   
                  }

                  if(obj._id!=undefined){
                           console.log(' LoginComponent componentWillReceiveProps ====>>>> '+obj._id);
                             
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

  componentWillUnmount(){

       this.props.oldPasswordChanged('');
       this.props.resetPasswordChanged('');
       this.props.resetConfirmPasswordChanged('');


  }

   componentDidMount() {
      
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


  componentDidUpdate() {

  
       if(this.state.responseData!=''){
        
          if(this.state.code==200){
            this.props.showLoadingResetPassword(false);
            this.props.clearResponseResetPassword();
           
            this.setState({isShowDialog:true});
            this.setState({dialogMsg:'Your password was successfully reset.'});
            //Alert.alert('Your quick access PIN reset successfully.');
          
          }
          else{
            this.props.showLoadingResetPassword(false);
            this.props.clearResponseResetPassword();
            console.log("+++++++++++else++++++++++++");
            //Alert.alert(this.state.msg);
            this.setState({isShowDialog:true});
            this.setState({dialogMsg:this.state.msg});
          }
        
      }

  }
    
  

  onOldPasswordChanged(text){
     this.setState({errorMsg:''});
     this.setState({errorOnTextField:''});
     this.props.oldPasswordChanged(text);
     
  }

  onNewPasswordChanged(text){
    
     this.props.resetPasswordChanged(text);
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
      else if(text.search(/[!@#\$%\^&\*]/) < 0){
            this.setState({errorMsg:'Your password must contain at least one special character.'});
            this.setState({errorOnTextField:1});
      }
      else{
         this.setState({errorMsg:''});
        this.setState({errorOnTextField:''});
      }
  }

  onConfirmPasswordChanged(text){
     this.setState({errorMsg:''});
     this.setState({errorOnTextField:''});
     this.props.resetConfirmPasswordChanged(text);
      if(text==this.props.resetNewPassword){
          this.refs.inputConfrimPass.blur();
      }
  }
  componentWillMount(){

    }
  onOkClick(){
        var accessPinVal;
        if(this.props.resetOldPassword==''){
                                      //Alert.alert('Please enter valid old PIN.');
                this.setState({errorMsg:'Please enter old password.'});
                this.setState({errorOnTextField:0});
        }
     
     
        else if(this.props.resetNewPassword==''){
                                      //Alert.alert('Please enter valid new PIN.');
                this.setState({errorMsg:'Please select a password.'});
                this.setState({errorOnTextField:1});
        }
        else if(this.props.resetNewPassword.length<6){
          this.setState({errorMsg:'Please select a password containing six characters or more.'});
          this.setState({errorOnTextField:1});
         // Alert.alert('Please enter minimum six digit password.')
        }
        else if (this.props.resetNewPassword.search(/[0-9]/) < 0) {
               this.setState({errorMsg:'Your password must contain at least one digit.'});
              this.setState({errorOnTextField:1});

        }
        else if (this.props.resetNewPassword.search(/[A-Z]/) < 0) { 
           
          this.setState({errorMsg:'Your password must contain at least one uppercase letter.'});
              this.setState({errorOnTextField:1});
        }
        else if(this.props.resetNewPassword.search(/[!@#\$%\^&\*]/) < 0){
           this.setState({errorMsg:'Your password must contain at least one special character.'});
              this.setState({errorOnTextField:1});
        } 
    
        else if(this.props.resetConfirmNewPassword==''){
                                        //Alert.alert('Please enter valid confrim PIN.');
                this.setState({errorMsg:'Please re-enter your password.'});
                this.setState({errorOnTextField:2});
        }
        
                                    
        else if(this.props.resetConfirmNewPassword!=this.props.resetNewPassword){
                                        //Alert.alert('Please enter confrim PIN same as new PIN.');
                this.setState({errorMsg:'The passwords do not match. Please try again.'});
                this.setState({errorOnTextField:2});
        }
        else{
                this.setState({errorMsg:''});
                this.setState({errorOnTextField:''});
                // Alert.alert('Your quick access PIN reset successfully.');       
                // AsyncStorage.setItem("accessPin",this.state.newPin);
                // AsyncStorage.setItem("isQuickAccess",'true');
                // Actions.pop();
                // setTimeout(()=> Actions.refresh(), 100); 
                  this.props.showLoadingResetPassword(true);

                    let device_token;
                    AsyncStorage.getItem("fcm_token").then((value) => {
                     if(value) {


                        console.log('fcm_token if='+value);
                        device_token=value;

                     }
                     else {

                         console.log('fcm_token else='+value);
                     }
                   }).done();

                   let access_token;
                  AsyncStorage.getItem("token").then((value) => {
                   if(value) {

                       access_token=value;
                       console.log('token if='+access_token);

                   }
                   else {

                       console.log('token else='+value);
                   }
                 }).done(); 

                  AsyncStorage.getItem("userData").then((value) => {
                        if(value) {

                            console.log('userData if='+value);
                            let obj = JSON.parse(value);
                    
                          
                           var user={

                        
                            authToken:access_token,
                            oldPassword:this.props.resetOldPassword,
                            newPassword:this.props.resetNewPassword,
                            confirmPassword:this.props.resetConfirmNewPassword,
                            userId:obj._id,
                            deviceId:DeviceInfo.getUniqueID(),
                            deviceType:DeviceInfo.getSystemName(),
                            deviceToken:device_token

                          };
                          console.log('Update USER='+JSON.stringify(user));
                          this.props.ResetPasswordReq(user);


                            
                        }
                        else {

                            console.log('userData else='+value);
                        }
                      }).done();

                  }

  }


  onOldPINClearClick(){
      this.props.oldPasswordChanged('');
      this.setState({errorMsg:''});
      this.setState({errorOnTextField:''});
      
    }

 onNewPINClearClick(){
      this.props.resetPasswordChanged('');
      this.setState({errorMsg:''});
      this.setState({errorOnTextField:''});
      
    }
 
 onConfirmPINClearClick(){
      this.props.resetConfirmPasswordChanged('');
      this.setState({errorMsg:''});
      this.setState({errorOnTextField:''});
      
    }
 


  render(){
    console.log('SignUp render ==== '+JSON.stringify(this.state.responseData.code));

    return(

      <TouchableWithoutFeedback onPress={() => {this.setState({isNeedHelpClick:false})}}>
      <Image style={styles.container}
        source={require('../res/bg.png')}>

      <ScrollView keyboardShouldPersistTaps={'always'}>
      <View >

            
            <View style={styles.inputContainer}>

                <TextField
                  labelStyle={{fontFamily:'FuturaStd-Book'}}
                  inputStyle={{fontFamily:'FuturaStd-Book'}}
                  label={'Old Password'}
                  highlightColor={'#FFFFFF'}
                  labelColor={'#FFFFFF'}
                   height={(Platform.OS === 'ios') ? 35 : 40}
                  textColor={'#FFFFFF'}
                  borderColor={'#FFFFFF'} 
                  autoCapitalize='none'
                  returnKeyType='next'
                  secureTextEntry={true}
                  autoCorrect={false}
                  maxLength={20}
                  
                  underlineColorAndroid='transparent'
                  onChangeText={this.onOldPasswordChanged.bind(this)}
                  value={this.props.resetOldPassword}
                  onSubmitEditing={(event)=>{this.refs.inputPass.focus()}}
                />


                
                 {this.props.resetOldPassword!=''?<View style={styles.inlineImg}><TouchableOpacity  onPress={this.onOldPINClearClick.bind(this)}><Image style={styles.clearImageStyle}
                                source={require('../res/clrfield.png')}></Image></TouchableOpacity></View>:null} 
             
            </View>

                {
                  this.state.errorMsg!=''&&this.state.errorOnTextField==0?<Text style={styles.errorText}>{this.state.errorMsg}</Text>:null
                }
            <View style={styles.inputContainer}>


                <TextField
                  labelStyle={{fontFamily:'FuturaStd-Book'}}
                  inputStyle={{fontFamily:'FuturaStd-Book'}}
                  label={'New Password'}
                  highlightColor={'#FFFFFF'}
                  labelColor={'#FFFFFF'}
                  textColor={'#FFFFFF'}
                  height={(Platform.OS === 'ios') ? 35 : 40}
                  borderColor={'#FFFFFF'} 
                  underlineColorAndroid='transparent'
                  returnKeyType='next'
                  secureTextEntry={true}
                  maxLength={20}
                  autoCorrect={false}
                  onChangeText={this.onNewPasswordChanged.bind(this)}
                  value={this.props.resetNewPassword}
                  ref='inputPass'
                  onSubmitEditing={(event)=>{this.refs.inputConfrimPass.focus()}}
                />

                  {this.props.resetNewPassword!=''?<View style={styles.inlineImg}><TouchableOpacity  onPress={this.onNewPINClearClick.bind(this)}><Image style={styles.clearImageStyle}
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
                  highlightColor={'#FFFFFF'}
                  labelColor={'#FFFFFF'}
                  textColor={'#FFFFFF'}
                  height={(Platform.OS === 'ios') ? 35 : 40}
                  borderColor={'#FFFFFF'} 
                  secureTextEntry={true}
                  underlineColorAndroid='transparent'
                  returnKeyType='done'
                  maxLength={20}
                  autoCorrect={false}
                  onChangeText={this.onConfirmPasswordChanged.bind(this)}
                  value={this.props.resetConfirmNewPassword}
                  
                  ref='inputConfrimPass'
                />


                  {this.props.resetConfirmNewPassword!=''?<View style={styles.inlineImg}><TouchableOpacity  onPress={this.onConfirmPINClearClick.bind(this)}><Image style={styles.clearImageStyle}
                                source={require('../res/clrfield.png')}></Image></TouchableOpacity></View>:null} 
  

                  
                
              
              
            </View>

                 {
                  this.state.errorMsg!=''&&this.state.errorOnTextField==2?<Text style={styles.errorText}>{this.state.errorMsg}</Text>:null
                }

                <Text style={styles.passwordHintText}>Password requires one of each: capital letter, lowercase letter, number, and special character.</Text>
              {this.props.isLoadingResetPassword ?
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
             </View> : null}
            <View style={styles.buttonViewStyle}>

		              <TouchableOpacity style={styles.buttonLogin}
									 onPress={this.onOkClick.bind(this)}
		  						>
                  <Text style={styles.buttonTextStyle}>Ok</Text>
              </TouchableOpacity>
            </View>
          
      </View>
      </ScrollView>

          {this.state.isShowDialog==true?<View style={styles.dialogViewStyle}>
                        <CustomAlertDialog title='Bankroll' onPress={this.state.dialogMsg=='Your password reset successfully.'?this.onDialogButtonClick.bind(this,true):this.onDialogButtonClick.bind(this,false)} subtitle={this.state.dialogMsg} />
                  </View>:null}   
         
		
      </Image>

    </TouchableWithoutFeedback>

    );
  }
}



const mapStateToProps = ({ resetPasswordReducer }) => {

  const {resetOldPassword,resetNewPassword,resetConfirmNewPassword,isLoadingResetPassword,resetPasswordRes} = resetPasswordReducer;
  console.log("create password Output: "+JSON.stringify(resetPasswordRes));

  return {
    resetOldPassword: resetOldPassword,
    resetNewPassword:resetNewPassword,
    resetConfirmNewPassword: resetConfirmNewPassword,
    isLoadingResetPassword:isLoadingResetPassword,
    resetPasswordRes:resetPasswordRes
  }
}


    


export default connect(mapStateToProps,{oldPasswordChanged,resetPasswordChanged,resetConfirmPasswordChanged,showLoadingResetPassword,clearResponseResetPassword,ResetPasswordReq})(ResetPassword);


const styles = StyleSheet.create({

  container: {
    flex: 1,
		width: null,
		height: null,
		resizeMode: 'cover',
		
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
    fontFamily:'FuturaStd-Book'


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
    marginTop:15,
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
   passwordHintText: {
    color:'white',
    fontSize: 12,
    textAlign: 'left',
    paddingTop:5,
    paddingLeft:20,
    paddingRight:20,
    backgroundColor:'transparent',
    fontFamily:'FuturaStd-Book'
  },

  clearImageStyle:{

    padding:10,
  },

});
