import React,{Component} from 'react';
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
  TextInput,
	AsyncStorage,
	Alert,
	Platform
} from 'react-native';
import{ Actions} from 'react-native-router-flux';
import PopupDialog from 'react-native-popup-dialog';
import { connect } from 'react-redux';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

import * as Progress from 'react-native-progress';
import {

  	resendOTPCall,
	resendCodeShowLoadingMobileVerification,
	clearResponse,
	verifyPhone,
	resendCodeShowLoadingVerifyOtp

} from '../actions/ResendCodeAction';

import CustomAlertDialog from './CustomAlertDialog';
var time=60;
class EnterVrificationCode extends Component{

	constructor() {
			super();

			this.state = {
				errorMsg: '',
				responseData:'',
				code:'',
				codeOtp:'',
				msg:'',
				phone:'',
				otp:'',
				otpFirstDigit:'',
				otpSecondDigit:'',
				otpThirdDigit:'',
				otpFourthDigit:'',
				otpFifthDigit:'',
				otpSixDigit:'',
					dialogMsg:'',
        		isShowDialog:false,

			};
			AsyncStorage.getItem("phone").then((value) => {
				if(value) {

						this.setState({phone:value})
						console.log('phone if='+value);

				}
				else {
						this.setState({phone:''})
						console.log('phone else='+value);
				}
			}).done();

			this.coundownTime();
	}

	timerFun = () => {

		console.log('in timer'+time);
		if(time>0){
			time=time-1
			this.coundownTime();
		}
		else{
			time=0;
		}

	}
	componentWillMount(){

	  }
	coundownTime(){

		setTimeout(this.timerFun , 1000); 
	}
	

	 componentWillReceiveProps(nextProps) {


			this.setState({responseData:nextProps.mobileVerifyRes});
			this.setState({code:nextProps.mobileVerifyRes.code});
			this.setState({msg:nextProps.mobileVerifyRes.message});
			this.setState({codeOtp:nextProps.verifyOtp.code});
			
			var resData=JSON.stringify(nextProps.mobileVerifyRes.data);
			
			try {
				if(resData != undefined)
	    	{
					let obj = JSON.parse(resData);
					
					if(obj.otpNumber!=undefined){
						AsyncStorage.setItem("otp", JSON.stringify(obj.otpNumber));

					}
				}

			} catch (ex) {
			  console.error(ex);
			}
		

  	}
  	componentDidUpdate() {

      		
			{
				if(this.state.responseData!=undefined){
					if(this.state.code==200){

						this.props.clearResponse();
						 this.setState({isShowDialog:true});
						 this.setState({dialogMsg:'Verification code resent successfully.'});
						//Alert.alert('Verification code resent successfully');
      				}
				}
				
      			if(this.state.codeOtp==200){
      				this.props.clearResponse();
      				Actions.ReferralCode();
      			}
      		}

  	}

	_resendCode = () => {


			if(time==0){
				time=60;
				this.coundownTime();
				this.props.resendCodeShowLoadingMobileVerification(true);
				this.setState({errorMsg:''});
				var phoneNumber=parseInt(this.state.phone, 10);
				var mobileReq={
					phone:phoneNumber
				};
				console.log('resend code='+JSON.stringify(mobileReq));
				this.props.resendOTPCall(mobileReq);
			}
			else{
					 this.setState({isShowDialog:true});
				     this.setState({dialogMsg:"Please wait for "+time+" seconds."});
			}

		
	}


