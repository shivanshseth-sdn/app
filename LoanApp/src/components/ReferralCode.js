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
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
import * as Progress from 'react-native-progress';

import { connect } from 'react-redux';
import {
  clearResponse,
  validateReferralReq,
  showLoadingReferral
} from '../actions/ReferralValidateAction';
import CustomAlertDialog from './CustomAlertDialog';


class ReferralCode extends Component{

	constructor() {
			super();

			this.state = {
				errorMsg: '',
				resData:'',
				code:'',
				msg:'',
				phone:'',
				ref:'',
				refFirstDigit:'',
				refSecondDigit:'',
				refThirdDigit:'',
				refFourthDigit:'',
				refFifthDigit:'',
				refSixDigit:'',
				dialogMsg:'',
                isShowDialog:false,

			};
		
	}

		componentWillReceiveProps(nextProps) {

			this.setState({resData:nextProps.responseData});
			this.setState({code:nextProps.responseData.code});
			this.setState({msg:nextProps.responseData.message});

			  var response=JSON.stringify(nextProps.responseData.data);

		      try {
		        if(response != undefined)
		        {
		          let obj = JSON.parse(response);
		          AsyncStorage.setItem("userData",response);
		          console.log(' signupRes componentWillReceiveProps ====>>>> '+obj.token);
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

			if(this.state.resData!=''){
				{
					if(this.state.code==200){
						this.props.showLoadingReferral(false);
						this.props.clearResponse();
						Actions.CompleteReferralCode();
					}
					else{
						this.props.showLoadingReferral(false);
						this.props.clearResponse();
						//Alert.alert(this.state.msg);
             			this.setState({isShowDialog:true});
             			this.setState({dialogMsg:this.state.msg});
					}
				}
			}
		}

		componentDidMount() {
    		//Actions.refresh({renderRightButton: this.renderRightButton})
  	    }

  	    componentWillMount(){

	  }
  	    renderRightButton = () => {
		    return (
		    	<View>
		    	<TouchableOpacity 
               		onPress={this.navigateDashboard}
              	>
		         	<Text style={{color:'#fff',backgroundColor:'transparent',alignItems:'center',fontSize:16,paddingRight:25,fontFamily:'FuturaStd-Book'}}>Skip</Text>
		        </TouchableOpacity >
		        </View>
		    )
		  }


	  navigateDashboard = () => {
	      Actions.Dashboard({type: "reset"});

	  }
	  


	  
	onNextClick = () => {
			// this.props.navigator.push({ screen: 'DashboardComponent' });
			if(this.state.refFirstDigit.replace(/\s+/g, '')==''&&this.state.refSecondDigit.replace(/\s+/g, '')==''&&this.state.refThirdDigit.replace(/\s+/g, '')==''&&this.state.refFourthDigit.replace(/\s+/g, '')==''&&this.state.refFifthDigit.replace(/\s+/g, '')==''&&this.state.refSixDigit.replace(/\s+/g, '')==''){
				//Alert.alert('Please enter your referral code. If you do not have one, click "skip" above.');
				//this.setState({errorMsg:'Please enter your referral code. If you do not have one, click "skip" above.'});
			
				this.setState({errorMsg:''});
				Actions.Dashboard({type: "reset"});
			}
			else if(this.state.refFirstDigit.replace(/\s+/g, '')==''){
				//Alert.alert('Please enter a valid referral code.');
				this.setState({errorMsg:'The code provided is not a valid referral code. Please re-enter and try again or click “next” below to continue.'});
			}
			else if(this.state.refSecondDigit.replace(/\s+/g, '')==''){
				//Alert.alert('Please enter a valid referral code.');
				this.setState({errorMsg:'The code provided is not a valid referral code. Please re-enter and try again or click “next” below to continue.'});
			}
			else if(this.state.refThirdDigit.replace(/\s+/g, '')==''){
				//Alert.alert('Please enter a valid referral code.');
				this.setState({errorMsg:'The code provided is not a valid referral code. Please re-enter and try again or click “next” below to continue'});
			}
			else if(this.state.refFourthDigit.replace(/\s+/g, '')==''){
				//Alert.alert('Please enter a valid referral code.');
				this.setState({errorMsg:'The code provided is not a valid referral code. Please re-enter and try again or click “next” below to continue'});
			}
			else if(this.state.refFifthDigit.replace(/\s+/g, '')==''){
				//Alert.alert('Please enter a valid referral code.');
				this.setState({errorMsg:'The code provided is not a valid referral code. Please re-enter and try again or click “next” below to continue'});
			}
			else if(this.state.refSixDigit.replace(/\s+/g, '')==''){
				//Alert.alert('Please enter a valid referral code.');
				this.setState({errorMsg:'The code provided is not a valid referral code. Please re-enter and try again or click “next” below to continue'});
			}
			else{
				var otpVal=this.state.refFirstDigit+this.state.refSecondDigit+this.state.refThirdDigit+this.state.refFourthDigit+this.state.refFifthDigit+this.state.refSixDigit;
				console.log('ref otpVal='+otpVal);
				console.log('ref otpVal========'+this.state.otp);
				this.setState({errorMsg:''});
				var otpVal2=otpVal.replace(/\s+/g, '');
				console.log('otp otpVal2='+otpVal2);
				this.props.showLoadingReferral(true);
				AsyncStorage.getItem("userData").then((value) => {
                 if(value) {

                 	 let obj = JSON.parse(value);
                     console.log('userData if='+value);
                     var user={
                      authToken:obj.token,
                      userId:obj._id,
                      referralCode:otpVal2,

                    };
                    console.log('Update USER='+JSON.stringify(user));
                    this.props.validateReferralReq(user);

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
		if(text.length==1){
			console.log('onChangeFirstTextVal if='+text);
			if(this.state.refSecondDigit.length==2){
				this.refs.SecondInput.focus();
			}
			else{
				this.setState({refSecondDigit:' '});
				this.refs.SecondInput.focus();
			}
			
		}
		
	}
	onChangeSecondTextVal(text){
		this.setState({errorMsg:''});
		console.log('onChangeFirstTextVal ='+text);
		// if(text.length==2){
		// 	console.log('onChangeFirstTextVal if='+text);
		// 	this.setState({refThirdDigit:' '});
		// 	this.refs.ThirdInput.focus();
		// }
		// else{
		// 	this.refs.FirstInput.focus();
		// }

		if(text.length==2){
			
			if(this.state.refThirdDigit.length==2){
				console.log('onChangeFirstTextVal if refThirdDigit ='+this.state.refThirdDigit.length);
				this.refs.ThirdInput.focus();
			}
			else{
				console.log('onChangeFirstTextVal if refThirdDigit else ='+this.state.refThirdDigit.length);
				this.setState({refThirdDigit:' '});
				this.refs.ThirdInput.focus();
			}
			
		}
		else{
			console.log('onChangeFirstTextVal main else='+text.length);
			if(text.length==1&&text!=' '){
				this.setState({refSecondDigit:' '+text});
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
		// if(text.length==2){
		// 	console.log('onChangeFirstTextVal if='+text);
		// 	this.setState({refFourthDigit:' '});
		// 	this.refs.FourthInput.focus();
		// }
		// else{
		// 	this.refs.SecondInput.focus();
		// }

		if(text.length==2){
			console.log('onChangeFirstTextVal if='+text);

			if(this.state.refFourthDigit.length==2){
				this.refs.FourthInput.focus();
			}
			else{

				this.setState({refFourthDigit:' '});
				this.refs.FourthInput.focus();
			}
			
		}
		else{

			if(text.length==1&&text!=' '){
				//this.setState({refThirdDigit:''});
				console.log('onChangeFirstTextVal ='+text.length);
				this.setState({refThirdDigit:' '+text});
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
		// if(text.length==2){
		// 	console.log('onChangeFirstTextVal if='+text);
		// 	this.setState({refFifthDigit:' '});
		// 	this.refs.FifthInput.focus();
		// }
		// else{
		// 	this.refs.ThirdInput.focus();
		// }

		if(text.length==2){
			console.log('onChangeFirstTextVal if='+text);

			if(this.state.refFifthDigit.length==2){
				this.refs.FifthInput.focus();
			}
			else{
				this.setState({refFifthDigit:' '});
				this.refs.FifthInput.focus();
			}
			
		}
		else{

			if(text.length==1&&text!=' '){
				//this.setState({refFourthDigit:''});
				console.log('onChangeFirstTextVal ='+text.length);
				this.setState({refFourthDigit:' '+text});
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
		this.setState({errorMsg:''});
		console.log('onChangeFirstTextVal ='+text);
		// if(text.length==2){
		// 	console.log('onChangeFirstTextVal if='+text);
		// 	this.setState({refSixDigit:' '});
		// 	this.refs.SixInput.focus();
		// }
		// else{
		// 	this.refs.FourthInput.focus();
		// }

		if(text.length==2){
			console.log('onChangeFirstTextVal if length 2 ='+text);

			if(this.state.refSixDigit.length==2){
				this.refs.SixInput.focus();
			}
			else{
				this.setState({refSixDigit:' '});
				this.refs.SixInput.focus();
			}
			
		}else{

			if(text.length==1&&text!=' '){
				//this.setState({refFifthDigit:''});
				console.log('onChangeFirstTextVal ='+text.length);
				this.setState({refFifthDigit:' '+text});
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
		this.setState({errorMsg:''});

		console.log('onChangeSixTextVal ='+text);
		
		// if(text==' '){
		// 	console.log('onChangeSixTextVal if='+text);
		// 	this.refs.FifthInput.focus();
		// }
		// else{
		// 	this.refs.SixInput.blur();
		// }

		if(text==' '){
			console.log('onChangeSixTextVal if=;;;;;;;;'+text);
			
			if(text.length==1){
				//this.setState({otpThirdDigit:''});
				console.log('onChangeFirstTextVal =]]]]]]]]'+text.length);
			}
			else{
				console.log('onChangeFirstTextVal else ='+text.length);
				this.refs.FifthInput.focus();
			}
		}
		else{
			console.log('onChangeFirstTextVal main else ='+text.length);
			if(text.length==2){
				this.refs.SixInput.blur();
			}
			else{

				if(text.length==1&&text!=' '){
					this.setState({refSixDigit:' '+text});
					this.refs.SixInput.blur();
				}
				else{
					this.refs.FifthInput.focus();
				}
				//
			}
			
		}
		
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
             <Progress.Bar progress={0.40} width={DEVICE_WIDTH*0.9} unfilledColor={'#FFFFFF'} color={'#7ACBBC'} />
             <Text style={styles.screenProgressText}>04/10</Text>
            </View>
           <Text style={styles.forgotText}>GOT A REFERRAL CODE?</Text>
            <Text style={styles.forgotDetailText}>Did someone refer you to Bankroll? If so enter the code below and click "next" below. If not, just leave it blank and continue.</Text>
            <View style={styles.textInputContainer}>

              <TextInput style={styles.textInputStyle}
              underlineColorAndroid='transparent'
							maxLength={1}
							onChangeText={(refFirstDigit) =>{ this.setState({refFirstDigit}),this.onChangeFirstTextVal(refFirstDigit)}}
							onSubmitEditing={(event) => this.refs.SecondInput.focus()}
							value={this.state.refFirstDigit}
							returnKeyType='next'
							ref='FirstInput'
							autoCapitalize='characters'
              >

              </TextInput>
              <TextInput style={styles.textInputStyle}
							ref='SecondInput'
              underlineColorAndroid='transparent'
							maxLength={2}
							onChangeText={(refSecondDigit) => {this.setState({refSecondDigit}),this.onChangeSecondTextVal(refSecondDigit)}}
							onSubmitEditing={(event) => this.refs.ThirdInput.focus()}
							value={this.state.refSecondDigit}
							autoCapitalize='characters'
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
							autoCapitalize='characters'
							returnKeyType='next'

              >
							</TextInput>
							<TextInput style={styles.textInputStyle}
							ref='FourthInput'
							underlineColorAndroid='transparent'
							maxLength={2}
							onChangeText={(refFourthDigit) => {this.setState({refFourthDigit}),this.onChangeFourthTextVal(refFourthDigit)}}
							onSubmitEditing={(event) =>  this.refs.FifthInput.focus()}
							value={this.state.refFourthDigit}
							autoCapitalize='characters'
							returnKeyType='next'

							>

							</TextInput>
							<TextInput style={styles.textInputStyle}
							underlineColorAndroid='transparent'
							ref='FifthInput'
							maxLength={2}
							onChangeText={(refFifthDigit) => {this.setState({refFifthDigit}),this.onChangeFifthTextVal(refFifthDigit)}}
							onSubmitEditing={(event) =>  this.refs.SixInput.focus()}
							value={this.state.refFifthDigit}
							autoCapitalize='characters'
							returnKeyType='next'

							>

              </TextInput>
              <TextInput style={styles.textInputStyle}
							underlineColorAndroid='transparent'
							ref='SixInput'
							maxLength={2}
							onChangeText={(refSixDigit) => {this.setState({refSixDigit}),this.onChangeSixTextVal(refSixDigit)}}
							value={this.state.refSixDigit}
							autoCapitalize='characters'
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
                  <Text style={styles.buttonTextStyle}>Next</Text>
              </TouchableOpacity>

            </View>

            		{this.props.isLoadingReferral ?
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

          {this.state.isShowDialog==true?<View style={styles.dialogViewStyle}>
                   <CustomAlertDialog title='Bankroll' onPress={this.onDialogButtonClick.bind(this)} subtitle={this.state.dialogMsg} />
          </View>:null}   
      </Image>

    );
  }
}

const mapStateToProps = ({ referralValidateReducer }) => {

  const {isLoadingReferral,responseData} = referralValidateReducer;
  console.log("referral Output: "+JSON.stringify(responseData));
  return {
    isLoadingReferral: isLoadingReferral,
    responseData:responseData
  }
}


export default connect(mapStateToProps,{clearResponse,validateReferralReq,showLoadingReferral})(ReferralCode);
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
