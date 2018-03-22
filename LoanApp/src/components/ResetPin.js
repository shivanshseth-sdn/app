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
  TouchableWithoutFeedback
} from 'react-native';

import {
  
    oldPinChanged,
    pinChangedReset,
    confirmPinChangedReset,
    showLoadingResetPin,
    clearResponseResetPin,
    ResetPinReq

} from '../actions/ResetAccessPinAction';

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

class ResetPin extends Component{

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

              this.setState({responseData:nextProps.resetPinRes});
              this.setState({code:nextProps.resetPinRes.code});
              this.setState({msg:nextProps.resetPinRes.message});

               console.log('create pin componentWillReceiveProps ==== ');
              var resData=JSON.stringify(nextProps.resetPinRes.data);
             
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

       this.props.oldPinChanged('');
       this.props.pinChangedReset('');
       this.props.confirmPinChangedReset('');


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
            this.props.showLoadingResetPin(false);
            this.props.clearResponseResetPin();
            AsyncStorage.setItem("isQuickAccess",'true');
            this.setState({isShowDialog:true});
            this.setState({dialogMsg:'Your quick access PIN reset successfully.'});
            //Alert.alert('Your quick access PIN reset successfully.');
          
          }
          else{
            this.props.showLoadingResetPin(false);
            this.props.clearResponseResetPin();
            console.log("+++++++++++else++++++++++++");
            //Alert.alert(this.state.msg);
            this.setState({isShowDialog:true});
            this.setState({dialogMsg:this.state.msg});
          }
        
      }

  }
    
  componentWillMount(){
    
  }

  onOldPinChanged(text){
     this.setState({errorMsg:''});
     this.setState({errorOnTextField:''});
     this.props.oldPinChanged(text);
     if(text.length==4){
          this.refs.inputPass.focus();
      }
  }

  onNewPinChanged(text){
     this.setState({errorMsg:''});
     this.setState({errorOnTextField:''});
     this.props.pinChangedReset(text);
      if(text.length==4){
          this.refs.inputConfrimPass.focus();
      }
  }

  onConfirmPinChanged(text){
     this.setState({errorMsg:''});
     this.setState({errorOnTextField:''});
     this.props.confirmPinChangedReset(text);
      if(text==this.props.pin){
          this.refs.inputConfrimPass.blur();
      }
  }

  onOkClick(){
        var accessPinVal;
        if(this.props.oldPin==''){
                                      //Alert.alert('Please enter valid old PIN.');
                this.setState({errorMsg:'Please enter old PIN.'});
                this.setState({errorOnTextField:0});
        }
        else if(this.props.oldPin.length<4){
                                      //Alert.alert('Please enter valid old PIN.');
                this.setState({errorMsg:'Please enter a valid PIN.'});
                this.setState({errorOnTextField:0});
        }
     
        else if(this.props.pin==''){
                                      //Alert.alert('Please enter valid new PIN.');
                this.setState({errorMsg:'Please select a new PIN.'});
                this.setState({errorOnTextField:1});
        }
        else if(this.props.pin.length<4){
                                      //Alert.alert('Please enter valid new PIN.');
                this.setState({errorMsg:'Please enter a valid new PIN.'});
                this.setState({errorOnTextField:1});
        }
        else if(this.props.confirmPin==''){
                                        //Alert.alert('Please enter valid confrim PIN.');
                this.setState({errorMsg:'Please confirm your new PIN.'});
                this.setState({errorOnTextField:2});
        }
        else if(this.props.confirmPin.length<4){
                                        //Alert.alert('Please enter valid confrim PIN.');
                this.setState({errorMsg:'Please enter a valid confirm PIN.'});
                this.setState({errorOnTextField:2});
        }
                                    
        else if(this.props.confirmPin!=this.props.pin){
                                        //Alert.alert('Please enter confrim PIN same as new PIN.');
                this.setState({errorMsg:'New PIN’s do not match.'});
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
                  this.props.showLoadingResetPin(true);

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

           
                            oldPin:this.props.oldPin,
                            newPin:this.props.pin,
                            userId:obj._id,
                            pin_sort_id:obj.pin_sort_id,
                            deviceId:DeviceInfo.getUniqueID(),
                            deviceType:DeviceInfo.getSystemName(),
                            deviceToken:device_token

                          };
                          console.log('Update USER='+JSON.stringify(user));
                          this.props.ResetPinReq(user);


                            
                        }
                        else {

                            console.log('userData else='+value);
                        }
                      }).done();

                  }

  }


  onOldPINClearClick(){
      this.props.oldPinChanged('');
      this.setState({errorMsg:''});
      this.setState({errorOnTextField:''});
      
    }

 onNewPINClearClick(){
      this.props.pinChangedReset('');
      this.setState({errorMsg:''});
      this.setState({errorOnTextField:''});
      
    }
 
 onConfirmPINClearClick(){
      this.props.confirmPinChangedReset('');
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
                  label={'Old PIN'}
                  highlightColor={'#FFFFFF'}
                  labelColor={'#FFFFFF'}
                  textColor={'#FFFFFF'}
                   height={(Platform.OS === 'ios') ? 35 : 40}
                  borderColor={'#FFFFFF'} 
                  autoCapitalize='none'
                  returnKeyType='next'
                  secureTextEntry={true}
                  autoCorrect={false}
                  maxLength={4}
                  keyboardType='numeric'
                  underlineColorAndroid='transparent'
                  onChangeText={this.onOldPinChanged.bind(this)}
                  value={this.props.oldPin}
                  onSubmitEditing={(event)=>{this.refs.inputPass.focus()}}
                />


                

                 {this.props.oldPin!=''?<View style={styles.inlineImg}><TouchableOpacity  onPress={this.onOldPINClearClick.bind(this)}><Image style={styles.clearImageStyle}
                                source={require('../res/clrfield.png')}></Image></TouchableOpacity></View>:null} 
             
            </View>

                 {
                  this.state.errorMsg!=''&&this.state.errorOnTextField==0?<Text style={styles.errorText}>{this.state.errorMsg}</Text>:null
                }
            <View style={styles.inputContainer}>


                <TextField
                  labelStyle={{fontFamily:'FuturaStd-Book'}}
                  inputStyle={{fontFamily:'FuturaStd-Book'}}
                  label={'New PIN'}
                  highlightColor={'#FFFFFF'}
                  labelColor={'#FFFFFF'}
                  textColor={'#FFFFFF'}
                   height={(Platform.OS === 'ios') ? 35 : 40}
                  borderColor={'#FFFFFF'} 
                  underlineColorAndroid='transparent'
                  returnKeyType='next'
                  secureTextEntry={true}
                  maxLength={4}
                  autoCorrect={false}
                  onChangeText={this.onNewPinChanged.bind(this)}
                  value={this.props.pin}
                  keyboardType='numeric'
                  ref='inputPass'
                  onSubmitEditing={(event)=>{this.refs.inputConfrimPass.focus()}}
                />

               
                 {this.props.pin!=''?<View style={styles.inlineImg}><TouchableOpacity  onPress={this.onNewPINClearClick.bind(this)}><Image style={styles.clearImageStyle}
                                source={require('../res/clrfield.png')}></Image></TouchableOpacity></View>:null} 
               
            </View>


                 {
                  this.state.errorMsg!=''&&this.state.errorOnTextField==1?<Text style={styles.errorText}>{this.state.errorMsg}</Text>:null
                }
            <View style={styles.inputContainer}>


                <TextField
                  labelStyle={{fontFamily:'FuturaStd-Book'}}
                  inputStyle={{fontFamily:'FuturaStd-Book'}}
                  label={'Confirm PIN'}
                  highlightColor={'#FFFFFF'}
                  labelColor={'#FFFFFF'}
                  textColor={'#FFFFFF'}
                   height={(Platform.OS === 'ios') ? 35 : 40}
                  borderColor={'#FFFFFF'} 
                  secureTextEntry={true}
                  underlineColorAndroid='transparent'
                  returnKeyType='done'
                  maxLength={4}
                  autoCorrect={false}
                  onChangeText={this.onConfirmPinChanged.bind(this)}
                  value={this.props.confirmPin}
                  keyboardType='numeric'
                  ref='inputConfrimPass'
                />

                
                {this.props.confirmPin!=''?<View style={styles.inlineImg}><TouchableOpacity  onPress={this.onConfirmPINClearClick.bind(this)}><Image style={styles.clearImageStyle}
                                source={require('../res/clrfield.png')}></Image></TouchableOpacity></View>:null}
              
            </View>

               {
                  this.state.errorMsg!=''&&this.state.errorOnTextField==2?<Text style={styles.errorText}>{this.state.errorMsg}</Text>:null
                }

              {this.props.isLoadingResetPin ?
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
                        <CustomAlertDialog title='Bankroll' onPress={this.state.dialogMsg=='Your quick access PIN reset successfully.'?this.onDialogButtonClick.bind(this,true):this.onDialogButtonClick.bind(this,false)} subtitle={this.state.dialogMsg} />
                  </View>:null}   
         
		
      </Image>

    </TouchableWithoutFeedback>

    );
  }
}




const mapStateToProps = ({ resetAccessPinReducer }) => {

  const {oldPin,pin,confirmPin,isLoadingResetPin,resetPinRes} = resetAccessPinReducer;
  console.log("create pin Output: "+JSON.stringify(resetPinRes));

  return {
    oldPin: oldPin,
    pin:pin,
    confirmPin: confirmPin,
    isLoadingResetPin:isLoadingResetPin,
    resetPinRes:resetPinRes
  }
}

  


export default connect(mapStateToProps,{oldPinChanged,pinChangedReset,confirmPinChangedReset,showLoadingResetPin,clearResponseResetPin,ResetPinReq})(ResetPin);


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

   clearImageStyle:{

    padding:10,
  },

});