	matchOTP = () => {
			
			AsyncStorage.getItem("otp").then((value) => {
				if(value) {

							this.setState({otp:value})
							console.log('otp if='+value);
							if(this.state.otpFirstDigit.replace(/\s+/g, '')==''&&this.state.otpSecondDigit.replace(/\s+/g, '')==''&&this.state.otpThirdDigit.replace(/\s+/g, '')==''&&this.state.otpFourthDigit.replace(/\s+/g, '')==''&&this.state.otpFifthDigit.replace(/\s+/g, '')==''&&this.state.otpSixDigit.replace(/\s+/g, '')==''){
									this.setState({errorMsg:'Please enter verification code.'});
									
							}
							else if(this.state.otpFirstDigit==''){
								this.setState({errorMsg:'Please enter a valid verification code.'});
								
							}
							else if(this.state.otpSecondDigit==''){
								this.setState({errorMsg:'Please enter a valid verification code.'});
								
							}
							else if(this.state.otpThirdDigit==''){
								this.setState({errorMsg:'Please enter a valid verification code.'});
								
							}
							else if(this.state.otpFourthDigit==''){
								this.setState({errorMsg:'Please enter a valid verification code.'});
								
							}
							else if(this.state.otpFifthDigit==''){
								this.setState({errorMsg:'Please enter a valid verification code.'});
								
							}
							else if(this.state.otpSixDigit==''){
								this.setState({errorMsg:'Please enter a valid verification code.'});
								
							}
							else{
								var otpVal=this.state.otpFirstDigit+this.state.otpSecondDigit+this.state.otpThirdDigit+this.state.otpFourthDigit+this.state.otpFifthDigit+this.state.otpSixDigit;
								
								
								var otpVal2=otpVal.replace(/\s+/g, '');
								console.log('otp otpVal2='+otpVal2);
								if(otpVal2==this.state.otp){
									this.setState({errorMsg:''});
									this.callVerifyPhoneReq();
								 	
								}
								else{
									this.setState({errorMsg:'Please enter a valid verification code.'});
								 	
								 }
							}


				}
				else {
						this.setState({otp:''})
						
						
				}
			}).done();
		

	}

	callVerifyPhoneReq(){

		let userId;
		 AsyncStorage.getItem("userData").then((value) => {
        if(value) {

            
            let obj = JSON.parse(value);
            
      		this.props.resendCodeShowLoadingVerifyOtp(true);
            var phoneNumber=parseInt(this.state.phone, 10);
			var mobileReq={
				authToken:obj.token,
				phone:phoneNumber,
				userId:obj._id
			};
			
			this.props.verifyPhone(mobileReq);
          
            
        }
        else {

            console.log('userData else='+value);
        }
      }).done();


	}

	onChangeFirstTextVal(text){

		this.setState({errorMsg:''});
		
		
		if(text.length==1){
			
			if(this.state.otpSecondDigit.length==2){
				this.refs.SecondInput.focus();
			}
			else{
				this.setState({otpSecondDigit:' '});
				this.refs.SecondInput.focus();
			}
			
		}
	}
	onChangeSecondTextVal(text){
		
		this.setState({errorMsg:''});
		
		if(text.length==2){
			
			if(this.state.otpThirdDigit.length==2){
				console.log('onChangeFirstTextVal if otpThirdDigit ='+this.state.otpThirdDigit.length);
				this.refs.ThirdInput.focus();
			}
			else{
				console.log('onChangeFirstTextVal if otpThirdDigit else ='+this.state.otpThirdDigit.length);
				this.setState({otpThirdDigit:' '});
				this.refs.ThirdInput.focus();
			}
			
		}
		else{
			console.log('onChangeFirstTextVal main else='+text.length);
			if(text.length==1&&text!=' '){
				this.setState({otpSecondDigit:' '+text});
				console.log('onChangeFirstTextVal if length one ='+text.length);
				this.refs.ThirdInput.focus();
			}
			else{
				if(text==''){
						this.refs.FirstInput.focus();	
				}
				
			}
			
		}
	}
	onChangeThirdTextVal(text){
		
		this.setState({errorMsg:''});
		console.log('onChangeFirstTextVal ='+text);
		if(text.length==2){
			console.log('onChangeFirstTextVal if='+text);

			if(this.state.otpFourthDigit.length==2){
				this.refs.FourthInput.focus();
			}
			else{

				this.setState({otpFourthDigit:' '});
				this.refs.FourthInput.focus();
			}
			
		}
		else{

			if(text.length==1&&text!=' '){
				//this.setState({otpThirdDigit:''});
				console.log('onChangeFirstTextVal ='+text.length);
				this.setState({otpThirdDigit:' '+text});
				this.refs.FourthInput.focus();
			}
			else{

				if(text==''){
					this.refs.SecondInput.focus();
				}
				
			}
			
		}
	}
	onChangeFourthTextVal(text){

			this.setState({errorMsg:''});
		
		console.log('onChangeFirstTextVal ='+text);
		if(text.length==2){
			console.log('onChangeFirstTextVal if='+text);

			if(this.state.otpFifthDigit.length==2){
				this.refs.FifthInput.focus();
			}
			else{
				this.setState({otpFifthDigit:' '});
				this.refs.FifthInput.focus();
			}
			
		}
		else{

			if(text.length==1&&text!=' '){
				//this.setState({otpThirdDigit:''});
				console.log('onChangeFirstTextVal ='+text.length);
				this.setState({otpFourthDigit:' '+text});
				this.refs.FifthInput.focus();
			}
			else{
				if(text==''){
					this.refs.ThirdInput.focus();
				}
				
			}
			
		}
	}
	onChangeFifthTextVal(text){
		console.log('onChangeFirstTextVal ='+text);
			this.setState({errorMsg:''});
		if(text.length==2){
			console.log('onChangeFirstTextVal if length 2 ='+text);

			if(this.state.otpSixDigit.length==2){
				this.refs.SixInput.focus();
			}
			else{
				this.setState({otpSixDigit:' '});
				this.refs.SixInput.focus();
			}
			
		}else{

			if(text.length==1&&text!=' '){
				//this.setState({otpThirdDigit:''});
				console.log('onChangeFirstTextVal ='+text.length);
				this.setState({otpFifthDigit:' '+text});
				this.refs.SixInput.focus();
			}
			else{
				if(text==''){
					this.refs.FourthInput.focus();
				}
				
			}
			
		}
	}

