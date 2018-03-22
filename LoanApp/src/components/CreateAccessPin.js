import React,{Component} from 'react';
import Dimensions from 'Dimensions';
import PixelRatio from 'PixelRatio';
import {
	Image,
	StyleSheet,
	Navigator,
	View,
  Text,
  Button,
	TouchableOpacity,
  ScrollView,
  TextInput,
	AsyncStorage,
	TouchableWithoutFeedback,
	Alert
} from 'react-native';
import{ Actions} from 'react-native-router-flux';
import PopupDialog from 'react-native-popup-dialog';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
const CreatePinDialog  = require('./common/CreatePinDialog');
import DeviceInfo from 'react-native-device-info';
import CustomAlertDialog from './CustomAlertDialog';
import {Platform} from 'react-native';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

import {

  pinChangedLogin,
  showLoadingLoginPin,
  clearResponseLoginPin,
  LoginWithPin,


} from '../actions/LoginWithAceessPinAction';


import {

  forgotPinShowLoading,
  clearResponseForgotPin,
  forgotAccessPinReq,

} from '../actions/ForgotAccessPin';


class CreateAccessPin extends Component{

	constructor() {
			super();

			this.state = {
				errorMsg: '',
				responseData:'',
				code:'',
				msg:'',
				phone:'',
				ref:'',
				refFirstDigit:'',
				refSecondDigit:'',
				refThirdDigit:'',
				refFourthDigit:'',
				isNeedHelpClick:false,
        responseDataForgotPin:'',
        codeForgotPin:'',
        msgForgotPin:'',
        dialogMsg:'',
        isShowDialog:false,
				
			};
		
	}
		    componentWillMount(){

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


      onDialogButtonClick(){
      this.setState({isShowDialog:false});
      this.setState({dialogMsg:''});
    }

   componentWillReceiveProps(nextProps) {


      this.setState({responseData:nextProps.loginPinRes});
      this.setState({code:nextProps.loginPinRes.code});
      this.setState({msg:nextProps.loginPinRes.message});

      this.setState({responseDataForgotPin:nextProps.forgotPinRes});
      this.setState({codeForgotPin:nextProps.forgotPinRes.code});
      this.setState({msgForgotPin:nextProps.forgotPinRes.message});

      console.log('create pin componentWillReceiveProps ==== ');
      var resData=JSON.stringify(nextProps.loginPinRes.data);       
      console.log(' create pin componentWillReceiveProps ==== '+resData);

          try {
                
              if(resData != undefined&&resData!=''&&resData!="{}")
              {
                  let obj = JSON.parse(resData);
                  if(resData!=undefined&&resData!=''){

                    AsyncStorage.setItem("userData",resData);
                    if(obj.is_phone_verified!=undefined){
                       
                        this.setState({phoneVerified:obj.is_phone_verified});
                      
                      }
                   
                  }

                  if(obj._id!=undefined){
                           
                         
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
    componentDidUpdate() {

      

        if(this.state.responseData!=''){
        
          if(this.state.code==200){
            this.props.showLoadingLoginPin(false);
            this.props.clearResponseLoginPin();

             if(this.state.phoneVerified==true){
       
              Actions.Dashboard({type: "reset"});
             }
             else{
               Actions.VerifyPhoneNumber();
             }
          
          }
          else{
            this.props.showLoadingLoginPin(false);
            this.props.clearResponseLoginPin();
          
          
            this.setState({isShowDialog:true});
            this.setState({dialogMsg:this.state.msg});
          }
        
      }


       if(this.state.responseDataForgotPin!=''){
        
          if(this.state.codeForgotPin==200){
            this.props.forgotPinShowLoading(false);
            this.props.clearResponseForgotPin();
            this.setState({isNeedHelpClick:false});
        
            this.setState({isShowDialog:true});
            this.setState({dialogMsg:this.state.msgForgotPin});
            
          
          }
          else{
            this.props.forgotPinShowLoading(false);
            this.props.clearResponseForgotPin();
            this.setState({isNeedHelpClick:false});

          
            this.setState({isShowDialog:true});
            this.setState({dialogMsg:this.state.msgForgotPin});
          }
        
      }


    }


  	  

		onResetClick(){
			this.setState({isNeedHelpClick:false});
			Actions.ResetPin();
		}
	 
   forgotPinReq(){


        this.props.forgotPinShowLoading(true);
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
      
        
        AsyncStorage.getItem("userData").then((value) => {
          if(value) {

              console.log('userData if='+value);
              let obj = JSON.parse(value);
      
            
             var user={
           
              userId:obj._id,
              pin_sort_id:obj.pin_sort_id,
              deviceId:DeviceInfo.getUniqueID(),
              deviceType:DeviceInfo.getSystemName(),
              deviceToken:device_token

            };
            console.log('Update USER='+JSON.stringify(user));
            this.props.forgotAccessPinReq(user);


              
          }
          else {

              console.log('userData else='+value);
          }
        }).done();

   }
	  


	  
	onNextClick = () => {
			
			if(this.state.refFirstDigit==''){
        this.setState({errorMsg:'Please enter your 4-digit PIN.'});
			
			}
			else if(this.state.refSecondDigit==''){
				
         this.setState({errorMsg:'Please enter your 4-digit PIN.'});
			}
			else if(this.state.refThirdDigit==''){
			
         this.setState({errorMsg:'Please enter your 4-digit PIN.'});
			}
			else if(this.state.refFourthDigit==''){
			
         this.setState({errorMsg:'Please enter your 4-digit PIN.'});
			}
		
			else{

        this.props.showLoadingLoginPin(true);
				var otpVal=this.state.refFirstDigit+this.state.refSecondDigit+this.state.refThirdDigit+this.state.refFourthDigit;
				console.log('ref otpVal='+otpVal);

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
				
        AsyncStorage.getItem("userData").then((value) => {
          if(value) {

              console.log('userData if='+value);
              let obj = JSON.parse(value);
      
            
             var user={
           
              userId:obj._id,
              pin_sort_id:obj.pin_sort_id,
              access_pin:otpVal,
              deviceId:DeviceInfo.getUniqueID(),
              deviceType:DeviceInfo.getSystemName(),
              deviceToken:device_token

            };
            console.log('Update USER='+JSON.stringify(user));
            this.props.LoginWithPin(user);


              
          }
          else {

              console.log('userData else='+value);
          }
        }).done();

				
				
			}

	}

	onChangeFirstTextVal(text){
      this.setState({errorMsg:''});
		console.log('onChangeFirstTextVal ='+text);
		if(text!=''){
			console.log('onChangeFirstTextVal if='+text);
			this.refs.SecondInput.focus();
		}
	}
	onChangeSecondTextVal(text){
    this.setState({errorMsg:''});
		console.log('onChangeFirstTextVal ='+text);
		if(text!=''){
			console.log('onChangeFirstTextVal if='+text);
			this.refs.ThirdInput.focus();
		}
   
	}
	onChangeThirdTextVal(text){
    this.setState({errorMsg:''});
		console.log('onChangeFirstTextVal ='+text);
		if(text!=''){
			console.log('onChangeFirstTextVal if='+text);
			this.refs.FourthInput.focus();
		}
   
	}
  onChangeFourthTextVal(text){
    console.log('onChangeSixTextVal ='+text);
      this.setState({errorMsg:''});
    if(text!=''){
      console.log('onChangeSixTextVal if='+text);
       this.refs.FourthInput.blur();
    }
  
    
  }
	onHelpClick(){

		if(this.state.isNeedHelpClick==false){
			this.setState({isNeedHelpClick:true});
		}
		else{
			this.setState({isNeedHelpClick:false});
		}
	}
	onForgotPinClick(){
    
    this.setState({isNeedHelpClick:false});
    this.forgotPinReq();
  }

  navigateLoginComponent(){
  	Actions.LoginComponent();
  }

	
  render(){

		
    return(


    <TouchableWithoutFeedback onPress={() => {this.setState({isNeedHelpClick:false})}}>


      <Image style={styles.container}
        source={require('../res/bg.png')}>

        <ScrollView>


          <View>
          
           <Text style={styles.forgotText}>ACCOUNT ACCESS?</Text>
            <Text style={styles.forgotDetailText}>Please enter your 4-digit PIN below.</Text>
            <View style={styles.textInputContainer}>

              <TextInput style={styles.textInputStyle}
              underlineColorAndroid='transparent'
							maxLength={1}
							onChangeText={(refFirstDigit) =>{ this.setState({refFirstDigit}),this.onChangeFirstTextVal(refFirstDigit)}}
							onSubmitEditing={(event) => this.refs.SecondInput.focus()}
							value={this.state.refFirstDigit}
							keyboardType='numeric'
							 secureTextEntry={true}
							returnKeyType='next'
              ref='FirstInput'
              >

              </TextInput>
              <TextInput style={styles.textInputStyle}
							ref='SecondInput'
              underlineColorAndroid='transparent'
							maxLength={2}
							onChangeText={(refSecondDigit) => {this.setState({refSecondDigit}),this.onChangeSecondTextVal(refSecondDigit)}}
							onSubmitEditing={(event) => this.refs.ThirdInput.focus()}
							value={this.state.refSecondDigit}
							keyboardType='numeric'
							 secureTextEntry={true}
							returnKeyType='next'

              >
              </TextInput>
              <TextInput style={styles.textInputStyle}
              underlineColorAndroid='transparent'
							ref='ThirdInput'
							maxLength={2}
							onChangeText={(refThirdDigit) => {this.setState({refThirdDigit}),this.onChangeThirdTextVal(refThirdDigit)}}
							onSubmitEditing={(event) =>  this.refs.FourthInput.focus()}
							value={this.state.refThirdDigit}
							keyboardType='numeric'
							 secureTextEntry={true}
							returnKeyType='next'

              >
							</TextInput>
							<TextInput style={styles.textInputStyle}
							ref='FourthInput'
							underlineColorAndroid='transparent'
							maxLength={2}
							onChangeText={(refFourthDigit) => {this.setState({refFourthDigit}),this.onChangeFourthTextVal(refFourthDigit)}}
							value={this.state.refFourthDigit}
							keyboardType='numeric'
							 secureTextEntry={true}
							returnKeyType='done'

							>
					</TextInput>
            </View>

               {
                  this.state.errorMsg!=''?<Text style={styles.errorText}>{this.state.errorMsg}</Text>:null
                }

            <View style={styles.buttonViewStyle}>

              <TouchableOpacity style={styles.buttonLogin}
               onPress={this.onNextClick}
              >
                  <Text style={styles.buttonTextStyle}>Ok</Text>
              </TouchableOpacity>

            </View>

            {this.state.isNeedHelpClick?  <View style={styles.dialogViewStyle}>
          	    <CreatePinDialog 
          	    	onPress={this.onResetClick.bind(this)}
          	    	onPressForgot={this.onForgotPinClick.bind(this)}
          	    />
             </View>:null}
           


            <View>
              <TouchableOpacity onPress={this.onHelpClick.bind(this)}>
            	  <Text style={styles.forgotDetailText}>Need help?</Text>
              </TouchableOpacity>	 
            </View>

            <View>
          
            	  <Text style={styles.forgotDetailText}>Or</Text>
             
            </View>

            <View >
			    <TouchableOpacity style={styles.buttonStyles}
			    onPress={this.navigateLoginComponent}
			    >
			      <Text style={styles.textStyle}>Login with Email</Text>
			    </TouchableOpacity>
		    </View>

                  {this.props.isLoadingLoginPin ?
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



            {this.props.isLoadingForgotPIn ?
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

          </View>


          

        </ScrollView>

                        {this.state.isShowDialog==true?<View style={styles.dialogViewStyle}>
                        <CustomAlertDialog title='Bankroll' onPress={this.onDialogButtonClick.bind(this)} subtitle={this.state.dialogMsg} />
                  </View>:null}

      </Image>
	</TouchableWithoutFeedback>
    );
  }
}


const mapStateToProps = ({ loginWithAceessPinReducer,rorgotAccessPinReducer }) => {

  const {pin,isLoadingLoginPin,loginPinRes} = loginWithAceessPinReducer;
  const {isLoadingForgotPIn,forgotPinRes} = rorgotAccessPinReducer;
  console.log("create pin Output: "+JSON.stringify(loginPinRes));
  console.log("forgotPinRes pin Output: "+JSON.stringify(forgotPinRes));
  return {
    pin: pin,
    isLoadingLoginPin:isLoadingLoginPin,
    loginPinRes:loginPinRes,
    isLoadingForgotPIn:isLoadingForgotPIn,
    forgotPinRes:forgotPinRes

  }
}



export default connect(mapStateToProps,{forgotPinShowLoading,clearResponseForgotPin,forgotAccessPinReq,pinChangedLogin,showLoadingLoginPin,clearResponseLoginPin,LoginWithPin})(CreateAccessPin);
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
    fontSize: 16,
    textAlign: 'center',
    paddingTop:30,
    paddingLeft:20,
    paddingRight:20,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'

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
  textInputContainer:{
      marginTop:50,
      flexDirection:'row',
      justifyContent:'center',

  },

  textInputStyle:{
    height:50,
    width:50,
    marginLeft:10,
    borderRadius: 50/ PixelRatio.get(),
    borderWidth:1,
    fontSize:18,
    color:'#ffffff',
    textAlign:'center',
    borderColor:'#7ACBBC',
    backgroundColor:'#7ACBBC',
    alignItems:'center',
    fontFamily:'FuturaStd-Book'

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
  resendText: {
      color:'#7ACBBC',
      fontSize: 20,
      textAlign: 'center',
      paddingTop:10,
      fontFamily:'FuturaStd-Book',
      backgroundColor:'transparent'
    },
    forgotText: {
    color:'#7ACBBC',
    fontSize: 18,
    textAlign: 'center',
    paddingTop:20,
    fontFamily:'FuturaStd-Heavy',
    backgroundColor:'transparent'
  },
  dialogViewStyle:{

  	position: 'absolute', 
  	top: 70, left: 0, 
  	right: 0, 
  	bottom: 0, 
  	justifyContent: 'center', 
  	alignItems: 'center'
  },

   buttonStyles: {
    flex: 1,
    alignSelf: 'stretch',
    height: 40, marginTop: 20,
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    borderColor: '#fff',
   
  },
  textStyle: {
    alignSelf: 'center',
    color:'#fff',
    backgroundColor: 'transparent',
    fontSize: 18,
     paddingTop:(Platform.OS === 'ios') ? 10 : 8,
    paddingBottom: 10,
    fontFamily:'FuturaStd-Book'

  },
  errorText: {

        color:'red',
        fontSize: 14,
        textAlign: 'center',
        paddingTop:20,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor:'transparent',
        fontFamily:'FuturaStd-Book'
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

    dialogViewStyle:{

    position: 'absolute', 
    top: 0, left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
  },

  

});
