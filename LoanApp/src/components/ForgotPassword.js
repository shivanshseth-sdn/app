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
	TouchableOpacity,Alert,
	Platform
} from 'react-native';

import UserInput from './UserInput';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
import * as Progress from 'react-native-progress';
import{ Actions} from 'react-native-router-flux';
import {
    forgotPassEmailChanged,
    showLoadingForgotPass,
	clearResponse,
	forgotPassReq
} from '../actions/ForgotPassAction';
import CustomAlertDialog from './CustomAlertDialog';
import TextField from 'react-native-md-textinput';
class ForgotPassword extends Component{

	constructor() {
			super();
			this.state = {
				errorMsg: '',
        		responseData:'',
        		code:'',
        		msg:'',
        		dialogMsg:'',
        		isShowDialog:false,
			};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({responseData:nextProps.forgotPassRes});
		this.setState({code:nextProps.forgotPassRes.code});
		this.setState({msg:nextProps.forgotPassRes.message});

  }
  componentDidUpdate() {

      
			if(this.state.responseData!=''){
				{if(this.state.code==200){

						this.props.clearResponse();
						 this.setState({isShowDialog:true});
						 this.setState({dialogMsg:this.state.msg});
						
				}
				else{
					this.props.clearResponse();
					 this.setState({isShowDialog:true});
					  this.setState({dialogMsg:this.state.msg});

					
				}
			}
			}


  }
  	  componentWillMount(){

	  }

  onDialogButtonClick(){
			this.setState({isShowDialog:false});
			this.setState({dialogMsg:''});
		}
 componentWillUnmount(){
  this.props.forgotPassEmailChanged('');
    

  }
	onEmailChange(text){
		this.setState({errorMsg:''});
			this.props.forgotPassEmailChanged(text);
	}

	_forgotPassRequest() {

		
		if(this.props.email == ''){
				this.setState({errorMsg:'Please enter your email address.'});
		}
		else if (!this.validateEmail(this.props.email)){
			
			this.setState({errorMsg:'Please enter a valid email address.'});
			
		}
		else{

			this.props.showLoadingForgotPass(true);
			this.setState({errorMsg:''});

			var forgotPassReq={
				email:this.props.email
			};
			
			this.props.forgotPassReq(forgotPassReq);
		}
	}

	validateEmail = (email) => {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			 return re.test(email);
	};

	onEmailClearClick(){
      this.props.forgotPassEmailChanged('');
      this.setState({errorMsg:''});
      this.setState({errorOnTextField:''});
      
    }

  render(){

  
    return(

			<Image style={styles.container}
				source={require('../res/bg.png')}>
				
				
          <Text style={styles.forgotText}>FORGOT YOUR PASSWORD?</Text>

          <Text style={styles.forgotDetailText}>Hey, it happens to the best of us! Just enter the email address associated with your Bankroll account and we will send you instructions on how to reset your password.</Text>
         

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
						                    selectionColor='#FFFFFF'
						                    keyboardType='email-address'
						                    underlineColorAndroid='transparent'
						                    height={(Platform.OS === 'ios') ? 35 : 40}
						                    autoCapitalize='none'
						                    autoCorrect={false}
						                    
					 						returnKeyType='done'
					 						onChangeText={this.onEmailChange.bind(this)}
					 						value={this.props.email}
						                                            
						                  />


                  						 {this.props.email!=''?<View style={styles.inlineClearImg}><TouchableOpacity  onPress={this.onEmailClearClick.bind(this)}><Image style={styles.clearImageStyle}
                                				source={require('../res/clrfield.png')}></Image></TouchableOpacity></View>:null}  
                



			 </View>

           	{
                  this.state.errorMsg!=''?<Text style={styles.errorText}>{this.state.errorMsg}</Text>:null
            }
          <View style={styles.buttonViewStyle}>

            <TouchableOpacity style={styles.buttonLogin}
						onPress={
								this._forgotPassRequest.bind(this)
							}
						>
                <Text style={styles.buttonTextStyle}>Reset Password</Text>
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


				

				{this.state.isShowDialog==true?<View style={styles.dialogViewStyle}>
			             <CustomAlertDialog title='Bankroll' onPress={this.onDialogButtonClick.bind(this)} subtitle={this.state.dialogMsg} />
			    </View>:null} 	
	       

			</Image>
    );
  }
}

const mapStateToProps = ({ forgotPass }) => {

  const {email,isLoading,forgotPassRes} = forgotPass;
	console.log("Phone verify Output: "+JSON.stringify(forgotPassRes));
  return {
    email: email,
		isLoading:isLoading,
    forgotPassRes:forgotPassRes
  }
}

export default connect(mapStateToProps,{forgotPassEmailChanged,showLoadingForgotPass,clearResponse,forgotPassReq})(ForgotPassword);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: 'cover',
		paddingTop: 80
	},

  emailInputStyle:{
    paddingTop:20,
  },
  buttonDialogStyle:{
    paddingTop:20,
    marginLeft: 20,
    marginRight:20,
    alignSelf: 'stretch',
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
  forgotText: {
    color:'#7ACBBC',
    fontSize: 18,
    textAlign: 'center',
    paddingTop:20,
    fontFamily:'FuturaStd-Heavy',

    backgroundColor:'transparent'
  },
  forgotDetailText: {
    color:'#ffffff',
    fontSize: 15,
    textAlign: 'center',
    paddingTop:25,
    paddingLeft:20,
    paddingRight:20,
    fontFamily:'FuturaStd-Book',
     lineHeight:(Platform.OS === 'ios') ? 0 : 25,
    backgroundColor:'transparent'

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