	onChangeSixTextVal(text){
		console.log('onChangeSixTextVal ='+text);
			this.setState({errorMsg:''});
		if(text==' '){
			
			
			if(text.length==1){
				
				
			}
			else{
				
				this.refs.FifthInput.focus();
			}
		}
		else{
			
			if(text.length==2){
				this.refs.SixInput.blur();
			}
			else{

				if(text.length==1&&text!=' '){
					this.setState({otpSixDigit:' '+text});
					this.refs.SixInput.blur();
				}
				else{
					this.refs.FifthInput.focus();
				}
				//
			}
			
		}
	}
	formatPhoneNumber(s) {

		  var s2 = (""+s).replace(/\D/g, '');
		  var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
		  return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
		
		}

		onDialogButtonClick(){
			this.setState({isShowDialog:false});
			this.setState({dialogMsg:''});
		}

   render(){


    return(

      <Image style={styles.container}
        source={require('../res/bg.png')}>
     
        <ScrollView>
          <View>

          	  <View style={{alignItems:'center'}}>
             <Progress.Bar progress={0.30} width={DEVICE_WIDTH*0.9} unfilledColor={'#FFFFFF'} color={'#7ACBBC'} />
             <Text style={styles.screenProgressText}>03/10</Text>
            </View>
            <Text style={styles.forgotDetailText}>The verification code has been sent to the phone number provided. Please enter the verification code below.</Text>
             

            <View style={styles.textInputContainer}>

              <TextInput style={styles.textInputStyle}
              underlineColorAndroid='transparent'
							maxLength={1}
							 highlightColor={'#FFFFFF'}
							onChangeText={(otpFirstDigit) =>{ this.setState({otpFirstDigit}),this.onChangeFirstTextVal(otpFirstDigit)}}
							onSubmitEditing={(event) => this.refs.SecondInput.focus()}
							value={this.state.otpFirstDigit}
							keyboardType='numeric'
							returnKeyType='next'

							ref='FirstInput'
							
              >

              </TextInput>
              <TextInput style={styles.textInputStyle}
							ref='SecondInput'
                            underlineColorAndroid='transparent'
							maxLength={2}
							 highlightColor={'#FFFFFF'}
							onChangeText={(otpSecondDigit) => {this.setState({otpSecondDigit}),this.onChangeSecondTextVal(otpSecondDigit)}}
							onSubmitEditing={(event) => this.refs.ThirdInput.focus()}
							value={this.state.otpSecondDigit}
							keyboardType='numeric'
							returnKeyType='next'

              >
              </TextInput>
              <TextInput style={styles.textInputStyle}
              underlineColorAndroid='transparent'
							ref='ThirdInput'
							maxLength={2}
							 highlightColor={'#FFFFFF'}
							onChangeText={(otpThirdDigit) => {this.setState({otpThirdDigit}),this.onChangeThirdTextVal(otpThirdDigit)}}
							onSubmitEditing={(event) =>  this.refs.FourthInput.focus()}
							value={this.state.otpThirdDigit}
							keyboardType='numeric'
							returnKeyType='next'

              >
							</TextInput>
							<TextInput style={styles.textInputStyle}
							ref='FourthInput'
							underlineColorAndroid='transparent'
							maxLength={2}
							 highlightColor={'#FFFFFF'}
							onChangeText={(otpFourthDigit) => {this.setState({otpFourthDigit}),this.onChangeFourthTextVal(otpFourthDigit)}}
							onSubmitEditing={(event) =>  this.refs.FifthInput.focus()}
							value={this.state.otpFourthDigit}
							keyboardType='numeric'
							returnKeyType='next'

							>

							</TextInput>
							<TextInput style={styles.textInputStyle}
							underlineColorAndroid='transparent'
							ref='FifthInput'
							maxLength={2}
							 highlightColor={'#FFFFFF'}
							onChangeText={(otpFifthDigit) => {this.setState({otpFifthDigit}),this.onChangeFifthTextVal(otpFifthDigit)}}
							onSubmitEditing={(event) =>  this.refs.SixInput.focus()}
							value={this.state.otpFifthDigit}
							keyboardType='numeric'
							returnKeyType='next'

							>

              </TextInput>
              <TextInput style={styles.textInputStyle}
							underlineColorAndroid='transparent'
							ref='SixInput'
							maxLength={2}
							 highlightColor={'#FFFFFF'}
							onChangeText={(otpSixDigit) => {this.setState({otpSixDigit}),this.onChangeSixTextVal(otpSixDigit)}}
							value={this.state.otpSixDigit}
							keyboardType='numeric'
							returnKeyType='done'
							>
              </TextInput>

            </View>

                {
                  this.state.errorMsg!=''?<Text style={styles.errorText}>{this.state.errorMsg}</Text>:null
                }

            <View style={styles.buttonViewStyle}>

              <TouchableOpacity style={styles.buttonLogin}
               onPress={this.matchOTP}
              >
                  <Text style={styles.buttonTextStyle}>Ok</Text>
              </TouchableOpacity>

            </View>

            <View>
              <Text style={styles.forgotDetailText}>This can take a few minutes. Retry after 60 seconds if you did not receive the code.</Text>
              
               <TouchableOpacity 
               onPress={this._resendCode}
              >
              <Text style={styles.resendText}>Resend Code.</Text>
              </TouchableOpacity>
            </View>


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

					 {this.props.isLoadingVerifyOtp ?
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
        </ScrollView>

        					{this.state.isShowDialog==true?<View style={styles.dialogViewStyle}>
			             <CustomAlertDialog title='Bankroll' onPress={this.onDialogButtonClick.bind(this)} subtitle={this.state.dialogMsg} />
			    </View>:null} 
        

      </Image>

    );
  }
}

const mapStateToProps = ({ reSendCodeReducer }) => {

  const {isLoading,mobileVerifyRes,verifyOtp,isLoadingVerifyOtp} = reSendCodeReducer;
  console.log("resend code verifyOtp: "+JSON.stringify(verifyOtp));
  
  return {
 
	isLoading:isLoading,
    mobileVerifyRes:mobileVerifyRes,
    verifyOtp:verifyOtp,
    isLoadingVerifyOtp:isLoadingVerifyOtp,

  }

}

export default connect(mapStateToProps,{resendCodeShowLoadingMobileVerification,resendCodeShowLoadingVerifyOtp,verifyPhone,resendOTPCall,clearResponse})(EnterVrificationCode);
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

  textInputContainer:{
      marginTop:50,
      flexDirection:'row',
      justifyContent:'center',

  },

  textInputStyle:{
    height:40,
    width:40,
    marginLeft:10,
    borderWidth:1,
    fontSize:18,
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
        fontFamily:'FuturaStd-Book'
    },
  resendText: {
      color:'#7ACBBC',
      fontSize: 20,
      textAlign: 'center',
      paddingTop:10,
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
		errorText: {
		    color:'red',
		    fontSize: 14,
		    textAlign: 'center',
		    paddingTop:10,
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

});
